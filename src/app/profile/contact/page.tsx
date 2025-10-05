import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import ContactPage from '../../dashboard/profile/contact/page';

export default function PublicContact(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 pt-16 pb-28">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-[30px] font-semibold mb-10 text-center text-black">Contact Us</h1>
          <ContactPage />
        </div>
      </main>
  <Footer />
    </div>
  );
}
