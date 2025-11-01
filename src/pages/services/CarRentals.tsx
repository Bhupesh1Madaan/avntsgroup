
import React from 'react';
import Layout from '@/components/Layout';
import { Car, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarRentals = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Mercedes/DSC00365-Enhanced-SR.jpg')] bg-cover bg-center opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Luxury Car <span className="text-luxury-silver">Rentals</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Experience the finest vehicles with unmatched service
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-gray-700">Same Day Delivery</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-gray-700">24/7 Support</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-gray-700">Premium Fleet</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Experience</h2>
              <p className="text-lg text-gray-600">From elegant sedans to exotic supercars</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Luxury Sedans */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/C0162T01.jpg"
                    alt="Luxury Sedan"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Luxury Sedans</h3>
                    <p className="text-sm opacity-90">From $299/day</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Mercedes S-Class, BMW 7 Series</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Perfect for business travel</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Chauffeur service available</span>
                    </div>
                  </div>
                  <Link to="/cars" className="block w-full mt-6 bg-luxury-gold text-black py-3 rounded-lg font-semibold hover:bg-luxury-gold/90 transition-colors text-center">
                    View Fleet
                  </Link>
                </div>
              </div>

              {/* Sports Cars */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/C0156T01.jpg"
                    alt="Sports Car"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Sports Cars</h3>
                    <p className="text-sm opacity-90">From $899/day</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Ferrari, Lamborghini, McLaren</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Track day packages available</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Professional instruction</span>
                    </div>
                  </div>
                  <Link to="/cars" className="block w-full mt-6 bg-luxury-gold text-black py-3 rounded-lg font-semibold hover:bg-luxury-gold/90 transition-colors text-center">
                    View Fleet
                  </Link>
                </div>
              </div>

              {/* SUVs */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src="/AVNTS Car Pictures/FILLER PHOTOS/BMW/C0160T01.jpg"
                    alt="Luxury SUV"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Luxury SUVs</h3>
                    <p className="text-sm opacity-90">From $399/day</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Range Rover, BMW X7, Audi Q8</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>Perfect for families</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-luxury-silver mr-2" />
                      <span>All-weather capability</span>
                    </div>
                  </div>
                  <Link to="/cars" className="block w-full mt-6 bg-luxury-gold text-black py-3 rounded-lg font-semibold hover:bg-luxury-gold/90 transition-colors text-center">
                    View Fleet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AVNTS?</h2>
              <p className="text-lg text-gray-600">The difference is in the details</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car size={24} className="text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Fleet</h3>
                <p className="text-gray-600 text-sm">Hand-picked vehicles in pristine condition</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Concierge Service</h3>
                <p className="text-gray-600 text-sm">White-glove service from start to finish</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car size={24} className="text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Flexible Terms</h3>
                <p className="text-gray-600 text-sm">Daily, weekly, or monthly rentals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Always here when you need us</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarRentals;
