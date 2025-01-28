import { Book } from "@/types";

interface FetchBooksArgs {
    language: string;
    seed: number;
    avgLikes: number;
    avgReviews: number;
    page: number;
    limit?: number;
}

export async function fetchBooks(args: FetchBooksArgs): Promise<Book[]> {
    const { language, seed, avgLikes, avgReviews, page, limit } = args;

    const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, seed, avgLikes, avgReviews, page, limit }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return response.json();
}
