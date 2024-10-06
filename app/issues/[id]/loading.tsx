import Skeleton from '@/app/components/Skeleton';
import { Box, Flex } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gapX='3' my='2'>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Skeleton count={3} />
    </Box>
  );
};

export default LoadingIssueDetailPage;
