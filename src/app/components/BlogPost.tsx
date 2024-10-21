'use client';

import { formatDate } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from './LoadingSpinner';

const BlogPostDetail = () => {
  const {
    state: { posts },
  } = useBlog();
  const { id } = useParams();

  const post = posts.find((post) => post.id === id);

  let formattedDate = '';
  if (post) {
    formattedDate = formatDate(post.date);
  }

  return post ? (
    <div className='container p-6 md:p-10 xl:px-14 min-h-content mx-auto max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-2xl 2xl:max-w-3xl bg-white/90'>
      <p className='uppercase text-muted-foreground tracking-wide font-semibold mb-2'>
        {post?.category}
      </p>
      <h2 className='text-4xl mb-4 font-extrabold'>{post?.title}</h2>
      <p className='text-2xl text-muted-foreground font-semibold mb-6'>
        {post?.summary}
      </p>
      <div className='flex flex-col '>
        <p className='uppercase tracking-widest text-rose-600 '>
          {post?.author}
        </p>
        <p className=' text-gray-500 text-sm font-medium'>{formattedDate}</p>
      </div>
      <hr className='border border-gray-300 my-6' />

      <p className='text-lg/7 mt-4 whitespace-pre-line'>{post?.content}</p>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <LoadingSpinner className='size-24 stroke-white' />
    </div>
  );
};

export default BlogPostDetail;
