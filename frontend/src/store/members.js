export const RECEIVE_MEMBERS = "Members/RECEIVE_MEMBERS";
export const receiveMembers = (members) => ({
  type: RECEIVE_MEMBERS,
  members,
});

export const RECEIVE_MEMBER = "members/RECEIVE_MEMBER";
export const receiveMember = (Member) => ({
  type: RECEIVE_MEMBER,
  Member,
});

export const REMOVE_MEMBER = "members/REMOVE_MEMBER";
export const removeMember = (memberId) => ({
  type: REMOVE_MEMBER,
  memberId,
});

export const getMembers = (state) => {
  if (!state.members) return [];
  return Object.values(state.members);
};

export const getMember = (memberId) => (state) => {
  if (!state.members) return null;
  return state.members[memberId];
};

export const fetchMembers = () => async (dispatch) => {
  const res = await fetch("api/members");
  if (res.ok) {
    const members = await res.json();
    dispatch(receiveMembers(members));
  }
};

export const fetchMember = (memberId) => async (dispatch) => {
  const res = await fetch(`api/members/${memberId}`);
  if (res.ok) {
    const Member = await res.json();
    dispatch(receiveMember(Member));
  }
};

export const createMember = (Member) => (dispatch) => {
  return fetch("/api/members", {
    method: "POST",
    body: JSON.stringify(Member),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((Member) => dispatch(receiveMember(Member)));
};

export const updateMember = (Member) => (dispatch) => {
  return fetch(`/api/members/${Member.id}`, {
    method: "PATCH",
    body: JSON.stringify(Member),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((Member) => dispatch(receiveMember(Member)));
};

export const deleteMember = (memberId) => (dispatch) => {
  return fetch(`/api/members/${memberId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeMember(memberId)));
};

const membersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MEMBER:
      return { ...state, [action.Member.id]: action.Member };
    case RECEIVE_MEMBERS:
      return { ...state, ...action.members };
    case REMOVE_MEMBER:
      const newState = { ...state };
      delete newState[action.memberId];
      return newState;
    default:
      return state;
  }
};

export default membersReducer;
///
