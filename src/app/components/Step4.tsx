'use client';

import Button from './Button';

const Step4: React.FC = () => {
  return (
    <div>
      <h2>Review Your Blog Post</h2>
      <p>
        <strong>Title:</strong>{' '}
      </p>
      <p>
        <strong>Author:</strong>{' '}
      </p>
      <p>
        <strong>Summary:</strong>{' '}
      </p>
      <p>
        <strong>Category:</strong>{' '}
      </p>
      <p>
        <strong>Content:</strong>{' '}
      </p>
      <Button>Submit</Button>
    </div>
  );
};

export default Step4;
