import React from 'react';
import Layout from '../components/Layout';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Company = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/2bba0b78-39a2-4212-9d3d-75d9cb0bd42d.png')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              About <span className="text-luxury-gold">AVNTS</span> Autogroup
            </h1>
            <p className="text-xl text-white">
              Your premier destination for automotive excellence
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
                <Users size={32} className="text-luxury-black" />
              </div>
            </div>

            <p className="text-xl text-center mb-10">
              At AVNTS Autogroup, we are more than a dealership or rental company — we are curators
              of automotive excellence. From first contact to final handover, our mission is to offer an
              experience as refined as the vehicles we provide.
            </p>

            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif font-bold text-luxury-gold italic">
                Luxury is the standard. Service is the signature.
              </h2>
            </div>

            <p className="text-lg text-luxury-gray">
              At AVNTS Autogroup, we've redefined the automotive experience by bringing every service
              under one roof. From luxury rentals and seamless financing to expert detailing, insurance
              solutions, and exclusive vehicle sourcing — we offer a complete suite designed for ultimate
              convenience. Our mission is to simplify car ownership and elevate every journey, giving you
              the freedom to dream, drive, and own with total confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-luxury-black mb-8">Our Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Link to="/services/rentals" className="text-luxury-gold hover:underline font-medium">
                Car Rentals
              </Link>
              <Link to="/services/management" className="text-luxury-gold hover:underline font-medium">
                Rental Management
              </Link>
              <Link to="/services/sales" className="text-luxury-gold hover:underline font-medium">
                Vehicle Sales
              </Link>
              <Link to="/services/sourcing" className="text-luxury-gold hover:underline font-medium">
                Vehicle Sourcing
              </Link>
              <Link to="/services/insurance" className="text-luxury-gold hover:underline font-medium">
                Insurance Services
              </Link>
              <Link to="/services/detailing" className="text-luxury-gold hover:underline font-medium">
                Detailing & Wrapping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
              Interested in Being Part of the Team?
            </h2>
            <p className="text-lg text-luxury-gray mb-8">
              Join our team of automotive professionals and help us deliver exceptional experiences to our clients.
            </p>
            <Link to="/careers" className="gold-button">
              View Career Opportunities
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Company;