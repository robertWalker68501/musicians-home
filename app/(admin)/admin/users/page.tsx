import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';

const UserPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className='mb-10 text-2xl font-bold'>Users</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-50'>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-3'>
                  <Button
                    size='sm'
                    asChild
                  >
                    <Link href={`/admin/users/update/${user.id}`}>Edit</Link>
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPage;
