import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gapX='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue?.description}</Card>
    </>
  );
};

export default IssueDetails;
