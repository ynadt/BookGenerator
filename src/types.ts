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
