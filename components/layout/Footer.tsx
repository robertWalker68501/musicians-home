import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-border border-t py-4'>
      <div className='page-wrapper'>
        <p>
          Musicians Home &copy; {currentYear} |{' '}
          <Link href='/'>Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
