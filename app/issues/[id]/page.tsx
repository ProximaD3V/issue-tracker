import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const id = parseInt(params.id, 10) || notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) notFound();

  return (
    <Box>
      <Heading>{issue?.title}</Heading>
      <Flex gapX='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue?.description}</Card>
    </Box>
  );
};

export default IssueDetailPage;
