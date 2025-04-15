import {
    GET_ELECTIONS,
    GET_ELECTION,
    ADD_ELECTION,
    DELETE_ELECTION,
    UPDATE_ELECTION,
    ELECTION_ERROR,
    CAST_VOTE,
    VOTE_ERROR,
    CLEAR_ERRORS,
    CLEAR_CURRENT
  } from '../types';
  
  const electionReducer = (state, action) => {
    switch (action.type) {
      case GET_ELECTIONS:
        return {
          ...state,
          elections: action.payload,
          loading: false
        };
      case GET_ELECTION:
        return {
          ...state,
          currentElection: action.payload,
          loading: false
        };
      case ADD_ELECTION:
        return {
          ...state,
          elections: [action.payload, ...(state.elections || [])],
          loading: false
        };
      case UPDATE_ELECTION:
        return {
          ...state,
          elections: state.elections.map(election =>
            election._id === action.payload._id ? action.payload : election
          ),
          currentElection: state.currentElection && state.currentElection._id === action.payload._id 
            ? action.payload 
            : state.currentElection,
          loading: false
        };
      case DELETE_ELECTION:
        return {
          ...state,
          elections: state.elections.filter(election => election._id !== action.payload),
          loading: false
        };
      case CAST_VOTE:
        return {
          ...state,
          currentElection: state.currentElection && {
            ...state.currentElection,
            candidates: state.currentElection.candidates.map((candidate, index) => 
              index === action.payload.candidateIndex 
                ? { ...candidate, votes: candidate.votes + 1 } 
                : candidate
            )
          },
          loading: false
        };
      case ELECTION_ERROR:
      case VOTE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          currentElection: null
        };
      default:
        return state;
    }
  };
  
  export default electionReducer;
  