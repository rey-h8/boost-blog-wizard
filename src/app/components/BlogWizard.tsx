'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const BlogWizard = () => {
  const { state, addPost, dispatch, errors } = useBlog();
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

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
    <div className='h-full p-6'>
      <div className='py-4 px-6 bg-white max-w-2xl mx-auto rounded-lg '>
        {renderStep()}
        <div className='flex flex-row mt-8 gap-4'>
          <div className='flex flex-row w-full justify-end '>
            {step > 1 && (
              <Button variant='outline' onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className='flex flex-row w-full justify-start '>
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
  );
};

export default BlogWizard;
