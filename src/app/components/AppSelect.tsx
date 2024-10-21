import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sanitizeInput } from '@/lib/utils';
import { NewBlogPost, useBlog } from '../context/BlogContext';

type AppSelectProps = {
  label: string;
  field: string;
  data: string[];
};

const AppSelect = ({ label, field, data }: AppSelectProps) => {
  const { state, dispatch } = useBlog();
  return (
    <>
      <Label>{label}</Label>
      <Select
        defaultValue={state.currentPost[field as keyof NewBlogPost]}
        onValueChange={(e) =>
          dispatch({
            type: 'SET_CURRENT_POST',
            payload: { category: e },
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a blog category' />
        </SelectTrigger>
        <SelectContent>
          {data.map((value) => (
            <SelectItem key={value} value={sanitizeInput(value || '')}>
              {sanitizeInput(value || '')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default AppSelect;
