# ⚡ Build 47: NexusCloud Enterprise AI — Alpine.js Interactive Knowledge Base

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://alpinejs-interactive-faq-build47.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/breakingthebot/alpinejs-interactive-faq-build47)
[![Tests](https://img.shields.io/badge/Vitest-21%20Passed-6E9F18?style=for-the-badge&logo=vitest)](file:///C:/Users/marve/Desktop/AI-286-Builds/Build_47/faqService.spec.js)
[![Version](https://img.shields.io/badge/Release-v0.9.0-blue?style=for-the-badge)](file:///C:/Users/marve/Desktop/AI-286-Builds/Build_47/CHANGELOG.md)

---

## 🌟 Overview

**NexusCloud Interactive Knowledge Base & FAQ Center** (Build 47) is a high-performance enterprise documentation portal engineered with **Alpine.js 3.x** and **Express.js**. Built as if for a production client needing minimal JavaScript overhead, it delivers complete interactive functionality—smooth expandable accordions, tabbed category filtering, custom dropdowns, real-time debounced auto-suggest search, SDK code vaults with copy buttons, ticket SLA tracking drawers, feedback analytics heatmaps, dark/light theme switching, and offline markdown cheat sheet exporters.

### 🌐 Production Deployment Links
- **Live Vercel Application**: [https://alpinejs-interactive-faq-build47.vercel.app](https://alpinejs-interactive-faq-build47.vercel.app)
- **GitHub Repository**: [https://github.com/breakingthebot/alpinejs-interactive-faq-build47](https://github.com/breakingthebot/alpinejs-interactive-faq-build47)

---

## 🔥 Feature Highlights Across Iterations

- **v0.1.0 — Core Alpine.js Accordion & Portal Foundation**: Expandable accordions with `x-collapse`, category tabs, search input, helpfulness voting, and support ticket modal.
- **v0.2.0 — Personal Saved Articles & Offline Bookmarking**: Pin articles to `localStorage` with quick-access navbar count chips and `📌 Saved` category filter tab.
- **v0.3.0 — FAQ Markdown Reference Guide Generator**: Single-click export of category-filtered FAQ articles as a formatted Markdown developer guide (`nexus_faq_cheatsheet.md`).
- **v0.4.0 — Interactive SDK Code Snippet Copy Vault**: Tabbed code block selector for cURL, Python SDK, and Node.js SDK with one-click clipboard copying (`📋 Copy Code` -> `✅ Copied!`).
- **v0.5.0 — AI-Powered Instant Question Auto-Suggest**: Real-time debounced auto-completion dropdown panel matching question titles and tag chips.
- **v0.6.0 — Enterprise Support Ticket Audit & SLA Tracker**: Slide-out drawer displaying active support tickets, SLA response countdown badges (`🟢 SLA Active`), priority chips, and timestamp history.
- **v0.7.0 — Article Feedback Analytics & Rating Heatmap**: Real-time developer satisfaction rating dial (`97.4% Positive`), total upvotes vs downvotes progress bar, and top 3 rated articles ranking.
- **v0.8.0 — Dark / Light Theme Customizer**: Single-click toggle between dark glassmorphism and crisp enterprise light mode.
- **v0.9.0 — Filter Preset Manager**: Save custom search queries and category filter combinations into one-click quick preset chips with local storage sync.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Dark Glassmorphism & Light Mode, CSS Grid, Flexbox), Alpine.js 3.x + `@alpinejs/collapse`
- **Backend Controller**: Node.js, Express.js REST API
- **Unit Testing**: Vitest (21 unit tests passing 100%)
- **Deployment**: Vercel Serverless Platform

---

## 🚀 Quick Start & Local Run

```bash
# 1. Clone repo
git clone https://github.com/breakingthebot/alpinejs-interactive-faq-build47.git
cd alpinejs-interactive-faq-build47

# 2. Install dependencies
npm install

# 3. Run unit tests
npm test

# 4. Start local development server
npm start
# App running at http://localhost:3000
```
