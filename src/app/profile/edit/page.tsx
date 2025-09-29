import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import EditProfilePage from '../../dashboard/profile/edit/page';

export default function PublicEditProfile(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 pt-16 pb-28">
        <div className="max-w-xl mx-auto">
          <h1 className="text-[22px] font-semibold mb-10 text-center">Edit Profile</h1>
          <EditProfilePage />
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
