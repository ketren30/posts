import * as actionTypes from './actionTypes';

export const ChangeLoading = () => {
    const action = {
        type: actionTypes.changeLoading
    }
    return action
}

export function FetchPosts () {
    return async (dispatch) => {
        dispatch(ChangeLoading());

        const url = 'https://jsonplaceholder.typicode.com/posts';
        
        const action = await (await fetch(url)).json();
        
        dispatch({
            type: actionTypes.fetchPosts,
            payload: action,
        });

        setTimeout(()=>dispatch(ChangeLoading()), 1500);

    }
}

export const Filter = (string) => {
    const action = {
        type: actionTypes.filter,
        payload: string
    }
    return action
}
export const SortPosts = (posts) => {
    const action = {
        type: actionTypes.sort,
        payload: posts
    }
    return action
}
export const CountTotal = (number) => {
    const action = {
        type: actionTypes.countTotal,
        payload: number
    }
    return action
}

export const ChangeCurrentPage = (number) => {
    const action = {
        type: actionTypes.changeCurrentPage,
        payload: number
    }
    return action
}
export const SetCurrentPosts = (array) => {
    const action = {
        type: actionTypes.setCurrentPosts,
        payload: array
    }
    return action
}
export const ChangeWidth = (array) => {
    const action = {
        type: actionTypes.changeWidth,
        payload: array
    }
    return action
}
