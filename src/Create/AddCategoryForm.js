import { useForm } from 'react-hook-form';
import TimeSelector from './TimeSelector';

const AddCategoryForm = () => {
  const { register } = useForm();
  return (
    <form>
      <TimeSelector register={register} />
    </form>
  );
};

export default AddCategoryForm;
