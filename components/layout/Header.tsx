import Navbar from '@/components/navigation/Navbar';

const Header = () => {
  return (
    <header className='border-border sticky top-0 left-0 z-50 border-b backdrop-blur-md'>
      <div className='page-wrapper'>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
