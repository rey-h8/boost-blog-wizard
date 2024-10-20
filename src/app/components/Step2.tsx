'use client';

import { categories } from '@/app/utils/constants';
import { useBlog } from '../context/BlogContext';

const Step2 = () => {
  const { state, dispatch } = useBlog();

  return (
    <div>
      <h2>Step 2: Blog Summary & Category</h2>
      <textarea
        name='summary'
        placeholder='Blog Summary'
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { summary: e.target.value },
          })
        }
        value={state.currentPost.summary}
      />
      <select
        name='category'
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { category: e.target.value },
          })
        }
        value={state.currentPost.category}
      >
        <option key='select' value=''>
          -- Select category --
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Step2;
