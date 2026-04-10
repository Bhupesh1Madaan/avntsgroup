import React from 'react';
import Layout from '@/components/Layout';
import { Settings, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RentalManagement = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Fleet <span className="text-luxury-gold">Management</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Turn your luxury vehicles into profitable assets
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">95%</div>
                  <div className="text-sm text-gray-300">Utilization Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">$4K+</div>
                  <div className="text-sm text-gray-300">Avg Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">4.9★</div>
                  <div className="text-sm text-gray-300">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Fleet Management</h2>
             <p className="text-lg text-gray-600 mb-12">We handle everything so you don't have to</p>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
               <ServiceItem icon={<Settings className="text-luxury-gold" size={32} />} title="Vehicle Maintenance" desc="Regular servicing, repairs, and inspections to keep your fleet in perfect condition." />
               <ServiceItem icon={<CheckCircle className="text-luxury-gold" size={32} />} title="Client Screening" desc="Thorough background checks and verification to ensure only qualified renters." />
               <ServiceItem icon={<Settings className="text-luxury-gold" size={32} />} title="Marketing & Booking" desc="Professional marketing and booking management to maximize your rental income." />
             </div>
          </div>
        </section>

        {/* Managed Success */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Managed Success</h2>
             <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               <ExampleCard 
                 img="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/DSC00406-Enhanced-NR.jpg" 
                 name="Ferrari 488 GTB" 
                 rev="$18,500" 
                 util="96%" 
               />
               <ExampleCard 
                 img="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00382-Enhanced-NR.jpg" 
                 name="Mercedes AMG GT" 
                 rev="$12,300" 
                 util="89%" 
               />
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Join our exclusive fleet management program and start earning from your luxury vehicles today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/form/management" className="bg-black text-white px-10 py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                Apply to Program
              </Link>
              <Link to="/contact" className="border-2 border-black text-black px-10 py-4 rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

function ServiceItem({ icon, title, desc }: any) {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function ExampleCard({ img, name, rev, util }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Monthly Revenue:</span>
            <span className="font-bold text-green-600">{rev}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Avg Utilization:</span>
            <span className="font-bold">{util}</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-luxury-gold h-full" style={{ width: util }}></div>
        </div>
      </div>
    </div>
  );
}

export default RentalManagement;