import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostEditor } from '@/components/admin/PostEditor';

interface EditPostPageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: EditPostPageProps) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const post = db.getPostById(params.id) || db.getPostBySlug(params.id);
  if (!post) {
    notFound();
  }

  const categories = db.getCategories();

  return <PostEditor initialPost={post} categories={categories} isEditing={true} />;
}

