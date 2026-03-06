This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



IMPORTANT: step by step:
- What you just did
- What files were created/modified
- What to run in terminal if anything
- Ask me to confirm before moving to next step
  
======================
PROJECT OVERVIEW
======================

App Name: rvc-hymns
Purpose: A public hymn book website with 30 devotional hymns
Tech Stack: Next.js 14 (App Router), Tailwind CSS, Static JSON data
No database, no auth, fully public, deploy on Vercel

Branding:
- Organisation: Ramakrishna Vedanta Centre Dublin
- Primary color: Saffron #FF6B00
- Background: Cream #FFF8F0
- Accent: Deep orange #CC4400
- Font: Clean, readable, good for elderly users
- Style: Devotional, warm, minimal, mobile-first

======================
STEP 1 - PROJECT SETUP
======================

Create a new Next.js 14 project called "rvc-hymns" with:
- App Router (not pages router)
- Tailwind CSS
- ESLint
- No TypeScript (use plain JavaScript)
- No src/ directory

Command to run:
npx create-next-app@latest rvc-hymns --js --tailwind --eslint --app --no-src-dir

After creation, navigate into the folder:
cd rvc-hymns

STOP HERE. Tell me it's done and wait for my confirmation.

======================
STEP 2 - FOLDER STRUCTURE
======================

After I confirm Step 1, create this exact folder structure 
(do not add any files yet, just create the folders):

rvc-hymns/
├── data/                        ← hymn JSON will go here
├── app/
│   ├── layout.jsx               ← already exists, we will modify
│   ├── page.jsx                 ← homepage
│   ├── hymns/
│   │   ├── page.jsx             ← browse all hymns
│   │   └── [slug]/
│   │       └── page.jsx         ← individual hymn page
│   └── not-found.jsx            ← 404 page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HymnCard.jsx
│   ├── SearchBar.jsx
│   └── LanguageToggle.jsx
└── public/
    └── (leave as is)

STOP HERE. Show me the folder structure and wait for my confirmation.

======================
STEP 3 - HYMN DATA (JSON)
======================

After I confirm Step 2, create the file: data/hymns.json

This is a placeholder - I will replace the content myself later.
For now create it with just 3 sample hymns using this exact structure:

[
  {
    "id": 1,
    "slug": "khandana-bhava-bandhana",
    "number": 1,
    "title": "Khandana-Bhava-Bandhana",
    "firstLine": "Khandana-bhava-bandhana, jaga-vandana, vandi tomay",
    "category": "general",
    "lyrics": {
      "en": "PASTE FULL ENGLISH LYRICS HERE",
      "sa": "PASTE FULL SANSKRIT/TRANSLITERATION HERE"
    },
    "translation": {
      "en": "PASTE ENGLISH TRANSLATION HERE"
    }
  },
  {
    "id": 2,
    "slug": "om-hrim-ritam-tvam-achalo",
    "number": 2,
    "title": "Om Hrim Ritam Tvam-Achalo",
    "firstLine": "Om hrim ritam tvam-achalo, gunajit, gunedyah",
    "category": "general",
    "lyrics": {
      "en": "PASTE FULL ENGLISH LYRICS HERE",
      "sa": "PASTE FULL SANSKRIT/TRANSLITERATION HERE"
    },
    "translation": {
      "en": "PASTE ENGLISH TRANSLATION HERE"
    }
  },
  {
    "id": 3,
    "slug": "om-sarvamangala-mangalye",
    "number": 3,
    "title": "Om Sarvamangala Mangalye",
    "firstLine": "Om sarvamangala mangalye shive sarvarthasadhike",
    "category": "general",
    "lyrics": {
      "en": "PASTE FULL ENGLISH LYRICS HERE",
      "sa": "PASTE FULL SANSKRIT/TRANSLITERATION HERE"
    },
    "translation": {
      "en": "PASTE ENGLISH TRANSLATION HERE"
    }
  }
]

NOTE TO DEVELOPER: The user will replace the full JSON content 
with all 30 hymns after generating it via ChatGPT or another tool.
The structure above is the exact schema to follow for all 30 hymns.

STOP HERE. Show me the JSON structure and wait for my confirmation.

======================
STEP 4 - GLOBAL LAYOUT & COMPONENTS
======================

After I confirm Step 3, build these components one by one.
Build them in this order and STOP after each one:

--- 4a. app/layout.jsx ---
- Import global styles
- Add HTML metadata: 
  title: "RVC Dublin - Hymn Book"
  description: "Devotional hymns of Ramakrishna Vedanta Centre Dublin"
- Wrap children with Navbar at top and Footer at bottom
- Background color: #FFF8F0

--- 4b. components/Navbar.jsx ---
- Logo text: "🪔 RVC Dublin" in saffron color
- Subtitle: "Hymn Book" smaller text below
- Right side: link to "Browse Hymns" (/hymns)
- Right side: link to "Home" (/)
- Mobile responsive (hamburger menu optional, simple is fine)
- Background: white with saffron bottom border

--- 4c. components/Footer.jsx ---
- "Ramakrishna Vedanta Centre Dublin"
- "Éire Vedanta Society | Nivedita House, 17 Dromheath Gardens, Dublin D15 E762"
- "rvcdublin@gmail.com | +353 83 014 1531"
- Link back to main website: https://www.rkmireland.org
- Small copyright line
- Background: saffron #FF6B00, text white

--- 4d. components/HymnCard.jsx ---
Props: { hymn } where hymn is one object from hymns.json
- Shows: Hymn number (small), Title (bold), First line (italic, grey)
- Entire card is clickable → links to /hymns/[slug]
- Card style: white background, rounded corners, subtle shadow
- Hover: slight lift effect with saffron left border

--- 4e. components/SearchBar.jsx ---
Props: { value, onChange }
- Simple text input
- Placeholder: "Search hymns by name or first line..."
- Styled with saffron focus border
- Search icon on left side

--- 4f. components/LanguageToggle.jsx ---
Props: { currentLang, onToggle }
Available languages for now: ["EN"]
- Button group showing language options
- Active language highlighted in saffron
- Inactive ones greyed out
- Add a note "(More languages coming soon)"
- This component is ready to accept more languages later 
  just by adding to the languages array

STOP after each sub-component and wait for confirmation before next.

======================
STEP 5 - PAGES
======================

After I confirm Step 4, build each page. STOP after each one.

--- 5a. app/page.jsx (Homepage) ---
- Hero section:
  Large heading: "Devotional Hymn Book"
  Sub heading: "Ramakrishna Vedanta Centre Dublin"
  A small Om symbol (use Unicode: ॐ) styled in saffron
  Short description: "A collection of sacred hymns and devotional songs 
  used in our daily worship and celebrations."
- SearchBar component (on search, redirect to /hymns?search=query)
- A "Browse All Hymns →" button linking to /hymns
- Below hero: a simple grid showing first 6 hymns as HymnCards (preview)
- A section: "About RVC Dublin" with one paragraph and link to main site

--- 5b. app/hymns/page.jsx (Browse All Hymns) ---
- Heading: "All Hymns" with hymn count shown e.g. "(30 hymns)"
- SearchBar at top — filters hymns in real time (client component)
- Grid of ALL hymns as HymnCards (3 columns desktop, 2 tablet, 1 mobile)
- If search has no results: show "No hymns found. Try a different search."
- Read hymns from data/hymns.json directly (static, no API needed)
- URL search param support: /hymns?search=rama → pre-fills search

--- 5c. app/hymns/[slug]/page.jsx (Individual Hymn Page) ---
- Back button "← All Hymns" 
- Hymn number and title at top
- LanguageToggle component (default: EN)
- Full lyrics displayed in a clean readable block
  - Use a larger font size (text-lg or text-xl)
  - Line breaks preserved
  - If verse numbers exist, show them clearly
- If translation exists, show it below lyrics in a styled box
- Bottom navigation: "← Previous Hymn" and "Next Hymn →"
- generateStaticParams() function for static generation of all slug pages
- generateMetadata() function for SEO: 
  title: "[Hymn Title] - RVC Dublin Hymn Book"
  description: first line of the hymn

--- 5d. app/not-found.jsx ---
- Simple friendly 404 page
- "Hymn not found 🪔"
- Link back to /hymns

STOP after each page and wait for my confirmation.

======================
STEP 6 - FINAL CHECKS
======================

After I confirm Step 5, do the following checks:

1. Make sure ALL imports are correct in every file
2. Make sure 'use client' directive is on any component using 
   useState, useEffect, or event handlers
3. Make sure layout.jsx has correct metadata export
4. Make sure tailwind.config.js includes the app/ and components/ paths
5. Make sure next.config.js is clean with no errors
6. Run: npm run build
   - If there are errors, fix them and show me what you fixed
   - If build passes, tell me it's ready

STOP HERE and show me the build output.

======================
STEP 7 - VERCEL DEPLOYMENT INSTRUCTIONS
======================

After build passes, give me exact step by step instructions for:

1. Creating a GitHub repository called "rvc-hymns"
2. Pushing the code with these exact commands:
   git init
   git add .
   git commit -m "Initial commit - RVC Dublin Hymn Book"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rvc-hymns.git
   git push -u origin main

3. Deploying on Vercel:
   - Go to vercel.com
   - Login with GitHub
   - Click "Add New Project"
   - Select rvc-hymns repository
   - Framework: Next.js (auto detected)
   - Click Deploy
   - Site will be live at: rvc-hymns.vercel.app

======================
DEVELOPER NOTES FOR FUTURE VERSIONS
======================

Keep these in mind for later - do NOT implement now:

- Translation feature: hymns.json already has translation fields ready.
  To add Tamil/Hindi/Malayalam later, just add the language key 
  to each hymn's lyrics object and add the language code to 
  LanguageToggle's languages array.

- More hymns: just add objects to hymns.json following the same schema.
  No code changes needed. Just redeploy.

- Categories: the "category" field is already in the JSON schema.
  A filter by category feature can be added to /hymns page later.

- PDF download: can add a link to the original PDF in the footer later.

- Audio: a future version could add audio playback per hymn.

======================
BEGIN NOW WITH STEP 1. 
Do not proceed to Step 2 until I confirm Step 1 is complete.
======================
