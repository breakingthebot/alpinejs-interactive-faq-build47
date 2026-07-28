// server.js
// Express API Server for NexusCloud Alpine.js Interactive Knowledge Base.
// Created: 2026-07-27

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAllFaqs,
  getFaqsByIds,
  getSearchSuggestions,
  getFeedbackAnalytics,
  exportFaqsAsMarkdown,
  getFaqById,
  voteFaqHelpful,
  submitSupportTicket,
  getAllTickets,
  getCategories,
  getCategoryStats
} from './faqService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

// GET /api/analytics/feedback - Article Upvote & Satisfaction Analytics
app.get('/api/analytics/feedback', (req, res) => {
  const analytics = getFeedbackAnalytics();
  res.json({ success: true, analytics });
});

// GET /api/tickets - Get List of Submitted Support Tickets & SLA Statuses
app.get('/api/tickets', (req, res) => {
  const tickets = getAllTickets();
  res.json({ total: tickets.length, tickets });
});

// GET /api/faqs/suggest - Real-Time Search Auto-Suggestions
app.get('/api/faqs/suggest', (req, res) => {
  const searchQuery = req.query.q || '';
  const suggestions = getSearchSuggestions(searchQuery);
  res.json({ suggestions });
});

// GET /api/faqs/export-markdown - Export FAQ Reference Cheat Sheet as Markdown File
app.get('/api/faqs/export-markdown', (req, res) => {
  const searchQuery = req.query.q || '';
  const categoryFilter = req.query.category || 'All';
  let bookmarkedIds = [];
  if (req.query.bookmarkedIds) {
    bookmarkedIds = req.query.bookmarkedIds.split(',').filter(Boolean);
  }

  const markdownContent = exportFaqsAsMarkdown(searchQuery, categoryFilter, bookmarkedIds);
  res.setHeader('Content-Type', 'text/markdown');
  res.setHeader('Content-Disposition', 'attachment; filename="nexus_faq_cheatsheet.md"');
  res.status(200).send(markdownContent);
});

// GET /api/categories - Categories and counts
app.get('/api/categories', (req, res) => {
  let bookmarkedIds = [];
  if (req.query.bookmarked) {
    bookmarkedIds = req.query.bookmarked.split(',').filter(Boolean);
  }

  res.json({
    categories: ['All', 'Bookmarked', ...getCategories().slice(1)],
    stats: getCategoryStats(bookmarkedIds)
  });
});

// GET /api/faqs - FAQ search, category filter & sorting
app.get('/api/faqs', (req, res) => {
  const searchQuery = req.query.q || '';
  const categoryFilter = req.query.category || 'All';
  const sortBy = req.query.sort || 'popular';
  
  let bookmarkedIds = [];
  if (req.query.bookmarkedIds) {
    bookmarkedIds = req.query.bookmarkedIds.split(',').filter(Boolean);
  }

  const faqs = getAllFaqs(searchQuery, categoryFilter, sortBy, bookmarkedIds);
  res.json({
    total: faqs.length,
    faqs
  });
});

// POST /api/faqs/bookmarks - Batch retrieve bookmarked FAQs
app.post('/api/faqs/bookmarks', (req, res) => {
  const ids = req.body.ids || [];
  const faqs = getFaqsByIds(ids);
  res.json({
    total: faqs.length,
    faqs
  });
});

// POST /api/faqs/:id/vote - Upvote / Downvote FAQ helpfulness
app.post('/api/faqs/:id/vote', (req, res) => {
  try {
    const isHelpful = req.body.isHelpful === true || req.body.isHelpful === 'true';
    const updated = voteFaqHelpful(req.params.id, isHelpful);
    res.json({ success: true, vote: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/tickets - Submit new enterprise support ticket
app.post('/api/tickets', (req, res) => {
  try {
    const newTicket = submitSupportTicket(req.body);
    return res.status(201).json({ success: true, ticket: newTicket });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/tickets/:id/escalate - Escalate ticket to P1 Critical SLA
app.post('/api/tickets/:id/escalate', (req, res) => {
  try {
    const { reason } = req.body || {};
    const escalatedTicket = escalateTicketP1(req.params.id, reason);
    return res.json({ success: true, ticket: escalatedTicket });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// Serve Main Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 NexusCloud Alpine.js FAQ Server running at http://localhost:${PORT}`);
  });
}
