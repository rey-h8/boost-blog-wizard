'use client';

import { useBlog } from '../context/BlogContext';

const Step1 = () => {
  const { state, dispatch } = useBlog();
  return (
    <div>
      <h2>Step 1: Blog Metadata</h2>
      <input
        type='text'
        name='title'
        placeholder='Blog Title'
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { title: e.target.value },
          })
        }
        value={state.currentPost.title}
      />
      <input
        type='text'
        name='author'
        placeholder='Author Name'
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { author: e.target.value },
          })
        }
        value={state.currentPost.author}
      />
    </div>
  );
};

export default Step1;
