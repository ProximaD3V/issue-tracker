'use client';
import { Box, Button, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
    console.log(data.title);
  };
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder='Title' {...register('title')} />
      {/* This just an example of Controller, TextArea supports register as field */}
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <TextArea placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
