import React from 'react';
import Layout from '../components/Layout';
import { Calendar, Clock } from 'lucide-react';

const NewsStories = () => {
  const newsItems = [
    {
      id: 1,
      title: "AVNTS Autogroup Expands Fleet with Latest Luxury Models",
      excerpt: "We're excited to announce the addition of the newest luxury vehicles to our rental and sales inventory, offering our customers access to the latest automotive technology and style.",
      date: "March 15, 2024",
      readTime: "3 min read",
      image: "/mercedes-3.jpg"
    },
    {
      id: 2,
      title: "New Insurance Partnership Brings Enhanced Coverage Options",
      excerpt: "Our partnership with leading insurance providers now offers comprehensive coverage solutions tailored to meet every customer's unique needs.",
      date: "March 8, 2024",
      readTime: "2 min read",
      image: "/ferrari-3.jpg"
    },
    {
      id: 3,
      title: "Customer Spotlight: Excellence in Vehicle Sourcing",
      excerpt: "Read how our vehicle sourcing team helped a customer find their dream car through our exclusive network of dealers and manufacturers.",
      date: "February 28, 2024",
      readTime: "4 min read",
      image: "/audi-2.jpg"
    },
    {
      id: 4,
      title: "Luxury Car Maintenance: Tips from Our Expert Team",
      excerpt: "Discover essential maintenance tips and best practices for keeping your luxury vehicle in pristine condition, straight from our certified technicians.",
      date: "February 20, 2024",
      readTime: "5 min read",
      image: "/mercedes-4.jpg"
    },
    {
      id: 5,
      title: "The Future of Electric Luxury Vehicles",
      excerpt: "Explore the latest developments in electric luxury vehicles and how AVNTS Autogroup is preparing for the future of sustainable luxury transportation.",
      date: "February 12, 2024",
      readTime: "4 min read",
      image: "/ferrari-4.jpg"
    },
    {
      id: 6,
      title: "Exclusive Events: Behind the Scenes at Luxury Car Shows",
      excerpt: "Get an insider's look at the most prestigious automotive events and how AVNTS Autogroup participates in showcasing the finest vehicles in the industry.",
      date: "February 5, 2024",
      readTime: "3 min read",
      image: "/audi-3.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1b46b820-06ad-417a-a91a-73bc31bb87b2.png')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              News & <span className="text-luxury-gold">Stories</span>
            </h1>
            <p className="text-xl text-white">
              Stay updated with the latest from AVNTS Autogroup
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {newsItems.map((item) => (
              <article key={item.id} className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-serif font-bold text-luxury-black mb-3">
                      {item.title}
                    </h2>
                    <p className="text-luxury-gray mb-4">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-luxury-gray">
                      <Calendar size={16} className="mr-2" />
                      <span className="mr-4">{item.date}</span>
                      <Clock size={16} className="mr-2" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-luxury-black mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-luxury-gray mb-8">
              Subscribe to our newsletter to receive the latest news, updates, and exclusive offers from AVNTS Autogroup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-luxury-gold"
              />
              <button className="gold-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsStories;