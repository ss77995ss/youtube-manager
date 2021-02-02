import { ButtonGroup } from '@chakra-ui/react';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

function EditButtons({ video }) {
  const { id } = video;

  return (
    <ButtonGroup spacing={2}>
      <UpdateButton video={video} />
      <DeleteButton id={id} />
    </ButtonGroup>
  );
}

export default EditButtons;
