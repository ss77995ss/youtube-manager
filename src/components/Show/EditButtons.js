import { ButtonGroup, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import DeleteButton from './DeleteButton';

function EditButtons({ video }) {
  const { id } = video;

  return (
    <ButtonGroup spacing={2}>
      <Button leftIcon={<EditIcon />} colorScheme="blue">
        編輯影片
      </Button>
      <DeleteButton id={id} />
    </ButtonGroup>
  );
}

export default EditButtons;
