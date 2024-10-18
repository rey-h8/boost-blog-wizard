import { categories } from '@/app/utils/constants';

const Step2: React.FC = () => {
  return (
    <div>
      <h2>Step 2: Blog Summary & Category</h2>
      <textarea name='summary' placeholder='Blog Summary' required />
      <select name='category'>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Step2;
