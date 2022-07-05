export default function updateAction(state, payload) {
  console.log("state:", state);
  console.log("payload:", payload);
  return {
    ...state,
    companyUser: {
      ...state.companyUser,
      ...payload,
    },
    driver: {
      ...state.driver,
      ...payload,
    },
  };
}
