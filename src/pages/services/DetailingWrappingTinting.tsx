import React from 'react';
import Layout from '@/components/Layout';
import { CheckCircle, Star, Shield, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const DetailingWrappingTinting = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/STEV4577.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Detailing & <span className="text-luxury-gold">Protection</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Preserve your vehicle's beauty with our premium detailing, ceramic coating, and wrapping services.
            </p>
            <Link to="/form/detailing" className="gold-button px-10 py-4 text-lg">
              Book Your Detail
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <DetailingCard 
                icon={<Droplets size={32} className="text-luxury-gold" />}
                title="Ceramic Coating"
                desc="Long-lasting protection and incredible shine with our 2, 5, and 9-year coating options."
              />
              <DetailingCard 
                icon={<Shield size={32} className="text-luxury-gold" />}
                title="PPF & Wrapping"
                desc="Protect your paint from stone chips and scratches, or completely change its look with a custom wrap."
              />
              <DetailingCard 
                icon={<Star size={32} className="text-luxury-gold" />}
                title="Interior Detail"
                desc="Deep cleaning and restoration for your cabin, including leather conditioning and steam cleaning."
              />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">The AVNTS Difference</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Standard Detail</h3>
                <ul className="space-y-4 text-left text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-400" /> Basic wash and dry</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-400" /> Quick vacuum</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-400" /> Wipe down dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-400" /> Tire shine</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-luxury-gold relative transform md:scale-105">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-luxury-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Our Standard</div>
                <h3 className="text-xl font-bold mb-6">AVNTS Premium</h3>
                <ul className="space-y-4 text-left text-gray-800">
                  <li className="flex items-center gap-2 font-medium"><CheckCircle size={16} className="text-luxury-gold" /> Full decontamination wash</li>
                  <li className="flex items-center gap-2 font-medium"><CheckCircle size={16} className="text-luxury-gold" /> Multi-stage interior steam clean</li>
                  <li className="flex items-center gap-2 font-medium"><CheckCircle size={16} className="text-luxury-gold" /> Clay bar treatment</li>
                  <li className="flex items-center gap-2 font-medium"><CheckCircle size={16} className="text-luxury-gold" /> Machine polish & protection</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16">
               <Link to="/form/detailing" className="gold-button px-12 py-5 text-xl font-bold">
                 Choose Your Package
               </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

function DetailingCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
      <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-luxury-gold transition-colors group-hover:text-black">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      <Link to="/form/detailing" className="text-luxury-gold font-bold flex items-center gap-1 hover:gap-2 transition-all">
        Learn More →
      </Link>
    </div>
  );
}

export default DetailingWrappingTinting;
