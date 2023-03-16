import jwtFetch from "./jwt";
// import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_POLLS = "polls/RECEIVE_POLLS";
const RECEIVE_USER_POLLS = "polls/RECEIVE_USER_POLLS";
const RECEIVE_GRIEF_POLLS = "polls/ RECEIVE_GRIEF_POLLS";
const RECEIVE_NEW_POLL = "polls/RECEIVE_NEW_POLL";
const RECEIVE_POLL_ERRORS = "polls/RECEIVE_POLL_ERRORS";
const REMOVE_POLL = "polls/REMOVE_POLL";
const CLEAR_POLL_ERRORS = "polls/CLEAR_POLL_ERRORS";


export const receivePolls = (polls) => ({
    type: RECEIVE_POLLS,
    polls,
});

export const removePoll = (pollId) => ({
    type: REMOVE_POLL,
    pollId,
});

export const deletePoll = (pollId) => (dispatch) => {
    return jwtFetch(`/api/polls/${pollId}`, {
        method: "DELETE",
    }).then(() => dispatch(removePoll(pollId)));
};

const receiveUserPolls = (polls) => ({
    type: RECEIVE_USER_POLLS,
    polls,
});

const receiveGriefPolls = (polls) => {
    return {
        type: RECEIVE_GRIEF_POLLS,
        polls,
    };
};

const receiveNewPoll = (poll) => ({
    type: RECEIVE_NEW_POLL,
    poll,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_POLL_ERRORS,
    errors,
});

export const clearPollErrors = (errors) => ({
    type: CLEAR_POLL_ERRORS,
    errors,
});

export const fetchPolls = () => async (dispatch) => {
    try {
      const res = await jwtFetch("/api/polls");
      const polls = await res.json();
      dispatch(receivePolls(polls));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchUserPolls = (id) => async (dispatch) => {
    try {
      const res = await jwtFetch(`/api/polls/user/${id}`);
      const polls = await res.json();
      dispatch(receiveUserPolls(polls));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchGriefPolls = (griefId) => async (dispatch) => {
    try {
      const res = await jwtFetch(`/api/polls/grief/${griefId}`);
      const polls = await res.json();
  
      dispatch(receiveGriefPolls(polls));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composePoll = (data) => async (dispatch) => {
    try {
      const res = await jwtFetch("/api/polls/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const poll = await res.json();
      dispatch(receiveNewPoll(poll));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

const nullErrors = null;

export const pollErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
      case RECEIVE_POLL_ERRORS:
        return action.errors;
      case RECEIVE_NEW_POLL:
      case CLEAR_POLL_ERRORS:
        return nullErrors;
      default:
        return state;
    }
  };

const pollsReducer = (
    state = { all: {}, user: {}, union: {}, grief: {}, new: undefined },
    action
  ) => {
    switch (action.type) {
      case RECEIVE_POLLS:
        return { ...state, all: action.polls, new: undefined };
      case RECEIVE_USER_POLLS:
        return { ...state, user: action.polls, new: undefined };
      case RECEIVE_GRIEF_POLLS:
        return { ...state, union: action.polls, new: undefined };
      case RECEIVE_NEW_POLL:
        return { ...state, new: action.poll };
      case REMOVE_POLL:
        const newState = { ...state };
        delete newState[action.pollId];
        return newState;
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {}, new: undefined };
      default:
        return state;
    }
};

export default pollsReducer;
