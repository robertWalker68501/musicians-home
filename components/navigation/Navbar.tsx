import { headers } from 'next/headers';
import Link from 'next/link';

import AuthButtons from '@/components/auth/AuthButtons';
import UserMenu from '@/components/auth/UserMenu';
import MobileNav from '@/components/navigation/MobileNav';
import NavLink from '@/components/navigation/NavLink';
import SiteLogo from '@/components/SiteLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { NAV_LINKS } from '@/constants';
import { auth } from '@/lib/auth';

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className='flex items-center justify-between py-4'>
      {/* Site Logo */}
      <SiteLogo href='/' />

      {/* Desktop Nav */}
      <div className='hidden items-center gap-4 md:flex'>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.id}
            href={link.href}
            label={link.label}
          />
        ))}
        {session ? <UserMenu /> : <AuthButtons />}
        <ThemeToggle />
      </div>

      {/* Mobile Nav */}
      <div className='block md:hidden'>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
