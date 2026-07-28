// faqService.js
// Domain Service for NexusCloud Enterprise AI Platform Help Center.
// Created: 2026-07-27

/**
 * @typedef {Object} FaqItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 * @property {'Billing & Invoicing' | 'API & SDK Integration' | 'Security & Data Privacy' | 'Enterprise SLA' | 'Model Deployment'} category
 * @property {number} popularityScore
 * @property {number} upvotes
 * @property {number} downvotes
 * @property {string[]} tags
 * @property {string} lastUpdated
 */

/**
 * @typedef {Object} SupportTicket
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {'Low' | 'Medium' | 'High' | 'Critical'} priority
 * @property {string} category
 * @property {string} message
 * @property {string} createdAt
 */

/** @type {FaqItem[]} */
const INITIAL_FAQS = [
  {
    id: 'faq_1',
    question: 'How does enterprise API rate limiting and token consumption quota work?',
    answer: 'NexusCloud meters API calls based on processed token volume (input + output tokens). Enterprise tier accounts enjoy dedicated rate limit pools up to 10,000 Requests Per Minute (RPM) with automatic failover burst capacity across regional clusters.',
    category: 'API & SDK Integration',
    popularityScore: 98,
    upvotes: 142,
    downvotes: 3,
    tags: ['API', 'Rate Limit', 'Tokens', 'Quota'],
    lastUpdated: '2026-07-15'
  },
  {
    id: 'faq_2',
    question: 'Are custom fine-tuned LLM weights encrypted and isolated in private tenant hardware?',
    answer: 'Yes. All custom adapter weights and fine-tuned checkpoints are encrypted at rest using customer-managed AWS KMS / Azure Key Vault keys (AES-256) and executed inside isolated Nitro Enclaves with zero data retention for model inference logs.',
    category: 'Security & Data Privacy',
    popularityScore: 95,
    upvotes: 128,
    downvotes: 1,
    tags: ['Security', 'Encryption', 'SOC2', 'KMS'],
    lastUpdated: '2026-07-18'
  },
  {
    id: 'faq_3',
    question: 'What is the uptime guarantee under the Enterprise Service Level Agreement (SLA)?',
    answer: 'NexusCloud provides a 99.99% financially backed uptime SLA for enterprise plans. Service interruptions exceeding 0.01% in any billing cycle automatically trigger prorated tier credits as detailed in your Master Services Agreement (MSA).',
    category: 'Enterprise SLA',
    popularityScore: 92,
    upvotes: 110,
    downvotes: 2,
    tags: ['SLA', 'Uptime', 'Guarantee', 'MSA'],
    lastUpdated: '2026-07-10'
  },
  {
    id: 'faq_4',
    question: 'How can our finance team request consolidated monthly invoiced billing?',
    answer: 'Accounts consuming over $2,000/month qualify for net-30 consolidated invoicing. You can request invoice billing directly via your Customer Success Manager or submit an invoice onboarding ticket in the support modal below.',
    category: 'Billing & Invoicing',
    popularityScore: 89,
    upvotes: 87,
    downvotes: 4,
    tags: ['Billing', 'Invoicing', 'Net-30', 'Finance'],
    lastUpdated: '2026-07-22'
  },
  {
    id: 'faq_5',
    question: 'Can we deploy NexusCloud foundation models on-premises via Kubernetes operator?',
    answer: 'Yes! We support air-gapped on-premises Kubernetes deployment using Helm charts and our proprietary Nexus Operator. Contact enterprise sales to obtain license keys and container image registry access.',
    category: 'Model Deployment',
    popularityScore: 86,
    upvotes: 94,
    downvotes: 5,
    tags: ['Kubernetes', 'On-Premises', 'Air-Gapped', 'Helm'],
    lastUpdated: '2026-07-25'
  },
  {
    id: 'faq_6',
    question: 'How do I generate multi-region API keys with granular scope permissions?',
    answer: 'Navigate to API Management > Developer Keys in your dashboard. You can define IP whitelist constraints, expiration dates, and scope access to specific endpoints (e.g. inference-only, fine-tune-read).',
    category: 'API & SDK Integration',
    popularityScore: 84,
    upvotes: 76,
    downvotes: 2,
    tags: ['API Keys', 'Permissions', 'RBAC', 'Security'],
    lastUpdated: '2026-07-12'
  }
];

let faqsStore = [...INITIAL_FAQS];
/** @type {SupportTicket[]} */
let ticketsStore = [];

export function getCategories() {
  return [
    'All',
    'API & SDK Integration',
    'Security & Data Privacy',
    'Enterprise SLA',
    'Billing & Invoicing',
    'Model Deployment'
  ];
}

export function getAllFaqs(searchQuery = '', categoryFilter = 'All', sortBy = 'popular', bookmarkedIds = []) {
  let result = [...faqsStore];

  if (categoryFilter === 'Bookmarked') {
    result = result.filter(f => bookmarkedIds.includes(f.id));
  } else if (categoryFilter && categoryFilter !== 'All') {
    result = result.filter(f => f.category === categoryFilter);
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(f => 
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'popular') {
    result.sort((a, b) => b.popularityScore - a.popularityScore);
  } else if (sortBy === 'recent') {
    result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  } else if (sortBy === 'upvotes') {
    result.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === 'alpha') {
    result.sort((a, b) => a.question.localeCompare(b.question));
  }

  return result;
}

export function exportFaqsAsMarkdown(searchQuery = '', categoryFilter = 'All', bookmarkedIds = []) {
  const targetFaqs = getAllFaqs(searchQuery, categoryFilter, 'popular', bookmarkedIds);

  let md = `# ⚡ NexusCloud Enterprise AI — Developer Knowledge Base Reference Guide\n`;
  md += `> Generated on: ${new Date().toISOString().replace('T', ' ').substring(0, 16)} UTC\n`;
  md += `> Filter Category: **${categoryFilter}** | Total Articles: **${targetFaqs.length}**\n\n`;
  md += `---\n\n`;

  targetFaqs.forEach((f, idx) => {
    md += `### ${idx + 1}. ${f.question}\n`;
    md += `- **Category**: \`${f.category}\` | **Popularity**: 🔥 ${f.popularityScore} | **Helpful Rating**: 👍 ${f.upvotes} / 👎 ${f.downvotes}\n`;
    md += `- **Last Verified**: ${f.lastUpdated}\n`;
    md += `- **Tags**: ${f.tags.map(t => `\`#${t}\``).join(', ')}\n\n`;
    md += `${f.answer}\n\n`;
    md += `---\n\n`;
  });

  return md;
}

export function getFaqsByIds(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  return faqsStore.filter(f => ids.includes(f.id));
}

export function getFaqById(id) {
  return faqsStore.find(f => f.id === id);
}

export function voteFaqHelpful(id, isHelpful) {
  const faq = getFaqById(id);
  if (!faq) {
    throw new Error(`FAQ item with ID ${id} not found`);
  }

  if (isHelpful) {
    faq.upvotes += 1;
    faq.popularityScore += 2;
  } else {
    faq.downvotes += 1;
  }

  return {
    upvotes: faq.upvotes,
    downvotes: faq.downvotes,
    popularityScore: faq.popularityScore
  };
}

export function submitSupportTicket(data) {
  if (!data.name || !data.name.trim()) {
    throw new Error('Full Name is required');
  }
  if (!data.email || !data.email.trim() || !data.email.includes('@')) {
    throw new Error('Valid email address is required');
  }
  if (!data.subject || !data.subject.trim()) {
    throw new Error('Ticket subject is required');
  }
  if (!data.message || !data.message.trim()) {
    throw new Error('Support details message is required');
  }

  const newTicket = {
    id: `tkt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    priority: data.priority || 'Medium',
    category: data.category || 'General Inquiry',
    message: data.message.trim(),
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  ticketsStore.unshift(newTicket);
  return newTicket;
}

export function getAllTickets() {
  return [...ticketsStore];
}

export function getCategoryStats(bookmarkedIds = []) {
  const counts = { All: faqsStore.length, Bookmarked: bookmarkedIds.length };
  getCategories().slice(1).forEach(cat => {
    counts[cat] = 0;
  });

  faqsStore.forEach(f => {
    if (counts[f.category] !== undefined) {
      counts[f.category] += 1;
    }
  });

  return counts;
}

export function resetFaqsStore() {
  faqsStore = JSON.parse(JSON.stringify(INITIAL_FAQS));
  ticketsStore = [];
}
