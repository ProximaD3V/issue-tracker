import { Box, Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewIssuePage = () => {
  return (
    <Box className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title' />
      <TextArea placeholder='Description' />
      <Button>Submit New Issue</Button>
    </Box>
  );
};

export default NewIssuePage;
