
import React from 'react';
import Layout from '@/components/Layout';
import { Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const InsuranceServices = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Ferrari/C0167T01.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Insurance <span className="text-luxury-gold">Services</span>
            </h1>
            <p className="text-xl text-white">
              Comprehensive coverage for your peace of mind
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-12">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Shield size={32} className="text-luxury-gold mr-4" />
                <h2 className="text-2xl font-serif font-bold">Protection Meets Prestige</h2>
              </div>

              <p className="text-gray-700 mb-8">
                AVNTS makes securing your vehicle simple, offering tailored insurance solutions that match
                your lifestyle and safeguard your investment.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Flexible Plans for Rentals & Ownership</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Comprehensive Coverage Options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Expert Policy Guidance</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 mb-6">
                Your car deserves more than standard coverage — it deserves AVNTS protection.
              </p>

              <div className="text-center">
                <Link to="/contact#contact-form" className="gold-button">Get a Quote</Link>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-12">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Protected Success Stories</h2>

            {/* Featured Case Study */}
            <div className="bg-gradient-to-br from-luxury-gold/10 to-luxury-gold/5 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-white font-bold text-lg">
                      ✓
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Case Study: Ferrari 488 GTB</h3>
                      <p className="text-gray-600">Total Loss Protection</p>
                    </div>
                  </div>
                  <blockquote className="text-lg italic text-gray-700 mb-4">
                    "AVNTS insurance saved me from a $200,000 loss. Their comprehensive coverage and quick response made all the difference during a difficult time."
                  </blockquote>
                  <div className="text-sm text-gray-600">
                    <p><strong>Client:</strong> Michael R.</p>
                    <p><strong>Coverage:</strong> Full replacement value</p>
                    <p><strong>Response Time:</strong> 24 hours</p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/DSC00405-Enhanced-NR.jpg"
                    alt="Protected Ferrari"
                    className="w-full h-80 object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Protected
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Types */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/Audi/C0166T01.jpg"
                    alt="Audi Insurance"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">Luxury Sedans</h4>
                    <p className="text-sm opacity-90">Comprehensive coverage for premium vehicles</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Standard Protection</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Collision & Comprehensive</li>
                    <li>• Liability Coverage</li>
                    <li>• Roadside Assistance</li>
                    <li>• Rental Car Coverage</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00375.jpg"
                    alt="Mercedes Insurance"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">Supercars</h4>
                    <p className="text-sm opacity-90">Specialized coverage for exotic vehicles</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Premium Protection</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Agreed Value Coverage</li>
                    <li>• Track Day Protection</li>
                    <li>• Concierge Claims Service</li>
                    <li>• Worldwide Coverage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsuranceServices;
