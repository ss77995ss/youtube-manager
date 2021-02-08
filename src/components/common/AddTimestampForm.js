import { useForm } from 'react-hook-form';
import { Box, Heading, Button, Input, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import TimeSelector from './TimeSelector';

function AddTimestampForm({ addNewTimestamp }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (newTimestamp) => {
    addNewTimestamp(newTimestamp);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box my={4} border="1px solid" p={4}>
        <Heading as="h4" size="sm">
          新增時間軸
        </Heading>
        <Stack direction="row" mt={4} align="flex-end" flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}>
          <FormControl>
            <FormLabel htmlFor="title">名稱*</FormLabel>
            <Input name="title" type="text" ref={register({ required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">敘述（非必填）</FormLabel>
            <Input name="description" type="text" ref={register} />
          </FormControl>
        </Stack>
        <Stack direction="row" align="flex-end">
          <TimeSelector register={register} />
          <Button mt={[2, 2, 0, 0]} mr={2} type="submit" w={['33%', '33%', '15%', '12.5%']}>
            新增時間軸
          </Button>
        </Stack>
      </Box>
    </form>
  );
}

export default AddTimestampForm;
