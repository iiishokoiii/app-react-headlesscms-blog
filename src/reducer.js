const initialState = {
  blogList: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BLOG_LIST": {
      return {
        blogList: action.payload, 
      };
    }
       
    default:
    return state;
  }
}