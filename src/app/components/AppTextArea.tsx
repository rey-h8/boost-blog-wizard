import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput } from '@/lib/utils';
import { NewBlogPost, useBlog } from '../context/BlogContext';

const AppTextArea = ({ label, field }: { label: string; field: string }) => {
  const { state, dispatch } = useBlog();

  return (
    <>
      <Label htmlFor={field}>{label}</Label>
      <Textarea
        placeholder='Type your message here.'
        id={field}
        rows={3}
        required
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { [field]: sanitizeInput(e.target.value || '') },
          })
        }
        value={sanitizeInput(
          state.currentPost[field as keyof NewBlogPost] || ''
        )}
      />
    </>
  );
};

export default AppTextArea;
