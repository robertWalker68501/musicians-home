import MobileNav from '@/components/navigation/MobileNav';
import NavLink from '@/components/navigation/NavLink';
import SiteLogo from '@/components/SiteLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { NAV_LINKS } from '@/constants';

const Navbar = () => {
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
