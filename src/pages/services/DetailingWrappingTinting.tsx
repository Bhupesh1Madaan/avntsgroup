import React from 'react';
import Layout from '@/components/Layout';
import { Wrench, CheckCircle } from 'lucide-react';

const DetailingWrappingTinting = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Mercedes/DSC00365-Enhanced-SR.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Detailing, Wrapping & <span className="text-luxury-gold">Tinting</span>
            </h1>
            <p className="text-xl text-white">
              Premium care for luxury vehicles
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-12">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Wrench size={32} className="text-luxury-gold mr-4" />
                <h2 className="text-2xl font-serif font-bold">Perfection in Every Detail</h2>
              </div>

              <p className="text-gray-700 mb-8">
                Preserve and elevate the look of your car with our professional-grade services. AVNTS
                Autogroup offers detailing, vehicle wrapping, and premium tinting — all executed to the
                highest industry standards.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl mb-4">Our Services:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Ceramic Coating & Paint Protection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Full & Partial Vinyl Wraps</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>High-Performance Window Tints</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-luxury-gold mr-2" />
                    <span>Interior & Exterior Detailing Packages</span>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button inline-flex items-center"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mt-12">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Process</h2>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-2xl font-bold text-black">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00366-Enhanced-SR.jpg"
                      alt="Step 1: Assessment"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">Step 1</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">Assessment & Consultation</h3>
                  <p className="text-gray-600">We evaluate your vehicle's condition and discuss your vision for the perfect finish.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-2xl font-bold text-black">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/DSC00403-Enhanced-NR.jpg"
                      alt="Step 2: Preparation"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">Step 2</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">Preparation & Protection</h3>
                  <p className="text-gray-600">Professional-grade preparation ensures flawless results and long-lasting protection.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-2xl font-bold text-black">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/BMW/DSC00372-Enhanced-NR.jpg"
                      alt="Step 3: Final Result"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">Step 3</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">Perfection Delivered</h3>
                  <p className="text-gray-600">Your vehicle is transformed with meticulous attention to detail and premium materials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailingWrappingTinting;
