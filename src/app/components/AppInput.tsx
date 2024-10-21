import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sanitizeInput } from '@/lib/utils';
import { NewBlogPost, useBlog } from '../context/BlogContext';

type AppInputProps = {
  label: string;
  field: string;
  type?: string;
};
const AppInput = ({ label, field, type = 'text' }: AppInputProps) => {
  const { state, dispatch } = useBlog();
  return (
    <>
      <Label htmlFor={field}>{label}</Label>
      <Input
        type={type}
        id={field}
        required
        defaultValue={sanitizeInput(
          state.currentPost[field as keyof NewBlogPost] || ''
        )}
        onChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { [field]: sanitizeInput(e.target.value || '') },
          })
        }
      />
    </>
  );
};

export default AppInput;
