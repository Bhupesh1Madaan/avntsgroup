
import React from 'react';
import Layout from '../components/Layout';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const salesFinancingFaqs = [
    {
      question: "Do I need to have perfect credit to get approved for financing?",
      answer: "No, you don't need perfect credit. At AVNTS AutoGroup, we work with a wide network of lenders to get you approved, no matter your credit history. We specialize in helping customers with all types of credit—good, bad, or no credit at all. Our goal is to find the best possible financing options for you."
    },
    {
      question: "How do I get pre-approved for financing?",
      answer: "To get pre-approved, simply fill out our online pre-approval application form. We'll ask for basic information like your desired vehicle, personal details, and financial status. Once we have that, we'll match you with the best financing options from our extensive network of trusted lenders."
    },
    {
      question: "How long does it take to get approved?",
      answer: "The approval process is quick! Once you submit your pre-approval application, we typically have an answer within 24 to 48 hours. We understand that time is of the essence, and we aim to get you into your new vehicle as quickly as possible."
    },
    {
      question: "Do you offer financing for all vehicles?",
      answer: "Yes, we offer financing for all the vehicles in our inventory, whether new or pre-owned. We work with a variety of lenders to ensure that we can provide flexible terms and competitive rates for every vehicle."
    },
    {
      question: "What kind of interest rates can I expect?",
      answer: "Interest rates vary based on several factors, including your credit score, loan term, and the vehicle you're purchasing. At AVNTS AutoGroup, we aim to offer competitive rates regardless of your credit score. Our finance team will work with you to secure the best possible terms."
    },
    {
      question: "Can I trade in my current vehicle?",
      answer: "Yes, we accept trade-ins! If you're looking to upgrade, we'll provide you with a competitive trade-in offer based on your vehicle's value. This can be used as a down payment toward your new car."
    },
    {
      question: "What documents do I need to provide for financing?",
      answer: "To complete your financing application, we typically require the following documents: Valid government-issued ID, Proof of income (pay stubs, tax returns, or bank statements), Proof of residence (utility bill or lease agreement), Your driver's license, A copy of your credit report (if available)."
    },
    {
      question: "Can I get financing with a low credit score?",
      answer: "Absolutely. We specialize in securing financing for clients with all types of credit scores, including those with low or no credit history. Our extensive network of lenders ensures that we can find solutions tailored to your situation."
    },
    {
      question: "Do you work with all lenders?",
      answer: "Yes, we work with a wide variety of lenders, including major banks, credit unions, and alternative lenders. This allows us to offer flexible terms and find the best financing options for our customers, regardless of their credit profile."
    },
    {
      question: "Is the financing process only available for purchases?",
      answer: "While we primarily offer financing for vehicle purchases, we also offer financing for lease buyouts, long-term rentals, and fleet purchases. If you have any questions about financing specific to your needs, reach out to our team, and we'll be happy to assist."
    },
    {
      question: "How can I check my financing eligibility?",
      answer: "The best way to check your eligibility is to fill out our pre-approval application online. This will give you a good sense of what financing options are available to you based on your credit, income, and other factors."
    },
    {
      question: "Can I make changes to my financing terms after approval?",
      answer: "Once you've been approved and the terms are set, changes can be made, but they may depend on your lender's policies. If you need to make adjustments, let us know, and we'll work with the lender to find a solution that works best for you."
    }
  ];

  const servicesFaqs = [
    {
      question: "What types of vehicles do you offer for sale?",
      answer: "AVNTS AutoGroup offers a wide range of vehicles, from luxury cars, SUVs, and sports cars to economy models. Whether you're looking for a family-friendly vehicle or a high-end luxury ride, we have something for everyone. Our inventory is updated regularly to include the latest models and makes."
    },
    {
      question: "Do you offer extended warranties?",
      answer: "Yes, we offer extended warranties on all vehicles we sell. Our warranties provide peace of mind and cover critical components of the vehicle, ensuring you're protected long after your purchase."
    },
    {
      question: "What is the process for purchasing a vehicle?",
      answer: "Purchasing a vehicle at AVNTS AutoGroup is straightforward: 1. Browse our inventory online or visit our showroom to see the cars in person. 2. Choose your desired vehicle and complete a pre-approval application. 3. Once approved, finalize the financing and review the terms. 4. Sign the agreement and schedule your delivery or pick-up. Our team will guide you through each step to ensure a smooth and efficient purchase process."
    },
    {
      question: "Do you offer vehicle leasing options?",
      answer: "Yes, we offer flexible vehicle leasing options for those who prefer to drive a new car every few years. Our leasing terms are competitive, and we work with lenders to secure the best possible rates for you."
    },
    {
      question: "How does the vehicle detailing process work?",
      answer: "Our detailing service includes a full interior and exterior cleaning to restore the vehicle to its best condition. Services range from basic cleaning to full detailing, including paint correction, ceramic coatings, and upholstery treatments. You can book detailing directly through our website or by contacting us."
    },
    {
      question: "What is vehicle wrapping, and do you offer it?",
      answer: "Vehicle wrapping is a process where vinyl wraps are applied to a vehicle's exterior, allowing for complete customization of the color and design. Whether you're looking for a bold new look or simply want to protect your vehicle's paint, we offer high-quality vehicle wrapping services."
    },
    {
      question: "Do you handle insurance claims for vehicles?",
      answer: "Yes, we handle insurance claims for both auto body repairs and vehicle rentals. We work with all major insurance providers and will assist with the paperwork and coordination to ensure a seamless repair process."
    },
    {
      question: "What types of mechanical services do you offer?",
      answer: "Our mechanical services include everything from routine maintenance (oil changes, brake services, tire rotations) to more complex repairs (engine diagnostics, transmission work, suspension repairs). Our certified technicians are equipped to handle a wide range of vehicle issues."
    },
    {
      question: "Can I schedule a test drive?",
      answer: "Yes! You can easily schedule a test drive through our website or by calling us. We encourage all customers to experience the vehicle firsthand before making a decision."
    },
    {
      question: "What if my car breaks down during a rental?",
      answer: "If your rental car breaks down, contact us immediately. We offer roadside assistance services and will arrange for a replacement vehicle or repair, depending on the situation. Your safety and convenience are our top priority."
    },
    {
      question: "Can I customize my rental car with additional services?",
      answer: "Yes, you can customize your rental car with additional services such as GPS, car seats, and mobile hotspot. For longer-term rentals, we also offer vehicle wraps, tints, and detailing to suit your personal style."
    },
    {
      question: "How does the rental management service work for business owners?",
      answer: "We offer complete rental management services for business owners who want to rent their vehicles out through AVNTS AutoGroup. This includes listing the vehicle, handling bookings, performing maintenance, and managing customer communications. You simply provide the car, and we do the rest."
    },
    {
      question: "Do you offer any promotions or discounts?",
      answer: "We periodically offer promotions on vehicle purchases, rentals, and services. Please subscribe to our newsletter or follow us on social media to stay updated on the latest deals and offers."
    },
    {
      question: "How do I schedule an autobody repair or mechanical service?",
      answer: "To schedule a service, you can book online through our website, call us directly, or stop by our location. We also offer walk-in services for minor repairs, but it's always best to call ahead for larger repairs."
    },
    {
      question: "What should I do if my car needs an insurance claim?",
      answer: "If your car is involved in an accident or needs to be repaired through an insurance claim, contact us immediately. We'll guide you through the claims process, assist with paperwork, and coordinate repairs with your insurance provider."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
         <div className="relative bg-luxury-black text-white py-16">
           <div className="absolute inset-0 bg-[url('/lovable-uploads/0d39392d-0030-42b1-80aa-6024526a6070.png')] bg-cover bg-center opacity-30"></div>
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-2xl animate-fade-in">
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                 Frequently Asked <span className="text-luxury-gold">Questions</span>
               </h1>
               <p className="text-xl text-white">
                 Find answers to common questions about our services
               </p>
             </div>
           </div>
         </div>

        {/* FAQ Content */}
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Sales & Financing FAQs Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-luxury-black mb-8 text-left">
                Sales & Financing FAQs
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {salesFinancingFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`sales-${index}`}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="font-semibold text-luxury-black pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Services FAQs Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-luxury-black mb-8 text-left">
                Services FAQs
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {servicesFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`services-${index}`}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="font-semibold text-luxury-black pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Section */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-luxury-black mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our customer service team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-luxury-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                >
                  Contact Us
                </a>
                <a 
                  href="tel:(437) 553-9211" 
                  className="bg-luxury-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Call (437) 553-9211
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
