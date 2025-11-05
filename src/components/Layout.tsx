
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Settings, Wrench, Shield, DollarSign, Search, Users, HelpCircle, Briefcase } from 'lucide-react';
const Layout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
    return <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-luxury-black text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img alt="AVNTS Logo" className="h-24 mr-1"
                src="/lovable-uploads/AVNTS-Silver-08.png" />
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-white" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Home
              </Link>
              <Link to="/cars" className={`font-medium transition-colors ${isActive('/cars') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Inventory
              </Link>

              {/* Services dropdown */}
              <div className="relative group">
                <Link to="/services" className={`font-medium transition-colors flex items-center ${isActive('/services') || isActive('/services/rentals') || isActive('/services/management') || isActive('/services/detailing') || isActive('/services/insurance') || isActive('/services/sales') || isActive('/services/sourcing') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                  Services
                </Link>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white text-luxury-black rounded shadow-lg border border-gray-200 py-1">
                    <Link to="/services/rentals" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Car size={16} className="mr-2" />
                      <span>Car Rentals</span>
                    </Link>
                    <Link to="/services/management" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Settings size={16} className="mr-2" />
                      <span>Car Rental Management</span>
                    </Link>
                    <Link to="/services/sales" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <DollarSign size={16} className="mr-2" />
                      <span>Vehicle Sales</span>
                    </Link>
                    <Link to="/services/sourcing" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Search size={16} className="mr-2" />
                      <span>Vehicle Sourcing</span>
                    </Link>
                    <Link to="/services/insurance" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Shield size={16} className="mr-2" />
                      <span>Insurance Services</span>
                    </Link>
                    <Link to="/services/detailing" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Wrench size={16} className="mr-2" />
                      <span>Detailing, Wrapping & Tinting</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/credit" className={`font-medium transition-colors ${isActive('/credit') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                Financing
              </Link>

              {/* Support dropdown */}
              <div className="relative group">
                <span className="font-medium text-white hover:text-luxury-gold cursor-pointer">
                  Support
                </span>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white text-luxury-black rounded shadow-lg border border-gray-200 py-1">
                    <Link to="/contact" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <span>Contact</span>
                    </Link>
                    <Link to="/faq" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <span>FAQ</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* About Us dropdown */}
              <div className="relative group">
                <Link to="/company" className={`font-medium transition-colors flex items-center ${isActive('/company') || isActive('/careers') || isActive('/news') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`}>
                  About Us
                </Link>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white text-luxury-black rounded shadow-lg border border-gray-200 py-1">
                    <Link to="/company" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Users size={16} className="mr-2" />
                      <span>Company</span>
                    </Link>
                    <Link to="/careers" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <Briefcase size={16} className="mr-2" />
                      <span>Careers</span>
                    </Link>
                    <Link to="/news" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <HelpCircle size={16} className="mr-2" />
                      <span>News & Stories</span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && <nav className="md:hidden pt-4 pb-4 space-y-3">
            <Link to="/" className={`block font-medium transition-colors ${isActive('/') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/cars" className={`block font-medium transition-colors ${isActive('/cars') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`} onClick={() => setMobileMenuOpen(false)}>
              Inventory
            </Link>

            {/* Mobile services with sub-links */}
            <div>
              <Link to="/services" className={`block font-medium transition-colors ${isActive('/services') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`} onClick={() => setMobileMenuOpen(false)}>
                Services
              </Link>
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/services/rentals" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Car size={14} className="mr-2" />
                  <span>Car Rentals</span>
                </Link>
                <Link to="/services/management" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Settings size={14} className="mr-2" />
                  <span>Car Rental Management</span>
                </Link>
                <Link to="/services/sales" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <DollarSign size={14} className="mr-2" />
                  <span>Vehicle Sales</span>
                </Link>
                <Link to="/services/sourcing" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Search size={14} className="mr-2" />
                  <span>Vehicle Sourcing</span>
                </Link>
                <Link to="/services/insurance" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Shield size={14} className="mr-2" />
                  <span>Insurance Services</span>
                </Link>
                <Link to="/services/detailing" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Wrench size={14} className="mr-2" />
                  <span>Detailing, Wrapping & Tinting</span>
                </Link>
              </div>
            </div>

            <Link to="/credit" className={`block font-medium transition-colors ${isActive('/credit') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`} onClick={() => setMobileMenuOpen(false)}>
              Financing
            </Link>

            {/* Mobile Support with sub-links */}
            <div>
              <span className="block font-medium text-white">
                Support
              </span>
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/contact" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <span>Contact</span>
                </Link>
                <Link to="/faq" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <span>FAQ</span>
                </Link>
              </div>
            </div>

            {/* Mobile About Us with sub-links */}
            <div>
              <Link to="/company" className={`block font-medium transition-colors ${isActive('/company') ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'}`} onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <div className="pl-4 mt-2 space-y-2">
                <Link to="/company" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Users size={14} className="mr-2" />
                  <span>Company</span>
                </Link>
                <Link to="/careers" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <Briefcase size={14} className="mr-2" />
                  <span>Careers</span>
                </Link>
                <Link to="/news" className="flex items-center text-sm text-gray-300 hover:text-luxury-gold" onClick={() => setMobileMenuOpen(false)}>
                  <HelpCircle size={14} className="mr-2" />
                  <span>News & Stories</span>
                </Link>
              </div>
            </div>
          </nav>}
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-luxury-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/AVNTS-Silver-08.png" alt="AVNTS Logo" className="h-96 mr-2"
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-luxury-gold transition-colors">Home</Link></li>
                <li><Link to="/cars" className="text-gray-300 hover:text-luxury-gold transition-colors">Inventory</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-luxury-gold transition-colors">Services</Link></li>
                <li><Link to="/credit" className="text-gray-300 hover:text-luxury-gold transition-colors">Financing</Link></li>
                <li><Link to="/company" className="text-gray-300 hover:text-luxury-gold transition-colors">Company</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-luxury-gold transition-colors">Careers</Link></li>
                <li><Link to="/news" className="text-gray-300 hover:text-luxury-gold transition-colors">News & Stories</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-luxury-gold transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Contact Information</h4>
              <div className="text-gray-300 mb-2">
                <div>7A Musgrave St,</div>
                <div>Toronto, ON</div>
                <div>M4E 2H3</div>
                <p className="text-gray-300 mb-2">Phone: (437) 553-9211</p>
                <p className="text-gray-300 mb-2">Email: contact@avntsautogroup.com</p>
                <br />
                <Link
                  to="https://maps.app.goo.gl/3AaWLz8EKUpmXoje9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button inline-block"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Avnts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
  };
export default Layout;
