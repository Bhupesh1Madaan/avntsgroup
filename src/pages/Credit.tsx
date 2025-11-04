import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Credit = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    addressYears: '',
    addressMonths: '',
    previousAddress: '',
    previousAddressYears: '',
    previousAddressMonths: '',
    city: '',
    state: '',
    zipCode: '',
    citizenshipStatus: '',
    employer: '',
    position: '',
    employmentYears: '',
    employmentMonths: '',
    previousEmployer: '',
    previousPosition: '',
    previousEmploymentYears: '',
    previousEmploymentMonths: '',
    income: '',
    additionalIncome: '',
    references: '',
    comments: '',
    vehicleOfInterest: '',
  });

  const [showPreviousAddress, setShowPreviousAddress] = useState(false);
  const [showPreviousEmployment, setShowPreviousEmployment] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Check address duration
    if (name === 'addressYears' || name === 'addressMonths') {
      const years = Number(name === 'addressYears' ? value : formData.addressYears) || 0;
      const months = Number(name === 'addressMonths' ? value : formData.addressMonths) || 0;
      setShowPreviousAddress(years * 12 + months < 24);
    }

    // Check employment duration
    if (name === 'employmentYears' || name === 'employmentMonths') {
      const years = Number(name === 'employmentYears' ? value : formData.employmentYears) || 0;
      const months = Number(name === 'employmentMonths' ? value : formData.employmentMonths) || 0;
      setShowPreviousEmployment(years * 12 + months < 24);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_firstName: formData.firstName,
      from_lastName: formData.lastName,
      from_email: formData.email,
      from_phone: formData.phone,
      from_address: formData.address,
      from_addressYears: formData.addressYears,
      from_addressMonths: formData.addressMonths,
      from_previousAddress: formData.previousAddress || 'N/A',
      from_previousAddressYears: formData.previousAddressYears || 'N/A',
      from_previousAddressMonths: formData.previousAddressMonths || 'N/A',
      from_city: formData.city,
      from_state: formData.state,
      from_zipCode: formData.zipCode,
      from_citizenshipStatus: formData.citizenshipStatus,
      from_employer: formData.employer,
      from_position: formData.position,
      from_employmentYears: formData.employmentYears,
      from_employmentMonths: formData.employmentMonths,
      from_previousEmployer: formData.previousEmployer || 'N/A',
      from_previousPosition: formData.previousPosition || 'N/A',
      from_previousEmploymentYears: formData.previousEmploymentYears || 'N/A',
      from_previousEmploymentMonths: formData.previousEmploymentMonths || 'N/A',
      from_income: formData.income,
      from_additionalIncome: formData.additionalIncome || 'N/A',
      from_references: formData.references || 'N/A',
      from_comments: formData.comments || 'N/A',
      from_vehicleOfInterest: formData.vehicleOfInterest || 'N/A'
    };

    emailjs.send('service_jjyr7p5', 'template_bbsmfnw', templateParams, 'E32bROpCInXRA6Udp')
      .then(() => {
        setSubmitted(true);
        toast.success('Credit application submitted successfully!');
        setIsSubmitting(false);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            addressYears: '',
            addressMonths: '',
            previousAddress: '',
            previousAddressYears: '',
            previousAddressMonths: '',
            city: '',
            state: '',
            zipCode: '',
            citizenshipStatus: '',
            employer: '',
            position: '',
            employmentYears: '',
            employmentMonths: '',
            previousEmployer: '',
            previousPosition: '',
            previousEmploymentYears: '',
            previousEmploymentMonths: '',
            income: '',
            additionalIncome: '',
            references: '',
            comments: '',
            vehicleOfInterest: '',
          });
        }, 5000);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast.error('Failed to submit application. Please try again later.');
        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-luxury-black flex items-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/f9a5d58e-7077-4410-b728-759360f06c5a.png')] bg-cover bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Credit <span className="text-luxury-gold">Application</span>
            </h1>
            <p className="text-xl text-white">
              Apply for financing to experience our premium luxury vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Credit Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Application Submitted!</h2>
                <p className="text-luxury-gray mb-6">
                  Thank you for submitting your credit application. Our finance team will review your information and contact you shortly.
                </p>
                <p className="text-luxury-gray">
                  A confirmation email has been sent to your provided email address.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8">
                <h2 className="text-2xl font-serif font-bold mb-6 text-center">Credit Application Form</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <h3 className="text-xl font-bold col-span-full mb-2">Personal Information</h3>

                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-luxury-gray mb-1">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input-field"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-luxury-gray mb-1">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input-field"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-luxury-gray mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input-field"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-luxury-gray mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input-field"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Citizenship Status */}
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-luxury-gray mb-1">Citizenship Status *</label>
                    <Select
                      name="citizenshipStatus"
                      onValueChange={(value) => handleChange({ target: { name: 'citizenshipStatus', value } } as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select citizenship status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizen">Canadian Citizen</SelectItem>
                        <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                        <SelectItem value="work_permit">Work Permit</SelectItem>
                        <SelectItem value="study_permit">Study Permit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Current Address */}
                  <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium text-luxury-gray mb-1">Current Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="input-field"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address Duration */}
                  <div>
                    <label className="block text-sm font-medium text-luxury-gray mb-1">Years at Current Address *</label>
                    <input
                      type="number"
                      name="addressYears"
                      className="input-field"
                      value={formData.addressYears}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-luxury-gray mb-1">Months at Current Address *</label>
                    <input
                      type="number"
                      name="addressMonths"
                      className="input-field"
                      value={formData.addressMonths}
                      onChange={handleChange}
                      min="0"
                      max="11"
                      required
                    />
                  </div>

                  {/* Previous Address (conditional) */}
                  {showPreviousAddress && (
                    <>
                      <div className="col-span-full">
                        <label htmlFor="previousAddress" className="block text-sm font-medium text-luxury-gray mb-1">Previous Address *</label>
                        <input
                          type="text"
                          id="previousAddress"
                          name="previousAddress"
                          className="input-field"
                          value={formData.previousAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-luxury-gray mb-1">Years at Previous Address *</label>
                        <input
                          type="number"
                          name="previousAddressYears"
                          className="input-field"
                          value={formData.previousAddressYears}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-luxury-gray mb-1">Months at Previous Address *</label>
                        <input
                          type="number"
                          name="previousAddressMonths"
                          className="input-field"
                          value={formData.previousAddressMonths}
                          onChange={handleChange}
                          min="0"
                          max="11"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Employment Details */}
                  <h3 className="text-xl font-bold col-span-full mb-2 mt-4">Employment Details</h3>

                  <div>
                    <label htmlFor="employer" className="block text-sm font-medium text-luxury-gray mb-1">Current Employer *</label>
                    <input
                      type="text"
                      id="employer"
                      name="employer"
                      className="input-field"
                      value={formData.employer}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-luxury-gray mb-1">Position/Title *</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className="input-field"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-luxury-gray mb-1">Years at Current Employer *</label>
                    <input
                      type="number"
                      name="employmentYears"
                      className="input-field"
                      value={formData.employmentYears}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-luxury-gray mb-1">Months at Current Employer *</label>
                    <input
                      type="number"
                      name="employmentMonths"
                      className="input-field"
                      value={formData.employmentMonths}
                      onChange={handleChange}
                      min="0"
                      max="11"
                      required
                    />
                  </div>

                  {/* Previous Employment (conditional) */}
                  {showPreviousEmployment && (
                    <>
                      <div>
                        <label htmlFor="previousEmployer" className="block text-sm font-medium text-luxury-gray mb-1">Previous Employer *</label>
                        <input
                          type="text"
                          id="previousEmployer"
                          name="previousEmployer"
                          className="input-field"
                          value={formData.previousEmployer}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="previousPosition" className="block text-sm font-medium text-luxury-gray mb-1">Previous Position *</label>
                        <input
                          type="text"
                          id="previousPosition"
                          name="previousPosition"
                          className="input-field"
                          value={formData.previousPosition}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-luxury-gray mb-1">Years at Previous Employer *</label>
                        <input
                          type="number"
                          name="previousEmploymentYears"
                          className="input-field"
                          value={formData.previousEmploymentYears}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-luxury-gray mb-1">Months at Previous Employer *</label>
                        <input
                          type="number"
                          name="previousEmploymentMonths"
                          className="input-field"
                          value={formData.previousEmploymentMonths}
                          onChange={handleChange}
                          min="0"
                          max="11"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Financial Information */}
                  <h3 className="text-xl font-bold col-span-full mb-2 mt-4">Financial Information</h3>

                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-luxury-gray mb-1">Monthly Income (CAD) *</label>
                    <input
                      type="text"
                      id="income"
                      name="income"
                      className="input-field"
                      placeholder="e.g. 75000"
                      value={formData.income}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalIncome" className="block text-sm font-medium text-luxury-gray mb-1">Additional Income (if any)</label>
                    <input
                      type="text"
                      id="additionalIncome"
                      name="additionalIncome"
                      className="input-field"
                      placeholder="e.g. 15000"
                      value={formData.additionalIncome}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="references" className="block text-sm font-medium text-luxury-gray mb-1">References</label>
                    <textarea
                      id="references"
                      name="references"
                      rows={3}
                      className="input-field"
                      placeholder="Please provide any references that may help your application."
                      value={formData.references}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="comments" className="block text-sm font-medium text-luxury-gray mb-1">Additional Comments</label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={3}
                      className="input-field"
                      placeholder="Any additional information you'd like to provide."
                      value={formData.comments}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Vehicle Information */}
                  <h3 className="text-xl font-bold col-span-full mb-2 mt-4">Vehicle Information</h3>

                  <div className="col-span-full mb-6">
                    <label htmlFor="vehicleOfInterest" className="block text-sm font-medium text-luxury-gray mb-1">Vehicle of Interest</label>
                    <textarea
                      id="vehicleOfInterest"
                      name="vehicleOfInterest"
                      rows={3}
                      className="input-field"
                      placeholder="Please describe the vehicle you're interested in (Year, Make, Model, etc.)"
                      value={formData.vehicleOfInterest}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      className="mt-1 mr-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-luxury-gray">
                      I agree to the <a href="#" className="text-luxury-gold hover:underline">Terms and Conditions</a> and consent to the collection and use of my information as described in the <a href="#" className="text-luxury-gold hover:underline">Privacy Policy</a>.
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="gold-button w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Credit Application Process</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ol className="list-decimal list-inside space-y-4 text-luxury-gray">
                <li className="font-medium">
                  <span className="text-luxury-black">Submit your application</span>
                  <p className="ml-5 text-sm mt-1">Complete the form above with all required information.</p>
                </li>
                <li className="font-medium">
                  <span className="text-luxury-black">Application review</span>
                  <p className="ml-5 text-sm mt-1">Our finance team will review your application within 1-2 business days.</p>
                </li>
                <li className="font-medium">
                  <span className="text-luxury-black">Credit check</span>
                  <p className="ml-5 text-sm mt-1">We'll perform a credit check with your authorization.</p>
                </li>
                <li className="font-medium">
                  <span className="text-luxury-black">Approval notification</span>
                  <p className="ml-5 text-sm mt-1">You'll receive notification of approval status via email and phone.</p>
                </li>
                <li className="font-medium">
                  <span className="text-luxury-black">Select your vehicle</span>
                  <p className="ml-5 text-sm mt-1">Upon approval, you can select the luxury vehicle of your choice.</p>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-gray-50 rounded border-l-4 border-luxury-gold">
                <p className="text-sm text-luxury-gray">
                  <strong>Note:</strong> Submission of an application does not guarantee approval. All applications are subject to credit review and approval based on our financing criteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Credit;
