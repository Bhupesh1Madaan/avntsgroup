import React from 'react';
import Layout from '@/components/Layout';
import { DollarSign, CheckCircle, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarSalesFinancing = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-32 bg-luxury-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Ferrari/C0154T01.jpg')] bg-cover bg-center opacity-30 transform scale-105 motion-safe:animate-slow-zoom"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-[2px] uppercase mb-8">AVNTS CAPITAL</div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-[0.9]">
                Own Your <br /> <span className="text-luxury-gold font-bold">Dream Car</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                Elite inventory and bespoke financing solutions tailored to your unique financial profile.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/form/sales" className="gold-button px-10 py-5 text-base font-bold shadow-2xl">
                  Start Financing Application
                </Link>
                <Link to="/cars" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/20 transition-all">
                  View Inventory
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-luxury-black text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-luxury-gold/5 pointer-events-none"></div>
           <div className="container mx-auto px-4 relative z-10">
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Easy Financing, Better Experience.</h2>
             <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">Our finance experts work with a variety of lenders to secure the best possible rates for our clients, regardless of credit history.</p>
             <Link to="/form/sales" className="gold-button px-16 py-6 text-lg font-bold shadow-[0_0_50px_rgba(200,168,78,0.3)]">
               Get Approved Now
             </Link>
           </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarSalesFinancing;