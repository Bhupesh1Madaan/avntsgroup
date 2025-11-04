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
                  <div className="text-3xl font-bold text-luxury-gold">$4K</div>
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
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Fleet Management</h2>
                <p className="text-lg text-gray-600">We handle everything so you don't have to</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <Settings size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Vehicle Maintenance</h3>
                  <p className="text-gray-600">Regular servicing, repairs, and inspections to keep your fleet in perfect condition.</p>
                </div>

                {/* Service 2 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <CheckCircle size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Client Screening</h3>
                  <p className="text-gray-600">Thorough background checks and verification to ensure only qualified renters.</p>
                </div>

                {/* Service 3 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <Settings size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Marketing & Booking</h3>
                  <p className="text-gray-600">Professional marketing and booking management to maximize your rental income.</p>
                </div>

                {/* Service 4 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <CheckCircle size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Insurance Management</h3>
                  <p className="text-gray-600">Comprehensive insurance coverage and claims handling for complete protection.</p>
                </div>

                {/* Service 5 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <Settings size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Financial Reporting</h3>
                  <p className="text-gray-600">Detailed monthly reports on revenue, expenses, and performance metrics.</p>
                </div>

                {/* Service 6 */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                    <CheckCircle size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                  <p className="text-gray-600">Round-the-clock support for both you and your renters.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Fleet */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Managed Fleet Examples</h2>
                <p className="text-lg text-gray-600">See how we manage luxury vehicles</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Ferrari Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Ferrari/DSC00406-Enhanced-NR.jpg"
                      alt="Ferrari 488 GTB"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Active
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Ferrari 488 GTB</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Revenue:</span>
                        <span className="font-semibold text-green-600">$18,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utilization:</span>
                        <span className="font-semibold">96%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance Status:</span>
                        <span className="font-semibold text-green-600">Up to date</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-luxury-gold h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Mercedes Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src="/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00382-Enhanced-NR.jpg"
                      alt="Mercedes AMG GT"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      New
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Mercedes AMG GT</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Revenue:</span>
                        <span className="font-semibold text-green-600">$12,300</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utilization:</span>
                        <span className="font-semibold">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance Status:</span>
                        <span className="font-semibold text-green-600">Up to date</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-luxury-gold h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-gold">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-black mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-black/80 mb-8">
                Join our exclusive fleet management program and start earning from your luxury vehicles today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Schedule Consultation
                </a>
                <Link
                  to="/contact"
                  className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RentalManagement;