'use client';

import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import Button from './Button';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const BlogWizard = () => {
  const [step, setStep] = useState<number>(1);
  const { state } = useBlog();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <>
        <div>
          <strong>Title:</strong>
          <p>{state.currentPost.title}</p>
        </div>
        <div>
          <strong>Author:</strong>
          <p>{state.currentPost.author}</p>
        </div>
        <div>
          <strong>Summary:</strong>
          <p>{state.currentPost.summary}</p>
        </div>
        <div>
          <strong>Category:</strong>
          <p>{state.currentPost.category}</p>
        </div>
        <div>
          <strong>Content:</strong>
          <p>{state.currentPost.content}</p>
        </div>
      </>
      {renderStep()}
      <div>
        {step > 1 && <Button onClick={handleBack}>Back</Button>}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
};

export default BlogWizard;
