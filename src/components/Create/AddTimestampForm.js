import { useForm } from 'react-hook-form';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import TimeSelector from './TimeSelector';

function AddTimestampForm({ setAddType, setTimestampList }) {
  const handleCancel = () => setAddType('');
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setTimestampList((prev) => [...prev, data]);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box my={4} border="1px solid" p={4}>
        <Heading as="h4" size="sm">
          新增時間軸
        </Heading>
        <Flex mt={4} align="flex-end" flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}>
          <TimeSelector register={register} />
          <Button mt={[2, 2, 0, 0]} mr={2} w={['33%', '33%', '12.5%', '12.5%']} onClick={handleCancel}>
            取消
          </Button>
          <Button mt={[2, 2, 0, 0]} mr={2} type="submit" w={['33%', '33%', '15%', '12.5%']}>
            新增時間軸
          </Button>
        </Flex>
      </Box>
    </form>
  );
}

export default AddTimestampForm;
