'use client';

import { useBlog } from '../context/BlogContext';

const Step3 = () => {
  const { state, dispatch } = useBlog();
  return (
    <div>
      <h2>Step 3: Blog Content</h2>
      <textarea
        name='content'
        placeholder='Blog Content'
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { content: e.target.value },
          })
        }
        value={state.currentPost.content}
      />
    </div>
  );
};

export default Step3;
