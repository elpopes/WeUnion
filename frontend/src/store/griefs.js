import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_GRIEFS = "griefs/RECEIVE_GRIEFS";
const RECEIVE_USER_GRIEFS = "griefs/RECEIVE_USER_GRIEFS";
const RECEIVE_UNION_GRIEFS = "griefs/ RECEIVE_UNION_GRIEFS";
const RECEIVE_NEW_GRIEF = "griefs/RECEIVE_NEW_GRIEF";
const RECEIVE_GRIEF_ERRORS = "griefs/RECEIVE_GRIEF_ERRORS";
const REMOVE_GRIEF = "griefs/REMOVE_POST";
const CLEAR_GRIEF_ERRORS = "griefs/CLEAR_GRIEF_ERRORS";

export const receiveGriefs = (griefs) => ({
  type: RECEIVE_GRIEFS,
  griefs,
});

export const removeGrief = (griefId) => ({
  type: REMOVE_GRIEF,
  griefId,
});

export const deleteGrief = (griefId) => (dispatch) => {
  return jwtFetch(`/api/griefs/${griefId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeGrief(griefId)));
};

const receiveUserGriefs = (griefs) => ({
  type: RECEIVE_USER_GRIEFS,
  griefs,
});

const receiveUnionGriefs = (griefs) => {
  debugger;
  return {
    type: RECEIVE_UNION_GRIEFS,
    griefs,
  };
};

const receiveNewGrief = (grief) => ({
  type: RECEIVE_NEW_GRIEF,
  grief,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_GRIEF_ERRORS,
  errors,
});

export const clearGriefErrors = (errors) => ({
  type: CLEAR_GRIEF_ERRORS,
  errors,
});

export const fetchGriefs = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/griefs");
    const griefs = await res.json();
    dispatch(receiveGriefs(griefs));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserGriefs = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/griefs/user/${id}`);
    const griefs = await res.json();
    dispatch(receiveUserGriefs(griefs));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUnionGriefs = (unionId) => async (dispatch) => {
  try {
    debugger;
    const res = await jwtFetch(`/api/griefs/union/${unionId}`);
    const griefs = await res.json();
    debugger;
    dispatch(receiveUnionGriefs(griefs));
  } catch (err) {
    // debugger;
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeGrief = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/griefs/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const grief = await res.json();
    dispatch(receiveNewGrief(grief));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const griefErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_GRIEF_ERRORS:
      return action.errors;
    case RECEIVE_NEW_GRIEF:
    case CLEAR_GRIEF_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const griefsReducer = (
  state = { all: {}, user: {}, union: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_GRIEFS:
      return { ...state, all: action.griefs, new: undefined };
    case RECEIVE_USER_GRIEFS:
      return { ...state, user: action.griefs, new: undefined };
    case RECEIVE_UNION_GRIEFS:
      debugger;
      return { ...state, union: action.griefs, new: undefined };
    case RECEIVE_NEW_GRIEF:
      return { ...state, new: action.grief };
    case REMOVE_GRIEF:
      const newState = { ...state };
      delete newState[action.griefId];
      return newState;
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    default:
      return state;
  }
};

export default griefsReducer;
