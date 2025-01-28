import { Book } from "@/types";

export const exportBooksToCSV = (books: Book[], seed: number) => {
    const csvContent = [
        ["#", "ISBN", "Title", "Authors", "Publisher", "Likes", "Reviews"],
        ...books.map((book, idx) => [
            idx + 1,
            book.isbn,
            `"${book.title}"`,
            `"${book.authors.join(", ")}"`,
            `"${book.publisher}"`,
            book.likes,
            book.reviews.length,
        ]),
    ]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `books_page_${seed}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};
