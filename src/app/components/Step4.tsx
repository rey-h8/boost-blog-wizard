'use client';
import clsx from 'clsx';
import { useEffect } from 'react';
import {
  BlogPost,
  BlogPostError,
  NewBlogPost,
  useBlog,
} from '../context/BlogContext';

const Step4 = () => {
  const { state, errors, setErrors, validatePost } = useBlog();

  useEffect(() => {
    const formErrors = validatePost(state.currentPost as NewBlogPost);
    setErrors(formErrors);
  }, [state.currentPost]);

  const ReviewItem = ({
    label,
    field,
    titleClassName,
    contentClassName,
    errorClassName,
    html = false,
  }: {
    label: string;
    field: string;
    titleClassName?: string;
    contentClassName?: string;
    errorClassName?: string;
    html?: boolean;
  }) => {
    return (
      <div className='space-y-1'>
        <p className={clsx(['font-bold', titleClassName])}>{label}</p>
        {html ? (
          <div className='min-h-10 rounded-md border border-border border-gray-300 p-2'>
            <p
              dangerouslySetInnerHTML={{
                __html: state.currentPost[field as keyof BlogPost] || '',
              }}
            />
          </div>
        ) : (
          <div className='min-h-10 rounded-md border border-border border-gray-300 p-2'>
            <p className={clsx(['whitespace-pre-line', contentClassName])}>
              {state.currentPost[field as keyof BlogPost]}
            </p>
          </div>
        )}
        {errors[field as keyof BlogPostError] && (
          <small className={clsx(['text-red-700', errorClassName])}>
            {errors[field as keyof BlogPostError]}
          </small>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className='mb-6 text-xl'>
        Step 4 of 4: <strong>Review Your Blog Post</strong>
      </h2>

      <div className='space-y-4'>
        <ReviewItem label='Title' field='title' />
        <ReviewItem label='Author' field='author' />
        <ReviewItem label='Summary' field='summary' />
        <ReviewItem label='Category' field='category' />
        <ReviewItem label='Content' field='content' />
      </div>
    </div>
  );
};

export default Step4;
