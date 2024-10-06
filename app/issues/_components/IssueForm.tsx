'use client';
import { IssueFormData, issueSchema } from '@/app/api/issues/schema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  };
  return (
    <Box className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* This just an example of Controller, TextArea supports register as field */}
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <TextArea placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
