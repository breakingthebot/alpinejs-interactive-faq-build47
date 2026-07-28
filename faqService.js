// faqService.js
// Domain Service for NexusCloud Enterprise AI Platform Help Center.
// Created: 2026-07-27

/**
 * @typedef {Object} CodeSnippets
 * @property {string} curl
 * @property {string} python
 * @property {string} node
 */

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
 * @property {CodeSnippets} [codeSnippets]
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
 * @property {string} slaStatus
 * @property {string} status
 * @property {boolean} [isP1Escalated]
 * @property {string} [escalationReason]
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
    lastUpdated: '2026-07-15',
    codeSnippets: {
      curl: `curl -X POST https://api.nexuscloud.ai/v1/chat/completions \\\n  -H "Authorization: Bearer $NEXUS_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "nexus-llama3-70b", "messages": [{"role": "user", "content": "Explain RPM quotas"}]}'`,
      python: `import nexuscloud\n\nclient = nexuscloud.Nexus(api_key="nxs_live_992138")\nresponse = client.chat.completions.create(\n    model="nexus-llama3-70b",\n    messages=[{"role": "user", "content": "Explain RPM quotas"}]\n)\nprint(response.choices[0].message.content)`,
      node: `import { NexusCloud } from '@nexuscloud/sdk';\n\nconst nexus = new NexusCloud({ apiKey: process.env.NEXUS_API_KEY });\nconst response = await nexus.chat.completions.create({\n  model: 'nexus-llama3-70b',\n  messages: [{ role: 'user', content: 'Explain RPM quotas' }]\n});\nconsole.log(response.choices[0].message.content);`
    }
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
    lastUpdated: '2026-07-18',
    codeSnippets: {
      curl: `curl -X GET https://api.nexuscloud.ai/v1/security/encryption-status \\\n  -H "Authorization: Bearer $NEXUS_API_KEY"`,
      python: `import nexuscloud\n\nclient = nexuscloud.Nexus(api_key="nxs_live_992138")\nstatus = client.security.get_encryption_status()\nprint(f"KMS Key ARN: {status.kms_arn}, Encryption: {status.cipher}")`,
      node: `import { NexusCloud } from '@nexuscloud/sdk';\n\nconst nexus = new NexusCloud();\nconst status = await nexus.security.getEncryptionStatus();\nconsole.log('KMS Status:', status);`
    }
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
    lastUpdated: '2026-07-25',
    codeSnippets: {
      curl: `helm repo add nexuscloud https://charts.nexuscloud.ai\nhelm install nexus-operator nexuscloud/nexus-operator \\\n  --set licenseKey=$NEXUS_LICENSE_KEY \\\n  --set airgapped=true`,
      python: `from nexuscloud.deploy import KubernetesOperator\n\nop = KubernetesOperator(license_key="nxs_lic_771923")\nop.deploy_helm_chart(release_name="nexus-local", airgapped=True)`,
      node: `import { KubernetesOperator } from '@nexuscloud/deploy';\n\nconst operator = new KubernetesOperator({ licenseKey: process.env.NEXUS_LICENSE_KEY });\nawait operator.deployHelmChart({ releaseName: 'nexus-local', airgapped: true });`
    }
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
    lastUpdated: '2026-07-12',
    codeSnippets: {
      curl: `curl -X POST https://api.nexuscloud.ai/v1/keys \\\n  -H "Authorization: Bearer $ADMIN_KEY" \\\n  -d '{"name": "Prod Ingestion Key", "scopes": ["inference:read"], "regions": ["us-east-1", "eu-west-1"]}'`,
      python: `import nexuscloud\n\nclient = nexuscloud.Nexus(api_key=ADMIN_KEY)\nnew_key = client.keys.create(name="Prod Ingestion", scopes=["inference:read"], regions=["us-east-1"])\nprint(new_key.secret)`,
      node: `import { NexusCloud } from '@nexuscloud/sdk';\n\nconst client = new NexusCloud({ apiKey: ADMIN_KEY });\nconst key = await client.keys.create({\n  name: 'Prod Ingestion Key',\n  scopes: ['inference:read'],\n  regions: ['us-east-1']\n});`
    }
  }
];

/** @type {SupportTicket[]} */
const INITIAL_TICKETS = [
  {
    id: 'tkt_178201_a9b1',
    name: 'Jordan Miller',
    email: 'jordan@enterprise.com',
    subject: 'Custom KMS Key ARN Integration Warning',
    priority: 'High',
    category: 'Security & Data Privacy',
    message: 'Need verification on Nitro Enclave memory limits during fine-tuning job.',
    createdAt: '2026-07-27 18:40',
    status: 'In Progress',
    slaStatus: '🟢 SLA Active (12m remaining)',
    isP1Escalated: false
  },
  {
    id: 'tkt_178105_c3d8',
    name: 'Elena Rostova',
    email: 'elena@nexus.dev',
    subject: 'Kubernetes Helm Chart License Activation',
    priority: 'Medium',
    category: 'Model Deployment',
    message: 'Air-gapped deployment image registry credentials request.',
    createdAt: '2026-07-26 14:15',
    status: 'Resolved',
    slaStatus: '✅ SLA Met (Responded in 8m)',
    isP1Escalated: false
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What is the dedicated Enterprise Rate Limit ceiling for API Requests Per Minute (RPM)?',
    options: ['1,000 RPM', '5,000 RPM', '10,000 RPM', '50,000 RPM'],
    correctIndex: 2,
    explanation: 'Enterprise tier accounts enjoy dedicated pools up to 10,000 Requests Per Minute (RPM) with automatic burst failover.'
  },
  {
    id: 'q2',
    question: 'How are fine-tuned custom adapter LLM weights encrypted at rest?',
    options: ['Base64 obfuscation', 'AWS KMS / Azure Key Vault AES-256 keys', 'Standard MD5 hashing', 'Plaintext inside S3'],
    correctIndex: 1,
    explanation: 'Weights and checkpoints are encrypted at rest using customer-managed AWS KMS / Azure Key Vault keys (AES-256) inside Nitro Enclaves.'
  },
  {
    id: 'q3',
    question: 'What is the uptime guarantee under the financially backed Enterprise SLA?',
    options: ['99.0%', '99.9%', '99.99%', '100% Zero-Downtime'],
    correctIndex: 2,
    explanation: 'NexusCloud guarantees 99.99% uptime with prorated tier credit refunds for any cycle exceeding 0.01% downtime.'
  }
];

let faqsStore = [...INITIAL_FAQS];
let ticketsStore = [...INITIAL_TICKETS];

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

export function exportFaqsAsCsv(searchQuery = '', categoryFilter = 'All', bookmarkedIds = []) {
  const targetFaqs = getAllFaqs(searchQuery, categoryFilter, 'popular', bookmarkedIds);

  const headers = ['ID', 'Question', 'Category', 'PopularityScore', 'Upvotes', 'Downvotes', 'LastUpdated', 'Tags'];
  const rows = targetFaqs.map(f => [
    f.id,
    `"${f.question.replace(/"/g, '""')}"`,
    `"${f.category}"`,
    f.popularityScore,
    f.upvotes,
    f.downvotes,
    f.lastUpdated,
    `"${f.tags.join(';')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function exportFaqsAsJson(searchQuery = '', categoryFilter = 'All', bookmarkedIds = []) {
  const targetFaqs = getAllFaqs(searchQuery, categoryFilter, 'popular', bookmarkedIds);
  return JSON.stringify(targetFaqs, null, 2);
}

export function getQuizQuestions() {
  return QUIZ_QUESTIONS.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));
}

export function gradeQuiz(answers = {}) {
  let correctCount = 0;
  const breakdown = QUIZ_QUESTIONS.map(q => {
    const selected = answers[q.id];
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) correctCount += 1;

    return {
      id: q.id,
      question: q.question,
      selectedOption: selected !== undefined ? q.options[selected] : 'No answer',
      correctOption: q.options[q.correctIndex],
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Number(((correctCount / QUIZ_QUESTIONS.length) * 100).toFixed(0));
  let badge = '🥉 Developer Novice';
  if (percentage === 100) badge = '🏆 Certified Nexus AI Architect';
  else if (percentage >= 66) badge = '🥈 Senior Integration Engineer';

  return {
    correctCount,
    totalQuestions: QUIZ_QUESTIONS.length,
    percentage,
    badge,
    breakdown
  };
}

export function escalateTicketP1(ticketId, reason = 'Critical Production Outage Risk') {
  const ticket = ticketsStore.find(t => t.id === ticketId);
  if (!ticket) {
    throw new Error(`Ticket with ID ${ticketId} not found`);
  }

  ticket.priority = 'Critical';
  ticket.isP1Escalated = true;
  ticket.escalationReason = reason;
  ticket.slaStatus = '🚨 P1 Escalated (5m Response SLA)';
  ticket.status = 'P1 Escalated';

  return ticket;
}

export function getKeyboardShortcuts() {
  return [
    { key: '/', description: 'Focus search input box' },
    { key: '?', description: 'Toggle keyboard shortcuts reference modal' },
    { key: 'Esc', description: 'Close open modals & slide-out drawers' },
    { key: 'j / ↓', description: 'Navigate & expand next FAQ accordion article' },
    { key: 'k / ↑', description: 'Navigate & expand previous FAQ accordion article' }
  ];
}

export function getShareableLink(faqId, origin = 'https://alpinejs-interactive-faq-build47.vercel.app') {
  const faq = getFaqById(faqId);
  if (!faq) {
    throw new Error(`FAQ item with ID ${faqId} not found`);
  }
  return `${origin}#faq-${faq.id}`;
}

export function createFilterPreset(name, category = 'All', query = '') {
  if (!name || !name.trim()) {
    throw new Error('Preset name is required');
  }

  return {
    id: `pst_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    category,
    query: query ? query.trim() : ''
  };
}

export function validateTheme(themeName) {
  const allowed = ['dark', 'light'];
  if (!allowed.includes(themeName)) {
    return 'dark';
  }
  return themeName;
}

export function getFeedbackAnalytics() {
  let totalUpvotes = 0;
  let totalDownvotes = 0;

  faqsStore.forEach(f => {
    totalUpvotes += f.upvotes;
    totalDownvotes += f.downvotes;
  });

  const totalVotes = totalUpvotes + totalDownvotes;
  const satisfactionRate = totalVotes > 0 ? ((totalUpvotes / totalVotes) * 100).toFixed(1) : '100.0';

  const topArticles = [...faqsStore]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3)
    .map(f => ({
      id: f.id,
      question: f.question,
      upvotes: f.upvotes,
      category: f.category
    }));

  return {
    totalVotes,
    totalUpvotes,
    totalDownvotes,
    satisfactionRate: Number(satisfactionRate),
    topArticles
  };
}

export function getSearchSuggestions(query = '') {
  if (!query || !query.trim() || query.trim().length < 2) return [];

  const q = query.toLowerCase().trim();
  const suggestions = [];

  faqsStore.forEach(f => {
    if (f.question.toLowerCase().includes(q)) {
      suggestions.push({
        id: f.id,
        text: f.question,
        category: f.category,
        type: 'question'
      });
    }

    f.tags.forEach(tag => {
      if (tag.toLowerCase().includes(q) && !suggestions.some(s => s.text === tag)) {
        suggestions.push({
          id: `tag_${tag}`,
          text: `#${tag}`,
          category: f.category,
          type: 'tag'
        });
      }
    });
  });

  return suggestions.slice(0, 5);
}

export function getCodeSnippet(faqId, lang = 'curl') {
  const faq = getFaqById(faqId);
  if (!faq || !faq.codeSnippets) return null;
  return faq.codeSnippets[lang] || faq.codeSnippets.curl;
}

export function getAllFaqs(searchQuery = '', categoryFilter = 'All', sortBy = 'popular', bookmarkedIds = []) {
  let result = [...faqsStore];

  if (categoryFilter === 'Bookmarked') {
    result = result.filter(f => bookmarkedIds.includes(f.id));
  } else if (categoryFilter && categoryFilter !== 'All') {
    result = result.filter(f => f.category === categoryFilter);
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim().replace(/^#/, '');
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

    if (f.codeSnippets) {
      md += `\`\`\`bash\n# cURL SDK Example\n${f.codeSnippets.curl}\n\`\`\`\n\n`;
    }

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

  const isCritical = data.priority === 'Critical';

  const newTicket = {
    id: `tkt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    priority: data.priority || 'Medium',
    category: data.category || 'General Inquiry',
    message: data.message.trim(),
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: isCritical ? 'P1 Escalated' : 'In Progress',
    slaStatus: isCritical ? '🚨 P1 Escalated (5m Response SLA)' : '🟢 SLA Active (15m SLA)',
    isP1Escalated: isCritical
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
  ticketsStore = JSON.parse(JSON.stringify(INITIAL_TICKETS));
}
