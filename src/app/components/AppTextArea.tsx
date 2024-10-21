import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput } from '@/lib/utils';
import { NewBlogPost, useBlog } from '../context/BlogContext';

const AppTextArea = ({
  label,
  field,
  rows = 4,
}: {
  label: string;
  field: string;
  rows?: number;
}) => {
  const { state, dispatch } = useBlog();

  return (
    <div className='space-y-1'>
      <Label htmlFor={field}>{label}</Label>
      <Textarea
        id={field}
        rows={rows}
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
    </div>
  );
};

export default AppTextArea;
