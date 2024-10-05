'use client';
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema, IssueForm } from '@/app/validationSchema';

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder='Title' {...register('title')} />
        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}
        {/* This just an example of Controller, TextArea supports register as field */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextArea placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <Text color='red' as='p'>
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
