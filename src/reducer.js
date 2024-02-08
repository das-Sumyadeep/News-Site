
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            };
        case "REMOVE_POST":
            return {
                ...state,
                hits: state.hits.filter(
                    (news)=> {
                        return news.objectID !== action.payload
                    })
            }
        case "SEARCH_QUERY":
            return {
                ...state,
                query: action.payload
            }
        case "NEXT_PAGE":
            let NextPage = state.page + 1;

            if(NextPage >= state.nbPages){
                NextPage = 0;
            }

            return {
                ...state,
                page: NextPage
            }
        case "PREV_PAGE":
            let PrevPage = state.page - 1;

            if(PrevPage <= 0){
                PrevPage = 0;
            }

            return {
                ...state,
                page: PrevPage
            }
        default:
            return state;

    };

}

export default reducer