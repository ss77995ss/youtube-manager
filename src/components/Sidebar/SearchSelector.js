import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const SearchSelector = ({ value, onChange }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <Stack direction="row">
        <Radio value="videos">影片</Radio>
        <Radio value="categories">種類</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default SearchSelector;
