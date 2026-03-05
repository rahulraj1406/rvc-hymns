"use client";

import { useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function HymnViewer({ hymn }) {
    const availableLyricLangs = Object.keys(hymn.lyrics || {}).filter(
        (key) => hymn.lyrics[key] && hymn.lyrics[key].trim() !== ""
    );

    const availableTranslationLangs = Object.keys(hymn.translation || {}).filter(
        (key) => hymn.translation[key] && hymn.translation[key].trim() !== ""
    );

    const [lyricsLang, setLyricsLang] = useState(
        availableLyricLangs[0] || "en"
    );

    const [translationLang, setTranslationLang] = useState(
        availableTranslationLangs[0] || "en"
    );

    const lyricsText = hymn.lyrics?.[lyricsLang] || "";
    const translationText = hymn.translation?.[translationLang] || "";

    return (
        <div>

            {/* Lyrics Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Lyrics
                    </h2>
                </div>

                <div className="mb-4">
                    <LanguageToggle
                        currentLang={lyricsLang}
                        onToggle={setLyricsLang}
                        availableLangs={availableLyricLangs}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                    <pre className="whitespace-pre-wrap font-serif text-gray-700 text-lg leading-relaxed">
                        {lyricsText || "Lyrics not available in this language yet."}
                    </pre>
                </div>
            </div>

            {/* Translation Section */}
            {availableTranslationLangs.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Translation
                        </h2>
                    </div>

                    <div className="mb-4">
                        <LanguageToggle
                            currentLang={translationLang}
                            onToggle={setTranslationLang}
                            availableLangs={availableTranslationLangs}
                        />
                    </div>

                    <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                        <pre className="whitespace-pre-wrap font-serif text-gray-600 text-base leading-relaxed">
                            {translationText || "Translation not available in this language yet."}
                        </pre>
                    </div>
                </div>
            )}

        </div>
    );
}