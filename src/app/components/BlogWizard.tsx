'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const BlogWizard = () => {
  const {
    state: { errors },
    addPost,
    dispatch,
  } = useBlog();
  const [step, setStep] = useState<number>(1);

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

  const handleSubmit = () => {
    addPost();
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_CURRENT_POST' });
    setStep(1);
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
    errors && (
      <div className='h-full p-6'>
        <div className='py-4 px-6 bg-white max-w-2xl mx-auto rounded-lg '>
          {renderStep()}

          <div className='flex flex-row mt-8 gap-4'>
            <div className='flex flex-1'>
              <Button variant='ghost' onClick={handleReset}>
                <p className='text-muted-foreground'>Reset</p>
              </Button>
            </div>
            <div className='flex flex-row justify-end gap-4'>
              {step > 1 && (
                <Button variant='outline' onClick={handleBack}>
                  Back
                </Button>
              )}
              {step < 4 && <Button onClick={handleNext}>Next</Button>}
              {step === 4 && (
                <Button
                  disabled={!!Object.keys(errors).length}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BlogWizard;
