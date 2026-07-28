// server.js
// Express API Server for NexusCloud Alpine.js Interactive Knowledge Base.
// Created: 2026-07-27

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAllFaqs,
  getFaqById,
  voteFaqHelpful,
  submitSupportTicket,
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

// GET /api/categories - Categories and counts
app.get('/api/categories', (req, res) => {
  res.json({
    categories: getCategories(),
    stats: getCategoryStats()
  });
});

// GET /api/faqs - FAQ search, category filter & sorting
app.get('/api/faqs', (req, res) => {
  const searchQuery = req.query.q || '';
  const categoryFilter = req.query.category || 'All';
  const sortBy = req.query.sort || 'popular';

  const faqs = getAllFaqs(searchQuery, categoryFilter, sortBy);
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

// POST /api/tickets - Submit Support Ticket
app.post('/api/tickets', (req, res) => {
  try {
    const ticket = submitSupportTicket(req.body);
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
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
