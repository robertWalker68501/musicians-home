'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.input<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    const { name, email, password, username } = data;
    const normalizedUsername = username?.trim();

    await authClient.signUp.email(
      {
        name,
        email,
        password,
        ...(normalizedUsername ? { username: normalizedUsername } : {}),
      },
      {
        onSuccess: () => {
          toast.success('SignUp successful');
          router.refresh();
          router.push('/');
        },
        onError: (ctx) => {
          toast.error('Error signing up');
          router.push('/');
          console.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <Card className='mx-auto max-w-lg'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>
          Fields marked with an asterisk are required
        </CardDescription>
      </CardHeader>
      <form
        id='sign-up-form'
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
              form='sign-up-form'
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : 'Sign Up'}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
