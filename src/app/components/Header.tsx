'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBlog } from '../context/BlogContext';

export const Header = () => {
  const { state } = useBlog();
  const pathname = usePathname();

  return (
    <div className='fixed top-0 left-0 z-10 p-4 px-8 w-full h-[var(--header-height)] bg-[#ebeaf2] shadow-md'>
      <div className='flex flex-row justify-between items-center h-full'>
        <Link href={'/'}>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 text-2xl font-extrabold'>
            Blog
          </span>
        </Link>
        {state.posts.length && pathname !== '/blog/create-post' ? (
          <Link href='/blog/create-post'>
            <Button>Add Blog Post</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
