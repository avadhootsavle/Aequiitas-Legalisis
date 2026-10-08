# AEQUIITAS LEGALISIS — Official Web Application

Official full-service legal, taxation, and finance advisory web platform for **AEQUIITAS LEGALISIS** (Established 2016, based in Andheri West, Mumbai). Built as a modern, responsive, SEO-ready Single Page Application (SPA) with smooth page transitions, scroll-driven animations, interactive legal insights, and direct lead/career capture.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Languages, Frameworks & Tech Stack](#2-languages-frameworks--tech-stack)
3. [Project Architecture & Directory Structure](#3-project-architecture--directory-structure)
4. [File-by-File Breakdown (A to Z)](#4-file-by-file-breakdown-a-to-z)
5. [Routing & Navigation Specification](#5-routing--navigation-specification)
6. [Data Models & Content Specification](#6-data-models--content-specification)
7. [Design System, Typography & Styling](#7-design-system-typography--styling)
8. [Third-Party Integrations](#8-third-party-integrations)
9. [Installation, Running & Deployment](#9-installation-running--deployment)

---

## 1. Project Overview

**AEQUIITAS LEGALISIS** is a full-service legal and advisory firm specializing in:
- **Legal & Advisory Solutions** (Civil & Criminal Litigation, IPR, Family Law, Property & Conveyancing, Wills & Estate Planning)
- **Taxation & Compliance Services** (Direct/Indirect Tax, International Tax, GST, ROC, RERA, Forensic Audit, FEMA & PMLA Compliance)
- **Lending & Finance Advisory** (Start-up Advisory, Debt Recovery, DRT / NCLT, Asset Reconstruction, Insolvency)

The web application showcases the firm's practice areas, step-by-step client intake-to-resolution process, searchable legal insights & news articles (rendered from Markdown), FAQs, consultation callback form, and career application portal.

---

## 2. Languages, Frameworks & Tech Stack

### Core Languages
| Language | Usage in Project |
| :--- | :--- |
| **JavaScript (ES6+ / JSX)** | Primary programming language used across all React components, hooks, routing, state management, and data modules. |
| **CSS3 (Custom Properties / Flexbox / Grid)** | Used in `src/index.css` and `src/App.css` for responsive layouts, glassmorphism navigation, dark/light theme variables, and micro-interactions. |
| **HTML5** | Used in `public/index.html` for the root DOM mount point, viewport configuration, favicons, and base SEO metadata. |
| **Markdown** | Used inside `src/data/insightsData.js` to author rich-text legal articles rendered dynamically via `react-markdown`. |

### Frameworks & Libraries (`package.json`)
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` & `react-dom` | `^19.2.3` | Component-based UI library and DOM rendering engine. |
| `react-router-dom` | `^7.13.2` | Client-side routing (`BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`, `useLocation`). |
| `framer-motion` | `^12.38.0` | Cinematic preloader, page transitions (`AnimatePresence`), scroll parallax (`useScroll`, `useTransform`), and viewport entrance animations. |
| `lucide-react` | `^1.7.0` | Clean vector iconography (`Scale`, `Landmark`, `TrendingUp`, `Briefcase`, `Phone`, `Mail`, `MapPin`, etc.). |
| `react-helmet-async` | `^3.0.0` | Dynamic `<head>` management for per-page SEO titles, meta descriptions, keywords, and Open Graph tags. |
| `react-hot-toast` | `^2.6.0` | Non-intrusive toast notifications for form submission feedback (loading, success, error states). |
| `react-markdown` | `^10.1.0` | Renders Markdown-formatted legal articles into semantic HTML on the Insight Post detail page. |
| `react-scripts` | `5.0.1` | Webpack bundler, Babel transpiler, ESLint integration, and development server (Create React App). |

---

## 3. Project Architecture & Directory Structure

```text
law 2/
├── public/                     # Static public assets served at root URL
│   ├── favicon.ico             # Legacy browser favicon
│   ├── index.html              # Single-page HTML shell & base meta tags
│   ├── logo.png                # Firm logo used for favicon & Apple touch icon
│   ├── logo192.png             # PWA icon (192x192)
│   ├── logo512.png             # PWA icon (512x512)
│   ├── manifest.json           # Web App Manifest configuration
│   └── robots.txt              # Search engine crawler rules
├── src/                        # Application source code
│   ├── components/             # Reusable global UI components
│   │   ├── Layout.js           # Persistent Navbar, Mobile Drawer, Footer & Floating WhatsApp CTA
│   │   └── Preloader.js        # Cinematic initial entrance screen with random legal quote
│   ├── context/                # React Context providers
│   │   └── ThemeContext.js     # Light/Dark mode state & localStorage persistence
│   ├── data/                   # Static structured data stores
│   │   ├── insightsData.js     # Articles array (slug, title, date, category, excerpt, Markdown content)
│   │   └── servicesData.js     # Practice area dictionary keyed by route ID
│   ├── pages/                  # Route-level page components
│   │   ├── Home.js             # Landing page (Hero, Info Bar, Practice Areas, Process, FAQ, Contact, Careers)
│   │   ├── PracticeArea.js     # Dynamic practice area detail view (/practice/:id)
│   │   ├── InsightsList.js     # Searchable & filterable legal blog index (/insights)
│   │   └── InsightPost.js      # Individual article reader with related posts (/insights/:slug)
│   ├── App.css                 # Master stylesheet (design tokens, layout, components, media queries)
│   ├── App.js                  # Root component (Router, Preloader, ScrollToTop, AnimatedRoutes, Toaster)
│   ├── App.test.js             # Unit test runner setup
│   ├── index.css               # Global CSS reset & Google Fonts imports
│   ├── index.js                # React 19 root mount & HelmetProvider wrapper
│   ├── logo-a.png              # Primary navbar/footer/preloader brand mark
│   ├── logo-aa.png             # Alternate brand logo asset
│   ├── logo.png                # Standard brand logo asset
│   ├── reportWebVitals.js      # Core Web Vitals performance measurement utility
│   └── setupTests.js           # Jest DOM testing environment setup
├── package.json                # Dependencies, scripts, ESLint & Browserslist config
├── package-lock.json           # Locked dependency tree
└── README.md                   # Complete A-to-Z project documentation
```

---

## 4. File-by-File Breakdown (A to Z)

### Root & Public Files
* **`package.json`**: Defines project metadata (`"name": "law"`), npm scripts (`start`, `build`, `test`, `eject`), and all production/testing dependencies.
* **`public/index.html`**: HTML entry point containing `<div id="root"></div>`, theme color `#121820`, favicon links (`%PUBLIC_URL%/logo.png`), and default description for **AEQUIITAS LEGALISIS**.
* **`public/manifest.json` & `public/robots.txt`**: Standard PWA manifest and search crawler directives allowing full indexing.

### Entry & Global Configuration (`src/`)
* **`src/index.js`**:
  - Mounts the React 19 application into `#root` using `ReactDOM.createRoot`.
  - Wraps `<App />` in `<React.StrictMode>` and `<HelmetProvider>` (from `react-helmet-async`) so child pages can dynamically update document `<head>` tags.
* **`src/index.css`**:
  - Imports Google Fonts: **Cinzel**, **Lora**, **Playfair Display** (serif headings), and **Inter** (sans-serif body).
  - Applies global box-sizing resets, removes default list styles, and sets base background (`#FAFAFA`) and antialiasing rules.
* **`src/App.js`**:
  - **`ScrollToTop`**: Custom helper component that listens to `useLocation()`. If a URL hash is present (e.g., `/#contact`, `/#process`, `/#careers`), it waits `400ms` for Framer Motion page transitions to finish and smoothly scrolls to the target section ID; otherwise it scrolls to `(0, 0)`.
  - **`AnimatedRoutes`**: Wraps `<Routes>` inside Framer Motion's `<AnimatePresence mode="wait">` keyed by `location.pathname` for smooth fade transitions between pages.
  - **`App`**: Manages the `showPreloader` state, mounts `<Toaster position="bottom-right" />`, and wraps routes inside `<Layout>`.
* **`src/App.css`**:
  - Over 1,000 lines of custom CSS organized into logical sections: CSS Custom Properties (`:root` and `[data-theme="dark"]`), Layout & Glassmorphic Navbar, Hero Section & Visual Cards, Info Bar, Practice Area Cards, Animated Process Timeline, Accordion FAQs, Contact & Google Maps Grid, Careers Form, Preloader, and Responsive Breakpoints.

### Components (`src/components/`)
* **`src/components/Layout.js`**:
  - **Desktop & Mobile Navigation**: Fixed top navbar with brand logo (`logo-a.png`), active route highlighting, and an animated mobile dropdown menu (`AnimatePresence`) toggled via `lucide-react` `Menu`/`X` icons.
  - **Footer**: Displays the firm's brand badge, WhatsApp social link, quick navigation links, Mumbai office address (`201 & 301, Kshitij, Veera Desai Road, Andheri West, Mumbai`), clickable phone/email links, copyright notice, and a smooth scroll-to-top button.
  - **Floating WhatsApp Button**: Fixed bottom-right quick-action button linking directly to `https://wa.me/918976587979` with a pre-filled legal inquiry message.
* **`src/components/Preloader.js`**:
  - Displays a 2.4-second cinematic intro overlay on initial page load.
  - Animates the firm logo (`logo-a.png`), unblurs the title `"AEQUIITAS LEGALISIS"`, picks a random quote from `legalQuotes`, and fills a gold progress bar before sliding up (`y: '-100%'`).

### Context (`src/context/`)
* **`src/context/ThemeContext.js`**:
  - Provides `ThemeProvider` and `useTheme()` hook (`{ isDarkMode, toggleTheme }`).
  - Syncs theme state with `window.localStorage.getItem('theme')` and toggles `data-theme="dark"` on `document.body`.

### Data Layer (`src/data/`)
* **`src/data/servicesData.js`**:
  - Exports `servicesData`, an object keyed by practice area slug:
    1. `'legal-advisory'` — *Legal & Advisory Solutions* (Phone: `8976587979`, Icon: `Scale`, 10 specialized areas of expertise).
    2. `'taxation-compliance'` — *Taxation & Compliance Services* (Phone: `8879647979`, Icon: `Landmark`, 12 specialized areas including GST, International Tax, FEMA, PMLA, Forensic Audit).
    3. `'finance-advisory'` — *Lending & Finance Advisory* (Phone: `8097247979`, Icon: `TrendingUp`, 5 specialized areas including DRT/NCLT, Corporate Rescue, Debt Structuring).
  - Each entry contains `title`, `subtitle`, `contact`, `content`, `icon`, and an array of `features` (`{ title, description }`).
* **`src/data/insightsData.js`**:
  - Exports `insightsData`, an array of legal articles and guides:
    1. `navigating-pmla-amendments` (*Corporate*)
    2. `divorce-proceedings-sra-properties` (*Family Law*)
    3. `digital-evidence-criminal-defense` (*Criminal Defense*)
    4. `know-your-rights-police-encounter` (*Criminal Defense*)
    5. `tenant-rights-mumbai-mrc-act` (*Civil Law*)
    6. `essential-rights-women-matrimonial` (*Family Law*)
  - Each article object has `slug`, `title`, `date`, `author`, `category`, `excerpt`, and full Markdown `content`.

### Pages (`src/pages/`)
* **`src/pages/Home.js`**:
  - **SEO Head (`<Helmet>`)**: Sets Mumbai/Andheri West targeted keywords (FEMA, PMLA, SRA, Criminal Defense, Civil, Conveyancing, Trademark) and Open Graph metadata.
  - **Hero Section (`#firm`)**: Parallax scroll effect (`useScroll` + `useTransform`), CTA buttons, trust badges (`2016 Established`, `24/7 Response`, `Expert Criminal Defense`), and a highlight card for the 3 core pillars.
  - **Info Bar**: Highlights Focus, Approach, and Availability.
  - **Practice Areas Section (`#practice`)**: Renders the 3 service vertical cards with feature checklists, direct click-to-call buttons (`tel:+91...`), and links to `/practice/:id`.
  - **Process Section (`#process`)**: 5-step vertical timeline (*1. Intake → 2. Strategy → 3. Filings → 4. Updates → 5. Resolution*) with a scroll-linked gold progress line (`scaleY: processScrollY`).
  - **FAQ Section (`#faq`)**: Interactive accordion answering common client questions (free consultations, law enforcement encounters, fee structures, representation outside Mumbai).
  - **Contact Section (`#contact`)**: Callback request form connected to Web3Forms API + office contact details + embedded interactive Google Map of the Andheri West office.
  - **Careers Section (`#careers`)**: Job application form (Associate, Intern, Paralegal, Administrative, Other) with resume/portfolio URL submission via Web3Forms API.
* **`src/pages/PracticeArea.js`**:
  - Reads `:id` parameter from URL (`/practice/:id`) and looks up `servicesData[id]`.
  - Renders a fallback "Practice Area Not Found" screen if the slug is invalid.
  - Displays dynamic SEO `<Helmet>`, icon mapping, clickable direct department phone number, overview copy, and animated expertise cards.
* **`src/pages/InsightsList.js`**:
  - Renders the `/insights` knowledge base page.
  - Features real-time search filtering (by title or excerpt) and dynamic category pill filtering (`All`, `Corporate`, `Family Law`, `Criminal Defense`, `Civil Law`) powered by Framer Motion `layout` animations.
* **`src/pages/InsightPost.js`**:
  - Reads `:slug` parameter from URL (`/insights/:slug`) and finds the matching article in `insightsData`.
  - Renders article metadata (category, publication date, author), parses Markdown body via `<ReactMarkdown>`, provides a consultation CTA banner, and automatically computes up to 2 **Related Insights** from the same category.

---

## 5. Routing & Navigation Specification

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | [`Home`](src/pages/Home.js) | Main landing page with Hero, Practice Areas, Process, FAQs, Contact, and Careers sections. |
| `/#process` | [`Home`](src/pages/Home.js) | Smooth-scrolls to the 5-step Process timeline section on the Home page. |
| `/#careers` | [`Home`](src/pages/Home.js) | Smooth-scrolls to the Careers application section on the Home page. |
| `/#contact` | [`Home`](src/pages/Home.js) | Smooth-scrolls to the Consultation & Office Map section on the Home page. |
| `/practice/:id` | [`PracticeArea`](src/pages/PracticeArea.js) | Dedicated page for a practice vertical (`legal-advisory`, `taxation-compliance`, or `finance-advisory`). |
| `/insights` | [`InsightsList`](src/pages/InsightsList.js) | Searchable and category-filterable directory of legal insights and news. |
| `/insights/:slug` | [`InsightPost`](src/pages/InsightPost.js) | Full Markdown article view with related articles recommendation. |

---

## 6. Data Models & Content Specification

### Adding or Updating a Practice Area (`src/data/servicesData.js`)
Each key in `servicesData` corresponds to the URL parameter `/practice/<key>`:
```javascript
'your-service-slug': {
  title: 'Service Title',
  subtitle: 'Tagline | Keywords',
  contact: '8976587979', // 10-digit phone number (prefixed with +91 in UI)
  content: 'Detailed paragraph overview...',
  icon: 'Scale', // Supported keys: 'Shield' | 'Landmark' | 'Scale' | 'Users' | 'TrendingUp'
  features: [
    {
      title: 'Sub-practice Title',
      description: 'Detailed explanation of the sub-practice area.'
    }
  ]
}
```

### Adding a New Legal Insight Article (`src/data/insightsData.js`)
Append a new object to the `insightsData` array:
```javascript
{
  slug: 'url-friendly-article-slug',
  title: 'Article Headline',
  date: 'Month DD, YYYY',
  author: 'AEQUIITAS Legal Team',
  category: 'Corporate', // Automatically added to category filter pills in InsightsList
  excerpt: 'Short 1-2 sentence summary shown on the card.',
  content: `### Markdown Heading\nFull article content supporting **bold**, *italics*, and lists.`
}
```

---

## 7. Design System, Typography & Styling

### Color Palette (`src/App.css`)
- **Primary Background (`--bg-primary`)**: `#FAFAFA` (Light) / `#121820` (Dark)
- **Secondary Background (`--bg-secondary`)**: `#FFFFFF` (Light) / `#1a222c` (Dark)
- **Primary Text (`--text-primary`)**: `#121820` (Deep Navy/Charcoal)
- **Secondary Text (`--text-secondary`)**: `#57606a` (Slate Gray)
- **Brand Gold Accent (`--accent-gold`)**: `#C09A53` (Light Gold: `#DFB262`)

### Typography (`src/index.css`)
- **Display & Headings**: `'Playfair Display', serif` and `'Lora', serif`
- **Body & UI Controls**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

---

## 8. Third-Party Integrations

1. **Web3Forms (`https://api.web3forms.com/submit`)**:
   - Used in `src/pages/Home.js` (`handleFormSubmit`) for both the **Request a Callback** form and the **Careers Application** form without requiring a custom backend server.
2. **Google Maps Embed**:
   - Interactive iframe in `src/pages/Home.js` pinpointing the firm's office at *Kshitij, Veera Desai Road, Near Azad Nagar Metro Station, Andheri West, Mumbai 400058*.
3. **WhatsApp Click-to-Chat (`wa.me/918976587979`)**:
   - Integrated in the footer and the persistent floating action button with pre-populated consultation text.

---

## 9. Installation, Running & Deployment

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start the development server on http://localhost:3000
npm start
```

### Production Build
```bash
# Bundles and optimizes the app into the /build directory
npm run build
```
