import jwtFetch from "./jwt";

const RECEIVE_UNIONS = "unions/RECEIVE_UNIONS";
const RECEIVE_UNION = "unions/RECEIVE_UNION";
const RECEIVE_USER_UNIONS = "unions/RECEIVE_USER_UNIONS";
const RECEIVE_NEW_UNION = "unions/RECEIVE_NEW_UNION";
const DESTROY_UNION = "unions/DESTROY_UNION";
const RECEIVE_UNION_ERRORS = "errors/RECEIVE_UNION_ERRORS";
const CLEAR_UNION_ERRORS = "errors/CLEAR_UNION_ERRORS";
const RECEIVE_UNION_MEMBERS = "unions/RECEIVE_UNION_MEMBERS";

const receiveUnions = (unions) => ({
  type: RECEIVE_UNIONS,
  unions,
});

const receiveUnionMembers = (unionId) => ({
  type: RECEIVE_UNION_MEMBERS,
});

const receiveUnion = (union) => ({
  type: RECEIVE_UNION,
  union,
});

const receiveUserUnions = (unions) => ({
  type: RECEIVE_USER_UNIONS,
  unions,
});

const receiveNewUnion = (union) => ({
  type: RECEIVE_NEW_UNION,
  union,
});

const destroyUnion = (union) => ({
  type: DESTROY_UNION,
  union,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_UNION_ERRORS,
  errors,
});

const clearErrors = (errors) => ({
  type: CLEAR_UNION_ERRORS,
  errors,
});

export const getUnion = (id) => (state) => {
  if (!state.unions) return null;
  return state.unions[id];
};

export const fetchUnions = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/unions");
    const unions = await res.json();
    dispatch(receiveUnions(unions));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUnionMembers = (unionId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/unions/${unionId}/members`);
    const union = await res.json();
    dispatch(receiveUnionMembers(union._id));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUnion = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/unions/${id}`);
    const union = await res.json();
    dispatch(receiveUnion(union));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserUnions = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/unions/user/${id}`);
    const unions = await res.json();
    dispatch(receiveUserUnions(unions));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createUnion = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/unions", {
      method: "POST",
      //   Commented out this line to fix CSRF error:
      //   headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const union = await res.json();
    dispatch(receiveNewUnion(union));
    return union;
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteUnion = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/unions/${id}`, {
      method: "DELETE",
    });
    const union = await res.json();
    dispatch(destroyUnion(union));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const unionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_UNION_ERRORS:
      return action.errors;
    case RECEIVE_NEW_UNION:
    case CLEAR_UNION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const unionsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_UNIONS:
      return { ...state, all: action.unions };
    case RECEIVE_UNION:
      return { ...state, [action.union._id]: action.union };
    case RECEIVE_USER_UNIONS:
      return { ...state, user: action.unions };
    case RECEIVE_NEW_UNION:
      return { ...state, new: action.union };
    case DESTROY_UNION:
      return { ...state, new: undefined };
    default:
      return state;
  }
};

export default unionsReducer;
