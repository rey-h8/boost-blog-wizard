'use client';

const Step1 = () => {
  return (
    <div>
      <h2>Step 1: Blog Metadata</h2>
      <input type='text' name='title' placeholder='Blog Title' required />
      <input type='text' name='author' placeholder='Author Name' required />
    </div>
  );
};

export default Step1;
