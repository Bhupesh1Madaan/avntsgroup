import React from 'react';
import Layout from '@/components/Layout';
import { Wrench, CheckCircle, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MechanicalService() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center bg-luxury-black">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/1b46b820-06ad-417a-a91a-73bc31bb87b2.png')] bg-cover bg-center opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-widest uppercase mb-6">Expert Care</div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                Mechanical <span className="text-luxury-gold">Services</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Precision diagnostics and expert repairs for luxury and performance vehicles. From routine maintenance to complex engine work.
              </p>
              <Link to="/form/mechanical" className="gold-button px-10 py-4 text-base">
                Book Service Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <MechanicalCard 
                icon={<Clock className="text-luxury-gold" />} 
                title="Routine Maintenance" 
                desc="Oil changes, brake inspections, and scheduled servicing to keep your vehicle running at peak efficiency." 
              />
              <MechanicalCard 
                icon={<Wrench className="text-luxury-gold" />} 
                title="Advanced Diagnostics" 
                desc="State-of-the-art diagnostic equipment to identify and resolve complex electrical and mechanical issues." 
              />
              <MechanicalCard 
                icon={<Shield className="text-luxury-gold" />} 
                title="Performance Tuning" 
                desc="Specialized performance upgrades and tuning for enthusiasts seeking to unlock their vehicle's full potential." 
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center bg-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-black mb-6">Ready to Experience the AVNTS Difference?</h2>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">Schedule your service appointment online today or call us for a custom consultation.</p>
            <Link to="/form/mechanical" className="gold-button px-12 py-4">
              Book Now
            </Link>
        </section>
      </div>
    </Layout>
  );
}

function MechanicalCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
      <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-luxury-gold group-hover:text-black transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
