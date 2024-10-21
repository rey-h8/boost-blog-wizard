'use client';

import { format, parse } from 'date-fns';
import { useParams } from 'next/navigation';
import { useBlog } from '../context/BlogContext';

const BlogPostDetail = () => {
  const {
    state: { posts },
  } = useBlog();
  const { id } = useParams();

  const post = posts.find((post) => post.id === id);

  let formattedDate = '';
  if (post) {
    parse(post.date, 'dd-MM-yyyy', new Date());

    formattedDate = format(
      parse(post.date, 'dd-MM-yyyy', new Date()),
      'dd MMMM yyyy'
    );
  }

  return post ? (
    <div className='container p-6 md:p-10 xl:px-14 min-h-screen mx-auto w-full max-w-3xl 2xl:max-w-4xl bg-white/70'>
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

      <p className='text-lg/7 mt-4'>{post?.content}</p>
    </div>
  ) : (
    <p>Loading post...</p>
  );
};

export default BlogPostDetail;
