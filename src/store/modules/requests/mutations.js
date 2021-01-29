export default {
  addRequest(state, paylod) {
    state.requests.push(paylod);
  },
  setRequests(state, payload) {
    state.requests = payload;
  }
};
