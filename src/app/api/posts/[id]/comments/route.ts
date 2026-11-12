import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = db.getComments(params.id);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { authorName, authorEmail, content } = body;

    if (!authorName || !authorEmail || !content) {
      return NextResponse.json({ error: 'Name, email, and comment message are required' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    const comment = db.addComment({
      postId: params.id,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      content: content.trim()
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 });
  }
}

