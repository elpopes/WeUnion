import jwtFetch from "./jwt";

const RECEIVE_CURRENT_POLL = "poll/RECEIVE_CURRENT_POLL";
const RECEIVE_POLL_ERRORS = "poll/RECEIVE_POLL_ERRORS";
const CLEAR_POLL_ERRORS = "poll/CLEAR_POLL_ERRORS";
const UPDATE_POLL = "poll/UPDATE_POLL";
export const RECEIVE_POLL_LOGOUT = "poll/RECEIVE_POLL_LOGOUT";

const receiveCurrentPoll = (currentPoll) => ({
    type: RECEIVE_CURRENT_POLL,
    currentPoll,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_POLL_ERRORS,
    errors,
});

const logoutPoll = () => ({
    type: RECEIVE_POLL_LOGOUT,
});

export const clearPollErrors = () => ({
    type: CLEAR_POLL_ERRORS,
});

export const fetchCurrentPoll = (id) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/polls/${id}`);
        const currentPoll = await res.json();
        dispatch(receiveCurrentPoll(currentPoll));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const updatePoll = (poll) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/polls/${poll.id}`, {
            method: "PUT",
            body: JSON.stringify(poll),
        });
        const updatedPoll = await res.json();
        dispatch(receiveCurrentPoll(updatedPoll));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const logoutPolls = () => async (dispatch) => {
    dispatch(logoutPoll());
}

const initialState = {
    currentPoll: null,
    errors: null,
};

const pollReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_POLL:
            return { ...state, currentPoll: action.currentPoll };
        case RECEIVE_POLL_ERRORS:
            return { ...state, errors: action.errors };
        case CLEAR_POLL_ERRORS:
            return { ...state, errors: null };
        case RECEIVE_POLL_LOGOUT:
            return { ...state, currentPoll: null };
        default:
            return state;
    }
}

export default pollReducer;
