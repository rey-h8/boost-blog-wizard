'use client';

import Link from 'next/link';
import { useBlog } from '../context/BlogContext';

export default function BlogList() {
  const {
    state: { posts },
  } = useBlog();
  return (
    <div>
      <h1 className='text-xl font-bold'>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className='border p-4 mt-2'>
          <Link href={`/blog/${post.id}/${post.slug}`}>
            <h2 className='text-lg font-semibold'>{post.title}</h2>
            <p>{post.summary}</p>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <p>
              <strong>Date:</strong> {post.date}
            </p>
            <p>
              <strong>Category:</strong> {post.category}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
