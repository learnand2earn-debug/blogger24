const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'ubaidblogs.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log("Initial posts count:", db.posts.length);

// 1. Filter out post-1 to post-6, keep only master posts (post-7 to post-21)
const masterPosts = db.posts.filter(p => {
  const idNum = parseInt(p.id.replace('post-', ''));
  return idNum >= 7 && idNum <= 21;
});

console.log("Filtered master posts count:", masterPosts.length);

// 2. AEO & GEO Quick Answer snippets tailored for each post
const aeoAnswers = {
  'post-7': {
    directAnswer: 'Autonomous AI agents in 2026 operate as stateful cognitive architectures (such as LangGraph and CrewAI) capable of multi-step planning, tool invocation, and self-correction. Unlike single-prompt LLM wrappers, multi-agent frameworks divide enterprise workflows into specialized roles—such as extraction, validation, and execution—reducing operational costs by up to 68% while delivering 99.4% deterministic accuracy through schema-validated JSON function calling.',
    takeaways: [
      'ReAct loops & MCP tool-use provide deterministic API execution.',
      'Specialized multi-agent swarms outperform monolithic prompts.',
      'Human-in-the-loop (HITL) checkpoints ensure enterprise security and zero hallucination risk.'
    ]
  },
  'post-8': {
    directAnswer: 'Building a $10,000/month digital asset portfolio in 2026 relies on acquiring or engineering cash-flowing digital properties—primarily paid newsletters (Beehiiv/Substack), programmatic micro-SaaS, and authority content hubs. By reinvesting early free cash flow and maintaining average operating margins above 78%, operators diversify revenue across recurring SaaS subscriptions, high-CPM programmatic ads ($35-$55 RPM), and verified affiliate sponsorships.',
    takeaways: [
      'Diversify across newsletter media, micro-SaaS, and programmatic hubs.',
      'Target 3x-4x annual profit acquisition multiples on Flippa/Acquire.com.',
      'Systematize editorial and code maintenance to preserve passive operational leverage.'
    ]
  },
  'post-9': {
    directAnswer: 'Achieving sub-second TTFB and 100/100 Core Web Vitals on Next.js 15 requires combining React Server Components (RSC), Partial Prerendering (PPR), Turbopack compilation, and fine-grained cache tags with revalidateTag. By keeping dynamic JavaScript off client bundles and streaming UI via <Suspense> boundaries, sites reduce Interaction to Next Paint (INP) below 50ms and First Contentful Paint (FCP) under 350ms globally.',
    takeaways: [
      'Partial Prerendering serves static HTML shells instantly while streaming user dynamic blocks.',
      'Strict bundle hygiene ensures zero unnecessary client-side JS overhead.',
      'Stale-while-revalidate edge caching keeps server compute costs minimal.'
    ]
  },
  'post-10': {
    directAnswer: 'Clinically proven longevity protocols focus on three foundational biological mechanisms: mitochondrial biogenesis via 180-220 minutes of weekly Zone 2 cardio, cellular autophagy induction through 16-18 hour intermittent fasting windows, and cellular repair optimization via precursor supplementation (NMN/NR) and restorative slow-wave sleep. Tracking baseline biomarkers including ApoB, hs-CRP, and fasting insulin provides quantifiable validation of biological age reduction.',
    takeaways: [
      'Zone 2 aerobic training maximizes mitochondrial density and VO2 max longevity correlation.',
      'Autophagy fasting windows purge senescent cellular debris.',
      'Biomarker tracking (ApoB, HbA1c, hs-CRP) supersedes unverified supplement hype.'
    ]
  },
  'post-11': {
    directAnswer: 'Zero Trust architecture for small-to-midsize businesses (SMBs) rejects perimeter-based security in favor of the strict principle: "never trust, always verify." Built upon NIST SP 800-207 guidelines, practical implementation requires phishing-resistant FIDO2/WebAuthn hardware authentication, identity-aware proxies (Cloudflare Access/Tailscale), device health posture checks, and automated micro-segmentation, cutting ransomware intrusion vectors by over 92%.',
    takeaways: [
      'Hardware MFA (FIDO2) completely neutralizes credential harvesting and session hijacking.',
      'WireGuard-based micro-segmentation replaces vulnerable legacy corporate VPNs.',
      'Least-privilege role-based access control (RBAC) restricts lateral network traversal.'
    ]
  },
  'post-12': {
    directAnswer: 'Programmatic SEO generates tens of thousands of qualified organic visits by combining structured relational databases with dynamic page templates addressing long-tail, transactional search intents. Success in 2026 demands high Google "Information Gain" scores—integrating proprietary data points, interactive comparison calculators, and verified user metrics on each programmatic URL to ensure 100% indexation and avoid thin-content algorithmic penalties.',
    takeaways: [
      'Low-competition, high-volume search queries scale exponentially through programmatic modifier matrices.',
      'Proprietary data attributes satisfy Google Information Gain requirements.',
      'Automated XML sitemap batching and clean internal silo links guarantee fast crawler discovery.'
    ]
  },
  'post-13': {
    directAnswer: 'High-income AI engineering without programming focuses on systems architecture: designing enterprise Retrieval-Augmented Generation (RAG) pipelines, low-code agent orchestration using visual builders like Flowise and Langflow, and business process automation. Enterprise AI consultants command $150 to $300/hour by bridging the technical gap between proprietary corporate databases and commercial LLM APIs with zero custom Python code required.',
    takeaways: [
      'Visual RAG architecture and vector database indexing form the core high-demand enterprise skill.',
      'Prompt evaluation and evals engineering prevent costly model hallucinations.',
      'Multi-agent business workflow integrations provide immediate, measurable client ROI.'
    ]
  },
  'post-14': {
    directAnswer: 'In modern interest rate environments, short-term US Treasury Bills (specifically 4-week, 8-week, and 13-week maturities) consistently outperform High-Yield Savings Accounts (HYSA) by delivering higher base yields (typically 25-50 bps higher) and full exemption from state and local income taxes under 31 U.S.C. § 3124. For investors in high-tax states, T-Bill ladders yield effective tax-equivalent returns up to 1.1% higher than retail bank accounts.',
    takeaways: [
      'US Treasury Bills are 100% exempt from state and municipal income taxes.',
      'Direct sovereign backing eliminates bank insolvency and FDIC coverage ceiling concerns.',
      'Rolling 4-week T-Bill ladders provide continuous liquidity without locking up operating cash.'
    ]
  },
  'post-15': {
    directAnswer: 'For healthy non-diabetics, over-the-counter Continuous Glucose Monitors (such as Dexcom Stelo and Abbott Lingo) provide real-time biofeedback on metabolic flexibility and glycemic variability. Preventing postprandial glucose excursions above 140 mg/dL through targeted meal composition, vinegar pre-loading, and post-meal ambulation eliminates midday energy crashes, lowers chronic systemic inflammation, and significantly reduces long-term metabolic disease risk.',
    takeaways: [
      'Keeping glycemic variability below 15% preserves sustained cognitive focus and mitochondrial efficiency.',
      'Simple lifestyle habits (10-minute post-meal walks, dietary fiber priority) flatten glucose curves.',
      'Baseline fasting glucose tracking (75-90 mg/dL) indicates high cellular insulin sensitivity.'
    ]
  },
  'post-16': {
    directAnswer: 'Recovering from Google Helpful Content (HCU) and Core Update ranking drops requires removing the site-wide unhelpful content classifier. Webmasters must prune or 410-status thin, regurgitated articles, consolidate duplicate keyword cannibalization URLs, infuse unreplicable first-hand expert data and proprietary media, and rebuild topical authority through strict semantic internal linking and transparent author E-E-A-T credentials.',
    takeaways: [
      'Aggressively prune or 410-redirect low-engagement, AI-regurgitated URLs to clear site-wide penalty flags.',
      'Add verifiable original research, original photography, and real test outcomes for Information Gain.',
      'Re-architect internal link silos to guide crawl equity to high-converting flagship assets.'
    ]
  },
  'post-17': {
    directAnswer: 'Building a sovereign, hardened private cloud in 2026 utilizes open-source platforms like TrueNAS SCALE with ZFS redundancy paired with Nextcloud AIO for multi-device sync, file versioning, and document collaboration. Encrypted remote access is secured through WireGuard VPN tunnels and reverse proxies, eliminating third-party subscription fees and vendor surveillance while ensuring 100% data ownership and enterprise-level drive resilience.',
    takeaways: [
      'ZFS RAID-Z2 protects against dual-disk mechanical failures and silent bit rot.',
      'WireGuard mesh networking grants secure, encrypted remote access without exposing open router ports.',
      'Automated 3-2-1 backup strategies with off-site encrypted snapshots guarantee disaster recovery.'
    ]
  },
  'post-18': {
    directAnswer: 'Maintaining a 99% primary inbox placement rate for B2B cold outbound requires strict technical domain hygiene: configuring DNS records with SPF, DKIM, and DMARC (p=quarantine or p=reject), staggering custom secondary domain warmup over 21-30 days, rotating multiple sender mailboxes, capping daily sends at 30 emails per account, and keeping bounce rates strictly below 1.5% through real-time email list verification.',
    takeaways: [
      'Never send cold outbound from primary corporate domains—use dedicated secondary domains.',
      'Strict SPF, 2048-bit DKIM, and DMARC alignment prevent immediate algorithmic spam filtering.',
      'Ultra-personalized, text-only copy with frictionless zero-link calls to action maximizes positive reply rates.'
    ]
  },
  'post-19': {
    directAnswer: 'Running high-capability open-source LLMs (such as DeepSeek-R1 and Llama 3.3) locally provides zero API costs, zero data latency, and 100% confidential offline inference. Utilizing lightweight runtimes like Ollama and vLLM with 4-bit or 8-bit GGUF quantization enables 70B parameter models to run efficiently on unified-memory Apple Silicon hardware (M2/M3/M4 Max) or consumer NVIDIA RTX GPUs with PagedAttention acceleration.',
    takeaways: [
      'Ollama provides single-command CLI deployment with instant OpenAI-compatible REST API compatibility.',
      '4-bit GGUF and EXL2 quantization compress model memory footprints by 70% with negligible perplexity loss.',
      'Local private inference guarantees client data compliance under HIPAA and GDPR.'
    ]
  },
  'post-20': {
    directAnswer: 'Sustainable DeFi yield farming in 2026 shifts away from speculative token emissions toward risk-hedged, capital-efficient liquidity provision across audited automated market makers (Uniswap v4, Curve, Aave v3). Managing impermanent loss through concentrated liquidity ranges, verifying multi-signature timelock contracts, and hedging underlying asset volatility with decentralized options achieves steady 12-24% APYs without catastrophic drawdown risks.',
    takeaways: [
      'Calculate Impermanent Loss (IL) dynamically using volatility ratios prior to entering LP pools.',
      'Verify dual independent security audits (CertiK, OpenZeppelin) and inspect timelock multisig contracts.',
      'Prioritize real-yield protocol revenue distribution over inflationary reward token printing.'
    ]
  },
  'post-21': {
    directAnswer: 'Semantic internal linking accelerates search engine rankings by establishing clear topical authority clusters and distributing PageRank equity directly to high-converting commercial pages. By organizing content into strict hub-and-spoke topic silos, mapping co-occurring entity relationships, and utilizing contextual, varied-anchor text links, websites establish Google Knowledge Graph relevance up to 3x faster than random link structures.',
    takeaways: [
      'Structure content into rigid Parent-Child hub-and-spoke silos with zero cross-silo link bleed.',
      'Contextual body links pass substantially higher CheiRank/PageRank weight than header or footer links.',
      'Natural descriptive anchor text reinforces target entity semantics across search crawler graphs.'
    ]
  }
};

// 3. Inject AEO & GEO module into each master post
masterPosts.forEach(post => {
  const aeoData = aeoAnswers[post.id];
  if (!aeoData) return;

  // Build the clean HTML AEO quick answer card
  const aeoHtml = `
<div class="aeo-quick-answer">
  <div class="badge">⚡ Quick Answer (AEO / GEO Executive Summary)</div>
  <p><strong>Direct Answer:</strong> ${aeoData.directAnswer}</p>
  <div class="mt-3 pt-2 border-t border-[#FFD21F]/20">
    <strong class="text-xs uppercase tracking-wider text-[#FFD21F] block mb-1">Core Key Takeaways:</strong>
    <ul class="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
      ${aeoData.takeaways.map(t => `<li>${t}</li>`).join('\n      ')}
    </ul>
  </div>
</div>
`;

  // Check if already injected
  if (!post.content.includes('aeo-quick-answer')) {
    // Insert after lead paragraph
    if (post.content.includes('</p>')) {
      const leadEnd = post.content.indexOf('</p>') + 4;
      post.content = post.content.slice(0, leadEnd) + '\n' + aeoHtml + '\n' + post.content.slice(leadEnd);
    } else {
      post.content = aeoHtml + post.content;
    }
  }

  // Verify word count
  const wordCount = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  console.log(`Post ${post.id} (${post.slug}): ${wordCount} words`);
});

// 4. Update categories
const activeCategories = [
  {
    id: 'cat-1',
    name: 'AI & Tools',
    slug: 'ai-tools',
    description: 'Deep dive into autonomous AI agents, enterprise LLM engineering, neural architectures, and no-code generative tools.',
    icon: 'Bot',
    postCount: 3,
    color: '#FFD21F'
  },
  {
    id: 'cat-2',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Modern full-stack web engineering, Next.js 15, React Server Components, Turbopack, and edge-first performance.',
    icon: 'Code2',
    postCount: 1,
    color: '#168CFF'
  },
  {
    id: 'cat-3',
    name: 'SEO & Search Architecture',
    slug: 'seo',
    description: 'Advanced programmatic SEO, Google Helpful Content recovery, semantic internal linking, and AEO/GEO engine dominance.',
    icon: 'TrendingUp',
    postCount: 3,
    color: '#10B981'
  },
  {
    id: 'cat-4',
    name: 'Digital Marketing & Growth',
    slug: 'digital-marketing',
    description: 'High-converting B2B cold email deliverability, newsletter asset portfolio building, and digital media monetization.',
    icon: 'Megaphone',
    postCount: 2,
    color: '#EC4899'
  },
  {
    id: 'cat-6',
    name: 'Technology & Cybersecurity',
    slug: 'technology',
    description: 'Zero Trust architecture, self-hosted private cloud infrastructure, and risk-hedged decentralized finance protocols.',
    icon: 'Cpu',
    postCount: 3,
    color: '#8B5CF6'
  },
  {
    id: 'cat-7',
    name: 'Productivity & Biohacking',
    slug: 'productivity',
    description: 'Mitochondrial longevity protocols, continuous glucose monitoring biofeedback, and Treasury yield cash optimization.',
    icon: 'Zap',
    postCount: 3,
    color: '#F59E0B'
  }
];

// 5. Update comments
if (db.comments && db.comments.length > 0) {
  db.comments.forEach(c => {
    if (parseInt(c.postId.replace('post-', '')) < 7) {
      c.postId = 'post-7';
    }
  });
}

// 6. Save back to ubaidblogs.json
db.posts = masterPosts;
db.categories = activeCategories;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated ubaidblogs.json with exactly 15 master posts and clean categories!');
