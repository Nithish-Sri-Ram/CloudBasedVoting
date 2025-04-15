const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const Election = require('../Models/election');

// Get all elections
router.get('/', async (req, res) => {
  try {
    const elections = await Election.find().sort({ startDate: -1 });
    res.json(elections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single election
router.get('/:id', async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ msg: 'Election not found' });
    }
    res.json(election);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create election (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const { title, description, candidates, endDate } = req.body;
    
    const newElection = new Election({
      title,
      description,
      candidates: candidates.map(candidate => ({ 
        name: candidate.name, 
        party: candidate.party, 
        votes: 0 
      })),
      createdBy: req.user.id,
      endDate
    });
    
    const election = await newElection.save();
    res.json(election);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update election (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    let election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ msg: 'Election not found' });
    }
    
    const { title, description, isActive, endDate } = req.body;
    
    election.title = title || election.title;
    election.description = description || election.description;
    election.isActive = isActive !== undefined ? isActive : election.isActive;
    election.endDate = endDate || election.endDate;
    
    await election.save();
    res.json(election);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete election (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ msg: 'Election not found' });
    }
    
    await Election.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Election removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
