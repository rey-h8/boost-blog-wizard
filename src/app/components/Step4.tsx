'use client';

import { useRouter } from 'next/navigation';
import { useBlog } from '../context/BlogContext';
import Button from './Button';

const Step4 = () => {
  const { state, addPost, dispatch, errors } = useBlog();
  const router = useRouter();

  const handleSubmit = () => {
    addPost();
    if (!Object.keys(errors).length) {
      dispatch({ type: 'RESET_CURRENT_POST' });
      router.push('/');
    }
  };

  return (
    <div>
      <h2>Review Your Blog Post</h2>
      <div>
        <strong>Title:</strong>
        <p>{state.currentPost.title}</p>
      </div>
      {errors.title && <small className='text-red-700'>{errors.title}</small>}
      <div>
        <strong>Author:</strong>
        <p>{state.currentPost.author}</p>
      </div>
      {errors.author && <small className='text-red-700'>{errors.author}</small>}
      <div>
        <strong>Summary:</strong>
        <p>{state.currentPost.summary}</p>
      </div>
      {errors.summary && (
        <small className='text-red-700'>{errors.summary}</small>
      )}
      <div>
        <strong>Category:</strong>
        <p>{state.currentPost.category}</p>
      </div>
      {errors.category && (
        <small className='text-red-700'>{errors.category}</small>
      )}
      <div>
        <strong>Content:</strong>
        <p>{state.currentPost.content}</p>
      </div>
      {errors.content && (
        <small className='text-red-700'>{errors.content}</small>
      )}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Step4;
