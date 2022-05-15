import { useTranslation } from 'react-i18next';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const SearchSelector = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <RadioGroup value={value} onChange={onChange}>
      <Stack direction="row">
        <Radio value="videos">{t('video')}</Radio>
        <Radio value="categories">{t('category')}</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default SearchSelector;
