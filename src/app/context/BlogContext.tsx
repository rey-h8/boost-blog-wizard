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
  | { type: 'RESET_CURRENT_POST' }
  | { type: 'REPLACE_POSTS'; payload: BlogPost[] };

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
  console.log('action', action);
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
        currentPost: { ...state.currentPost, ...action.payload },
      };
    case 'RESET_CURRENT_POST':
      return {
        ...state,
        currentPost: {},
      };
    case 'REPLACE_POSTS':
      return {
        ...state,
        posts: action.payload,
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
    const dummyPosts = [
      {
          "id": "c7K9l4DgH3",
          "title": "5 Essential Tools for Web Developers in 2024",
          "summary": "This blog explores 5 essential tools for web developers in 2024",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "5-essential-tools-for-web-developers-in-2024",
          "date": "2024-09-23",
          "category": "Tech",
          "author": "Alex Thompson"
      },
      {
          "id": "wK2s8YgT1B",
          "title": "A Deep Dive into Node.js Performance Optimization",
          "summary": "This blog explores a deep dive into node.js performance optimization",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "a-deep-dive-into-node-js-performance-optimization",
          "date": "2024-10-07",
          "category": "Tech",
          "author": "Sophia Miller"
      },
      {
          "id": "xR1q5WbC8N",
          "title": "Understanding Kubernetes: A Beginner’s Guide",
          "summary": "This blog explores understanding kubernetes: a beginner’s guide",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "understanding-kubernetes-a-beginners-guide",
          "date": "2024-09-29",
          "category": "Tech",
          "author": "James Wright"
      },
      {
          "id": "zP4n3DkV6L",
          "title": "The Future of React Native: Trends to Watch",
          "summary": "This blog explores the future of react native: trends to watch",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "the-future-of-react-native-trends-to-watch",
          "date": "2024-10-01",
          "category": "Tech",
          "author": "Emily Clark"
      },
      {
          "id": "hM5t7NqX9F",
          "title": "Exploring the Latest Features of PostgreSQL 15",
          "summary": "This blog explores exploring the latest features of postgresql 15",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "exploring-the-latest-features-of-postgresql-15",
          "date": "2024-09-17",
          "category": "Tech",
          "author": "Michael Brown"
      },
      {
          "id": "bA3v2XrL9H",
          "title": "Top 5 Business Trends Shaping 2024",
          "summary": "This blog discusses the top 5 business trends that are expected to shape 2024.",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "top-5-business-trends-shaping-2024",
          "date": "2024-09-25",
          "category": "Business",
          "author": "Rachel Adams"
      },
      {
          "id": "pR6j8NzQ2V",
          "title": "How AI is Revolutionizing the Business World",
          "summary": "This blog examines how AI is transforming various sectors in the business world.",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "how-ai-is-revolutionizing-the-business-world",
          "date": "2024-10-05",
          "category": "Business",
          "author": "John Davis"
      },
      {
          "id": "vK7m4YeQ8B",
          "title": "10 Simple Habits for a Healthier Lifestyle",
          "summary": "This blog covers 10 simple habits you can adopt for a healthier lifestyle.",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "10-simple-habits-for-a-healthier-lifestyle",
          "date": "2024-10-02",
          "category": "Lifestyle",
          "author": "Sarah Wilson"
      },
      {
          "id": "dH9n1QrS5L",
          "title": "The Ultimate Guide to Work-Life Balance",
          "summary": "This blog provides the ultimate guide to achieving a better work-life balance.",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "slug": "the-ultimate-guide-to-work-life-balance",
          "date": "2024-09-30",
          "category": "Lifestyle",
          "author": "Chris Taylor"
      }
  ]
  

    const savedPosts = localStorage.getItem('bwiz-blogPosts');

    let posts = JSON.parse(savedPosts || '[]');

    if (!posts.length) {
      posts = dummyPosts;
    }

    dispatch({ type: 'REPLACE_POSTS', payload: posts });
  }, []);

  useEffect(() => {
    if (state.posts.length) {
      localStorage.setItem('bwiz-blogPosts', JSON.stringify(state.posts));
    }
  }, [state.posts]);

  const addPost = () => {
    const newErrors = validateNewPost(state.currentPost as NewBlogPost);

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

  const validateNewPost = (newPost: NewBlogPost) => {
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
