import { clsx, type ClassValue } from 'clsx';
import { format, parse } from 'date-fns';
import DOMPurify from 'dompurify';
import { twMerge } from 'tailwind-merge';

export function sanitizeInput(input: string) {
  if (!input) return input;
  return DOMPurify.sanitize(input);
}

export function formatDate(date: string) {
  return format(parse(date, 'dd-MM-yyyy', new Date()), 'dd MMMM yyyy');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
