'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { DeferredFileUploadField } from '@/components/form-fields/DeferredFileUploadField';
import { FormFieldControl } from '@/components/form-fields/FormFieldControl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { SignUpFormSchema } from '@/lib/schemas/SignUpFormSchema';

const CreateUserFormSchema = SignUpFormSchema.safeExtend({
  bio: z.string().optional(),
  image: z
    .string()
    .url('Please enter a valid image URL')
    .optional()
    .or(z.literal('')),
});

const CreateUserForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      bio: '',
      image: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof CreateUserFormSchema>) => {
    const { name, email, password, username, bio, image } = data;
    const normalizedUsername = username?.trim();
    const normalizedBio = bio?.trim();
    const normalizedImage = image?.trim();

    await authClient.admin.createUser(
      {
        email,
        password,
        name,
        role: 'user',
        ...(normalizedImage ? { image: normalizedImage } : {}),
        data: {
          ...(normalizedUsername ? { username: normalizedUsername } : {}),
          ...(normalizedBio ? { bio: normalizedBio } : {}),
        },
      },
      {
        onSuccess: () => {
          toast.success('User successfully created!');
          router.push('/admin/users');
          router.refresh();
        },
        onError: () => {
          toast.error('Failed to create user.');
        },
      }
    );
  };

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle className='text-xl'>Create User</CardTitle>
        <CardDescription>
          Fields marked with an asterisk are required
        </CardDescription>
      </CardHeader>
      <form
        id='create-user-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent>
          <FieldGroup>
            <FormFieldControl
              control={form.control}
              name='name'
              label='Name *'
              type='text'
              placeholder='John Doe'
              autoComplete='name'
            />
            <FormFieldControl
              control={form.control}
              name='email'
              label='Email *'
              type='email'
              placeholder='john.doe@example.com'
              autoComplete='email'
            />
            <FormFieldControl
              control={form.control}
              name='username'
              label='Username'
              type='text'
              placeholder='Username'
              autoComplete='username'
            />
            <FormFieldControl
              control={form.control}
              name='bio'
              label='Bio'
              type='textarea'
              placeholder='Tell us a little about yourself'
            />
            <DeferredFileUploadField
              control={form.control}
              name='image'
              label='Avatar'
            />
            <FormFieldControl
              control={form.control}
              name='password'
              label='Password *'
              type='password'
              placeholder='********'
              autoComplete='off'
            />
            <FormFieldControl
              control={form.control}
              name='confirmPassword'
              label='Confirm Password *'
              type='password'
              placeholder='********'
              autoComplete='off'
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='mt-6'>
          <Field orientation='horizontal'>
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type='submit'
              form='create-user-form'
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : 'Create User'}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateUserForm;
