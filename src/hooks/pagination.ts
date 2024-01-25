import { useReducer } from "react";

function paginationReducer(state: any, { payload, type }: any) {
  switch (type) {
    case "SET_RESULTS":
      if (payload.length < state.page_size) {
        return {
          ...state,
          results: [...state.results, ...payload],
          pageLoaded: state.pageLoaded + 1,
          loading: false,
          done: true,
        };
      } else {
        return {
          ...state,
          results: [...state.results, ...payload],
          pageLoaded: state.pageLoaded + 1,
          loading: false,
          done: false,
        };
      }

    case "SET_FIRST_RESULTS":
      if (payload.length < state.page_size) {
        return {
          ...state,
          results: payload,
          pageLoaded: 1,
          loading: false,
          done: true,
        };
      } else {
        return {
          ...state,
          results: payload,
          pageLoaded: 1,
          loading: false,
          done: false,
        };
      }

    case "FETCH_FAILED":
      return {
        ...state,
        loading: false,
      };

    case "START_FETCH":
      return {
        ...state,
        loading: true,
      };
  }
  return state;
}

export function usePagination(loadFunction: any, page_size = 20) {
  const [state, dispatch] = useReducer(paginationReducer, {
    loading: false,
    results: [],
    pageLoaded: 0,
    done: false,
    page_size: page_size,
  });

  const loadNextPage = () => {
    const { pageLoaded, loading, done } = state;
    console.log("Loading next page. ", loading, pageLoaded);
    if (done) return;
    if (!loading) {
      dispatch({
        type: "START_FETCH",
        payload: {},
      });
      loadFunction(
        pageLoaded + 1,
        (response: Response) => {
          dispatch({
            type: "SET_RESULTS",
            payload: response,
          });
        },
        (error: Error) => {
          dispatch({
            type: "FETCH_FAILED",
            payload: {},
          });
        },
      );
    }
  };
  const loadFirstPage = () => {
    const { pageLoaded, loading } = state;
    dispatch({
      type: "START_FETCH",
      payload: {},
    });
    loadFunction(
      1,
      (response: Response) => {
        dispatch({
          type: "SET_FIRST_RESULTS",
          payload: response,
        });
      },
      (error: Error) => {
        dispatch({
          type: "FETCH_FAILED",
          payload: {},
        });
      },
    );
  };
  return [
    state.results,
    loadNextPage,
    loadFirstPage,
    state.loading,
    state.pageLoaded,
  ];
}
