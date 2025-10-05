import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import { FiBell } from 'react-icons/fi';

const mock = Array.from({length:9}).map((_,i)=>({
  id:i+1,
  title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  body:'Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna.',
  time:'12:0'+i+'PM'
}));

export default function NotificationsPage(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 app-container w-full px-10 pt-10 pb-24">
        <h1 className="text-[24px] font-semibold mb-10">Notifications</h1>
        <div className="grid md:grid-cols-[1fr_320px] gap-16 items-start">
          <ul className="divide-y divide-gray-200">
            {mock.map(m=> (
              <li key={m.id} className="flex items-start gap-6 py-6">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-gray-900 leading-snug mb-1">{m.title}</p>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{m.body}</p>
                </div>
                <span className="text-[12px] md:text-[13px] text-gray-400 whitespace-nowrap ml-4 pt-1">{m.time}</span>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-72 h-72 rounded-xl bg-[#4A5D52] text-white flex items-center justify-center">
              <FiBell className="text-[120px]" />
            </div>
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
