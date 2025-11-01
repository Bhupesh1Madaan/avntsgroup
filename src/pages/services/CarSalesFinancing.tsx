import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { DollarSign, CheckCircle, Star, Shield, X, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';

const CarSalesFinancing = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Vehicle data for the featured vehicles
  const featuredVehicles = [
    {
      id: 1,
      name: 'Porsche Carrera S 992',
      make: 'Porsche',
      model: 'Carrera S 992',
      year: 2021,
      category: 'Luxury Sports',
      price: 125000,
      dailyRate: 150,
      image: '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4028.jpg',
      description: 'Ultimate driving machine with precision engineering, breathtaking performance, and iconic design.',
      additionalImages: [
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4028-2.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4037.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4039 (1).jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4040 (1).jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4042.jpg'
      ],
      engine: '3.0L Twin-Turbo',
      power: '443 HP',
      mileage: '12,500 miles',
      condition: 'Excellent'
    },
    {
      id: 2,
      name: 'Mercedes E43 AMG',
      make: 'Mercedes Benz',
      model: 'E43 AMG',
      year: 2020,
      category: 'Luxury Sedan',
      price: 65000,
      dailyRate: 140,
      image: '/STEV4627.jpg',
      description: 'Sleek, high-performance compact sedan boasting turbocharged power, sharp handling, and AMG-tuned luxury.',
      additionalImages: [
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/AVNTS Content Shoot #1/E43/STEV4628.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/AVNTS Content Shoot #1/E43/STEV4630.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/AVNTS Content Shoot #1/E43/STEV4631.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/AVNTS Content Shoot #1/E43/STEV4632.jpg',
        '/AVNTS Car Pictures/Fleet-Inventory Pictures/AVNTS Content Shoot #1/E43/STEV4633.jpg'
      ],
      engine: '3.0L V6 Biturbo',
      power: '396 HP',
      mileage: '15,000 miles',
      condition: 'Like new'
    }
  ];

  const openVehicleDialog = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDialogOpen(true);
  };

  const closeVehicleDialog = () => {
    setIsDialogOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-[url('/AVNTS%20Car%20Pictures/FILLER%20PHOTOS/Ferrari/C0154T01.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                Vehicle Sales & <span className="text-luxury-silver">Financing</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                Own your dream car with flexible financing options
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">0% APR Available</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Quick Approval</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Trade-In Welcome</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Inventory</h2>
              <p className="text-xl text-gray-600">Hand-picked luxury vehicles ready for immediate delivery</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Featured Vehicle 1 */}
              <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                <div className="relative h-96">
                  <img
                    src="/AVNTS Car Pictures/Fleet-Inventory Pictures/Aventis New photos 2/Porsche Carrera S 992/STEV4028.jpg"
                    alt="Porsche Carrera S 992"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-luxury-gold text-black px-4 py-2 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">Porsche Carrera S 992</h3>
                    <p className="text-lg opacity-90">2021 • 12,500 miles</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-3xl font-bold text-luxury-silver mb-2">$125,000</div>
                      <div className="text-gray-600">Starting at $150/day</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                      </div>
                      <div className="text-sm text-gray-600">Excellent condition</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">3.0L Twin-Turbo</div>
                      <div className="text-sm text-gray-600">Engine</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">443 HP</div>
                      <div className="text-sm text-gray-600">Power</div>
                    </div>
                  </div>
                  <button
                    onClick={() => openVehicleDialog(featuredVehicles[0])}
                    className="w-full bg-luxury-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-luxury-gold/90 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Featured Vehicle 2 */}
              <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                <div className="relative h-96">
                  <img
                    src="/STEV4627.jpg"
                    alt="Mercedes E43 AMG"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      New Arrival
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">Mercedes E43 AMG</h3>
                    <p className="text-lg opacity-90">2020 • 15,000 miles</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-3xl font-bold text-luxury-silver mb-2">$65,000</div>
                      <div className="text-gray-600">Starting at $140/day</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                      </div>
                      <div className="text-sm text-gray-600">Like new</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">3.0L V6 Biturbo</div>
                      <div className="text-sm text-gray-600">Engine</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">396 HP</div>
                      <div className="text-sm text-gray-600">Power</div>
                    </div>
                  </div>
                  <button
                    onClick={() => openVehicleDialog(featuredVehicles[1])}
                    className="w-full bg-luxury-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-luxury-gold/90 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Financing Options</h2>
                <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Standard Financing */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign size={24} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Standard Financing</h3>
                  <div className="text-4xl font-bold text-luxury-silver mb-2">3.9%</div>
                  <div className="text-gray-600 mb-6">APR starting from</div>
                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>Terms up to 72 months</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>No prepayment penalty</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>Quick approval process</span>
                    </li>
                  </ul>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </div>

                {/* Premium Financing */}
                <div className="bg-luxury-gold rounded-2xl p-8 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield size={24} className="text-luxury-silver" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">Premium Financing</h3>
                  <div className="text-4xl font-bold text-black mb-2">2.9%</div>
                  <div className="text-gray-700 mb-6">APR starting from</div>
                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-black mr-3" />
                      <span>Terms up to 84 months</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-black mr-3" />
                      <span>Extended warranty included</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-black mr-3" />
                      <span>Concierge service</span>
                    </li>
                  </ul>
                  <button className="w-full bg-black text-luxury-silver py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Get Started
                  </button>
                </div>

                {/* Lease Options */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign size={24} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Lease Options</h3>
                  <div className="text-4xl font-bold text-luxury-silver mb-2">$899</div>
                  <div className="text-gray-600 mb-6">per month starting</div>
                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>24-48 month terms</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>Low monthly payments</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-luxury-silver mr-3" />
                      <span>Upgrade options</span>
                    </li>
                  </ul>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Why Choose AVNTS?</h2>
                <p className="text-xl text-gray-300">The difference is in our service</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={24} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Certified Pre-Owned</h3>
                  <p className="text-gray-400 text-sm">All vehicles undergo rigorous inspection</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">White-Glove Service</h3>
                  <p className="text-gray-400 text-sm">Personalized service from start to finish</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign size={24} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Best Prices</h3>
                  <p className="text-gray-400 text-sm">Competitive pricing guaranteed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={24} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">5-Star Service</h3>
                  <p className="text-gray-400 text-sm">Rated excellent by our clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-luxury-gold">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-black mb-6">Ready to Own Your Dream Car?</h2>
              <p className="text-xl text-black/80 mb-8">
                Get pre-approved in minutes and drive away in your perfect vehicle today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/credit"
                  className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                  Apply for Financing
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-colors"
                >
                  Schedule Test Drive
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Vehicle Details Dialog */}
      {selectedVehicle && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeVehicleDialog()}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vehicle Image */}
              <div>
                <DialogTitle className="text-2xl font-serif font-bold mb-4">
                  {selectedVehicle.name} ({selectedVehicle.year})
                </DialogTitle>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-2">
                    {selectedVehicle.category}
                  </span>
                  <p className="text-gray-600 text-sm">{selectedVehicle.description}</p>
                </div>

                <div className="overflow-hidden rounded-lg">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Vehicle Details and Pricing */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Vehicle Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Make:</span>
                      <span className="font-medium">{selectedVehicle.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium">{selectedVehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span className="font-medium">{selectedVehicle.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedVehicle.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine:</span>
                      <span className="font-medium">{selectedVehicle.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power:</span>
                      <span className="font-medium">{selectedVehicle.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mileage:</span>
                      <span className="font-medium">{selectedVehicle.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">{selectedVehicle.condition}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Pricing</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-luxury-gold/10 to-luxury-gold/20 p-4 rounded-lg border border-luxury-gold/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-luxury-silver" />
                          <span className="font-medium">Purchase Price</span>
                        </div>
                        <span className="text-2xl font-bold text-luxury-silver">${selectedVehicle.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Daily Rental Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">${selectedVehicle.dailyRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 space-y-3">
                  <button
                    className="w-full bg-luxury-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-luxury-gold/90 transition-all duration-200 transform hover:scale-105"
                    onClick={() => {
                      window.location.href = '/contact';
                    }}
                  >
                    Schedule Test Drive
                  </button>
                  <button
                    className="w-full border-2 border-luxury-gold text-luxury-silver font-semibold py-3 px-6 rounded-lg hover:bg-luxury-gold hover:text-black transition-all duration-200"
                    onClick={() => {
                      window.location.href = '/credit';
                    }}
                  >
                    Apply for Financing
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default CarSalesFinancing;