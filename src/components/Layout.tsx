import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Settings, Wrench, Shield, DollarSign, Hammer, HeartPulse, Users, HelpCircle, Briefcase } from 'lucide-react';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const isServiceActive = () => location.pathname.startsWith('/services');

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const serviceLinks = [
      { to: "/services/rentals", label: "Car Rentals", icon: <Car size={16} /> },
      { to: "/services/management", label: "Rental Management", icon: <Settings size={16} /> },
      { to: "/services/mechanical", label: "Mechanical Service", icon: <Wrench size={16} /> },
      { to: "/services/autobody", label: "Autobody & Collision", icon: <Hammer size={16} /> },
      { to: "/services/sales", label: "Sales & Financing", icon: <DollarSign size={16} /> },
      { to: "/services/insurance", label: "Insurance Services", icon: <Shield size={16} /> },
      { to: "/services/detailing", label: "Detailing & Wrapping", icon: <Settings size={16} /> },
      { to: "/services/injury", label: "Accident Support", icon: <HeartPulse size={16} /> },
    ];

    return <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-luxury-black text-white shadow-md sticky top-0 z-[100]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img alt="AVNTS Logo" className="h-16 md:h-20 lg:h-24 mr-1 transition-all"
                src="/lovable-uploads/AVNTS-Silver-08.png" />
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Home
              </Link>
              <Link to="/cars" className={`font-medium transition-colors ${isActive('/cars') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Inventory
              </Link>

              {/* Services dropdown */}
              <div className="relative group">
                <Link to="/services" className={`font-medium transition-colors flex items-center gap-1 ${isServiceActive() ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                  Services
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                  <div className="bg-white text-luxury-black rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                    {serviceLinks.map((s, i) => (
                      <Link key={i} to={s.to} className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors group/item">
                        <span className="text-luxury-gold mr-3 group-hover/item:scale-110 transition-transform">{s.icon}</span>
                        <span className="text-sm font-bold">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/credit" className={`font-medium transition-colors ${isActive('/credit') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Financing
              </Link>

              {/* Support dropdown */}
              <div className="relative group">
                <span className="font-medium text-white hover:text-luxury-gold cursor-pointer flex items-center gap-1">
                  Support
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>

                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                  <div className="bg-white text-luxury-black rounded-xl shadow-2xl border border-gray-100 py-2">
                    <Link to="/contact" className="block px-5 py-3 hover:bg-gray-50 text-sm font-bold">Contact</Link>
                    <Link to="/faq" className="block px-5 py-3 hover:bg-gray-50 text-sm font-bold">FAQ</Link>
                  </div>
                </div>
              </div>

              {/* About Us dropdown */}
              <div className="relative group">
                <Link to="/company" className={`font-medium transition-colors flex items-center gap-1 ${isActive('/company') || isActive('/careers') || isActive('/news') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                  About
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>

                <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                  <div className="bg-white text-luxury-black rounded-xl shadow-2xl border border-gray-100 py-2">
                    <Link to="/company" className="flex items-center px-5 py-3 hover:bg-gray-50 group/item">
                       <Users size={16} className="text-luxury-gold mr-3" />
                       <span className="text-sm font-bold">Company</span>
                    </Link>
                    <Link to="/careers" className="flex items-center px-5 py-3 hover:bg-gray-50 group/item">
                       <Briefcase size={16} className="text-luxury-gold mr-3" />
                       <span className="text-sm font-bold">Careers</span>
                    </Link>
                    <Link to="/news" className="flex items-center px-5 py-3 hover:bg-gray-50 group/item">
                       <HelpCircle size={16} className="text-luxury-gold mr-3" />
                       <span className="text-sm font-bold">News & Stories</span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && <nav className="md:hidden py-6 space-y-4 animate-fade-in border-t border-white/10 mt-4">
            <Link to="/" className={`block font-bold text-lg ${isActive('/') ? 'text-luxury-gold' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/cars" className={`block font-bold text-lg ${isActive('/cars') ? 'text-luxury-gold' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Inventory</Link>
            
            <div className="space-y-4">
              <Link to="/services" className={`block font-bold text-lg ${isServiceActive() ? 'text-luxury-gold' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <div className="grid grid-cols-1 gap-2 pl-4 border-l border-luxury-gold/20">
                {serviceLinks.map((s, i) => (
                  <Link key={i} to={s.to} className="flex items-center py-2 text-gray-400 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/credit" className={`block font-bold text-lg ${isActive('/credit') ? 'text-luxury-gold' : 'text-white'}`} onClick={() => setMobileMenuOpen(false)}>Financing</Link>
            <Link to="/contact" className="block font-bold text-lg text-white" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/company" className="block font-bold text-lg text-white" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          </nav>}
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-luxury-black text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-8">
                <img src="/lovable-uploads/AVNTS-Silver-08.png" alt="AVNTS" className="h-16" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Defining the standard of luxury automotive excellence. From acquisition to maintenance, we handle the details so you can enjoy the drive.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.slice(0, 4).map((s, i) => (
                  <li key={i}><Link to={s.to} className="text-gray-500 hover:text-luxury-gold text-sm transition-colors">{s.label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">More Services</h4>
              <ul className="space-y-3">
                {serviceLinks.slice(4).map((s, i) => (
                  <li key={i}><Link to={s.to} className="text-gray-500 hover:text-luxury-gold text-sm transition-colors">{s.label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Location</h4>
              <div className="text-gray-400 text-sm space-y-4">
                <p>7A Musgrave St, <br /> Toronto, ON M4E 2H3</p>
                <p>Phone: (437) 553-9211</p>
                <Link
                  to="https://maps.app.goo.gl/3AaWLz8EKUpmXoje9"
                  target="_blank"
                  className="inline-block gold-button text-xs py-3"
                >
                  Open in Maps
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs text-center md:text-left font-medium">&copy; {new Date().getFullYear()} AVNTS Auto Group. All rights reserved.</p>
            <div className="flex gap-6">
               <Link to="/faq" className="text-gray-600 hover:text-white text-xs font-medium">FAQ</Link>
               <Link to="/privacy" className="text-gray-600 hover:text-white text-xs font-medium">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
  };
export default Layout;
