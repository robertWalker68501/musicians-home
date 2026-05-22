'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';

const UserMenu = () => {
  const session = authClient.useSession();
  const user = session.data?.user;
  const userInitial = user?.name.charAt(0).toUpperCase() || 'U';

  const router = useRouter();

  const logoutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <Avatar>
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt='User Image'
              />
            ) : (
              <AvatarFallback className='text-lg'>{userInitial}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32'>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/profile'>Profile</Link>
          </DropdownMenuItem>
          {user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href='/admin'>Admin</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant='destructive'
            onClick={logoutUser}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
