import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

const initialState={
    watchlist:localStorage.getItem('watchlist')
    ?JSON.parse(localStorage.getItem('watchlist'))
    :[],
    watched:localStorage.getItem('watched')
    ?JSON.parse(localStorage.getItem('watched'))
    :[],
}

//create context

export const GlobalContext = createContext(initialState);
console.log("GC:",GlobalContext);

//provider comp
export const GlobalProvider = (props)=>{

    const [state, dispatch] = useReducer(AppReducer, initialState)
    


    useEffect(()=>{
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
    },[state])
    //actions
    const addMovieToWatchList=(movie)=>{        
        dispatch({type:"ADD_MOVIE_TO_WATCHLIST", payload:movie});
    }
    const removeMovieFromWatchList=(id)=>{        
        dispatch({type:"REMOVE_MOVIE_FROM_WATCHLIST", payload:id});
    }

    return (
        <GlobalContext.Provider
            value={{
                watchlist:state.watchlist,
                watched:state.watched, 
                addMovieToWatchList:addMovieToWatchList,
                removeMovieFromWatchList:removeMovieFromWatchList
            }}
        >
        {props.children}
        </GlobalContext.Provider>
    );
}



