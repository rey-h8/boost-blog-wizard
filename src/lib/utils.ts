import { clsx, type ClassValue } from 'clsx';
import DOMPurify from 'dompurify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeInput(input: string) {
  if (!input) return input;
  return DOMPurify.sanitize(input);
}
