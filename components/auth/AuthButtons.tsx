import Link from 'next/link';

import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  return (
    <div className='flex items-center gap-2'>
      <Button
        size='sm'
        variant='outline'
        asChild
      >
        <Link href={'/sign-in'}>Sign In</Link>
      </Button>
      <Button
        size='sm'
        asChild
      >
        <Link href='/sign-up'>Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
