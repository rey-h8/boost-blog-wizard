'use client';

import { categories } from '@/app/utils/constants';
import { useBlog } from '../context/BlogContext';
import AppSelect from './AppSelect';
import TextArea from './AppTextArea';

const Step2 = () => {
  const { state, dispatch } = useBlog();

  return (
    <div>
      <h2>Step 2: Blog Summary & Category</h2>
      <TextArea label='Blog Summary' field='summary' />

      <AppSelect label='Blog Category' field='category' data={categories} />

      {/* <select
        name='category'
        required
        className='rounded-lg'

      >
        <option key='select' value=''>
          -- Select category --
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default Step2;
