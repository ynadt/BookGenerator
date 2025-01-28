"use client";

import React from "react";
import { RefreshCcw, LayoutGrid, List } from "lucide-react";

interface ControlsProps {
  language: string;
  setLanguage: (value: string) => void;
  seed: number;
  setSeed: (value: number) => void;
  avgLikes: number;
  setAvgLikes: (value: number) => void;
  avgReviews: number;
  setAvgReviews: (value: number) => void;
  view: "table" | "gallery";
  setView: (value: "table" | "gallery") => void;
  onExportCSV: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  language,
  setLanguage,
  seed,
  setSeed,
  avgLikes,
  setAvgLikes,
  avgReviews,
  setAvgReviews,
  view,
  setView,
  onExportCSV,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white bg-gradient-to-b from-gray-100 shadow-md p-4 rounded-b-lg">
      <div className="flex flex-wrap gap-6 items-center justify-center">

        <div className="flex flex-col flex-grow max-w-xs">
          <label className="text-gray-700 font-semibold mb-1">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="en_US">English (US)</option>
            <option value="pl">Polish (Poland)</option>
            <option value="pt_BR">Portuguese (Brazil)</option>
          </select>
        </div>

        <div className="flex flex-col flex-grow max-w-xs">
          <label className="text-gray-700 font-semibold mb-1">Seed:</label>
          <div className="relative">
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="border rounded-md p-2 pr-10 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() => setSeed(Math.floor(Math.random() * 100000))}
              className="absolute top-1/2 transform -translate-y-1/2 right-2 text-blue-500 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              title="Shuffle Seed"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow max-w-xs">
          <label className="text-gray-700 font-semibold mb-1">Avg Likes:</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={avgLikes}
            onChange={(e) => setAvgLikes(Number(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm text-gray-600 mt-1">Value: {avgLikes.toFixed(1)}</div>
        </div>

        <div className="flex flex-col flex-grow max-w-xs">
          <label className="text-gray-700 font-semibold mb-1">Avg Reviews:</label>
          <input
            type="number"
            step="0.1"
            value={avgReviews}
            onChange={(e) => setAvgReviews(Number(e.target.value))}
            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center flex-grow max-w-xs">
          <label className="text-gray-700 font-semibold mb-1 mr-4">View:</label>
          <div className="flex items-center border rounded-full p-1 bg-gray-100">
            <button
                onClick={() => setView("table")}
                className={`p-2 rounded-full ${
                    view === "table" ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
                title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
            <button
                onClick={() => setView("gallery")}
                className={`p-2 rounded-full ${
                    view === "gallery" ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
                title="Gallery View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow max-w-xs">
          <button
            onClick={onExportCSV}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Export to CSV
          </button>
        </div>

      </div>
    </div>
  );
};

export default Controls;
