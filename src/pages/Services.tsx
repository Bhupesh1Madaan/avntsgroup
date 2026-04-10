import React from 'react';
import Layout from '../components/Layout';
import { Car, Settings, DollarSign, Shield, Wrench, Hammer, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceItems = [
    {
      title: "Car Rentals",
      desc: "Reliable vehicles for every lifestyle, from fuel-efficient sedans to versatile SUVs and sporty compacts.",
      icon: <Car size={20} className="text-luxury-black" />,
      link: "/services/rentals",
      img: "/STEV4665.jpg"
    },
    {
      title: "Mechanical Service",
      desc: "Precision diagnostics and expert repairs for luxury and performance vehicles.",
      icon: <Wrench size={20} className="text-luxury-black" />,
      link: "/services/mechanical",
      img: "/lovable-uploads/1b46b820-06ad-417a-a91a-73bc31bb87b2.png"
    },
    {
      title: "Autobody & Collision",
      desc: "Restoring your vehicle to factory perfection with meticulous attention and insurance approval.",
      icon: <Hammer size={20} className="text-luxury-black" />,
      link: "/services/autobody",
      img: "/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00366-Enhanced-SR.jpg"
    },
    {
      title: "Sales & Financing",
      desc: "A wide range of quality vehicles, with friendly support and flexible financing to fit your budget.",
      icon: <DollarSign size={20} className="text-luxury-black" />,
      link: "/services/sales",
      img: "/finance.jpg"
    },
    {
      title: "Rental Management",
      desc: "Turn your vehicle into an income-generating asset with our full-service management program.",
      icon: <Settings size={20} className="text-luxury-black" />,
      link: "/services/management",
      img: "/STEV4660.jpg"
    },
    {
      title: "Insurance Services",
      desc: "Tailored insurance solutions that match your lifestyle and safeguard your automotive investment.",
      icon: <Shield size={20} className="text-luxury-black" />,
      link: "/services/insurance",
      img: "/insurance.png"
    },
    {
      title: "Detailing & Wrapping",
      desc: "Professional-grade detailing, vehicle wrapping, and premium tinting services.",
      icon: <Settings size={20} className="text-luxury-black" />,
      link: "/services/detailing",
      img: "/STEV4576.jpg"
    },
    {
      title: "Accident Support",
      desc: "Reporting injuries and connecting you with legal and medical support after an accident.",
      icon: <HeartPulse size={20} className="text-luxury-black" />,
      link: "/services/injury",
      img: "/AVNTS Car Pictures/FILLER PHOTOS/Mercedes/DSC00366-Enhanced-SR.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1b46b820-06ad-417a-a91a-73bc31bb87b2.png')] bg-cover bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Our <span className="text-luxury-gold">Premium</span> Services
            </h1>
            <p className="text-xl text-white">
              Comprehensive automotive solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center text-luxury-black">Our Services</h2>
          <p className="section-subtitle text-center mb-16">Exceptional automotive solutions customized for you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceItems.map((s, i) => (
              <div key={i} className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 flex flex-col">
                <div className="h-56 bg-center bg-cover" style={{ backgroundImage: `url('${s.img}')` }}></div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center mr-4">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold">{s.title}</h3>
                  </div>
                  <p className="text-luxury-gray mb-8 flex-1 leading-relaxed">
                    {s.desc}
                  </p>
                  <Link to={s.link} className="text-luxury-gold hover:text-luxury-black font-bold flex items-center transition-colors">
                    Learn more 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-luxury-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Experience AVNTS Excellence</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-400">
            Contact us today to discuss your specific requirements and experience the standard of luxury automotive service.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/cars" className="gold-button px-10">
              View Our Fleet
            </Link>
            <Link to="/contact" className="gold-outline-button px-10">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
