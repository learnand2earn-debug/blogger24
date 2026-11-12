export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export type BlockType =
  | 'paragraph'
  | 'heading2'
  | 'heading3'
  | 'image'
  | 'gallery'
  | 'list'
  | 'quote'
  | 'callout';

export interface GalleryItem {
  url: string;
  caption?: string;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  url?: string;
  caption?: string;
  alt?: string;
  images?: GalleryItem[];
  items?: string[];
  calloutType?: 'info' | 'tip' | 'warning';
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  galleryImages?: string[];
  blocks?: ContentBlock[];
  category: string; // slug
  categoryName: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  views: number;
  status: 'published' | 'draft';
  isFeatured: boolean;
  isTrending: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  unsubscribeToken: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  announcementText: string;
  announcementActive: boolean;
  socialLinks: {
    facebook: string;
    youtube: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    github?: string;
  };
  googleVerification?: string;
  allowComments: boolean;
  allowNewsletter: boolean;
}
