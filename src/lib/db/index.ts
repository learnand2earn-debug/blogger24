import fs from 'fs';
import path from 'path';
import { Category, Comment, ContactMessage, NewsletterSubscriber, Post, SiteSettings, Tag } from '@/types';
import { initialCategories, initialPosts, initialSettings, initialTags } from './initial-data';

interface DatabaseSchema {
  settings: SiteSettings;
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  subscribers: NewsletterSubscriber[];
  messages: ContactMessage[];
  comments: Comment[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ubaidblogs.json');

// Memory cache for superfast SSR and mutations
let cache: DatabaseSchema | null = null;

function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // Ignore directory creation failure in read-only environments
    }
  }
}

function loadDatabase(): DatabaseSchema {
  if (cache) {
    return cache;
  }

  ensureDataDirectory();

  if (fs.existsSync(DB_FILE)) {
    try {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      cache = JSON.parse(fileData);
      if (cache && cache.posts) {
        return cache;
      }
    } catch (e) {
      console.error('Error reading database file, resetting to initial seed:', e);
    }
  }

  // Initial seed
  const initialData: DatabaseSchema = {
    settings: initialSettings,
    categories: initialCategories,
    tags: initialTags,
    posts: initialPosts,
    subscribers: [
      {
        id: "sub-1",
        email: "subscriber@ubaidblogs.com",
        subscribedAt: "2026-11-01T12:00:00Z",
        status: "active",
        unsubscribeToken: "token-sample-123"
      }
    ],
    messages: [
      {
        id: "msg-1",
        name: "Ali Khan",
        email: "ali@example.com",
        subject: "Collaboration on AI Tutorials",
        message: "Hello UbaidBlogs team! I really enjoy your articles on generative AI and would love to collaborate on a technical guest post.",
        createdAt: "2026-11-02T10:30:00Z",
        status: "read"
      }
    ],
    comments: [
      {
        id: "comm-1",
        postId: "post-1",
        authorName: "Sarah Jenkins",
        authorEmail: "sarah@example.com",
        content: "Outstanding guide! Gemini 2.5 Flash has completely streamlined our code reviews.",
        createdAt: "2026-11-02T11:45:00Z",
        approved: true
      }
    ]
  };

  saveDatabase(initialData);
  cache = initialData;
  return cache;
}

function saveDatabase(data: DatabaseSchema): void {
  cache = data;
  try {
    ensureDataDirectory();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write database file:', e);
  }
}

export const db = {
  // Posts
  getPosts(options: {
    category?: string;
    tag?: string;
    search?: string;
    status?: 'published' | 'draft' | 'all';
    limit?: number;
    offset?: number;
    sort?: 'newest' | 'popular' | 'oldest';
    featured?: boolean;
    trending?: boolean;
  } = {}): { posts: Post[]; total: number } {
    const data = loadDatabase();
    let filtered = [...data.posts];

    // Status filter (defaults to 'published' for public queries)
    if (options.status && options.status !== 'all') {
      filtered = filtered.filter(p => p.status === options.status);
    } else if (!options.status) {
      filtered = filtered.filter(p => p.status === 'published');
    }

    // Category filter
    if (options.category) {
      const catLower = options.category.toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === catLower);
    }

    // Tag filter
    if (options.tag) {
      const tagLower = options.tag.toLowerCase();
      filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tagLower || t.toLowerCase() === tagLower));
    }

    // Search filter
    if (options.search) {
      const query = options.search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Featured flag
    if (options.featured !== undefined) {
      filtered = filtered.filter(p => p.isFeatured === options.featured);
    }

    // Trending flag
    if (options.trending !== undefined) {
      filtered = filtered.filter(p => p.isTrending === options.trending);
    }

    // Sorting
    if (options.sort === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (options.sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      // Default: newest
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    const total = filtered.length;
    const offset = options.offset || 0;
    const limit = options.limit || total;
    const paginated = filtered.slice(offset, offset + limit);

    return { posts: paginated, total };
  },

  getPostBySlug(slug: string): Post | null {
    const data = loadDatabase();
    return data.posts.find(p => p.slug === slug) || null;
  },

  getPostById(id: string): Post | null {
    const data = loadDatabase();
    return data.posts.find(p => p.id === id) || null;
  },

  incrementViews(idOrSlug: string): void {
    const data = loadDatabase();
    const post = data.posts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (post) {
      post.views = (post.views || 0) + 1;
      saveDatabase(data);
    }
  },

  createPost(newPostData: Partial<Post>): Post {
    const data = loadDatabase();
    const id = `post-${Date.now()}`;
    const slug = (newPostData.slug || newPostData.title || id)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const categoryObj = data.categories.find(c => c.slug === newPostData.category);

    const post: Post = {
      id,
      title: newPostData.title || "Untitled Post",
      slug,
      excerpt: newPostData.excerpt || "",
      content: newPostData.content || "",
      featuredImage: newPostData.featuredImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      category: newPostData.category || "technology",
      categoryName: categoryObj ? categoryObj.name : "Technology",
      tags: newPostData.tags || ["Technology"],
      author: newPostData.author || {
        name: "Ubaid Team",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: "Editorial Lead"
      },
      publishedAt: newPostData.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime: newPostData.readingTime || "5 min read",
      views: 0,
      status: newPostData.status || "published",
      isFeatured: !!newPostData.isFeatured,
      isTrending: !!newPostData.isTrending,
      seoTitle: newPostData.seoTitle,
      seoDescription: newPostData.seoDescription,
      canonicalUrl: newPostData.canonicalUrl
    };

    data.posts.unshift(post);
    saveDatabase(data);
    return post;
  },

  updatePost(id: string, updates: Partial<Post>): Post | null {
    const data = loadDatabase();
    const index = data.posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    if (updates.category) {
      const cat = data.categories.find(c => c.slug === updates.category);
      if (cat) updates.categoryName = cat.name;
    }

    data.posts[index] = {
      ...data.posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveDatabase(data);
    return data.posts[index];
  },

  deletePost(id: string): boolean {
    const data = loadDatabase();
    const initialLen = data.posts.length;
    data.posts = data.posts.filter(p => p.id !== id);
    if (data.posts.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // Categories
  getCategories(): Category[] {
    const data = loadDatabase();
    // Dynamically update post count from published posts
    return data.categories.map(cat => {
      const count = data.posts.filter(p => p.status === 'published' && p.category.toLowerCase() === cat.slug.toLowerCase()).length;
      return { ...cat, count: Math.max(count, cat.count || 0) };
    });
  },

  getCategoryBySlug(slug: string): Category | null {
    const categories = this.getCategories();
    return categories.find(c => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  createCategory(newCat: Partial<Category>): Category {
    const data = loadDatabase();
    const id = `cat-${Date.now()}`;
    const slug = (newCat.slug || newCat.name || id).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category: Category = {
      id,
      name: newCat.name || "New Category",
      slug,
      description: newCat.description || "",
      icon: newCat.icon || "Folder",
      count: 0,
      color: newCat.color || "#FFD21F"
    };
    data.categories.push(category);
    saveDatabase(data);
    return category;
  },

  // Tags
  getTags(): Tag[] {
    const data = loadDatabase();
    return data.tags;
  },

  // Settings
  getSettings(): SiteSettings {
    const data = loadDatabase();
    return data.settings;
  },

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const data = loadDatabase();
    data.settings = { ...data.settings, ...updates };
    saveDatabase(data);
    return data.settings;
  },

  // Newsletter Subscribers
  getSubscribers(): NewsletterSubscriber[] {
    const data = loadDatabase();
    return data.subscribers;
  },

  addSubscriber(email: string): { success: boolean; message: string; duplicate?: boolean } {
    const data = loadDatabase();
    const trimmed = email.toLowerCase().trim();
    const existing = data.subscribers.find(s => s.email.toLowerCase() === trimmed);

    if (existing) {
      if (existing.status === 'active') {
        return { success: true, message: "You are already subscribed to UbaidBlogs newsletter!", duplicate: true };
      }
      existing.status = 'active';
      existing.subscribedAt = new Date().toISOString();
      saveDatabase(data);
      return { success: true, message: "Welcome back! Your subscription has been reactivated." };
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: trimmed,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      unsubscribeToken: Math.random().toString(36).substring(2) + Date.now().toString(36)
    };

    data.subscribers.unshift(newSubscriber);
    saveDatabase(data);
    return { success: true, message: "Thank you for subscribing to UbaidBlogs! You'll receive our best tutorials." };
  },

  unsubscribe(token: string): boolean {
    const data = loadDatabase();
    const sub = data.subscribers.find(s => s.unsubscribeToken === token);
    if (sub) {
      sub.status = 'unsubscribed';
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    const data = loadDatabase();
    return data.messages;
  },

  addContactMessage(msg: { name: string; email: string; subject: string; message: string }): ContactMessage {
    const data = loadDatabase();
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    data.messages.unshift(newMsg);
    saveDatabase(data);
    return newMsg;
  },

  updateContactMessageStatus(id: string, status: 'unread' | 'read'): boolean {
    const data = loadDatabase();
    const msg = data.messages.find(m => m.id === id);
    if (msg) {
      msg.status = status;
      saveDatabase(data);
      return true;
    }
    return false;
  },

  deleteContactMessage(id: string): boolean {
    const data = loadDatabase();
    const initialLen = data.messages.length;
    data.messages = data.messages.filter(m => m.id !== id);
    if (data.messages.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // Comments
  getComments(postId: string): Comment[] {
    const data = loadDatabase();
    return data.comments.filter(c => c.postId === postId && c.approved);
  },

  addComment(commentData: { postId: string; authorName: string; authorEmail: string; content: string }): Comment {
    const data = loadDatabase();
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      postId: commentData.postId,
      authorName: commentData.authorName,
      authorEmail: commentData.authorEmail,
      content: commentData.content,
      createdAt: new Date().toISOString(),
      approved: true // Auto-approved for seamless demo experience
    };
    data.comments.unshift(newComment);
    saveDatabase(data);
    return newComment;
  }
};

