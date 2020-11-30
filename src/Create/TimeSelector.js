import { Box, Flex, Text, Input, Select, FormControl, FormLabel } from '@chakra-ui/react';

const FormItem = ({ children }) => <FormControl mr={4}>{children}</FormControl>;

const TimeSelector = ({ register }) => {
  return (
    <>
      <Box>
        <FormItem>
          <FormLabel htmlFor="title">名稱（非必填）</FormLabel>
          <Input name="title" type="text" ref={register} />
        </FormItem>
      </Box>
      <Box>
        <FormItem>
          <FormLabel htmlFor="category">類別（非必填）</FormLabel>
          <Input name="category" type="text" ref={register} />
        </FormItem>
      </Box>
      <Box>
        <Text mr={3} mb={2} align="left" fontWeight={500}>
          時間
        </Text>
        <Flex align="center">
          <FormItem>
            <Select ref={register} name="hour">
              {[...Array(23).keys()].map((number) => (
                <option value={number}>{`0${number}`.slice(-2)}</option>
              ))}
            </Select>
          </FormItem>
          <Text mr={4}>：</Text>
          <FormItem mx={4}>
            <Select ref={register} name="minute">
              {[...Array(59).keys()].map((number) => (
                <option value={number}>{`0${number}`.slice(-2)}</option>
              ))}
            </Select>
          </FormItem>
          <Text mr={4}>：</Text>
          <FormItem>
            <Select ref={register} name="second">
              {[...Array(59).keys()].map((number) => (
                <option value={number}>{`0${number}`.slice(-2)}</option>
              ))}
            </Select>
          </FormItem>
        </Flex>
      </Box>
    </>
  );
};

export default TimeSelector;
