import { useRouter } from 'next/router';

export default function BlogPostPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  return (
    <div>
      <p>
        Blog Post: {id} {slug}
      </p>
    </div>
  );
}
