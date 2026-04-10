import React from 'react';
import Layout from '@/components/Layout';
import { ShieldAlert, CheckCircle, Award, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AutobodyCollision() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center bg-luxury-black">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Mercedes/DSC00366-Enhanced-SR.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold tracking-widest uppercase mb-6">Collision Experts</div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                Autobody & <span className="text-luxury-gold">Collision</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Restoring your vehicle to factory perfection with meticulous attention to detail and insurance-approved excellence.
              </p>
              <Link to="/form/autobody" className="gold-button px-12 py-5 text-base font-bold shadow-2xl">
                Start Your Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white text-center">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-black mb-6">Need a Complimentary Estimate?</h2>
              <p className="text-gray-500 mb-10">Our specialists are ready to assess your vehicle's needs and provide a detailed restoration plan.</p>
              <Link to="/form/autobody" className="gold-button px-10 py-4">
                Request Estimate Now
              </Link>
            </div>
        </section>
      </div>
    </Layout>
  );
}
