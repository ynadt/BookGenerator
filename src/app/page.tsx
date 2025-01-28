"use client";

import React, { useState, useCallback } from "react";
import Controls from "./components/Controls";
import Table from "./components/Table";
import { Book } from "@/types";
import { exportBooksToCSV } from "@/app/utils/exportCsv";

const HomePage: React.FC = () => {
    const [language, setLanguage] = useState<string>("en_US");
    const [seed, setSeed] = useState<number>(123456);
    const [avgLikes, setAvgLikes] = useState<number>(4);
    const [avgReviews, setAvgReviews] = useState<number>(4.7);
    const [view, setView] = useState<"table" | "gallery">("table");
    const [currentBooks, setCurrentBooks] = useState<Book[]>([]);

    const handleBooksUpdate = useCallback(
        (newBooks: Book[], isReset: boolean) => {
            setCurrentBooks((prevBooks) =>
                isReset ? newBooks : [...prevBooks, ...newBooks]
            );
        },
        []
    );

    const handleExportCSV = () => exportBooksToCSV(currentBooks, seed);

    return (
        <main className="flex flex-col min-h-screen">
            <Controls
                language={language}
                setLanguage={setLanguage}
                seed={seed}
                setSeed={setSeed}
                avgLikes={avgLikes}
                setAvgLikes={setAvgLikes}
                avgReviews={avgReviews}
                setAvgReviews={setAvgReviews}
                view={view}
                setView={setView}
                onExportCSV={handleExportCSV}
            />
            <div className="flex-grow overflow-auto">
                <Table
                    language={language}
                    seed={seed}
                    avgLikes={avgLikes}
                    avgReviews={avgReviews}
                    view={view}
                    onBooksUpdate={handleBooksUpdate}
                />
            </div>
        </main>
    );
};

export default HomePage;
