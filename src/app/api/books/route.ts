import { NextResponse } from "next/server";
import { faker, fakerEN, fakerPL, fakerPT_BR } from "@faker-js/faker";
import { Book } from "@/types";
import { FIRST_PAGE_LIMIT, OTHER_PAGES_LIMIT } from "@/app/constants/constants";

const getLocalizedFaker = (language: string) => {
    switch (language) {
        case "pl":
            return fakerPL;
        case "pt_BR":
            return fakerPT_BR;
        case "en_US":
        default:
            return fakerEN;
    }
};

const generateWithFraction = <T>(n: number, fn: () => T): T[] => {
    const results: T[] = [];
    for (let i = 0; i < Math.floor(n); i++) {
        results.push(fn());
    }
    if (faker.number.float({ min: 0, max: 1 }) < n % 1) {
        results.push(fn());
    }
    return results;
};

export async function GET(req: Request) {
    const url = new URL(req.url);

    const seed = parseInt(url.searchParams.get("seed") || "0");
    const page = parseInt(url.searchParams.get("page") || "1");
    const avgLikes = parseFloat(url.searchParams.get("avgLikes") || "0");
    const avgReviews = parseFloat(url.searchParams.get("avgReviews") || "0");
    const language = url.searchParams.get("language") || "en_US";
    const limit = parseInt(url.searchParams.get("limit") || `${FIRST_PAGE_LIMIT}`);
    const localizedFaker = getLocalizedFaker(language);
    localizedFaker.seed(seed + page);
    const books: Book[] = [];

    const calculateBookIndex = (page: number, i: number) =>
        (page === 1 ? 0 : FIRST_PAGE_LIMIT + (page - 2) * OTHER_PAGES_LIMIT) + i + 1;

    for (let i = 0; i < limit; i++) {
        const bookIndex = calculateBookIndex(page, i);
        const isbn = localizedFaker.commerce.isbn();
        const title = localizedFaker.book.title();
        const authors = Array.from(
            { length: localizedFaker.number.int({ min: 1, max: 2 }) },
            () => localizedFaker.book.author()
        );
        const publisher = localizedFaker.book.publisher();
        const likes =
            Math.floor(avgLikes) +
            (localizedFaker.number.float({ min: 0, max: 1 }) < avgLikes % 1 ? 1 : 0);
        const cover = localizedFaker.image.dataUri({ color: localizedFaker.color.rgb() });

        const reviews = generateWithFraction(avgReviews, () => ({
            text: localizedFaker.lorem.sentence(),
            author: localizedFaker.person.fullName(),
            avatar: localizedFaker.image.avatar(),
        }));

        books.push({
            index: bookIndex,
            isbn,
            title,
            authors,
            publisher,
            likes,
            reviews,
            cover,
        });
    }

    return NextResponse.json(books);
}
