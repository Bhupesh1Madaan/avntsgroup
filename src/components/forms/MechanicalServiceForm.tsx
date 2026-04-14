import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const MechanicalServiceForm = ({ serviceIdentifier }: { serviceIdentifier?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '', vin: '',
    selectedServices: new Set<string>(),
    issueDescription: '',
    appointmentDate: '',
    timePreference: 'afternoon',
    needsTow: null,
    pickupAddress: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const services = [
    'Engine diagnostics', 'Oil change', 'Brake repair', 'Transmission',
    'Suspension', 'Electrical', 'Tire service', 'A/C & heating',
    'Exhaust', 'Body repair', 'Pre-purchase inspection', 'Other'
  ];

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const toggleService = (svc: string) => {
    const newSet = new Set(formData.selectedServices);
    if (newSet.has(svc)) newSet.delete(svc);
    else newSet.add(svc);
    updateField('selectedServices', newSet);
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (s === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = true;
      if (!formData.lastName.trim()) newErrors.lastName = true;
      if (!formData.phone.trim()) newErrors.phone = true;
      if (!formData.email.trim()) newErrors.email = true;
    }
    if (s === 2) {
      if (!formData.year.trim()) newErrors.year = true;
      if (!formData.make.trim()) newErrors.make = true;
      if (!formData.model.trim()) newErrors.model = true;
    }
    if (s === 4) {
      if (!formData.appointmentDate) newErrors.appointmentDate = true;
      if (formData.needsTow === null) newErrors.needsTow = true;
      if (formData.needsTow === true && !formData.pickupAddress.trim()) newErrors.pickupAddress = true;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const nextStep = () => { if (validateStep(step)) setStep(s => Math.min(s + 1, 4)); };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    const payload: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      year: formData.year,
      make: formData.make,
      model: formData.model,
      vin: formData.vin,
      selectedServices: Array.from(formData.selectedServices).join(', '),
      issueDescription: formData.issueDescription,
      appointmentDate: formData.appointmentDate,
      timePreference: formData.timePreference,
      needsTow: String(formData.needsTow),
      pickupAddress: formData.pickupAddress,
      serviceIdentifier: serviceIdentifier || 'Mechanical Service',
      source: 'Website Form'
    };

    const queryParams = new URLSearchParams();
    Object.keys(payload).forEach(key => queryParams.append(key, String(payload[key])));

    try {
      // 1. Send to GHL
      await fetch(GHL_WEBHOOK, { method: 'POST', body: queryParams, mode: 'no-cors' });

      // 2. Send to Google Sheets
      await fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in min-h-[60vh]">
        <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Request Received</h2>
        <p className="text-gray-400 max-w-sm">Thank you, {formData.firstName}. Our mechanical service team will review your details and contact you within the hour to finalize your appointment.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen w-full">
      <div className="max-w-3xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Mechanical service & repairs"
          heroDesc="Expert diagnostics and mechanical repairs for all makes and models. From oil changes to full engine rebuilds."
          badges={['All makes & models', 'Certified technicians', 'Towing available']}
        />
        <div className="py-12 md:py-16 px-4">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-white" noValidate>
          {step === 1 && (
            <div className="space-y-6">
              <header>
                <div className="text-[10px] font-bold tracking-[3px] text-luxury-gold uppercase mb-2">Step 1 of 4</div>
                <h2 className="text-3xl font-serif font-medium mb-1">Contact Information</h2>
                <p className="text-xs text-gray-400 font-sans">Who are we helping today?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First name" fieldKey="firstName" placeholder="John" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} hasError={errors.firstName} required />
                <Field label="Last name" fieldKey="lastName" placeholder="Smith" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} hasError={errors.lastName} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phone" fieldKey="phone" type="tel" placeholder="(437) 555-0123" value={formData.phone} onChange={(v: string) => updateField('phone', v)} hasError={errors.phone} required />
                <Field label="Email" fieldKey="email" type="email" placeholder="john@email.com" value={formData.email} onChange={(v: string) => updateField('email', v)} hasError={errors.email} required />
              </div>
              <button type="button" onClick={nextStep} className="w-full h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg hover:scale-[1.01] transition-transform">CONTINUE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <header>
                <div className="text-[10px] font-bold tracking-[3px] text-luxury-gold uppercase mb-2">Step 2 of 4</div>
                <h2 className="text-3xl font-serif font-medium mb-1">Vehicle Details</h2>
                <p className="text-xs text-gray-400 font-sans">Tell us about your machine.</p>
              </header>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Year" fieldKey="year" placeholder="2024" value={formData.year} onChange={(v: string) => updateField('year', v)} hasError={errors.year} required />
                <Field label="Make" fieldKey="make" placeholder="BMW" value={formData.make} onChange={(v: string) => updateField('make', v)} hasError={errors.make} required />
                <Field label="Model" fieldKey="model" placeholder="M4" value={formData.model} onChange={(v: string) => updateField('model', v)} hasError={errors.model} required />
              </div>
              <Field label="VIN (optional)" fieldKey="vin" placeholder="e.g. 1HGCM82633A004352" value={formData.vin} onChange={(v: string) => updateField('vin', v)} />
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={nextStep} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <header>
                <div className="text-[10px] font-bold tracking-[3px] text-luxury-gold uppercase mb-2">Step 3 of 4</div>
                <h2 className="text-3xl font-serif font-medium mb-1">Service & Symptoms</h2>
                <p className="text-xs text-gray-500 font-sans">What's the issue or required service?</p>
              </header>
              <div className="flex flex-wrap gap-2">
                {services.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`px-4 py-2 rounded-full text-xs transition-all border ${formData.selectedServices.has(svc)
                      ? 'bg-luxury-gold text-black border-luxury-gold font-bold'
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-luxury-gold/40'
                      }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">Describe the issue</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg min-h-[120px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="Warning lights, sounds, symptoms..."
                  value={formData.issueDescription}
                  onChange={e => updateField('issueDescription', e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={nextStep} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <header>
                <div className="text-[10px] font-bold tracking-[3px] text-luxury-gold uppercase mb-2">Step 4 of 4</div>
                <h2 className="text-3xl font-serif font-medium mb-1">Appointment & Logistics</h2>
                <p className="text-xs text-gray-400 font-sans">Finalize your visit.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Preferred Date" fieldKey="appointmentDate" type="date" value={formData.appointmentDate} onChange={(v: string) => updateField('appointmentDate', v)} hasError={errors.appointmentDate} required />
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">Time preference <span className="text-[#e04848]">*</span></label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm focus:border-luxury-gold outline-none transition-colors appearance-none font-sans text-white"
                    value={formData.timePreference}
                    onChange={e => updateField('timePreference', e.target.value)}
                  >
                    <option value="morning">Morning (9am – 12pm)</option>
                    <option value="afternoon">Afternoon (12pm – 4pm)</option>
                    <option value="evening">Evening (4pm – 7pm)</option>
                    <option value="first">First available</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4" data-field="needsTow">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Does your car need towing? <span className="text-[#e04848]">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { updateField('needsTow', true); if (errors.needsTow) setErrors(p => ({ ...p, needsTow: false })); }}
                    className={`flex-1 py-4 rounded-lg text-xs font-semibold transition-all border ${formData.needsTow === true
                      ? 'bg-luxury-gold text-black border-luxury-gold'
                      : errors.needsTow
                        ? 'bg-transparent border-[#e04848] text-gray-500'
                        : 'bg-transparent border-white/10 text-gray-500'
                      }`}
                  >
                    Yes, pick up my car
                  </button>
                  <button
                    type="button"
                    onClick={() => { updateField('needsTow', false); if (errors.needsTow) setErrors(p => ({ ...p, needsTow: false })); }}
                    className={`flex-1 py-4 rounded-lg text-xs font-semibold transition-all border ${formData.needsTow === false
                      ? 'bg-luxury-gold text-black border-luxury-gold'
                      : errors.needsTow
                        ? 'bg-transparent border-[#e04848] text-gray-500'
                        : 'bg-transparent border-white/10 text-gray-500'
                      }`}
                  >
                    No, I'll drive in
                  </button>
                </div>
                {errors.needsTow && <p className="text-[#e04848] text-xs">Please select a towing option.</p>}
                {formData.needsTow && (
                  <div className="animate-fade-in">
                    <Field label="Pickup address" fieldKey="pickupAddress" placeholder="Where is the vehicle located?" value={formData.pickupAddress} onChange={(v: string) => updateField('pickupAddress', v)} hasError={errors.pickupAddress} required />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg hover:scale-[1.01] transition-transform uppercase disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'BOOK SERVICE'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="Toronto's choice for elite automotive care"
          proofSub="All makes & models · Certified technicians · Since 2016"
          reviews={[
            { text: 'Dropped my M3 off on a Monday with a weird noise. Fixed by Wednesday. They even found an issue I didn\'t know about.', name: 'Jason A.', detail: 'BMW M3' },
            { text: 'Best shop in the GTA. Honest, transparent pricing, and they actually explain what they\'re doing.', name: 'Tanya R.', detail: 'Toyota Camry' },
            { text: 'They came and picked up my car. Diagnosed within 2 hours and had it ready next day. Incredible.', name: 'Marcus D.', detail: 'Audi A7' },
            { text: 'Fixed my transmission when two other shops said I needed a full replacement. Saved me $4,000.', name: 'Sonia K.', detail: 'Jeep Grand Cherokee' },
          ]}
          stats={[{ n: '8+', l: 'YEARS' }, { n: '2K+', l: 'VEHICLES' }, { n: '4.9', l: 'RATING' }, { n: 'GTA', l: 'COVERAGE' }]}
        />
        <FormFooter />
      </div>
    </div>
  );
};

const Field = ({ label, fieldKey, placeholder, value, onChange, type = 'text', required = false, hasError = false }: any) => (
  <div className="space-y-1" data-field={fieldKey}>
    <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
      {label} {required && <span className="text-[#e04848]">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      data-field={fieldKey}
      className={`w-full bg-white/5 border rounded-lg h-11 px-4 text-sm focus:border-luxury-gold outline-none transition-colors font-sans text-white placeholder:text-gray-600 ${hasError ? 'border-[#e04848]' : 'border-white/10'}`}
      placeholder={placeholder}
    />
    {hasError && <p className="text-[#e04848] text-xs mt-1">This field is required.</p>}
  </div>
);

export default MechanicalServiceForm;
