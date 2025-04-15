import React, { useReducer } from 'react';
import axios from 'axios';
import ElectionContext from './ElectionContext';
import electionReducer from './ElectionReducer';
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

const ElectionState = props => {
  const initialState = {
    elections: null,
    currentElection: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(electionReducer, initialState);
const base_url='http://localhost:5001';
  // Get Elections
  const getElections = async () => {
    try {
      const res = await axios.get(`${base_url}/api/elections`);

      dispatch({
        type: GET_ELECTIONS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ELECTION_ERROR,
        payload: err.response?.data?.msg || 'Error fetching elections'
      });
    }
  };

  // Get Election
  const getElection = async id => {
    try {
      const res = await axios.get(`${base_url}/api/elections/${id}`);

      dispatch({
        type: GET_ELECTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ELECTION_ERROR,
        payload: err.response?.data?.msg || 'Error fetching election'
      });
    }
  };

  // Add Election
  const addElection = async election => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${base_url}/api/elections`, election, config);

      dispatch({
        type: ADD_ELECTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ELECTION_ERROR,
        payload: err.response?.data?.msg || 'Error adding election'
      });
    }
  };

  // Delete Election
  const deleteElection = async id => {
    try {
      await axios.delete(`${base_url}/api/elections/${id}`);

      dispatch({
        type: DELETE_ELECTION,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ELECTION_ERROR,
        payload: err.response?.data?.msg || 'Error deleting election'
      });
    }
  };

  // Update Election
  const updateElection = async election => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`${base_url}/api/elections/${election._id}`, election, config);

      dispatch({
        type: UPDATE_ELECTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ELECTION_ERROR,
        payload: err.response?.data?.msg || 'Error updating election'
      });
    }
  };

  // Cast Vote
  const castVote = async voteData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${base_url}/api/votes`, voteData, config);

      dispatch({
        type: CAST_VOTE,
        payload: { ...voteData, message: res.data.msg }
      });
    } catch (err) {
      dispatch({
        type: VOTE_ERROR,
        payload: err.response?.data?.msg || 'Error casting vote'
      });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Current Election
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  return (
    <ElectionContext.Provider
      value={{
        elections: state.elections,
        currentElection: state.currentElection,
        error: state.error,
        loading: state.loading,
        getElections,
        getElection,
        addElection,
        deleteElection,
        updateElection,
        castVote,
        clearErrors,
        clearCurrent
      }}
    >
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionState;
