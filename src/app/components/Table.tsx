"use client";

import React, { useEffect, useReducer, useRef, useCallback } from "react";
import BookRow from "./BookRow";
import { Book, ActionTypes, Action, State } from "@/types";
import { fetchBooks } from "@/app/utils/books";
import { FIRST_PAGE_LIMIT, OTHER_PAGES_LIMIT } from "@/app/constants/constants";

interface TableProps {
  language: string;
  seed: number;
  avgLikes: number;
  avgReviews: number;
  view: "table" | "gallery";
  onBooksUpdate: (books: Book[], isReset: boolean) => void;
}

const initialState: State = {
  books: [],
  page: 1,
  filters: {
    language: "en_US",
    seed: 123456,
    avgLikes: 4,
    avgReviews: 4.7,
  },
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RESET:
      return {
        ...state,
        books: [],
        page: 1,
        loading: true,
        filters: action.payload.filters,
      };
    case ActionTypes.LOAD_MORE:
      return {
        ...state,
        page: state.page + 1,
        loading: true,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        books: action.payload.isReset
            ? action.payload.books
            : [...state.books, ...action.payload.books],
        loading: false,
      };
    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
};

const Table: React.FC<TableProps> = ({
                                       language,
                                       seed,
                                       avgLikes,
                                       avgReviews,
                                       view,
                                       onBooksUpdate,
                                     }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFetchingRef = useRef(false);

  const { books, page, filters, loading } = state;

  const fetchBooksData = useCallback(
      async (isReset = false): Promise<void> => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
          const limit = isReset ? FIRST_PAGE_LIMIT : OTHER_PAGES_LIMIT;
          const fetchedBooks = await fetchBooks({
            language: filters.language,
            seed: filters.seed,
            avgLikes: filters.avgLikes,
            avgReviews: filters.avgReviews,
            page,
            limit,
          });

          dispatch({
            type: ActionTypes.FETCH_SUCCESS,
            payload: { books: fetchedBooks, isReset },
          });

          onBooksUpdate(fetchedBooks, isReset);
        } catch (error: unknown) {
          const errorMessage =
              error instanceof Error ? error.message : "An unknown error occurred";
          dispatch({ type: ActionTypes.FETCH_FAILURE, payload: errorMessage });
        } finally {
          isFetchingRef.current = false;
        }
      },
      [filters, page, onBooksUpdate]
  );

  useEffect(() => {
    const newFilters = { language, seed, avgLikes, avgReviews };
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      dispatch({
        type: ActionTypes.RESET,
        payload: { filters: newFilters },
      });
    }
  }, [language, seed, avgLikes, avgReviews, filters]);

  useEffect(() => {
    fetchBooksData(page === 1);
  }, [page, filters, fetchBooksData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
          !loading &&
          !isFetchingRef.current
      ) {
        dispatch({ type: ActionTypes.LOAD_MORE });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
      <div className="relative">
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        {view === "table" ? (
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="sticky top-0 bg-white bg-gradient-to-t from-gray-200 to-blue-50 shadow">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  #
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  ISBN
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Title
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Author(s)
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left font-medium text-gray-600">
                  Publisher
                </th>
              </tr>
              </thead>
              <tbody>
              {books.map((book: Book, idx: number) => (
                  <BookRow key={`${filters.seed}-${idx}`} book={book} />
              ))}
              </tbody>
            </table>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {books.map((book: Book, idx: number) => (
                  <div
                      key={`${filters.seed}-${idx}`}
                      className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                  >
                    <div
                        className="relative w-full bg-cover bg-center h-72"
                        style={{
                          backgroundImage: `url(${book.cover})`,
                        }}
                    >
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
                        <h2 className="text-lg font-bold truncate">{book.title}</h2>
                        <p className="truncate italic text-sm">
                          by {book.authors.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-800 truncate">
                          {book.title}
                        </h2>
                        <p className="text-sm text-gray-600 italic">
                          by {book.authors.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                              type="button"
                              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
                              title="Likes"
                          >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                            </svg>
                          </button>
                          <span className="ml-2 text-blue-600 font-bold">
                      {book.likes}
                    </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {book.reviews.length} review
                          {book.reviews.length !== 1 && "s"}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default Table;
