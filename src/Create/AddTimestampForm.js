import { useForm } from 'react-hook-form';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import TimeSelector from './TimeSelector';

const AddTimestampForm = ({ setAddType, setTimestampList }) => {
  const handleCancel = () => setAddType('');
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => setTimestampList((prev) => [...prev, data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt={4} border="1px solid" p={4}>
        <Heading as="h4" size="sm">
          新增時間軸
        </Heading>
        <Flex mt={4} align="flex-end">
          <TimeSelector register={register} />
          <Button w="12%" onClick={handleCancel}>
            取消
          </Button>
          <Button type="submit" w="12%">
            新增時間軸
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default AddTimestampForm;
