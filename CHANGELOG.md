# Changelog

All notable changes to **Build 47 (NexusCloud Alpine.js Interactive Knowledge Base)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-27

### Added
- Integrated **FAQ Article Shareable Direct Link Generator** in `faqService.js` and `public/index.html`.
- Added share link generator domain helper (`getShareableLink`), **🔗 Share** action buttons on FAQ card headers, and clipboard copying handler (`copyShareLink`).
- Added URL hash deep link auto-expansion listener (`#faq-faq_2`), automatic smooth scrolling, and pulse glow animation (`.deep-link-highlight`).
- Added unit tests in `faqService.spec.js` (23 total unit tests passing).

## [0.9.0] - 2026-07-27

### Added
- Integrated **FAQ Interactive Filter Preset Manager** in `faqService.js` and `public/index.html`.
- Added preset creator domain function (`createFilterPreset`), quick presets chips bar (`⚡ Security & KMS`, `⚡ API Rates`, `⚡ Air-Gapped K8s`), and `localStorage` persistence (`nexus_presets`).
- Updated `public/index.html` and `public/style.css` with **💾 Save Preset** toolbar button, preset chip application handlers (`applyPreset`), and preset removal tags.
- Added unit tests in `faqService.spec.js` (21 total unit tests passing).

## [0.8.0] - 2026-07-27

### Added
- Integrated **Interactive FAQ Dark / Light Theme Customizer** in `faqService.js` and `public/index.html`.
- Added theme validation domain helper (`validateTheme`), Alpine dynamic theme binding (`:class="{ 'theme-light': currentTheme === 'light' }"`), and `localStorage` preference sync (`nexus_theme`).
- Updated `public/index.html` and `public/style.css` with **🌙 Dark / ☀️ Light Theme Switcher** navbar button and crisp enterprise light mode CSS palette rules.
- Added unit tests in `faqService.spec.js` (19 total unit tests passing).

## [0.7.0] - 2026-07-27

### Added
- Integrated **FAQ Article Feedback Analytics & Rating Heatmap** in `faqService.js` and `public/index.html`.
- Added feedback analytics domain function (`getFeedbackAnalytics`), Express API route `GET /api/analytics/feedback`, and satisfaction rating percentage dial.
- Updated `public/index.html` and `public/style.css` with **📊 Feedback Analytics Heatmap** dropdown menu trigger, analytics modal dialog (`showAnalyticsModal`), rating progress bar, and top 3 rated articles list.
- Added unit tests in `faqService.spec.js` (18 total unit tests passing).

## [0.6.0] - 2026-07-27

### Added
- Integrated **Support Ticket History Audit & Status Tracker** in `faqService.js` and `public/index.html`.
- Added enterprise tickets storage (`ticketsStore`), SLA status calculation, and Express API route `GET /api/tickets`.
- Updated `public/index.html` and `public/style.css` with **🎟️ Support Tickets** navbar chip, slide-out drawer panel (`showTicketDrawer`), live SLA response badges, priority indicators, and slide animations.
- Added unit tests in `faqService.spec.js` (17 total unit tests passing).

## [0.5.0] - 2026-07-27

### Added
- Integrated **AI-Powered Instant Question Auto-Suggest & Semantic Search** in `faqService.js` and `public/index.html`.
- Added search auto-suggest domain function (`getSearchSuggestions`), `GET /api/faqs/suggest` Express API route, and instant auto-completion dropdown panel.
- Updated `public/index.html` and `public/style.css` with Alpine `$watch('searchQuery')` debounced triggers, suggestion selection handlers, and dark glassmorphism dropdown styling.
- Added unit tests in `faqService.spec.js` (16 total unit tests passing).

## [0.4.0] - 2026-07-27

### Added
- Integrated **Interactive Code Snippet Copy Vault & SDK Selector** in `faqService.js` and `public/index.html`.
- Added SDK code snippet payloads (`cURL`, `Python SDK`, `Node.js SDK`), `getCodeSnippet` domain helper, and Markdown code block exporter support.
- Updated `public/index.html` and `public/style.css` with interactive SDK tab selectors, one-click clipboard copying (`📋 Copy Code` -> `✅ Copied!`), and dark terminal syntax block styling.
- Added unit tests in `faqService.spec.js` (15 total unit tests passing).

## [0.3.0] - 2026-07-27

### Added
- Integrated **FAQ PDF / Markdown Developer Cheat Sheet Generator** in `faqService.js` and `server.js`.
- Added Markdown document generator (`exportFaqsAsMarkdown`), Express endpoint (`GET /api/faqs/export-markdown`), and `nexus_faq_cheatsheet.md` download attachment response headers.
- Updated `public/index.html` and `public/style.css` with **📥 Export Markdown Guide** button in main toolbar.
- Added unit tests in `faqService.spec.js` (14 total unit tests passing).

## [0.2.0] - 2026-07-27

### Added
- Integrated **Interactive FAQ Bookmarking & Personal Saved Articles** in `faqService.js` and `server.js`.
- Added batch bookmark retrieval method (`getFaqsByIds`), `POST /api/faqs/bookmarks` Express API endpoint, and `Bookmarked` category filtering logic.
- Updated `public/index.html` and `public/style.css` with **📌 Saved Articles** header chip, **📌 Saved** category tab pill, bookmark action button on FAQ card headers, and `localStorage` persistence.
- Added unit tests in `faqService.spec.js` (13 total unit tests passing).

## [0.1.0] - 2026-07-27

### Added
- Initial project scaffolding for **Build 47 (NexusCloud Enterprise AI Knowledge Base & FAQ Center)**.
- Domain service `faqService.js` managing FAQ articles, category filtering, search matching, helpfulness voting, and support ticket dispatching.
- Express server `server.js` providing REST API routes (`/api/faqs`, `/api/categories`, `/api/faqs/:id/vote`, `/api/tickets`).
- Interactive Alpine.js 3.x UI in `public/index.html` featuring expandable accordions (`x-collapse`), category tabs, custom dropdowns, live search, support ticket modal, and toast alerts.
- Vitest unit test suite `faqService.spec.js` (11 unit tests passing 100%).
