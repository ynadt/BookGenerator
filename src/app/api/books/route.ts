import { NextResponse } from "next/server";
import { fakerEN, fakerPL, fakerPT_BR } from "@faker-js/faker";
import { Book } from "@/types";
import {FIRST_PAGE_LIMIT, OTHER_PAGES_LIMIT} from "@/app/constants/constants";

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

export async function POST(req: Request) {
    const body = await req.json();
    const { seed, page, avgLikes, avgReviews, language, limit } = body;
    const faker = getLocalizedFaker(language);
    const combinedSeed = seed + page;

    faker.seed(combinedSeed);

    const books: Book[] = [];

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

    for (let i = 0; i < limit; i++) {
        const bookIndex =
            (page === 1 ? 0 : FIRST_PAGE_LIMIT + (page - 2) * OTHER_PAGES_LIMIT) + i + 1;
        const isbn = faker.commerce.isbn();
        const title = faker.book.title();
        const authors = [faker.book.author(), faker.book.author()];
        const publisher = faker.book.publisher();
        const likes = Math.floor(avgLikes) + (faker.number.float({ min: 0, max: 1 }) < avgLikes % 1 ? 1 : 0);
        const cover = faker.image.dataUri({ color: faker.color.rgb() });

        const reviewSeed = combinedSeed + i;
        faker.seed(reviewSeed);
        const reviews = generateWithFraction(avgReviews, () => ({
            text: faker.lorem.sentence(),
            author: faker.person.fullName(),
            avatar: faker.image.avatar(),
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
