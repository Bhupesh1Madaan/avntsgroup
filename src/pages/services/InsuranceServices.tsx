import React from 'react';
import Layout from '@/components/Layout';
import { Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const InsuranceServices = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-luxury-black">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Ferrari/C0167T01.jpg')] bg-cover bg-center opacity-30 transform scale-110 motion-safe:animate-slow-zoom"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/0 via-luxury-black/40 to-luxury-black"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
             <div className="inline-block px-3 py-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-[2px] uppercase mb-6">AVNTS PROTECTION</div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up">
               Insurance <span className="text-luxury-gold">Services</span>
             </h1>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
               Specialized coverage for luxury, exotic, and daily driver vehicles.
             </p>
             <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
               <Link to="/form/insurance" className="gold-button px-10 py-4 text-base">
                 Request a Quote
               </Link>
             </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white rounded-t-[40px] -mt-10 relative z-10">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
               <div>
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-black mb-6">Protection Meets Prestige</h2>
                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                   AVNTS makes securing your vehicle simple, offering tailored insurance solutions that match your lifestyle and safeguard your investment. We specialize in high-value assets that require more than standard coverage.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center"><CheckCircle size={16} className="text-luxury-gold" /></div>
                     <span className="text-gray-700 font-medium">Agreed Value Policy Options</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center"><CheckCircle size={16} className="text-luxury-gold" /></div>
                     <span className="text-gray-700 font-medium">Flexible Storage & Transit Coverage</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center"><CheckCircle size={16} className="text-luxury-gold" /></div>
                     <span className="text-gray-700 font-medium">Concierge Claims Management</span>
                   </div>
                 </div>
               </div>
               <div className="relative">
                 <img 
                   src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00375.jpg" 
                   alt="Luxury Vehicle Insurance" 
                   className="rounded-2xl shadow-2xl relative z-10" 
                 />
                 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-luxury-gold rounded-2xl -z-10"></div>
                 <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-luxury-gold rounded-2xl -z-10"></div>
               </div>
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Don't Leave Your Luxury to Chance</h2>
           <p className="text-gray-400 mb-10 max-w-xl mx-auto">Contact our insurance specialists today for a comprehensive risk assessment and quote.</p>
           <Link to="/form/insurance" className="gold-button px-12 py-4 text-base font-bold">
             Get My Quote
           </Link>
        </section>
      </div>
    </Layout>
  );
};

export default InsuranceServices;
