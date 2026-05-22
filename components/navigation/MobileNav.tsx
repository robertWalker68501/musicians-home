'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';

import NavLink from '@/components/navigation/NavLink';
import SiteLogo from '@/components/SiteLogo';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/constants';

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className='bg-background'>
        <SheetHeader>
          <SheetTitle>
            <SiteLogo href='/' />
          </SheetTitle>
          <SheetDescription>
            Join the community and ahre your knowledge
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4 px-4'>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.id}
              href={link.href}
              label={link.label}
              isMobile
              onClick={handleOpen}
            />
          ))}
        </div>
        <SheetFooter>
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
