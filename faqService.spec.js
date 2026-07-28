// faqService.spec.js
// Unit tests for NexusCloud FAQ Knowledge Base Service.
// Created: 2026-07-27

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAllFaqs,
  getFaqsByIds,
  getCodeSnippet,
  getSearchSuggestions,
  exportFaqsAsMarkdown,
  getFaqById,
  voteFaqHelpful,
  submitSupportTicket,
  getAllTickets,
  getCategories,
  getCategoryStats,
  resetFaqsStore
} from './faqService.js';

describe('faqService', () => {
  beforeEach(() => {
    resetFaqsStore();
  });

  it('retrieves all FAQ items sorted by popularity score default', () => {
    const faqs = getAllFaqs();
    expect(faqs.length).toBe(6);
    expect(faqs[0].popularityScore).toBeGreaterThanOrEqual(faqs[1].popularityScore);
    expect(faqs[0].question).toContain('rate limiting');
  });

  it('generates real-time auto-suggest search completions', () => {
    const suggestions = getSearchSuggestions('rate');
    expect(suggestions.length).toBeGreaterThanOrEqual(1);
    expect(suggestions[0].text).toContain('rate limiting');
  });

  it('retrieves SDK code snippets by language for specific FAQ item', () => {
    const curlSnippet = getCodeSnippet('faq_1', 'curl');
    const pythonSnippet = getCodeSnippet('faq_1', 'python');
    const nodeSnippet = getCodeSnippet('faq_1', 'node');

    expect(curlSnippet).toContain('curl -X POST');
    expect(pythonSnippet).toContain('import nexuscloud');
    expect(nodeSnippet).toContain('import { NexusCloud }');
  });

  it('exports filtered FAQs as clean formatted Markdown document', () => {
    const md = exportFaqsAsMarkdown('', 'API & SDK Integration');
    expect(md).toContain('# ⚡ NexusCloud Enterprise AI');
    expect(md).toContain('Filter Category: **API & SDK Integration**');
    expect(md).toContain('rate limiting');
    expect(md).toContain('`#API`');
    expect(md).toContain('curl -X POST');
  });

  it('retrieves bookmarked FAQs by ID list', () => {
    const bookmarked = getFaqsByIds(['faq_1', 'faq_3']);
    expect(bookmarked.length).toBe(2);
    expect(bookmarked.map(f => f.id)).toContain('faq_1');
    expect(bookmarked.map(f => f.id)).toContain('faq_3');
  });

  it('filters FAQs by Bookmarked category tag', () => {
    const bookmarkedFaqs = getAllFaqs('', 'Bookmarked', 'popular', ['faq_2', 'faq_5']);
    expect(bookmarkedFaqs.length).toBe(2);
    expect(bookmarkedFaqs[0].id).toBe('faq_2');
    expect(bookmarkedFaqs[1].id).toBe('faq_5');
  });

  it('filters FAQs by category tag', () => {
    const apiFaqs = getAllFaqs('', 'API & SDK Integration');
    expect(apiFaqs.length).toBe(2);
    expect(apiFaqs.every(f => f.category === 'API & SDK Integration')).toBe(true);
  });

  it('filters FAQs by search query keyword', () => {
    const searchResult = getAllFaqs('Kubernetes');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].question).toContain('Kubernetes');
  });

  it('sorts FAQs by most recent updated date', () => {
    const recentFaqs = getAllFaqs('', 'All', 'recent');
    expect(recentFaqs[0].lastUpdated).toBe('2026-07-25');
  });

  it('sorts FAQs alphabetically by question', () => {
    const alphaFaqs = getAllFaqs('', 'All', 'alpha');
    expect(alphaFaqs[0].question.localeCompare(alphaFaqs[1].question)).toBeLessThanOrEqual(0);
  });

  it('records helpful upvotes and downvotes on an FAQ item', () => {
    const voteResult = voteFaqHelpful('faq_1', true);
    expect(voteResult.upvotes).toBe(143);

    const downvoteResult = voteFaqHelpful('faq_1', false);
    expect(downvoteResult.downvotes).toBe(4);
  });

  it('throws error when voting on non-existent FAQ ID', () => {
    expect(() => voteFaqHelpful('faq_invalid', true)).toThrow('FAQ item with ID faq_invalid not found');
  });

  it('submits enterprise support ticket successfully', () => {
    const ticket = submitSupportTicket({
      name: 'Jordan Miller',
      email: 'jordan@enterprise.com',
      subject: 'Custom LLM Nitro Enclave Setup',
      priority: 'High',
      category: 'Security & Data Privacy',
      message: 'We require assistance configuring custom KMS key ARN.'
    });

    expect(ticket.id).toBeDefined();
    expect(ticket.priority).toBe('High');
    expect(getAllTickets().length).toBe(1);
    expect(getAllTickets()[0].email).toBe('jordan@enterprise.com');
  });

  it('throws error when submitting support ticket with missing required fields', () => {
    expect(() => submitSupportTicket({ name: '', email: 'jordan@enterprise.com', subject: 'Subject', message: 'Message' })).toThrow();
    expect(() => submitSupportTicket({ name: 'Name', email: 'invalid-email', subject: 'Subject', message: 'Message' })).toThrow();
    expect(() => submitSupportTicket({ name: 'Name', email: 'jordan@enterprise.com', subject: '', message: 'Message' })).toThrow();
    expect(() => submitSupportTicket({ name: 'Name', email: 'jordan@enterprise.com', subject: 'Subject', message: '' })).toThrow();
  });

  it('calculates category stats including bookmarked count', () => {
    const stats = getCategoryStats(['faq_1', 'faq_2']);
    expect(stats.All).toBe(6);
    expect(stats.Bookmarked).toBe(2);
    expect(stats['API & SDK Integration']).toBe(2);
  });

  it('retrieves categories list correctly', () => {
    const cats = getCategories();
    expect(cats.length).toBe(6);
    expect(cats[0]).toBe('All');
  });
});
