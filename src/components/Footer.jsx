import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold">
              <span className="text-yellow-300">Sarkari</span>
              <span>Nidhi</span>
            </div>
            <p className="text-blue-200 text-sm mt-1">
              Helping Indians discover government schemes they deserve
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center text-sm">
              <span>Made with</span>
              <Heart size={14} className="mx-1 text-yellow-300" />
              <span>for India</span>
            </div>
            <p className="text-blue-200 text-xs mt-1">
              © {currentYear} SarkariNidhi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
