import Link from 'next/link';
import { Fragment } from 'react';
import BlogListPage from './blog/page';
import Button from './components/Button';

export default function Home() {
  return (
    <Fragment>
      <Link href='/blog/create-post'>
        <Button>Add Blog Post</Button>
      </Link>
      <BlogListPage />
    </Fragment>
  );
}
