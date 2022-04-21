import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  ButtonGroup,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { timeToSeconds } from '../../utils/common';
import { useVideosCtx } from '../../hooks/useVideos';
import CategoryForm from './CategoryForm';
import TimeSelector from './TimeSelector';

function UpdateTimestampModal({ timestamp, actions, isOpen, onClose }) {
  const { id, startTime, endTime } = timestamp;
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...timestamp,
      startHour: startTime.hour,
      startMinute: startTime.minute,
      startSecond: startTime.second,
      endHour: endTime.hour,
      endMinute: endTime.minute,
      endSecond: endTime.second,
    },
  });
  const { timestampCategories } = useVideosCtx();

  const onSubmit = ({ startHour, startMinute, startSecond, endHour, endMinute, endSecond, ...rest }) => {
    const startTime = {
      hour: startHour,
      minute: startMinute,
      second: startSecond,
    };
    const endTime = {
      hour: endHour,
      minute: endMinute,
      second: endSecond,
    };

    if (timeToSeconds(startTime) > timeToSeconds(endTime)) return alert('開始時間不能晚於結束時間');

    const newTimestamp = {
      ...rest,
      startTime,
      endTime,
      interval: (timeToSeconds(endTime) - timeToSeconds(startTime)) * 1000,
    };

    actions.updateTimestamp(id, newTimestamp);
    onClose();
  };

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2} border="1px solid" p={4} rounded="md" shadow="md">
              <Heading as="h4" size="sm">
                {t('addNewTimestamp')}
              </Heading>
              <Stack direction={{ base: 'column', lg: 'row' }} mt={2}>
                <FormControl>
                  <FormLabel htmlFor="title">{t('timestampName')}</FormLabel>
                  <Input name="title" type="text" ref={register({ required: true })} />
                </FormControl>
                <FormControl>
                  <Flex>
                    <FormLabel htmlFor="category">{t('timestampCategory')}</FormLabel>
                    <CategoryForm categories={timestampCategories} />
                  </Flex>
                  <Select name="category" ref={register}>
                    <option value=""></option>
                    {timestampCategories &&
                      timestampCategories.map((category, index) => (
                        <option key={`timestamp-${category}-${index}`} value={category}>
                          {category}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">{t('optionalDescription')}</FormLabel>
                  <Input name="description" type="text" ref={register} />
                </FormControl>
              </Stack>
              <Stack>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                  <TimeSelector type="start" register={register} />
                  <TimeSelector type="end" register={register} />
                </Stack>
                <ButtonGroup justifyContent="flex-end">
                  <Button type="submit" w={['50%', '50%', '30%', '25%']}>
                    {t('confirm')}
                  </Button>
                  <Button onClick={onClose} w={['50%', '50%', '30%', '25%']}>
                    {t('cancel')}
                  </Button>
                </ButtonGroup>
              </Stack>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateTimestampModal;
