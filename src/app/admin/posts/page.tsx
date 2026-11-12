import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostsManagerClient } from './PostsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const { posts } = db.getPosts({ status: 'all', limit: 200 });
  const categories = db.getCategories();

  return <PostsManagerClient initialPosts={posts} categories={categories} />;
}

