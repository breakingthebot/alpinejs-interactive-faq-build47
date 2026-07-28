# ⚡ Build 47: NexusCloud Enterprise AI — Alpine.js Interactive FAQ Center

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://alpinejs-interactive-faq-build47.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/breakingthebot/alpinejs-interactive-faq-build47)
[![Tests](https://img.shields.io/badge/Vitest-16%20Passed-6E9F18?style=for-the-badge&logo=vitest)](file:///C:/Users/marve/Desktop/AI-286-Builds/Build_47/faqService.spec.js)
[![Version](https://img.shields.io/badge/Release-v0.5.0-blue?style=for-the-badge)](file:///C:/Users/marve/Desktop/AI-286-Builds/Build_47/CHANGELOG.md)

---

## 🌟 Overview

**NexusCloud Interactive Knowledge Base & FAQ Center** is a modern enterprise documentation portal built with **Alpine.js 3.x** and **Express.js**. Designed for real-world client performance, it delivers rich interactivity—expandable accordions, category tabs, custom dropdowns, live search filtering, helpfulness voting, and support ticket modals—with minimal JavaScript overhead.

### 🌐 Live Production Demo
- **Live Vercel Application**: [https://alpinejs-interactive-faq-build47.vercel.app](https://alpinejs-interactive-faq-build47.vercel.app)
- **GitHub Codebase**: [https://github.com/breakingthebot/alpinejs-interactive-faq-build47](https://github.com/breakingthebot/alpinejs-interactive-faq-build47)

---

## 🔥 Key Features

- **🚀 Minimal JS Framework Overhead**: Powered by **Alpine.js 3.x** declarative directives (`x-data`, `x-show`, `x-collapse`, `x-model`, `x-transition`).
- **💡 AI-Powered Instant Question Auto-Suggest**: Real-time debounced auto-completion dropdown panel matching question titles and tag suggestions as you type.
- **💻 Interactive SDK Code Snippet Copy Vault**: Tabbed code block selector for cURL, Python SDK, and Node.js SDK with one-click clipboard copying (`📋 Copy Code` -> `✅ Copied!`).
- **📥 FAQ Markdown Reference Guide Generator**: Single-click export of category-filtered FAQ articles as a formatted Markdown developer guide (`.md`).
- **📌 Personal Saved Articles & Offline Bookmarking**: Pin and save favorite FAQ articles to local storage (`localStorage`) with quick-access navbar count chips and category filter tab.
- **📂 Expandable FAQ Accordion**: Smooth collapse animations (`x-collapse`), tag badges, and last updated verifications.
- **🏷️ Category Tabs & Stats**: Filter articles dynamically by category (*API & SDK Integration*, *Security & Data Privacy*, *Enterprise SLA*, *Billing & Invoicing*, *Model Deployment*).
- **🔍 Real-Time Client Search & Sorting**: Live debounced search filtering by query keywords and tags, plus custom sorting dropdown (*Most Popular*, *Most Recent*, *Highest Rated*, *Alphabetical*).
- **👍 Interactive Helpfulness Voting**: Upvote or downvote articles with instant feedback and toast alerts.
- **💬 Enterprise Support Ticket Modal**: Accessible modal with ESC window listener, click-outside dismissal, priority SLA selector, and API ticket submission.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Dark Mode Glassmorphism, CSS Grid & Flexbox), Alpine.js 3.x + `@alpinejs/collapse`
- **Backend Controller**: Node.js, Express.js REST API
- **Testing**: Vitest (11 passing unit tests)
- **Deployment**: Vercel Serverless Functions

---

## 🚀 Local Installation & Run Guide

```bash
# 1. Clone repository
git clone https://github.com/breakingthebot/alpinejs-interactive-faq-build47.git
cd alpinejs-interactive-faq-build47

# 2. Install dependencies
npm install

# 3. Run unit tests
npm test

# 4. Start local dev server
npm start
# Server running at http://localhost:3000
```
