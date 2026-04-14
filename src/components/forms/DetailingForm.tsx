import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const DetailingForm = ({ serviceIdentifier }: { serviceIdentifier?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '',
    selectedServices: new Set<string>(),
    vehicleSize: 'Sedan',
    preferredDate: '',
    preferredTime: 'morning',
    additionalNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const services = [
    'Interior Detail', 'Exterior Detail', 'Ceramic Coating', 'Paint Correction',
    'Window Tinting', 'Vinyl Wrap', 'PPF (Paint Protection)', 'Engine Bay Detail'
  ];

  const updateField = (f: string, v: any) => {
    setFormData((p: any) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: false }));
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
      if (!formData.preferredDate) newErrors.preferredDate = true;
      if (!formData.preferredTime) newErrors.preferredTime = true;
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
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    const payload: any = {
      ...formData,
      selectedServices: Array.from(formData.selectedServices).join(', '),
      serviceIdentifier: serviceIdentifier || 'Detailing & Wrapping',
      source: 'Website Form'
    };
    delete payload.selectedServices;
    payload.selectedServices = Array.from(formData.selectedServices).join(', ');

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
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Reservation Confirmed</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Your detailing request has been received. Our concierge team will reach out shortly to finalize your quote and booking.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white w-full">
      <div className="max-w-3xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Premium auto detailing"
          heroDesc="Showroom finish, every time. Hand wash, paint correction, ceramic coating, and interior restoration."
          badges={['Hand wash only', 'Ceramic pros', 'Mobile available']}
        />
        <div className="py-12 md:py-16 px-4">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 animate-fade-in text-white" noValidate>
          {step === 1 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 01</div>
                <h2 className="text-4xl font-serif font-light mb-1">Personal Details</h2>
                <p className="text-xs text-gray-500">How can we contact you about your quote?</p>
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
                <h2 className="text-4xl font-serif font-light mb-1">Vehicle Specification</h2>
                <p className="text-xs text-gray-500">Tell us what we'll be working on.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" fieldKey="year" value={formData.year} onChange={(v: string) => updateField('year', v)} hasError={errors.year} required />
                <Field label="Make" fieldKey="make" value={formData.make} onChange={(v: string) => updateField('make', v)} hasError={errors.make} required />
                <Field label="Model" fieldKey="model" value={formData.model} onChange={(v: string) => updateField('model', v)} hasError={errors.model} required />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Vehicle Size</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Coupe', 'Sedan', 'SUV', 'Truck/Van'].map(s => (
                    <button key={s} type="button" onClick={() => updateField('vehicleSize', s)}
                      className={`h-11 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${formData.vehicleSize === s ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-500'}`}>{s}</button>
                  ))}
                </div>
              </div>
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
                <h2 className="text-4xl font-serif font-light mb-2">Service Selection</h2>
                <p className="text-xs text-gray-500">What services are you interested in?</p>
              </header>
              <div className="flex flex-wrap gap-2">
                {services.map(s => (
                  <button key={s} type="button" onClick={() => toggleService(s)}
                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold border transition-all uppercase tracking-widest ${formData.selectedServices.has(s) ? 'bg-luxury-gold text-black border-luxury-gold shadow-[0_0_15px_rgba(184,151,106,0.3)]' : 'bg-transparent text-gray-500 border-white/10 hover:border-luxury-gold/50'}`}>{s}</button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Additional Instructions</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[120px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="Specific concerns, special requests, or existing damage..."
                  value={formData.additionalNotes}
                  onChange={e => updateField('additionalNotes', e.target.value)}
                />
              </div>
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
                <h2 className="text-4xl font-serif font-light mb-1">Scheduling</h2>
                <p className="text-xs text-gray-500">Pick your preferred window for service.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Preferred Date" fieldKey="preferredDate" type="date" value={formData.preferredDate} onChange={(v: string) => updateField('preferredDate', v)} hasError={errors.preferredDate} required />
                <div className="space-y-1.5 flex-1" data-field="preferredTime">
                  <label className="text-[10px] tracking-[1.5px] uppercase text-luxury-gold block font-bold">Time Window <span className="text-[#e04848]">*</span></label>
                  <select
                    required
                    className={`w-full bg-white/5 border rounded-lg h-12 px-4 text-sm outline-none focus:border-luxury-gold appearance-none text-white ${errors.preferredTime ? 'border-[#e04848]' : 'border-white/10'}`}
                    value={formData.preferredTime}
                    onChange={e => { updateField('preferredTime', e.target.value); }}>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 7pm)</option>
                    <option value="first">First Available</option>
                  </select>
                  {errors.preferredTime && <p className="text-[#e04848] text-xs mt-1">Please select a time window.</p>}
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg disabled:opacity-50 uppercase">
                  {isSubmitting ? 'SUBMITTING...' : 'RESERVE NOW'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="Toronto's detail obsessives since 2016"
          proofSub="Hand wash only · Paint correction specialists · Ceramic coating certified"
          reviews={[
            { text: 'Got the showroom package on my M4 before a car meet. Every person asked who did my paint.', name: 'Alex K.', detail: 'BMW M4' },
            { text: 'Interior was destroyed after a road trip with kids. AVNTS made it look brand new.', name: 'Maria S.', detail: 'Expedition' },
            { text: '5 year ceramic on my GTC. Water beads off like glass. The gloss is insane in the sun.', name: 'Navid R.', detail: 'Mercedes GTC' },
            { text: 'Mobile detail at my condo. On time, incredible job, left no mess. 10 out of 10.', name: 'Jasmine L.', detail: 'Tesla Model 3' },
          ]}
          stats={[{ n: '1K+', l: 'DETAILS' }, { n: '5.0', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: 'Mobile', l: 'AVAILABLE' }]}
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

export default DetailingForm;
