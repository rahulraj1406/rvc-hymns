"""
========================================================
STEP 3 — VALIDATE TRANSLATED JSON
========================================================
Reads hymns_translated.json and produces a detailed
report showing:
- Which hymns are complete
- Which hymns have line count mismatches
- Which hymns are missing translations
- Overall completion statistics

HOW TO USE:
  python3 step3_validate.py

INPUT:  hymns_translated.json
OUTPUT: validation_report.txt
========================================================
"""

import json
import os

INPUT_JSON   = "hymns_translated.json"
REPORT_FILE  = "validation_report.txt"

LANGUAGES = [
    ("hi", "Hindi"),
    ("bn", "Bengali"),
    ("ka", "Kannada"),
]


def count_lines(text):
    if not text or not text.strip():
        return 0
    return len([l for l in text.splitlines() if l.strip()])


def validate_all(hymns):
    report_lines = []
    issues = []
    perfect = []
    missing_translation = []

    report_lines.append("=" * 60)
    report_lines.append("RVC Dublin Hymn Book — Validation Report")
    report_lines.append("=" * 60)
    report_lines.append(f"Total hymns: {len(hymns)}\n")

    for hymn in hymns:
        num    = hymn["number"]
        title  = hymn["title"]
        en     = hymn["lyrics"].get("en", "")
        en_lines = count_lines(en)
        hymn_issues = []

        for lang_key, lang_name in LANGUAGES:
            lang_text  = hymn["lyrics"].get(lang_key, "")
            lang_lines = count_lines(lang_text)

            if not lang_text.strip():
                hymn_issues.append(f"  ❌ {lang_name}: EMPTY — not translated")
            elif lang_lines != en_lines:
                hymn_issues.append(
                    f"  ⚠️  {lang_name}: {lang_lines} lines "
                    f"(English has {en_lines}) — {abs(lang_lines - en_lines)} line difference"
                )

        trans_en = hymn["translation"].get("en", "")
        if not trans_en.strip():
            hymn_issues.append("  ❌ Translation (English meaning): EMPTY")
            missing_translation.append(num)

        if hymn_issues:
            issues.append(num)
            report_lines.append(f"Hymn {num}: {title}")
            for issue in hymn_issues:
                report_lines.append(issue)
            report_lines.append("")
        else:
            perfect.append(num)

    # Summary
    report_lines.append("=" * 60)
    report_lines.append("SUMMARY")
    report_lines.append("=" * 60)
    report_lines.append(f"✅ Perfect (no issues):     {len(perfect)}/{len(hymns)}")
    report_lines.append(f"⚠️  Has issues:             {len(issues)}/{len(hymns)}")
    report_lines.append(f"❌ Missing translation:     {len(missing_translation)}/{len(hymns)}")

    if issues:
        report_lines.append(f"\nHymns needing review: {sorted(issues)}")

    if len(perfect) == len(hymns):
        report_lines.append("\n🎉 ALL HYMNS PASSED VALIDATION!")
        report_lines.append("    Ready to copy to rvc-hymns/data/hymns.json")

    return "\n".join(report_lines), issues


def print_sample(hymns, hymn_number):
    """Print a sample hymn to verify quality."""
    for h in hymns:
        if h["number"] == hymn_number:
            print(f"\nSAMPLE — Hymn {h['number']}: {h['title']}")
            print("─" * 50)
            print("ENGLISH (first 5 lines):")
            en_lines = h["lyrics"]["en"].splitlines()
            for line in en_lines[:5]:
                print(f"  {line}")
            print("\nHINDI (first 5 lines):")
            hi_lines = h["lyrics"].get("hi", "").splitlines()
            for line in hi_lines[:5]:
                print(f"  {line}")
            print("\nBENGALI (first 5 lines):")
            bn_lines = h["lyrics"].get("bn", "").splitlines()
            for line in bn_lines[:5]:
                print(f"  {line}")
            print("\nKANNADA (first 5 lines):")
            ka_lines = h["lyrics"].get("ka", "").splitlines()
            for line in ka_lines[:5]:
                print(f"  {line}")
            print("\nTRANSLATION:")
            print(f"  {h['translation'].get('en', 'EMPTY')[:200]}...")
            return
    print(f"Hymn {hymn_number} not found.")


def main():
    if not os.path.exists(INPUT_JSON):
        print(f"❌ File not found: {INPUT_JSON}")
        print("   Run step2_translate.py first.")
        return

    with open(INPUT_JSON, "r", encoding="utf-8") as f:
        hymns = json.load(f)

    print(f"Loaded {len(hymns)} hymns from {INPUT_JSON}")

    report, issues = validate_all(hymns)

    # Print to terminal
    print("\n" + report)

    # Save to file
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write(report)
    print(f"\nReport saved to: {REPORT_FILE}")

    # Print a sample of hymn 1 for visual check
    print_sample(hymns, 1)


if __name__ == "__main__":
    main()
