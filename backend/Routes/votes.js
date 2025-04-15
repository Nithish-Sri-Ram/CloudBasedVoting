const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const Election = require('../Models/election');
const Vote = require('../Models/vote');

// Cast a vote
router.post('/', auth, async (req, res) => {
  try {
    const { electionId, candidateIndex } = req.body;
    
    // Check if election exists and is active
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ msg: 'Election not found' });
    }
    
    if (!election.isActive) {
      return res.status(400).json({ msg: 'This election is no longer active' });
    }
    
    if (election.endDate && new Date() > new Date(election.endDate)) {
      return res.status(400).json({ msg: 'This election has ended' });
    }
    
    // Check if candidate exists
    if (candidateIndex < 0 || candidateIndex >= election.candidates.length) {
      return res.status(400).json({ msg: 'Invalid candidate' });
    }
    
    // Check if user already voted
    const existingVote = await Vote.findOne({ election: electionId, user: req.user.id });
    if (existingVote) {
      return res.status(400).json({ msg: 'You have already voted in this election' });
    }
    
    // Create vote record
    const newVote = new Vote({
      election: electionId,
      user: req.user.id,
      candidate: candidateIndex
    });
    
    await newVote.save();
    
    // Update candidate votes
    election.candidates[candidateIndex].votes += 1;
    await election.save();
    
    res.json({ msg: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get votes for an election
router.get('/election/:electionId', async (req, res) => {
  try {
    const votes = await Vote.find({ election: req.params.electionId })
      .populate('user', 'username');
    res.json(votes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
