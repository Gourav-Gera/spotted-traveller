import React from "react";

interface FooterProps { compact?: boolean }

const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`w-full mt-24 ${compact ? 'py-0' : 'pt-0'} bg-[#3B3D41] text-gray-300`}>
      <div className="max-w-7xl mx-auto pt-12 pb-2">
        {!compact && (
          <div className="flex flex-col md:flex-row gap-14 md:gap-24">
            {/* Brand */}
            <div className="md:w-1/3">
              <div className="text-white font-bold text-2xl mb-4 tracking-tight">Spotted.</div>
              <p className="text-[14px] leading-relaxed pr-6 text-gray-300/90 max-w-xs">
                With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
              </p>
            </div>
            {/* Link Columns */}
            <div className="flex flex-1 gap-20 md:justify-end">
              <div>
                <h4 className="text-[16px] font-medium tracking-wider text-white mb-5">COMPANY</h4>
                <ul className="space-y-3 text-[17px]">
                  <li><a className="hover:text-white transition-colors" href="#">About us</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Contact us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[16px] font-medium tracking-wider text-white mb-5">LEGAL</h4>
                <ul className="space-y-3 text-[17px]">
                  <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Terms & Conditions</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Return Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Divider */}
        <div className="mt-14 mb-6 h-px bg-white/10" />
        <p className="text-center text-[14px] tracking-wide text-white pb-8">© {year} Copyright, All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;