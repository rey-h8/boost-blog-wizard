'use client';

import { useBlog } from '../context/BlogContext';
import AppTextArea from './AppTextArea';

const Step3 = () => {
  const { state, dispatch } = useBlog();
  return (
    <div>
      <h2 className='mb-6 text-xl'>
        Step 3 of 4: <strong>Post Content</strong>
      </h2>

      <AppTextArea rows={10} label='Post Content' field='content' />
    </div>
  );
};

export default Step3;
