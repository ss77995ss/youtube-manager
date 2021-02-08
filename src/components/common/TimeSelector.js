import { Box, Stack, Text, Select, FormControl } from '@chakra-ui/react';

const FormItem = ({ children }) => <FormControl w="5rem">{children}</FormControl>;

function TimeSelector({ register }) {
  return (
    <Box>
      <Text mr={3} mb={2} align="left" fontWeight={500}>
        時間
      </Text>
      <Stack direction="row" align="center">
        <FormItem>
          <Select ref={register} name="hour">
            {[...Array(24).keys()].map((number) => (
              <option value={number}>{`0${number}`.slice(-2)}</option>
            ))}
          </Select>
        </FormItem>
        <Text>：</Text>
        <FormItem mx={4}>
          <Select ref={register} name="minute">
            {[...Array(60).keys()].map((number) => (
              <option value={number}>{`0${number}`.slice(-2)}</option>
            ))}
          </Select>
        </FormItem>
        <Text>：</Text>
        <FormItem>
          <Select ref={register} name="second">
            {[...Array(60).keys()].map((number) => (
              <option value={number}>{`0${number}`.slice(-2)}</option>
            ))}
          </Select>
        </FormItem>
      </Stack>
    </Box>
  );
}

export default TimeSelector;
