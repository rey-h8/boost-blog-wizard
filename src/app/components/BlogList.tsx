'use client';

import Link from 'next/link';
import { useBlog } from '../context/BlogContext';

export default function BlogList() {
  const {
    state: { posts },
  } = useBlog();

  const CategoryTech = () => {
    return (
      <div className='flex justify-center items-center px-2 py-[1px] text-xs font-medium w-min h-min bg-violet-200 text-blue-600 rounded-2xl '>
        tech
      </div>
    );
  };

  const CategoryLifestyle = () => {
    return (
      <div className='flex justify-center items-center px-2 py-[1px] text-xs font-medium w-min h-min bg-emerald-200 text-emerald-700 rounded-2xl'>
        lifestyle
      </div>
    );
  };

  const CategoryBusiness = () => {
    return (
      <div className='flex justify-center items-center px-2 py-[1px] text-xs font-medium w-min h-min bg-rose-200 text-rose-700 rounded-2xl '>
        business
      </div>
    );
  };

  return (
    <div className='container mx-auto p-4 pb-10'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {posts.map((post) => (
          <li
            key={post.id}
            className='group min-h-60 flex flex-col p-4 bg-white/75 hover:bg-white/90 transition-all duration-200 ease-in-out text-black/75 rounded-2xl'
          >
            <Link
              href={`/blog/${post.id}/${post.slug}`}
              className='flex flex-col h-full'
            >
              <div className='flex flex-col h-full'>
                <p className='text-xs text-gray-500/80 font-medium tracking-wider'>
                  {new Date(post.date).toLocaleDateString()}
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
                <div>
                  {post.category.toLowerCase() === 'tech' && <CategoryTech />}
                  {post.category.toLowerCase() === 'lifestyle' && (
                    <CategoryLifestyle />
                  )}
                  {post.category.toLowerCase() === 'business' && (
                    <CategoryBusiness />
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
