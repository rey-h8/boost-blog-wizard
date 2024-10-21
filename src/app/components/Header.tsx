import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='fixed top-0 left-0 z-10 p-4 px-8 w-full h-20 bg-[#ebeaf2] shadow-md '>
      <div className='flex flex-row justify-between items-center'>
        <Link href={'/'}>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 text-2xl font-extrabold'>
            Blog
          </span>
        </Link>
        <Link href='/blog/create-post'>
          <Button>Add Blog Post</Button>
        </Link>
      </div>
    </div>
  );
};
