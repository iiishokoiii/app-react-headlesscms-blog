export const fetchListAction = () => ({
  type: 'FETC_LIST',
});
export const successFetchListAction = (payload) => ({
  type: 'SUCCESS_FETCH_LIST',
  payload,
});
export const updatePageId = (payload) => ({
  type: 'UPDATE_PAGEID',
  payload,
});
