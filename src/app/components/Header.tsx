import Link from 'next/link';
import Button from './Button';

export const Header = () => {
  return (
    <div className='fixed top-0 left-0 z-10 p-4 px-8 w-full h-20 bg-[#ebeaf2] shadow-md '>
      <div className='flex flex-row justify-between items-center'>
        <Link href={'/'}>
          <div className='text-3xl font-bold hover:text-rose-600 transition-all duration-100 ease-in-out'>
            My Blog
          </div>
        </Link>
        <Link href='/blog/create-post'>
          <Button>Add Blog Post</Button>
        </Link>
      </div>
    </div>
  );
};
