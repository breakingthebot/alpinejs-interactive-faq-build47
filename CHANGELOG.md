# Changelog

All notable changes to **Build 47 (NexusCloud Alpine.js Interactive Knowledge Base)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-27

### Added
- Initial project scaffolding for **Build 47 (NexusCloud Enterprise AI Knowledge Base & FAQ Center)**.
- Domain service `faqService.js` managing FAQ articles, category filtering, search matching, helpfulness voting, and support ticket dispatching.
- Express server `server.js` providing REST API routes (`/api/faqs`, `/api/categories`, `/api/faqs/:id/vote`, `/api/tickets`).
- Interactive Alpine.js 3.x UI in `public/index.html` featuring expandable accordions (`x-collapse`), category tabs, custom dropdowns, live search, support ticket modal, and toast alerts.
- Vitest unit test suite `faqService.spec.js` (11 unit tests passing 100%).
