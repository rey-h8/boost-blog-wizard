'use client';

import { categories } from '@/app/utils/constants';
import { useBlog } from '../context/BlogContext';
import AppSelect from './AppSelect';
import AppTextArea from './AppTextArea';

const Step2 = () => {
  const { state, dispatch } = useBlog();

  return (
    <div>
      <h2 className='mb-6 text-xl'>
        Step 2 of 4: <strong>Post Summary & Category</strong>
      </h2>

      <div className='space-y-4'>
        <AppTextArea label='Post Summary' field='summary' />

        <AppSelect label='Post Category' field='category' data={categories} />
      </div>
    </div>
  );
};

export default Step2;
