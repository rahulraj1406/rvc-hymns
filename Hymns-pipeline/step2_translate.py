"""
========================================================
STEP 2 — TRANSLATE HYMNS USING CLAUDE API
========================================================
Reads hymns_raw.json (output of step1_extract.py)
and translates each hymn into Hindi, Bengali, Kannada
using Claude API with strict line-by-line accuracy.

HOW TO USE:
  1. Set your ANTHROPIC_API_KEY below
  2. Set START_FROM to resume if interrupted
  3. python3 step2_translate.py

INPUT:  hymns_raw.json
OUTPUT: hymns_translated.json  (complete multilingual JSON)

SAFETY:
  - Saves progress after every single hymn
  - Can be restarted from any point using START_FROM
  - Never overwrites already-translated hymns
========================================================
"""

import json
import time
import re
import os
import requests

# ── CONFIG — SET THESE ────────────────────────────────
ANTHROPIC_API_KEY = "[ENCRYPTION_KEY]"   # ← paste your key
INPUT_JSON        = "hymns_raw.json"
OUTPUT_JSON       = "hymns_translated.json"
START_FROM        = 100    # ← set higher to resume (e.g. 11 to start from hymn 11)
DELAY_SECONDS     = 1     # ← pause between API calls to avoid rate limits
# ──────────────────────────────────────────────────────

HEADERS = {
    "x-api-key": ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
}

SYSTEM_PROMPT = """You are a Sanskrit and Indian language expert specialising in devotional hymns.

Your job is to take a hymn written in English transliteration and produce:
1. Hindi version in Devanagari script
2. Bengali version in Bengali script  
3. Kannada version in Kannada script
4. A clear English meaning/translation explaining the spiritual significance

CRITICAL RULES — FOLLOW EXACTLY:

RULE 1 — LINE PRESERVATION:
The output in every language MUST have the EXACT same number of lines as the English input.
If the English has 20 lines, Hindi must have 20 lines, Bengali must have 20 lines, Kannada must have 20 lines.
Count the lines before and after. Do not merge or split lines.

RULE 2 — BLANK LINE PRESERVATION:
If the English has a blank line between verses, ALL languages must have that blank line in the same position.
Blank lines indicate verse breaks. Never remove them.

RULE 3 — ZERO OMISSION:
Do NOT skip any word, line, or verse under any circumstances.
Even if a word is very long or complex, convert it fully.

RULE 4 — PHONETIC ACCURACY:
Use correct Sanskrit phonetics when converting to Indian scripts.
Key mappings:
  a→अ/অ/ಅ  aa→आ/আ/ಆ  i→इ/ই/ಇ  ee→ई/ঈ/ಈ
  u→उ/উ/ಉ  oo→ऊ/ঊ/ಊ  e→ए/এ/ಏ  o→ओ/ও/ಓ
  sh→श/শ/ಶ  kh→ख/খ/ಖ  gh→घ/ঘ/ಘ  th→थ/থ/ಥ
  ph→फ/ফ/ಫ  dh→ध/ধ/ಧ  bh→भ/ভ/ಭ  jh→झ/ঝ/ಝ
  m→म/ম/ಮ  n→न/ন/ನ  r→र/র/ರ  l→ल/ল/ಲ

RULE 5 — NO ADDITIONS:
Do NOT add verse numbers, headers, labels, or commentary that are not in the original.
Preserve only what is in the English.

RULE 6 — OUTPUT FORMAT:
Return ONLY a JSON object with this exact structure. No text before or after.

{
  "hi": "Full hymn in Hindi Devanagari — same line structure as English",
  "bn": "Full hymn in Bengali script — same line structure as English",
  "ka": "Full hymn in Kannada script — same line structure as English",
  "translation_en": "Clear English meaning explaining the spiritual significance, deity praised, themes and purpose of chanting. 3-6 sentences. Do NOT translate word for word."
}

SELF-CHECK BEFORE RESPONDING:
1. Count lines in English input
2. Count lines in your hi output — must match
3. Count lines in your bn output — must match  
4. Count lines in your ka output — must match
5. Verify JSON is valid
6. Only then return the output"""


def count_lines(text):
    return len(text.splitlines())


def call_claude(hymn_title, hymn_number, english_lyrics):
    """Call Claude API to translate one hymn."""

    user_message = f"""Hymn {hymn_number}: {hymn_title}

English transliteration ({count_lines(english_lyrics)} lines):
{english_lyrics}

Convert this complete hymn into Hindi, Bengali, and Kannada scripts.
Produce an English meaning.
Return ONLY the JSON object."""

    payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 8000,
        "system": SYSTEM_PROMPT,
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers=HEADERS,
        json=payload,
        timeout=120
    )

    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")

    data = response.json()
    raw_text = data["content"][0]["text"].strip()

    # Strip markdown code fences if present
    raw_text = re.sub(r"^```json\s*", "", raw_text)
    raw_text = re.sub(r"^```\s*", "", raw_text)
    raw_text = re.sub(r"\s*```$", "", raw_text)
    raw_text = raw_text.strip()

    # Parse JSON
    result = json.loads(raw_text)
    return result


def validate_translation(english_lyrics, result, hymn_title):
    """Check that line counts match across all languages."""
    en_lines = count_lines(english_lyrics)
    issues = []

    for lang_key, lang_name in [("hi", "Hindi"), ("bn", "Bengali"), ("ka", "Kannada")]:
        if lang_key not in result:
            issues.append(f"  ❌ {lang_name}: MISSING entirely")
            continue
        lang_lines = count_lines(result[lang_key])
        if lang_lines != en_lines:
            issues.append(f"  ⚠️  {lang_name}: {lang_lines} lines (expected {en_lines})")
        else:
            print(f"  ✅ {lang_name}: {lang_lines} lines ✓")

    if issues:
        for issue in issues:
            print(issue)
        return False
    return True


def load_existing(output_path):
    """Load already-translated hymns to allow resuming."""
    if os.path.exists(output_path):
        with open(output_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_progress(hymns, output_path):
    """Save current progress to disk."""
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(hymns, f, ensure_ascii=False, indent=2)


def main():
    print("=" * 60)
    print("RVC Dublin Hymn Book — Translation Pipeline")
    print("=" * 60)

    if ANTHROPIC_API_KEY == "YOUR_API_KEY_HERE":
        print("\n❌ ERROR: Please set your ANTHROPIC_API_KEY in the script.")
        print("   Open step2_translate.py and replace YOUR_API_KEY_HERE")
        return

    # Load input
    with open(INPUT_JSON, "r", encoding="utf-8") as f:
        hymns = json.load(f)

    print(f"Loaded {len(hymns)} hymns from {INPUT_JSON}")
    print(f"Starting from hymn number: {START_FROM}")
    print(f"Output will be saved to: {OUTPUT_JSON}")
    print("─" * 60)

    # Load existing progress
    translated = load_existing(OUTPUT_JSON)
    translated_numbers = {h["number"] for h in translated}

    for hymn in hymns:
        num = hymn["number"]

        # Skip if before START_FROM
        if num < START_FROM:
            if num not in translated_numbers:
                translated.append(hymn)
                save_progress(translated, OUTPUT_JSON)
            continue

        # Skip if already translated
        if num in translated_numbers:
            print(f"Hymn {num}: {hymn['title']} — already done, skipping")
            continue

        print(f"\nHymn {num}: {hymn['title']}")
        print(f"  English lines: {count_lines(hymn['lyrics']['en'])}")

        english_lyrics = hymn["lyrics"]["en"]

        # Skip hymns with no English lyrics
        if not english_lyrics.strip():
            print("  ⚠️  No English lyrics found — skipping")
            hymn_copy = hymn.copy()
            translated.append(hymn_copy)
            translated_numbers.add(num)
            save_progress(translated, OUTPUT_JSON)
            continue

        # Attempt translation with retry
        success = False
        for attempt in range(1, 4):
            try:
                print(f"  Calling Claude API (attempt {attempt}/3)...")
                result = call_claude(hymn["title"], num, english_lyrics)

                # Validate
                valid = validate_translation(english_lyrics, result, hymn["title"])

                # Build updated hymn object
                hymn_copy = hymn.copy()
                hymn_copy["lyrics"] = {
                    "en": english_lyrics,
                    "hi": result.get("hi", ""),
                    "bn": result.get("bn", ""),
                    "ka": result.get("ka", "")
                }
                hymn_copy["translation"] = {
                    "en": result.get("translation_en", "")
                }

                translated.append(hymn_copy)
                translated_numbers.add(num)
                save_progress(translated, OUTPUT_JSON)

                if valid:
                    print(f"  ✅ Hymn {num} complete and saved")
                else:
                    print(f"  ⚠️  Hymn {num} saved with line count warnings — review manually")

                success = True
                break

            except json.JSONDecodeError as e:
                print(f"  ❌ JSON parse error on attempt {attempt}: {e}")
                if attempt < 3:
                    print(f"  Retrying in {DELAY_SECONDS * 2} seconds...")
                    time.sleep(DELAY_SECONDS * 2)

            except Exception as e:
                print(f"  ❌ Error on attempt {attempt}: {e}")
                if attempt < 3:
                    print(f"  Retrying in {DELAY_SECONDS * 2} seconds...")
                    time.sleep(DELAY_SECONDS * 2)

        if not success:
            print(f"  ❌ Hymn {num} FAILED after 3 attempts — saving English only")
            hymn_copy = hymn.copy()
            translated.append(hymn_copy)
            translated_numbers.add(num)
            save_progress(translated, OUTPUT_JSON)

        # Pause between hymns
        time.sleep(DELAY_SECONDS)

    # Final sort by number
    translated.sort(key=lambda x: x["number"])
    save_progress(translated, OUTPUT_JSON)

    print("\n" + "=" * 60)
    print(f"✅ COMPLETE — {len(translated)} hymns saved to {OUTPUT_JSON}")
    print("=" * 60)
    print("\nNext step:")
    print("  Copy hymns_translated.json into your rvc-hymns/data/ folder")
    print("  Rename it to hymns.json")
    print("  Run: git add . && git commit -m 'Add all hymns with translations' && git push")


if __name__ == "__main__":
    main()
