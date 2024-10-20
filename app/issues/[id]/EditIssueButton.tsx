import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Link } from '@radix-ui/themes';

const EditIssueButton = ({ id }: { id: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${id}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
