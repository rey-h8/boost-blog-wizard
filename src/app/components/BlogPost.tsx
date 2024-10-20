'use client';

import { useParams } from 'next/navigation';
import { useBlog } from '../context/BlogContext';

const BlogPostDetail = () => {
  const {
    state: { posts },
  } = useBlog();
  const { id } = useParams();

  const post = posts.find((post) => post.id === id);

  return post ? (
    <div>
      <h1 className='text-xl font-bold'>Blog Post Detail</h1>
      <p>Title: {post?.title}</p>
      <p>Author: {post?.author}</p>
      <p>Summary: {post?.summary}</p>
      <p>Category: {post?.category}</p>
      <p>Content: {post?.content}</p>
    </div>
  ) : (
    <p>Loading post...</p>
  );
};

export default BlogPostDetail;
