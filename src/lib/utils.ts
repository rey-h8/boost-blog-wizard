import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import DOMPurify from 'dompurify';
import { twMerge } from 'tailwind-merge';

export function sanitizeInput(input: string) {
  if (!input) return input;
  return DOMPurify.sanitize(input);
}

export function formatDate(date: string) {
  return format(parseISO(date), 'dd MMMM yyyy, HH:mm');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
