'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { BlogPost, useBlog } from '../context/BlogContext';
import LoadingSpinner from './LoadingSpinner';

export default function BlogList() {
  const {
    state: { posts, isReady },
  } = useBlog();

  const categoryMapping: Record<string, { text: string; bg: string }> = {
    tech: {
      text: 'text-blue-600',
      bg: 'bg-violet-200',
    },
    lifestyle: {
      text: 'text-emerald-700',
      bg: 'bg-emerald-200',
    },
    business: {
      text: 'text-rose-700',
      bg: 'bg-rose-200',
    },
  };

  const Category = ({ category }: { category: string }) => {
    return (
      <div
        className={`flex justify-center items-center px-2 py-[1px] text-xs font-medium w-min h-min ${categoryMapping[category].bg} ${categoryMapping[category].text} rounded-2xl`}
      >
        {category}
      </div>
    );
  };

  const PostCard = ({ post }: { post: BlogPost }) => {
    return (
      <li
        key={post.id}
        className='group min-h-60 flex flex-col p-4 bg-white/75 hover:bg-white/90 transition-all duration-200 ease-in-out text-black/75 rounded-2xl'
      >
        <Link
          href={`/blog/${post.id}/${post.slug}`}
          className='flex flex-col h-full'
        >
          <div className='flex flex-col h-full'>
            <p className='text-xs text-gray-500 font-medium tracking-wider'>
              {formatDate(post.date)}
            </p>
            <h2 className='text-xl font-semibold line-clamp-2 group-hover:underline'>
              {post.title}
            </h2>
            <p className='my-2 text-base line-clamp-3'>{post.summary}</p>
          </div>
          <div className='flex justify-between flex-row items-center '>
            <p className='uppercase text-xs tracking-widest text-rose-600'>
              {post.author}
            </p>
            <Category category={post.category?.toLowerCase()} />
          </div>
        </Link>
      </li>
    );
  };

  const EmptyList = () => {
    return (
      <div className='flex flex-col justify-center items-center container p-6 md:p-10 xl:px-14  mx-auto w-full max-w-3xl 2xl:max-w-4xl bg-white/90 rounded-xl'>
        <h2 className='text-2xl font-semibold mb-4 '>No Posts Yet</h2>
        <p className='text-lg mb-6 text-center'>
          It looks like you haven't written any posts yet 😯
          <br />
          Start sharing your thoughts and ideas with the world! 🌍
        </p>
        <Link href='/blog/create-post'>
          <Button>
            <p className='mr-1'>✍️</p> Create Your First Post
          </Button>
        </Link>
      </div>
    );
  };

  return !isReady ? (
    <div className='flex flex-row justify-center items-center h-full'>
      <LoadingSpinner className='size-24 stroke-white' />
    </div>
  ) : (
    <div className='container mx-auto p-4 pb-10'>
      {!posts.length && <EmptyList />}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </ul>
    </div>
  );
}
