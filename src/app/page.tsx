import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CityExplorer from "../components/CityExplorer";
import TestimonialsSlider from "../components/TestimonialsSlider";

// Landing Page redesigned per provided screenshot (static, no interactivity yet)
export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Header />
      {/* HERO (Full banner with centered overlay) */}
      <section className="w-full px-4 mt-6">
        <div className="max-w-7xl mx-auto relative rounded-[28px] overflow-hidden h-[380px] md:h-[440px]">
          <Image
            src="/images/home-banner-img.webp"
            alt="Sunset over Italian city"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-snug max-w-3xl">
              Uncover timeless beauty <br className="hidden md:block" /> in <span className="font-semibold">Italy.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-xl mb-8">
              In quis eleifend mi. Ut tincidunt bibendum mattis. Quisque ultrices nulla pharetra risus feugiat, eget pellentesque erat vulputate.
            </p>
            <button className="bg-[#1F3328] hover:bg-[#16261d] text-white rounded-full px-7 py-2.5 text-sm font-medium transition-colors shadow-md">
              Get Started Now →
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR CITIES (Interactive) */}
      <CityExplorer />

      {/* ACCOMMODATIONS */}
      <section className="w-full px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl tracking-wide text-black-heading font-semibold mb-4">Famous Accommodation</h2>
          <p className="max-w-xl mb-8">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
          <div className="grid gap-6 md:grid-cols-4">
            {[1,2,3,4].map(i=> (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition">
                <div className="relative h-36 bg-gray-100">
                  <Image src="/images/hotel-thumb-image.png" alt="Hotel" fill className="object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Coastal View Hotel</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Aenean non ante at metus mollis tempor. Vestibulum ante ipsum primis in faucibus orci luctus.</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>Florence, Italy</span>
                  </div>
                  <div className="mt-1 text-[12px] font-semibold text-gray-800">$100 <span className="font-normal text-gray-500">/ night</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATTRACTIONS MAP */}
      <section className="w-full px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl tracking-wide text-black-heading font-semibold mb-4 text-center">Top Attractions</h2>
          <p className="max-w-xl mx-auto mb-8 text-center">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
          <div className="relative rounded-2xl overflow-hidden bg-[#F7F5EF] p-10">
            <div className="relative w-full h-64 md:h-72">
              <Image src="/images/map-image.png" alt="Map" fill className="object-contain opacity-30" />
              {/* floating avatars */}
              {[
                {top:'15%',left:'12%'},{top:'55%',left:'22%'},{top:'30%',left:'45%'},{top:'65%',left:'55%'},{top:'25%',left:'70%'},{top:'50%',left:'78%'}
              ].map((p,i)=>(
                <div key={i} style={{top:p.top,left:p.left}} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[10px] font-medium">
                    <Image src="/images/user-thumb-table.svg" alt="User" width={26} height={26} />
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full shadow-sm text-gray-600">Attraction</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Slider) */}
      <TestimonialsSlider />
      <Footer />
    </div>
  );
}