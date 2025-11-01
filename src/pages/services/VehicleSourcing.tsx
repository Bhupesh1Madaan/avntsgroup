import React from 'react';
import Layout from '@/components/Layout';
import { Search, CheckCircle, Globe, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const VehicleSourcing = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Ferrari/DSC00407.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                Vehicle <span className="text-luxury-silver">Sourcing</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                We find the impossible. We source the extraordinary.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Global Network</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Exclusive Access</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Verified Quality</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Source Your Dream Car</h2>
                <p className="text-xl text-gray-600">Our proven process ensures you get exactly what you're looking for</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Search size={32} className="text-black" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Tell Us Your Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Share your exact specifications, budget, and timeline. We listen to every detail to understand your perfect vehicle.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Globe size={32} className="text-black" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Global Search</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our worldwide network of dealers, auctions, and private sellers searches every corner of the globe for your vehicle.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Shield size={32} className="text-black" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Deliver Perfection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We handle inspection, negotiation, shipping, and delivery. Your dream car arrives at your doorstep, ready to drive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Success Stories</h2>
                <p className="text-xl text-gray-600">See what we've found for our clients</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Story 1 */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-80">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/DSC00408.jpg"
                      alt="Sourced Ferrari"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-luxury-gold text-black px-4 py-2 rounded-full text-sm font-bold">
                        Success Story
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Ferrari F12 Berlinetta</h3>
                      <p className="text-lg opacity-90">Found in Monaco • Delivered to Toronto</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold">MR</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Michael Rodriguez</h4>
                        <p className="text-gray-600">Toronto, ON</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "AVNTS found my dream Ferrari in just 3 weeks. The car was exactly as described and the delivery process was flawless. Worth every penny."
                    </blockquote>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Search Time: 3 weeks</span>
                      <span>Location: Monaco → Toronto</span>
                    </div>
                  </div>
                </div>

                {/* Story 2 */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-80">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00387-Enhanced-NR.jpg"
                      alt="Sourced Mercedes"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Rare Find
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Mercedes-AMG GT Black Series</h3>
                      <p className="text-lg opacity-90">Found in Germany • Delivered to Scarborough</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold">SC</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Sarah Chen</h4>
                        <p className="text-gray-600">Scarborough, ON</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "I thought finding a Black Series was impossible. AVNTS proved me wrong and delivered the car of my dreams right to my door."
                    </blockquote>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Search Time: 6 weeks</span>
                      <span>Location: Germany → Scarborough</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Network */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Network</h2>
                <p className="text-xl text-gray-600">Connecting you to the world's finest vehicles</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                    <Globe size={32} className="text-luxury-silver" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">50+ Countries</h3>
                  <p className="text-gray-600 text-sm">Worldwide dealer network</p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                    <Clock size={32} className="text-luxury-silver" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">24/7 Search</h3>
                  <p className="text-gray-600 text-sm">Continuous monitoring</p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                    <Shield size={32} className="text-luxury-silver" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Verified Quality</h3>
                  <p className="text-gray-600 text-sm">Thorough inspection process</p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors">
                    <CheckCircle size={32} className="text-luxury-silver" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">100% Success</h3>
                  <p className="text-gray-600 text-sm">We find what you want</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-gold">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-black mb-6">Ready to Find Your Dream Car?</h2>
              <p className="text-xl text-black/80 mb-8">
                Tell us what you're looking for and we'll make it happen. No matter how rare or specific.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact#contact-form"
                  className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                  Start Your Search
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-colors"
                >
                  Speak to Specialist
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VehicleSourcing;