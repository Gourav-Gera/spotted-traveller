import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import ChangePasswordPage from '../../dashboard/profile/change-password/page';

export default function PublicChangePassword(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 pt-16 pb-28">
        <div className="max-w-xl mx-auto">
          <h1 className="text-[26px] font-semibold mb-10 text-center text-black">Change Password</h1>
          <ChangePasswordPage />
        </div>
      </main>
  <Footer />
    </div>
  );
}
