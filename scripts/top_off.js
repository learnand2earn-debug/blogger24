const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'ubaidblogs.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Post 8 top-off
const p8 = data.posts.find(p => p.id === 'post-8');
if (p8) {
  p8.content = p8.content.replace('<h2>Frequently Asked Questions', `
<hr />
<h2>8. Asymmetric Rebalancing: Locking Digital Profits into Hard Assets</h2>
<p>The cardinal rule of digital asset operators is never allowing all accumulated capital to remain concentrated inside the digital ecosystem. Digital cashflows are asymmetric and high-yield, but they carry platform risk. The professional wealth architecture systematically sweeps 40% of net monthly digital distributions into tangible, non-correlated hard assets:</p>
<ul>
  <li><strong>Physical Gold & Sovereign Bullion:</strong> 10% allocation as a counterparty-free systemic inflation hedge.</li>
  <li><strong>Debt-Free Real Estate:</strong> Cashflow from digital media assets channeled into single-family rental properties or multi-family real estate syndications for accelerated tax depreciation.</li>
  <li><strong>Short-Term Sovereign Treasuries:</strong> Maintaining a rolling 12-month operating runway in 4-week US Treasury Bills to take advantage of market downturns.</li>
</ul>

<h2>Frequently Asked Questions`);
}

// Post 12 top-off
const p12 = data.posts.find(p => p.id === 'post-12');
if (p12) {
  p12.content = p12.content.replace('<h2>Frequently Asked Questions', `
<hr />
<h2>12. Edge Caching & Stale-While-Revalidate Headers</h2>
<p>When serving thousands of programmatic pages from Next.js on edge CDNs (such as Cloudflare or Vercel Edge Network), configuring optimal <code>Cache-Control</code> headers ensures that 99.8% of user requests hit regional edge caches without invoking serverless origin functions:</p>
<pre><code class="language-text">Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800</code></pre>
<p>This tells the edge CDN to serve fresh HTML for 24 hours, while permitting the background worker to re-fetch upstream database changes asynchronously without keeping the end user waiting.</p>

<h2>Frequently Asked Questions`);
}

// Post 17 top-off
const p17 = data.posts.find(p => p.id === 'post-17');
if (p17) {
  p17.content = p17.content.replace('<h2>Frequently Asked Questions', `
<hr />
<h2>13. Complete Hardware Bill of Materials (BOM)</h2>
<p>Below is the verified, silent component list for building a commercial-grade home cloud server under $350 total investment:</p>
<ul>
  <li><strong>Mini-PC Chassis:</strong> Beelink or GMKTec Intel N100 (16GB DDR5, 512GB NVMe M.2) — ~$155.</li>
  <li><strong>Mass Storage Drives:</strong> Dual 4TB Western Digital Red Plus 5400 RPM NAS Drives — ~$160.</li>
  <li><strong>Dual-Drive USB 3.2 Gen 2 RAID Enclosure:</strong> Aluminum passively cooled enclosure with independent power supply — ~$35.</li>
  <li><strong>Offline Decryption Cold Key:</strong> SanDisk 32GB Metal Flash Drive storing encrypted Restic repository credentials — ~$10.</li>
</ul>

<h2>Frequently Asked Questions`);
}

fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Top-off complete!');

