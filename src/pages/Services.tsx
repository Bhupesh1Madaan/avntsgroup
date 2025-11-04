
import React from 'react';
import Layout from '../components/Layout';
import { Car, Settings, DollarSign, Search, Shield, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1b46b820-06ad-417a-a91a-73bc31bb87b2.png')] bg-cover bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Our <span className="text-luxury-gold">Premium</span> Services
            </h1>
            <p className="text-xl text-white">
              Comprehensive automotive solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center text-luxury-black">Our Services</h2>
          <p className="section-subtitle text-center mb-12">Exceptional automotive solutions customized for you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Rentals */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/STEV4665.jpg')" }}></div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <Car size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Car Rentals</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                 Reliable vehicles for every lifestyle, from fuel-efficient sedans to versatile SUVs and sporty compacts.
                </p>
                <Link to="/services/rentals" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Car Rental Management */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/STEV4660.jpg')" }}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <Settings size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Car Rental Management</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                  Turn your vehicle into an income-generating asset with our full-service rental management program.
                </p>
                <Link to="/services/management" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Sales and Financing */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/finance.jpg')" }}></div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <DollarSign size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Sales & Financing</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                  A wide range of quality vehicles, with friendly support and flexible financing to fit your budget.
                </p>
                <Link to="/services/sales" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Vehicle Sourcing */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/STEV0000.png')" }}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <Search size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Vehicle Sourcing</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                  Specialists in locating and securing rare, exotic, and hard-to-find vehicles tailored to your specifications.
                </p>
                <Link to="/services/sourcing" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Insurance Services */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/insurance.png')" }}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <Shield size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Insurance Services</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                  Tailored insurance solutions that match your lifestyle and safeguard your automotive investment.
                </p>
                <Link to="/services/insurance" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Detailing, Wrapping & Tinting */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: "url('/STEV4576.jpg')" }}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                    <Wrench size={20} className="text-luxury-black" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Detailing & Wrapping</h3>
                </div>
                <p className="text-luxury-gray mb-6">
                  Professional-grade detailing, vehicle wrapping, and premium tinting services to elevate your vehicle's look.
                </p>
                <Link to="/services/detailing" className="text-luxury-gold hover:underline font-medium flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-luxury-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Experience Our Premium Services?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your specific requirements and create a customized luxury experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cars" className="gold-button">
              View Our Fleet
            </Link>
            <Link to="/contact" className="gold-outline-button">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
