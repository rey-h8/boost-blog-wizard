import Link from 'next/link';
import BlogListPage from './blog/page';
import Button from './components/Button';

export default function Home() {
  return (
    <div>
      <Link href='/blog/create-post'>
        <Button>Add Blog Post</Button>
      </Link>
      <BlogListPage />
    </div>
  );
}
