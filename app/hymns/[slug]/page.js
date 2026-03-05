import Link from "next/link";
import hymns from "../../../data/hymns.json";
import HymnViewer from "../../../components/HymnViewer";

export function generateStaticParams() {
    return hymns.map((hymn) => ({ slug: hymn.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const hymn = hymns.find((h) => h.slug === slug);
    if (!hymn) return { title: "Hymn Not Found" };
    return {
        title: `${hymn.title} - RVC Dublin Hymn Book`,
        description: hymn.firstLine,
    };
}

export default async function HymnPage({ params }) {
    const { slug } = await params;
    const hymnIndex = hymns.findIndex((h) => h.slug === slug);
    const hymn = hymns[hymnIndex];

    if (!hymn) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <div className="text-5xl mb-4">🪔</div>
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Hymn not found</h1>
                <Link href="/hymns" className="text-[#FF6B00] underline">
                    Back to all hymns
                </Link>
            </div>
        );
    }

    const prevHymn = hymns[hymnIndex - 1] || null;
    const nextHymn = hymns[hymnIndex + 1] || null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            <Link
                href="/hymns"
                className="inline-flex items-center text-[#FF6B00] text-sm mb-8 hover:text-[#CC4400] transition-colors"
            >
                ← All Hymns
            </Link>

            <div className="mb-6">
                <span className="bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Hymn {hymn.number}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-1">
                    {hymn.title}
                </h1>
                <p className="text-gray-400 italic text-sm">{hymn.firstLine}</p>
            </div>

            <HymnViewer hymn={hymn} />

            <div className="flex justify-between mt-12 pt-6 border-t border-orange-100">
                {prevHymn ? (
                    <Link
                        href={`/hymns/${prevHymn.slug}`}
                        className="text-[#FF6B00] text-sm hover:text-[#CC4400] transition-colors"
                    >
                        ← {prevHymn.title}
                    </Link>
                ) : (
                    <div />
                )}
                {nextHymn ? (
                    <Link
                        href={`/hymns/${nextHymn.slug}`}
                        className="text-[#FF6B00] text-sm hover:text-[#CC4400] transition-colors"
                    >
                        {nextHymn.title} →
                    </Link>
                ) : (
                    <div />
                )}
            </div>

        </div>
    );
}

