import * as types from "./actionTypes";

const initialState = {
    posts: [],
    currentPosts: [],
    loading: false,
    currentPage: parseInt(window.location.search?.split('=')[1]||1),
    postsPerPage: 10,
    totalPages: 0,
    width: document.documentElement.clientWidth
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.changeLoading: 
            return {...state, loading: !state.loading}
        case types.fetchPosts:
            return {...state, posts: action.payload}
        case types.filter: 
            return {...state, posts: action.payload}
        case types.sort:
            return {...state, posts: action.payload}
        case types.countTotal: 
            return {...state, totalPages: Math.ceil(action.payload/state.postsPerPage)}
        case types.setCurrentPosts:
            const temp = state.posts.slice(action.payload[0], action.payload[1])
            return {...state, currentPosts: temp}
        case types.changeCurrentPage: 
            return {...state, currentPage: action.payload}
        case types.changeWidth: 
            return {...state, width: action.payload}
        default: return state
    }
}

export default reducer