import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SiteLogoProps {
  href: string;
  classes?: string;
  onClick?: () => void;
  imgSrcLight?: string;
  imgSrcDark?: string;
  imgAlt?: string;
  imgHeight?: number;
  imgWidth?: number;
  text?: string;
}

const SiteLogo = ({
  href,
  classes,
  onClick,
  imgSrcLight = '/assets/images/sound-wave-light.svg',
  imgSrcDark = '/assets/images/sound-wave-dark.svg',
  imgAlt = 'Musicians Home Logo',
  imgWidth = 45,
  imgHeight = 45,
  text = 'Musicians Home',
}: SiteLogoProps) => {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 text-xl font-bold', classes)}
      onClick={onClick}
    >
      <Image
        src={imgSrcLight}
        alt={imgAlt}
        height={imgHeight}
        width={imgWidth}
        className='block dark:hidden'
      />
      <Image
        src={imgSrcDark}
        alt={imgAlt}
        height={imgHeight}
        width={imgWidth}
        className='hidden dark:block'
      />
      {text}
    </Link>
  );
};

export default SiteLogo;
