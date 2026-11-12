import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const { posts } = db.getPosts({ status: 'published', limit: 30 });
  const baseUrl = 'https://ubaidblogs.com';

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/post/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/post/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.categoryName}]]></category>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>UbaidBlogs — Knowledge • Technology • Success</title>
    <link>${baseUrl}</link>
    <description>Your premier destination for AI, Web Development, SEO, Digital Marketing and Technology tutorials.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

