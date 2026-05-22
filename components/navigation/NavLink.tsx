'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  classes?: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink = ({ href, classes, onClick, isMobile, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'hover:text-primary text-sm font-bold transition-colors duration-300',
        isActive && 'text-primary font-bold',
        isMobile && 'text-lg',
        classes
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavLink;
