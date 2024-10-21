'use client';

import AppInput from './AppInput';

const Step1 = () => {
  return (
    <div className=''>
      <h2 className='mb-6 text-xl'>
        Step 1 of 4: <strong>Post Metadata</strong>
      </h2>

      <div className='flex flex-col gap-4'>
        <AppInput label='Title' field='title' />

        <AppInput label='Author Name' field='author' />
      </div>
    </div>
  );
};

export default Step1;
