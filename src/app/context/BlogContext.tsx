'use client';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useReducer } from 'react';
import slugify from 'slugify';
import { toast } from 'sonner';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  summary: string;
  category: string;
  content: string;
  date: string;
};

export type NewBlogPost = Omit<BlogPost, 'id' | 'slug' | 'date'>;

export type BlogPostError = {
  title?: string;
  author?: string;
  summary?: string;
  category?: string;
  content?: string;
};

type BlogState = {
  posts: BlogPost[];
  currentPost: Partial<BlogPost>;
  isReady: boolean;
  errors: BlogPostError;
};

type BlogAction =
  | { type: 'ADD_POST'; payload: NewBlogPost }
  | { type: 'SET_CURRENT_POST'; payload: Partial<BlogPost> }
  | { type: 'RESET_CURRENT_POST' }
  | { type: 'REPLACE_POSTS'; payload: BlogPost[] }
  | { type: 'SET_ERRORS'; payload: BlogPostError }
  | { type: 'SET_READY'; payload: boolean };

type BlogContextType = {
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  addPost: () => void;
  fetchPosts: () => BlogPost[];

  validatePost: (newPost: NewBlogPost) => BlogPostError;
};

const initialBlogState: BlogState = {
  posts: [],
  currentPost: {},
  isReady: false,
  errors: {},
};

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'ADD_POST':
      const newPost: BlogPost = {
        id: nanoid(8),
        slug: slugify(action.payload.title, { lower: true }),
        date: new Date().toISOString(),
        ...action.payload,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: { ...state.currentPost, ...action.payload },
      };
    case 'RESET_CURRENT_POST':
      window.localStorage.removeItem('bwiz-currentPost');
      return {
        ...state,
        currentPost: {},
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_READY':
      return {
        ...state,
        isReady: action.payload,
      };
    case 'REPLACE_POSTS':
      return {
        ...state,
        posts: action.payload.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      };
    default:
      return state;
  }
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(blogReducer, initialBlogState);
  const router = useRouter();

  useEffect(() => {
    const savedPosts = localStorage.getItem('bwiz-posts');

    const posts = JSON.parse(savedPosts || '[]');

    dispatch({ type: 'REPLACE_POSTS', payload: posts });

    const savedForm = localStorage.getItem('bwiz-currentPost');

    const currentPost = JSON.parse(savedForm || '{}');
    dispatch({ type: 'SET_CURRENT_POST', payload: currentPost });
    dispatch({ type: 'SET_READY', payload: true });
  }, []);

  useEffect(() => {
    if (state.posts.length) {
      localStorage.setItem('bwiz-posts', JSON.stringify(state.posts));
    }
  }, [state.posts]);

  useEffect(() => {
    if (Object.keys(state.currentPost).length) {
      localStorage.setItem(
        'bwiz-currentPost',
        JSON.stringify(state.currentPost)
      );
    }
  }, [state.currentPost]);

  const addPost = () => {
    const postErrors = validatePost(state.currentPost as NewBlogPost);

    dispatch({ type: 'SET_ERRORS', payload: postErrors });

    if (!Object.keys(postErrors).length) {
      const newPost: NewBlogPost = {
        title: state.currentPost.title!,
        author: state.currentPost.author!,
        summary: state.currentPost.summary!,
        category: state.currentPost.category!,
        content: state.currentPost.content!,
      };

      dispatch({ type: 'ADD_POST', payload: newPost });

      toast.success('Post submitted successfully.');

      dispatch({ type: 'SET_ERRORS', payload: {} });

      router.push('/');

      dispatch({ type: 'RESET_CURRENT_POST' });
    }
  };

  const fetchPosts = () => {
    return state.posts;
  };

  const validatePost = (newPost: NewBlogPost) => {
    const { title, author, summary, category, content } = newPost;

    const newErrors: BlogPostError = {};

    if (!title?.trim()) newErrors.title = 'Title is required.';
    if (!author?.trim()) newErrors.author = 'Author is required.';
    if (!summary?.trim()) newErrors.summary = 'Summary is required.';
    if (!category?.trim()) newErrors.category = 'Category is required.';
    if (!content?.trim()) newErrors.content = 'Content is required.';

    return newErrors;
  };

  return (
    <BlogContext.Provider
      value={{ state, dispatch, addPost, fetchPosts, validatePost }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('Blog context is not provided');
  }
  return context;
};
