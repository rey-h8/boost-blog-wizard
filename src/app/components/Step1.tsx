'use client';

import AppInput from './AppInput';

const Step1 = () => {
  return (
    <div className='container mx-auto p-4'>
      <h2 className='mb-4'>
        Step 1 of 4: <strong>Blog Metadata</strong>
      </h2>

      <div className='flex flex-col gap-1 mb-4'>
        <AppInput label='Title' field='title' />
      </div>

      <div className='flex flex-col gap-1'>
        <AppInput label='Author Name' field='author' />
      </div>
    </div>
  );
};

export default Step1;
