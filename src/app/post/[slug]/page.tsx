import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, Eye, ArrowLeft, ArrowRight, Home, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArticleInteractive } from '@/components/blog/ArticleInteractive';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

// Dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = db.getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | UbaidBlogs',
      description: 'The requested article could not be found.',
    };
  }

  const title = post.seoTitle || `${post.title} | UbaidBlogs`;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || `https://ubaidblogs.com/post/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featuredImage],
    },
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const post = db.getPostBySlug(params.slug);

  if (!post || post.status === 'draft') {
    notFound();
  }

  const categories = db.getCategories();

  // Related posts (same category, excluding current post)
  const { posts: allCategoryPosts } = db.getPosts({
    category: post.category,
    limit: 4,
    status: 'published'
  });
  const relatedPosts = allCategoryPosts.filter(p => p.id !== post.id).slice(0, 3);

  // All published posts for Next / Prev navigation
  const { posts: allPublished } = db.getPosts({ status: 'published', sort: 'newest' });
  const currentIndex = allPublished.findIndex(p => p.id === post.id);
  const prevPost = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPublished[currentIndex - 1] : null;

  // Extract H2 and H3 headings for Table of Contents
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])>(.*?)<\/h\1>/g;
  let match;
  let modifiedContent = post.content;

  while ((match = regex.exec(post.content)) !== null) {
    const level = parseInt(match[1]);
    const rawText = match[2].replace(/<[^>]*>/g, '');
    const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    headings.push({ id, text: rawText, level });

    const originalTag = match[0];
    const newTag = `<h${level} id="${id}">${match[2]}</h${level}>`;
    modifiedContent = modifiedContent.replace(originalTag, newTag);
  }

  // Structured Data Schema (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UbaidBlogs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ubaidblogs.com/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ubaidblogs.com/post/${post.slug}`,
    },
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-[#07090D] min-h-screen">
        {/* Breadcrumbs Navigation */}
        <div className="bg-[#0A0E16] border-b border-[#161D2B] py-3">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-[#FFD21F] flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <Link href={`/category/${post.category}`} className="hover:text-[#FFD21F] whitespace-nowrap">
                {post.categoryName}
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-gray-200 truncate max-w-xs">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Container */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Article Main Column (8 cols) */}
            <article className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Header Elements */}
              <div>
                <Link
                  href={`/category/${post.category}`}
                  className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFD21F] text-black shadow-md shadow-black/50 mb-4 hover:bg-[#FFE047] transition-colors"
                >
                  {post.categoryName}
                </Link>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mb-5">
                  {post.title}
                </h1>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal mb-6">
                  {post.excerpt}
                </p>

                {/* Author Bar & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#182030] text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#FFD21F]/40"
                    />
                    <div>
                      <span className="block font-bold text-white leading-tight">
                        {post.author.name}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {post.author.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" />
                      <span>{formattedDate}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFD21F]" />
                      <span>{post.readingTime}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#FFD21F]" />
                      <span>{post.views} views</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Hero Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0F1420] border border-[#1F2738] shadow-2xl">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Extra Front / Gallery Images if uploaded */}
              {post.galleryImages && post.galleryImages.length > 0 && (
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#0E131E] border border-[#1E273A]">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Article Image Gallery:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {post.galleryImages.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden aspect-video border border-[#222E44] bg-[#0A0D14] shadow-md group">
                        <img
                          src={img}
                          alt={`${post.title} Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Module: Table of Contents & Sharing */}
              <ArticleInteractive post={post} headings={headings} />

              {/* Main Content Body */}
              <div
                className="article-body prose prose-invert max-w-none text-gray-300 leading-relaxed
                  prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#1E2536] prose-h2:pb-2
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#FFD21F]
                  prose-p:text-base prose-p:mb-5 prose-p:leading-relaxed
                  prose-a:text-[#FFD21F] prose-a:underline hover:prose-a:text-[#FFE047]
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-5
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-5
                  prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-[#FFD21F] prose-blockquote:bg-[#111624] prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:my-6
                  prose-pre:bg-[#0B0E14] prose-pre:border prose-pre:border-[#1E2536] prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6
                  prose-code:text-[#FFD21F] prose-code:font-mono prose-code:text-sm
                  prose-table:w-full prose-table:border-collapse prose-table:my-6
                  prose-th:bg-[#141824] prose-th:p-3 prose-th:text-left prose-th:text-xs prose-th:font-bold prose-th:text-white prose-th:border prose-th:border-[#222C3F]
                  prose-td:p-3 prose-td:text-xs prose-td:border prose-td:border-[#222C3F] prose-td:bg-[#0D111A]"
                dangerouslySetInnerHTML={{ __html: modifiedContent }}
              />

              {/* Tags List */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#182030]">
                  <span className="text-xs font-bold text-gray-400">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#131722] hover:bg-[#FFD21F] hover:text-black text-gray-300 border border-[#202738] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-[#11151F] border border-[#1C2333] flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FFD21F]"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-base font-bold text-white">{post.author.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFD21F]/15 text-[#FFD21F]">
                      {post.author.role}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {post.author.bio || "Writer and researcher at UbaidBlogs covering artificial intelligence, modern frontend engineering, and tech industry breakthroughs."}
                  </p>
                </div>
              </div>

              {/* Next / Previous Article Navigation */}
              <nav aria-label="Previous and Next Articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/post/${prevPost.slug}`}
                    className="p-4 rounded-xl bg-[#11151F] border border-[#1C2333] hover:border-[#FFD21F]/40 flex flex-col justify-between group transition-all"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-[#FFD21F] font-bold mb-1">
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      <span>Previous Article</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link
                    href={`/post/${nextPost.slug}`}
                    className="p-4 rounded-xl bg-[#11151F] border border-[#1C2333] hover:border-[#FFD21F]/40 flex flex-col justify-between items-end text-right group transition-all"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-[#FFD21F] font-bold mb-1">
                      <span>Next Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : <div />}
              </nav>

              {/* Related Articles Section */}
              {relatedPosts.length > 0 && (
                <section className="pt-8 border-t border-[#182030]">
                  <h3 className="text-xl font-black text-white mb-6">
                    Related Articles in {post.categoryName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {relatedPosts.map((related) => (
                      <ArticleCard key={related.id} post={related} variant="compact" />
                    ))}
                  </div>
                </section>
              )}

            </article>

            {/* Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <Sidebar categories={categories} recentPosts={allCategoryPosts} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
