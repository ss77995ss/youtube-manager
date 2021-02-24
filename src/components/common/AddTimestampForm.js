import { useForm } from 'react-hook-form';
import { Box, Heading, Button, Input, FormControl, FormLabel, ButtonGroup, Stack } from '@chakra-ui/react';
import TimeSelector from './TimeSelector';

function AddTimestampForm({ addNewTimestamp, handleChangeMode }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (newTimestamp) => {
    addNewTimestamp(newTimestamp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2} border="1px solid" p={4} rounded="md" shadow="md">
        <Heading as="h4" size="sm">
          新增時間軸
        </Heading>
        <Stack direction={['column', 'column', 'row', 'row']} mt={2}>
          <FormControl>
            <FormLabel htmlFor="title">名稱*</FormLabel>
            <Input name="title" type="text" ref={register({ required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">敘述（非必填）</FormLabel>
            <Input name="description" type="text" ref={register} />
          </FormControl>
        </Stack>
        <Stack>
          <TimeSelector register={register} />
          <ButtonGroup justifyContent="flex-end">
            <Button type="submit" w={['50%', '50%', '30%', '25%']}>
              確認
            </Button>
            <Button onClick={handleChangeMode} w={['50%', '50%', '30%', '25%']}>
              取消
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </form>
  );
}

export default AddTimestampForm;
