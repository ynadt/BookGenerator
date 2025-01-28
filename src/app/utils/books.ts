import {Book} from "@/types";

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

    const query = new URLSearchParams({
        language,
        seed: seed.toString(),
        avgLikes: avgLikes.toString(),
        avgReviews: avgReviews.toString(),
        page: page.toString(),
        limit: limit?.toString() || "",
    });

    const response = await fetch(`/api/books?${query.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return response.json();
}
