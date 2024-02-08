import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer';

const API = 'https://hn.algolia.com/api/v1/search?';

const initialState =
{

    isLoading: true,
    query: 'HTML',
    nbpages: 0,
    page: 0,
    hits: []
}

// context creation
const AppContext = createContext();

const AppProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);


    const fetchData = async (url) => {

        dispatch({ type: "SET_LOADING" })
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    // to remove post
    const removePost = (id)=> {
        dispatch({type: "REMOVE_POST", payload: id});
    }

    //search
    const searchPost = (value) => {
        dispatch({type: "SEARCH_QUERY", payload: value})
    }

    //nextPage
    const getNextPage = () => {
        dispatch({type: "NEXT_PAGE"});
    }

    //previousPage
    const getPrevPage = () => {
        dispatch({type: "PREV_PAGE"});
    }


    // to call all apis
    useEffect(() => {
        fetchData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return (
        // context provider
        <AppContext.Provider value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>
            {children}
        </AppContext.Provider>
    )
}

// custom hook for usecontext
const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };