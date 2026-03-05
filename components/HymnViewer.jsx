"use client";

import { useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function HymnViewer({ hymn }) {
    const [lang, setLang] = useState("sa");

    const lyricsText = hymn.lyrics?.[lang] || hymn.lyrics?.sa || "";
    const translationText = hymn.translation?.en || "";

    return (
        <div>

            <div className="mb-6">
                <LanguageToggle currentLang={lang} onToggle={setLang} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6">
                <pre className="whitespace-pre-wrap font-serif text-gray-700 text-lg leading-relaxed">
                    {lyricsText}
                </pre>
            </div>

            {translationText && lang === "sa" && (
                <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                    <h3 className="text-sm font-semibold text-[#FF6B00] mb-3 uppercase tracking-wide">
                        English Translation
                    </h3>
                    <pre className="whitespace-pre-wrap font-serif text-gray-600 text-base leading-relaxed">
                        {translationText}
                    </pre>
                </div>
            )}

        </div>
    );
}