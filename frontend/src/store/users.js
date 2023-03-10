export const RECEIVE_USERS = "Users/RECEIVE_USERS";
export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const RECEIVE_USER = "users/RECEIVE_USER";
export const receiveUser = (User) => ({
  type: RECEIVE_USER,
  User,
});

export const REMOVE_USER = "users/REMOVE_USER";
export const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId,
});

export const getUsers = (state) => {
  if (!state.users) return [];
  return Object.values(state.users);
};

export const getUser = (userId) => (state) => {
  if (!state.users) return null;
  return state.users[userId];
};

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch("api/users");
  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`api/users/${userId}`);
  if (res.ok) {
    const User = await res.json();
    dispatch(receiveUser(User));
  }
};

export const createUser = (User) => (dispatch) => {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(User),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((User) => dispatch(receiveUser(User)));
};

export const updateUser = (User) => (dispatch) => {
  return fetch(`/api/users/${User.id}`, {
    method: "PATCH",
    body: JSON.stringify(User),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((User) => dispatch(receiveUser(User)));
};

export const deleteUser = (userId) => (dispatch) => {
  return fetch(`/api/users/${userId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeUser(userId)));
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, [action.User.id]: action.User };
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
///
