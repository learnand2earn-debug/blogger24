import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = (searchParams.get('sort') as 'newest' | 'popular' | 'oldest') || 'newest';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
    const featured = searchParams.has('featured') ? searchParams.get('featured') === 'true' : undefined;
    const trending = searchParams.has('trending') ? searchParams.get('trending') === 'true' : undefined;

    // Check if admin is requesting to view drafts
    const statusParam = searchParams.get('status') as 'published' | 'draft' | 'all' | null;
    let status: 'published' | 'draft' | 'all' = 'published';

    if (statusParam && (statusParam === 'draft' || statusParam === 'all')) {
      const isAuth = await isAdminAuthenticated();
      if (isAuth) {
        status = statusParam;
      }
    }

    const result = db.getPosts({
      category,
      tag,
      search,
      sort,
      limit,
      offset,
      featured,
      trending,
      status
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json({ error: 'Title, excerpt, and content are required' }, { status: 400 });
    }

    const post = db.createPost(body);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

