import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import SignInForm from '@/components/auth/SignInForm';
import { auth } from '@/lib/auth';

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/');
  }

  return (
    <div className='w-full'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
