import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function AboutPage(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 app-container w-full px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24">
        <h1 className="text-[26px] sm:text-[32px] font-semibold text-black mb-6">About Us</h1>

        {/* Section 1: text left, image right (as in reference) */}
        <section className="grid md:grid-cols-12 gap-6 lg:gap-10 items-start mb-10">
          <div className="md:col-span-7 space-y-4">
            <p className="text-desc leading-relaxed text-[14px] sm:text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt tempor justo sed mattis. Aenean sed velit at cursus sollicitudin. Praesent fringilla eros non velit laoreet, at tincidunt dui gravida. Mauris molestie viverra ligula, a mollis dui hendrerit quis. Praesent in finibus felis. Donec volutpat orci a dignissim iaculis. In hac habitasse platea dictumst quis, convallis nisl.
            </p>
            <p className="text-desc leading-relaxed text-[14px] sm:text-[15px]">
              In consequat molestie malesuada. Curabitur euismod nunc eu quam convallis, a feugiat ex ultricies. Aenean id ullamcorper quam. Suspendisse quis arcu in neque malesuada dictum. Suspendisse et risus felis, volutpat non nibh eget, efficitur bibendum nunc. Vestibulum tristique dui ac tortor cursus faucibus, non molestie tortor porttitor. Curabitur rutrum nisl at amet erat gravida tristique erat at justo interdum commodo quam.
            </p>
            <p className="text-desc leading-relaxed text-[14px] sm:text-[15px]">
              Vestibulum magna dolor, consequat at massa eu, vulputate non felis. Donec non pulvinar est. Suspendisse enim metus, consequat vel imperdiet non, varius consequat odio. Morbi libero mauris, lacinia id sem at, placerat volutpat nunc. Duis posuere semper ex quis posuere. Donec nec lobortis justo.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 w-full h-[220px] sm:h-[260px] md:h-[340px]">
              <Image src="/images/rome-city-image-1.png" alt="Colosseum at night" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Section 2: image left, text right */}
        <section className="grid md:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 w-full h-[220px] sm:h-[260px] md:h-[340px]">
              <Image src="/images/rome-city-img.png" alt="Aerial view of the city square" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 space-y-4">
            <p className="text-desc leading-relaxed text-[14px] sm:text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt tempor justo sed mattis. Aenean sed velit at cursus sollicitudin. Praesent fringilla eros non velit laoreet, at tincidunt dui gravida. Mauris molestie viverra ligula, a mollis dui hendrerit quis. Praesent in finibus felis. Donec volutpat orci a dignissim iaculis. Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio. Sed facilisis mollis enim, ut egestas felis auctor a.
            </p>
            <p className="text-desc leading-relaxed text-[14px] sm:text-[15px]">
              Praesent dolor purus, pretium in lacus id, tincidunt maximus ipsum. Vivamus vitae lorem et nulla sodales consectetur vel interdum arcu. Etiam lobortis at massa non ullamcorper. Praesent viverra erat, nec luctus vulputate elit, in facilisis sapien, vitae volutpat urna elit mi magna.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
