import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const RentalManagementForm = ({ serviceIdentifier }: { serviceIdentifier?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '', vin: '',
    managementType: 'Full Service',
    expectedMonthlyRevenue: '',
    location: '',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (f: string, v: any) => {
    setFormData((p: any) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: false }));
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
    if (s === 3) {
      if (!formData.location.trim()) newErrors.location = true;
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

  const next = () => { if (validateStep(step)) setStep(s => Math.min(s + 1, 4)); };
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const payload: any = {
      ...formData,
      serviceIdentifier: serviceIdentifier || 'Rental Management',
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
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0a0a0a] min-h-[60vh] text-white w-full">
        <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4 text-white">Inquiry Received</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Our fleet management team will review your vehicle details and contact you within 24 hours to discuss your earning potential.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white w-full">
      <div className="max-w-3xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Vehicle rental management"
          heroDesc="List your vehicle with AVNTS and earn passive income. We handle bookings, cleaning, insurance, and customer service."
          badges={['End-to-end management', 'Passive income', 'Fully insured']}
        />
        <div className="py-12 md:py-16 px-4">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 animate-fade-in font-sans text-white" noValidate>
          {step === 1 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 01</div>
                <h2 className="text-4xl font-serif font-light mb-1">Owner Information</h2>
                <p className="text-xs text-gray-500">Contact details for the vehicle owner.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" fieldKey="firstName" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} hasError={errors.firstName} required />
                <Field label="Last Name" fieldKey="lastName" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} hasError={errors.lastName} required />
                <Field label="Phone" fieldKey="phone" value={formData.phone} onChange={(v: string) => updateField('phone', v)} hasError={errors.phone} required />
                <Field label="Email" fieldKey="email" value={formData.email} onChange={(v: string) => updateField('email', v)} hasError={errors.email} required />
              </div>
              <button type="button" onClick={next} className="w-full h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg">CONTINUE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 02</div>
                <h2 className="text-4xl font-serif font-light mb-1">Vehicle Asset</h2>
                <p className="text-xs text-gray-500">Tell us about the vehicle you want to list.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" fieldKey="year" value={formData.year} onChange={(v: string) => updateField('year', v)} hasError={errors.year} required />
                <Field label="Make" fieldKey="make" value={formData.make} onChange={(v: string) => updateField('make', v)} hasError={errors.make} required />
                <Field label="Model" fieldKey="model" value={formData.model} onChange={(v: string) => updateField('model', v)} hasError={errors.model} required />
              </div>
              <Field label="VIN (optional)" fieldKey="vin" placeholder="17-digit Chassis Number" value={formData.vin} onChange={(v: string) => updateField('vin', v)} />
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-luxury-gold text-black font-bold rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 03</div>
                <h2 className="text-4xl font-serif font-light mb-1">Management Needs</h2>
                <p className="text-xs text-gray-500">How would you like us to manage your asset?</p>
              </header>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Management Level</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Full Service (End-to-End)', 'Co-Hosting', 'Marketing Only', 'Storage/Concierge'].map(t => (
                    <button key={t} type="button" onClick={() => updateField('managementType', t)}
                      className={`h-11 border rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${formData.managementType === t ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <Field label="Vehicle Location" fieldKey="location" placeholder="City, Region" value={formData.location} onChange={(v: string) => updateField('location', v)} hasError={errors.location} required />
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-luxury-gold text-black font-bold rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 04</div>
                <h2 className="text-4xl font-serif font-light mb-1">Final Details</h2>
                <p className="text-xs text-gray-500">Anything else we should know?</p>
              </header>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Additional Comments</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[140px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="Condition of vehicle, availability, or specific goals..."
                  value={formData.comments}
                  onChange={e => updateField('comments', e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg uppercase disabled:opacity-50">
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="GTA's most trusted vehicle rental management"
          proofSub="Passive income · Full-service management · Since 2016"
          reviews={[
            { text: 'My BMW has been earning money on weekends while sitting in the garage. AVNTS handles everything.', name: 'Arjun P.', detail: 'BMW X5' },
            { text: 'Listed my Tesla with AVNTS 3 months ago. Already recouped 4 months of payments. Outstanding.', name: 'Christine L.', detail: 'Tesla Model 3' },
            { text: 'Zero hassle. They find the renters, document the car, and send me an e-transfer. That\'s it.', name: 'Sam O.', detail: 'Mercedes GLA' },
            { text: 'Professional team. My car came back cleaner than I left it. Highly recommend.', name: 'Nadia F.', detail: 'Range Rover Velar' },
          ]}
          stats={[{ n: '4.9', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: '500+', l: 'LISTINGS' }, { n: 'GTA', l: 'COVERAGE' }]}
        />
        <FormFooter />
      </div>
    </div>
  );
};

function Field({ label, fieldKey, value, onChange, type = 'text', required = false, placeholder = '', hasError = false }: any) {
  return (
    <div className="space-y-1.5 flex-1" data-field={fieldKey}>
      <label className="text-[10px] tracking-[1.5px] uppercase text-luxury-gold block font-bold">
        {label}{required && <span className="text-[#e04848] ml-1">*</span>}
      </label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        data-field={fieldKey}
        className={`w-full bg-white/5 border rounded-lg h-12 px-4 text-sm text-white focus:border-luxury-gold outline-none transition-colors font-sans placeholder:text-gray-600 ${hasError ? 'border-[#e04848]' : 'border-white/10'}`}
        type={type}
        placeholder={placeholder}
      />
      {hasError && <p className="text-[#e04848] text-xs mt-1">This field is required.</p>}
    </div>
  );
}

export default RentalManagementForm;
