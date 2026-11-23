const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'ubaidblogs.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- POSTS AUDIT ---');
console.log('Total posts:', db.posts.length);
const catSlugs = new Set(db.categories.map(c => c.slug));

let hasErrors = false;
db.posts.forEach((p, idx) => {
  if (!catSlugs.has(p.category)) {
    console.error('Post ' + p.id + ' has invalid category: ' + p.category);
    hasErrors = true;
  }
  if (!p.title || !p.slug || !p.content || !p.featuredImage) {
    console.error('Post ' + p.id + ' has missing required fields');
    hasErrors = true;
  }
  const words = p.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  if (words < 3000) {
    console.error('Post ' + p.id + ' has only ' + words + ' words (<3000)');
    hasErrors = true;
  } else {
    console.log('OK: ' + p.id + ' -> ' + words + ' words | ' + p.slug);
  }
});

console.log('\n--- CATEGORIES AUDIT ---');
db.categories.forEach(c => {
  const count = db.posts.filter(p => p.category === c.slug).length;
  console.log('Category: ' + c.slug + ' (declared count: ' + c.postCount + ', actual posts: ' + count + ')');
  if (c.postCount !== count) {
    console.warn('Mismatch in ' + c.slug + ': declared ' + c.postCount + ' vs actual ' + count);
  }
});

if (!hasErrors) {
  console.log('\nSUCCESS: ALL 15 POSTS VALIDATED! >= 3000 words, valid categories, valid fields!');
}
