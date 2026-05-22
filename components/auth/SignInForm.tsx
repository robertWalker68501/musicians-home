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
import { SignInFormSchema } from '@/lib/schemas/SignInFormSchema';

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    const { identifier, password } = data;
    const normalizedIdentifier = identifier.trim();
    const isEmail = z.email().safeParse(normalizedIdentifier).success;

    const callbacks = {
      onSuccess: () => {
        toast.success('Sign in successfully');
        router.refresh();
        router.push('/profile');
      },
      onError: () => {
        toast.error('Failed to sign in');
        router.push('/sign-in');
      },
    };

    if (isEmail) {
      await authClient.signIn.email(
        {
          email: normalizedIdentifier,
          password,
        },
        callbacks
      );

      return;
    }

    await authClient.signIn.username(
      {
        username: normalizedIdentifier,
        password,
      },
      callbacks
    );
  };

  return (
    <Card className='mx-auto max-w-lg'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign In</CardTitle>
        <CardDescription>
          Fields marked with an asterisk are required
        </CardDescription>
      </CardHeader>
      <form
        id='sign-in-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent>
          <FieldGroup>
            <FormFieldControl
              control={form.control}
              name='identifier'
              label='Email or Username *'
              type='text'
              placeholder='john.doe@example.com or johndoe'
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
          </FieldGroup>
        </CardContent>
        <CardFooter className='mt-6'>
          <Field orientation='horizontal'>
            <Button
              type='submit'
              form='sign-in-form'
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : 'Sign In'}
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
