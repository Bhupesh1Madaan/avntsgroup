
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Briefcase, Users, Star, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const jobOpenings = [
    {
      id: 1,
      title: "Sales & Financing Consultant",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "As a Sales & Financing Consultant, you will guide customers through the car-buying journey, helping them choose the right vehicle, secure financing, and complete their purchase. You will work with a range of customers—from first-time buyers to those with complex financing needs—and will be responsible for achieving sales targets while providing exceptional customer service.",
      responsibilities: [
        "Assist customers in selecting vehicles based on their needs and preferences",
        "Explain financing options and assist with pre-approvals",
        "Facilitate the sales process from inquiry to delivery",
        "Collaborate with the financing team to ensure smooth loan processing",
        "Maintain a strong knowledge of inventory and promotions",
        "Meet monthly and quarterly sales goals"
      ],
      qualifications: [
        "Proven experience in automotive sales or financing",
        "Strong interpersonal and negotiation skills",
        "Knowledge of financing options and terms",
        "Ability to work under pressure and meet targets"
      ]
    },
    {
      id: 2,
      title: "Rental Manager",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "The Rental Manager will oversee the daily operations of AVNTS AutoGroup's rental fleet, ensuring that all vehicles are well-maintained, available for booking, and that customer satisfaction is consistently achieved. You will manage a team, coordinate bookings, and provide excellent service to our rental customers.",
      responsibilities: [
        "Manage the rental fleet, including vehicle maintenance and scheduling",
        "Ensure all rental transactions are processed efficiently and accurately",
        "Supervise rental staff and ensure proper customer service standards",
        "Handle customer inquiries, reservations, and complaints",
        "Monitor rental trends and adjust pricing and promotions accordingly",
        "Track rental income and manage fleet expenses"
      ],
      qualifications: [
        "Previous experience in rental management or fleet operations",
        "Strong organizational skills and attention to detail",
        "Excellent customer service and communication skills",
        "Ability to work independently and lead a team"
      ]
    },
    {
      id: 3,
      title: "Autobody Repair Technician",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "As an Autobody Repair Technician, you will be responsible for repairing and restoring vehicles to their original condition. This role involves working with various types of damage and ensuring the highest quality of repairs while adhering to safety standards.",
      responsibilities: [
        "Perform autobody repairs on vehicles involved in accidents or requiring restoration",
        "Work with a range of tools and equipment to restore vehicles to their pre-accident condition",
        "Conduct vehicle inspections and assess the extent of damage",
        "Collaborate with insurance providers to process claims",
        "Ensure compliance with safety and environmental standards"
      ],
      qualifications: [
        "Proven experience as an autobody repair technician",
        "Certification or training in autobody repair (preferred)",
        "Ability to work with various repair tools and equipment",
        "Strong attention to detail and commitment to quality"
      ]
    },
    {
      id: 4,
      title: "Customer Service Representative",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "The Customer Service Representative is the first point of contact for our customers, providing them with assistance across all departments—sales, rentals, repairs, and more. This position requires a customer-first mindset, excellent communication skills, and the ability to handle multiple tasks at once.",
      responsibilities: [
        "Answer phone calls, emails, and in-person inquiries from customers",
        "Provide information on vehicle availability, rental options, and financing terms",
        "Schedule appointments for vehicle service, repairs, and consultations",
        "Assist with processing rental bookings and sales inquiries",
        "Resolve customer complaints and ensure satisfaction"
      ],
      qualifications: [
        "Previous customer service experience, preferably in the automotive industry",
        "Excellent communication and problem-solving skills",
        "Ability to multitask and work in a fast-paced environment",
        "Strong computer and data entry skills"
      ]
    },
    {
      id: 5,
      title: "Marketing & Social Media Coordinator",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "The Marketing & Social Media Coordinator will develop and execute digital marketing strategies to promote AVNTS AutoGroup's services and drive brand awareness. This role includes managing social media channels, creating content, and working on various marketing campaigns.",
      responsibilities: [
        "Develop and execute marketing strategies across digital channels (social media, email, SEO)",
        "Create engaging content for social media, including graphics, videos, and blogs",
        "Manage paid advertising campaigns and track their effectiveness",
        "Coordinate promotions, events, and product launches",
        "Analyze market trends and adjust marketing strategies accordingly"
      ],
      qualifications: [
        "Experience in digital marketing, especially social media management",
        "Strong writing and content creation skills",
        "Knowledge of SEO, Google Analytics, and online advertising platforms",
        "Creativity and the ability to think outside the box"
      ]
    },
    {
      id: 6,
      title: "Fleet Maintenance Technician",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "The Fleet Maintenance Technician is responsible for the regular maintenance and servicing of AVNTS AutoGroup's rental and sales fleet. You will ensure that all vehicles are in optimal condition, performing routine checks, diagnostics, and repairs to keep our fleet running smoothly.",
      responsibilities: [
        "Perform routine maintenance on rental and sales vehicles, including oil changes, tire rotations, and brake checks",
        "Diagnose and repair mechanical issues in cars, trucks, and SUVs",
        "Work closely with the rental team to ensure vehicles are available and in top condition for customers",
        "Maintain records of all service and repair work completed",
        "Ensure compliance with safety standards and regulations"
      ],
      qualifications: [
        "Certification or experience in automotive maintenance and repair",
        "Strong knowledge of vehicle systems and diagnostics",
        "Excellent problem-solving skills",
        "Ability to work independently and manage time effectively"
      ]
    },
    {
      id: 7,
      title: "Administrative Assistant",
      location: "Toronto, ON",
      type: "Full-time",
      overview: "The Administrative Assistant will support the daily operations of AVNTS AutoGroup by performing a variety of administrative tasks. This role requires a detail-oriented individual who is capable of managing schedules, coordinating between departments, and maintaining organized records to ensure smooth business operations.",
      responsibilities: [
        "Manage appointments, meetings, and calendars for various departments",
        "Handle administrative tasks such as filing, data entry, and documentation",
        "Assist with the preparation of reports, contracts, and marketing materials",
        "Coordinate communication between team members and departments",
        "Respond to customer inquiries and provide support where needed",
        "Assist in inventory management and fleet tracking"
      ],
      qualifications: [
        "Previous experience as an administrative assistant or in an office support role",
        "Strong organizational skills with the ability to multitask",
        "Excellent written and verbal communication skills",
        "Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint)",
        "Ability to handle sensitive and confidential information with professionalism"
      ]
    },
    {
      id: 8,
      title: "Remote Customer Support Representative",
      location: "Remote",
      type: "Full-time",
      overview: "As a Remote Customer Support Representative, you will be responsible for assisting customers via phone, email, and chat. This position allows you to work from the comfort of your home while providing exceptional service to our customers across the entire range of AVNTS AutoGroup's offerings, including rentals, sales, and service inquiries.",
      responsibilities: [
        "Provide excellent customer service by handling inquiries and resolving issues via phone, email, or chat",
        "Assist customers with rental bookings, vehicle purchases, and service appointments",
        "Handle complaints, returns, and any product/service issues with professionalism",
        "Maintain up-to-date knowledge on all AVNTS AutoGroup products and services",
        "Document customer interactions and provide feedback for service improvements",
        "Collaborate with other team members and departments as needed"
      ],
      qualifications: [
        "Previous experience in customer support or service (preferably in the automotive or rental industry)",
        "Excellent communication skills, both written and verbal",
        "Ability to work independently and manage time effectively in a remote setting",
        "Strong problem-solving skills and the ability to think on your feet",
        "Proficiency with CRM tools and customer service platforms",
        "A quiet and professional home office environment for customer calls"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Star className="h-8 w-8 text-luxury-gold" />,
      title: "Competitive Salary",
      description: "We offer competitive compensation packages with performance-based bonuses."
    },
    {
      icon: <Users className="h-8 w-8 text-luxury-gold" />,
      title: "Team Environment",
      description: "Work with a supportive team that values collaboration and professional growth."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-luxury-gold" />,
      title: "Career Growth",
      description: "Opportunities for advancement and professional development within our organization."
    }
  ];

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedJob(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-luxury-black text-white py-16">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/5fe95521-f74b-4850-87e5-03cbc91c5f73.png')] bg-cover bg-center opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Join Our <span className="text-luxury-gold">Team</span>
              </h1>
              <p className="text-xl text-white">
                Build your career with AVNTS Auto Group
              </p>
            </div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-luxury-black mb-4">
                Why Work With Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At AVNTS Auto Group, we believe our employees are our greatest asset. We provide a supportive environment where you can grow and succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Current Openings */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-luxury-black mb-4">
                Current Openings
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our current job opportunities and find the perfect role to advance your career.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-luxury-black/10 hover:border-luxury-black/30"
                  onClick={() => handleJobClick(job)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-luxury-black mb-2 line-clamp-2">
                        {job.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <span className="bg-luxury-gold/10 text-luxury-gold px-2 py-1 rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-700 leading-relaxed line-clamp-3 mb-4">
                      {job.overview}
                    </CardDescription>
                    <Button
                      className="w-full bg-luxury-black hover:bg-gray-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-luxury-black mb-4">
              Don't See the Right Position?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-luxury-gold hover:bg-yellow-600"
                asChild
              >
                <a href="mailto:careers@AVNTSautogroup.com">
                  Send Your Resume
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white"
                asChild
              >
                <a href="/contact">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Job Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-luxury-black mb-2">
                {selectedJob?.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedJob?.location}</span>
                </div>
                <span className="bg-luxury-gold/10 text-luxury-gold px-2 py-1 rounded-full text-xs font-medium">
                  {selectedJob?.type}
                </span>
              </div>
            </DialogHeader>

            {selectedJob && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-luxury-black mb-3">Job Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedJob.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-luxury-black mb-3">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedJob.responsibilities.map((responsibility: string, i: number) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-luxury-black mb-3">Required Qualifications:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedJob.qualifications.map((qualification: string, i: number) => (
                      <li key={i}>{qualification}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    className="flex-1 bg-luxury-black hover:bg-gray-800"
                    asChild
                  >
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeftyZyWnWnF6N0rSO3O8By8tMjqyRmgKt4HULCrStzZND1Lw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white"
                    onClick={closeDialog}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Careers;
