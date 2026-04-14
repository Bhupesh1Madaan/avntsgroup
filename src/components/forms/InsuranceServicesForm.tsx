import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const InsuranceServicesForm = ({ serviceIdentifier }: { serviceIdentifier?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '',
    coverageType: 'Full Comprehensive',
    currentInsurance: '',
    drivingHistory: 'Clean',
    additionalInfo: ''
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
      serviceIdentifier: serviceIdentifier || 'Insurance Services',
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
        <h2 className="text-3xl font-serif font-bold mb-4 text-white">Quote Request Received</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Our insurance specialists will analyze your profile and contact you within 24 hours with a competitive quote.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white w-full">
      <div className="max-w-3xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Auto insurance services"
          heroDesc="We match you with the best rates across Ontario's top insurance providers. One form, multiple quotes."
          badges={['All vehicle types', 'Competitive rates', 'Fast approval']}
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
                <h2 className="text-4xl font-serif font-light mb-1">Personal Profile</h2>
                <p className="text-xs text-gray-500">Confidential details for your insurance quote.</p>
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
                <h2 className="text-4xl font-serif font-light mb-1">Vehicle Information</h2>
                <p className="text-xs text-gray-500">What vehicle are we insuring?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" fieldKey="year" value={formData.year} onChange={(v: string) => updateField('year', v)} hasError={errors.year} required />
                <Field label="Make" fieldKey="make" value={formData.make} onChange={(v: string) => updateField('make', v)} hasError={errors.make} required />
                <Field label="Model" fieldKey="model" value={formData.model} onChange={(v: string) => updateField('model', v)} hasError={errors.model} required />
              </div>
              <Field label="Current Insurance Provider" fieldKey="currentInsurance" placeholder="Company Name (if any)" value={formData.currentInsurance} onChange={(v: string) => updateField('currentInsurance', v)} />
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
                <h2 className="text-4xl font-serif font-light mb-2">Coverage Needs</h2>
                <p className="text-xs text-gray-500">Select your preferred level of protection.</p>
              </header>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Coverage Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Full Comprehensive', 'Liability Only', 'Specified Perils', 'Lease/Finance Gap'].map(t => (
                    <button key={t} type="button" onClick={() => updateField('coverageType', t)}
                      className={`h-11 border rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${formData.coverageType === t ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Driving History</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Clean', 'Minor Issues', 'Major Issues'].map(s => (
                    <button key={s} type="button" onClick={() => updateField('drivingHistory', s)}
                      className={`h-11 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${formData.drivingHistory === s ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{s}</button>
                  ))}
                </div>
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
                <h2 className="text-4xl font-serif font-light mb-1">Final Analysis</h2>
                <p className="text-xs text-gray-500">Provide any additional context for your quote.</p>
              </header>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Special Requirements</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[140px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="High-value modifications, multiple drivers, storage conditions..."
                  value={formData.additionalInfo}
                  onChange={e => updateField('additionalInfo', e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg uppercase disabled:opacity-50">
                  {isSubmitting ? 'SUBMITTING...' : 'REQUEST QUOTE'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="GTA's most trusted insurance advisors"
          proofSub="All vehicle types · Best-rate matching · Since 2016"
          reviews={[
            { text: 'Saved over $800 a year on my Mercedes insurance. The process took 10 minutes.', name: 'Tariq M.', detail: 'Mercedes C300' },
            { text: 'New driver with two accidents. AVNTS still found me great coverage. Truly impressive.', name: 'Sara J.', detail: 'Honda Civic' },
            { text: 'Multi-vehicle insured under one policy. Simple, fast, and excellent rates.', name: 'Derek K.', detail: 'BMW X5 + Camry' },
            { text: 'The lease coverage options they recommended saved me a fortune on my Audi.', name: 'Priya V.', detail: 'Audi Q5' },
          ]}
          stats={[{ n: '2K+', l: 'POLICIES' }, { n: '4.9', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: 'GTA', l: 'COVERAGE' }]}
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

export default InsuranceServicesForm;
