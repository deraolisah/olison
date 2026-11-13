import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-primary py-20 px-6">
      <div className="max-w-[1620px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-serif text-white mb-3">Olison</h3>
          <p className="text-sm text-white/60">
            Your everyday retail store in Port-Harcourt, Rivers State.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Locations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-white/70">
            <a href="tel:0803312620" className="hover:text-white block">0803 312 620</a>
            <a
              href="mailto:olisonsuperstores@gmail.com"
              className="hover:text-white block break-all"
            >
              olisonsuperstores@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-[1620px] mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Olison Super Stores. All rights reserved.
      </div>
    </footer>
  );
}