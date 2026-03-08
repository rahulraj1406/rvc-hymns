
"use client";

import { useState } from "react";
import Link from "next/link";
import HymnCard from "../../components/HymnCard";
import SearchBar from "../../components/SearchBar";
import hymns from "../../data/hymns.json";

export default function HymnsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid");

    const categories = [
        { id: "all", label: "All Hymns" },
        { id: "aarathikam", label: "Aarathikam" },
        { id: "ramakrishna", label: "Ramakrishna" },
        { id: "sharada", label: "Sharada Devi" },
        { id: "vivekananda", label: "Vivekananda" },
        { id: "rama", label: "Rama" },
        { id: "krishna", label: "Krishna" },
        { id: "shiva", label: "Shiva" },
        { id: "devi", label: "Devi" },
        { id: "guru", label: "Guru" },
        { id: "namavali", label: "Namavali" },
        { id: "others", label: "Others" }
    ];

    let filtered = hymns.filter((hymn) => {
        const query = search.toLowerCase();
        const matchesSearch =
            hymn.number?.toString().includes(query) ||
            hymn.title.toLowerCase().includes(query) ||
            hymn.firstLine.toLowerCase().includes(query);

        const hymnCats = hymn.category || [];
        const matchesCategory =
            category === "all" || hymnCats.includes(category);

        return matchesSearch && matchesCategory;
    });

    if (sortBy === "az") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "za") {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        filtered.sort((a, b) => (a.number || a.id) - (b.number || b.id));
    }

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

            <div className="mb-6">
                <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat.id
                                ? "bg-[#FF6B00] text-white shadow-md scale-105"
                                : "bg-white text-gray-500 border border-orange-200 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* View Toggle */}
                    <div className="flex bg-white border border-orange-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 py-2 transition-colors flex items-center justify-center ${viewMode === "grid" ? "bg-[#FF6B00] text-white" : "text-gray-500 hover:bg-orange-50 hover:text-[#FF6B00]"
                                }`}
                            aria-label="Grid View"
                            title="Grid View"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-2 transition-colors flex items-center justify-center border-l border-orange-200 ${viewMode === "list" ? "bg-[#FF6B00] text-white" : "text-gray-500 hover:bg-orange-50 hover:text-[#FF6B00]"
                                }`}
                            aria-label="List View"
                            title="List View"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white border text-sm font-medium border-orange-200 text-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors cursor-pointer h-[42px]"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="az">Sort: A-Z</option>
                        <option value="za">Sort: Z-A</option>
                    </select>
                </div>
            </div>

            {filtered.length > 0 ? (
                viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filtered.map((hymn) => (
                            <HymnCard key={hymn.id} hymn={hymn} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {filtered.map((hymn) => (
                            <Link
                                key={hymn.id}
                                href={`/hymns/${hymn.slug}`}
                                className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 flex items-center justify-between hover:shadow-md hover:border-[#FF6B00] transition-all group"
                            >
                                <div className="flex-1 pr-4">
                                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#FF6B00] transition-colors">
                                        {hymn.title}
                                    </h3>
                                    <p className="text-gray-500 italic text-sm mt-1 truncate">
                                        {hymn.firstLine}
                                    </p>
                                </div>
                                <span className="bg-orange-50 text-[#FF6B00] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border border-orange-100">
                                    No. {hymn.number}
                                </span>
                            </Link>
                        ))}
                    </div>
                )
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