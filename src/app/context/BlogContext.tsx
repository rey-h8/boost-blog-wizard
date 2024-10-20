'use client';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import slugify from 'slugify';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  summary: string;
  category: string;
  content: string;
  date: string;
};

type NewBlogPost = Omit<BlogPost, 'id' | 'slug' | 'date'>;

type BlogPostError = {
  title?: string;
  author?: string;
  summary?: string;
  category?: string;
  content?: string;
};

type BlogState = {
  posts: BlogPost[];
  currentPost: Partial<BlogPost>;
};

type BlogAction =
  | { type: 'ADD_POST'; payload: NewBlogPost }
  | { type: 'SET_CURRENT_POST'; payload: Partial<BlogPost> }
  | { type: 'RESET_CURRENT_POST' };

type BlogContextType = {
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  addPost: () => void;
  errors: BlogPostError;
};

const initialBlogState: BlogState = {
  posts: [],
  currentPost: {},
};

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'ADD_POST':
      const newPost: BlogPost = {
        id: nanoid(8),
        slug: slugify(action.payload.title, { lower: true }),
        date: new Date().toLocaleDateString(),
        ...action.payload,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.payload,
      };
    case 'RESET_CURRENT_POST':
      return {
        ...state,
        currentPost: {},
      };
    default:
      return state;
  }
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(blogReducer, initialBlogState);
  const [errors, setErrors] = useState<BlogPostError>({});
  const router = useRouter();

  useEffect(() => {
    const savedPosts = localStorage.getItem('bwiz-blogPosts');
    if (savedPosts) {
      dispatch({ type: 'ADD_POST', payload: JSON.parse(savedPosts) });
    }
  }, []);

  useEffect(() => {
    if (state.posts.length) {
      localStorage.setItem('bwiz-blogPosts', JSON.stringify(state.posts));
    }
  }, [state.posts]);

  const addPost = () => {
    const { title, author, summary, category, content } = state.currentPost;

    const newErrors: BlogPostError = {};

    if (!title?.trim()) newErrors.title = 'Title is required.';
    if (!author?.trim()) newErrors.author = 'Author is required.';
    if (!summary?.trim()) newErrors.summary = 'Summary is required.';
    if (!category?.trim()) newErrors.category = 'Category is required.';
    if (!content?.trim()) newErrors.content = 'Content is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPost: NewBlogPost = {
      title: state.currentPost.title!,
      author: state.currentPost.author!,
      summary: state.currentPost.summary!,
      category: state.currentPost.category!,
      content: state.currentPost.content!,
    };

    setErrors({});

    dispatch({ type: 'ADD_POST', payload: newPost });
    router.push('/');
  };

  return (
    <BlogContext.Provider value={{ state, dispatch, addPost, errors }}>
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
