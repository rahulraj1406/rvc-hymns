
"use client";

import { useState } from "react";
import Link from "next/link";
import HymnCard from "../../components/HymnCard";
import SearchBar from "../../components/SearchBar";
import hymns from "../../data/hymns.json";

export default function HymnsPage() {
    const [search, setSearch] = useState("");

    const filtered = hymns.filter((hymn) => {
        const query = search.toLowerCase();
        return (
            hymn.title.toLowerCase().includes(query) ||
            hymn.firstLine.toLowerCase().includes(query)
        );
    });

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <Link
                href="/"
                className="inline-flex items-center text-[#FF6B00] text-sm mb-6 hover:text-[#CC4400] transition-colors"
            >
                ← Back to Home
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">All Hymns</h1>
                <p className="text-gray-400 text-sm">{hymns.length} hymns available</p>
            </div>

            <div className="mb-8">
                <SearchBar value={search} onChange={setSearch} />
            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((hymn) => (
                        <HymnCard key={hymn.id} hymn={hymn} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">🪔</div>
                    <p className="text-gray-500 text-lg">No hymns found for "{search}"</p>
                    <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
                </div>
            )}

        </div>
    );
}