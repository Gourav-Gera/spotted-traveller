import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import EditProfilePage from '../../dashboard/profile/edit/page';

export default function PublicEditProfile(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 pt-16 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-[28px] md:text-[32px] leading-tight font-semibold mb-8 text-center text-black">Edit Profile</h1>
          <EditProfilePage />
        </div>
      </main>
  <Footer />
    </div>
  );
}
