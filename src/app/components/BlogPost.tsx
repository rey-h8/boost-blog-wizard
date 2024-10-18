interface BlogPostDetailProps {
  id: number;
  slug: string;
}

const BlogPostDetail = ({ id, slug }: BlogPostDetailProps) => {
  return (
    <div>
      <h1 className='text-xl font-bold'>
        Blog Post {id} {slug}
      </h1>
    </div>
  );
};

export default BlogPostDetail;
