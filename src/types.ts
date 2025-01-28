export interface Review {
    text: string;
    author: string;
    avatar: string;
}

export interface Book {
    index: number;
    isbn: string;
    title: string;
    authors: string[];
    publisher: string;
    cover: string;
    likes: number;
    reviews: Review[];
}

export enum ActionTypes {
    RESET = "RESET",
    LOAD_MORE = "LOAD_MORE",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILURE = "FETCH_FAILURE",
}

export interface State {
    books: Book[];
    page: number;
    filters: {
        language: string;
        seed: number;
        avgLikes: number;
        avgReviews: number;
    };
    loading: boolean;
    error: string | null;
}

export interface ResetAction {
    type: ActionTypes.RESET;
    payload: { filters: State["filters"] };
}

export interface LoadMoreAction {
    type: ActionTypes.LOAD_MORE;
}

export interface FetchSuccessAction {
    type: ActionTypes.FETCH_SUCCESS;
    payload: { books: Book[]; isReset: boolean };
}

export interface FetchFailureAction {
    type: ActionTypes.FETCH_FAILURE;
    payload: string;
}

export type Action = ResetAction | LoadMoreAction | FetchSuccessAction | FetchFailureAction;
