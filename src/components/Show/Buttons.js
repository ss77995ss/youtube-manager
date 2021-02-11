import { ButtonGroup } from '@chakra-ui/react';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';

function Buttons({ video }) {
  const { id } = video;

  return (
    <ButtonGroup spacing={2} variant="outline">
      <UpdateButton video={video} />
      <DeleteButton id={id} />
      <ShareButton video={video} />
    </ButtonGroup>
  );
}

export default Buttons;
