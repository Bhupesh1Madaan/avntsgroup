import React from 'react';
import Layout from '@/components/Layout';
import { Gavel, HeartPulse, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccidentInjury() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Mercedes/DSC00366-Enhanced-SR.jpg')] bg-cover bg-center opacity-30 grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-widest uppercase mb-8">Legal & Medical Support</div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Accident Injury <br /> <span className="text-luxury-gold">Report & Support</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl">
                Have you been involved in a car accident? Our team provides professional assistance in reporting injuries and connecting you with the legal and medical support you need.
              </p>
              <Link to="/form/injury" className="gold-button px-10 py-4 text-base font-bold shadow-2xl">
                Start Injury Report
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#0a0a0a] text-center px-4">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Consultation is FREE. Your health is PRIORITY.</h2>
           <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Fill out our confidential report form and a representative from our support network will contact you within 24 hours.</p>
           <Link to="/form/injury" className="gold-button px-12 py-5 font-bold tracking-widest uppercase">
             Start Confidential Report
           </Link>
        </section>
      </div>
    </Layout>
  );
}
