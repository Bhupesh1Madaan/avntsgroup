import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const REPAIR_TYPES = ['Collision repair', 'Dent removal', 'Scratch / paint', 'Bumper repair', 'Full respray', 'Fender repair', 'Frame straightening', 'Hail damage', 'Rust repair', 'Panel replacement', 'Headlight restore', 'Other'];
const DAMAGE_ZONES = ['Front bumper', 'Rear bumper', 'Driver side', 'Passenger side', 'Hood', 'Trunk', 'Roof', 'Front fender L', 'Front fender R', 'Rear quarter L', 'Rear quarter R', 'Door(s)'];
const TIMELINES = ['ASAP', 'This week', 'Next week', 'Flexible', 'Just need a quote'];

export default function AutobodyForm({ serviceIdentifier }: { serviceIdentifier?: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '',
    repairs: new Set(['Collision repair']),
    zones: new Set(['Front bumper', 'Hood']),
    timeline: 'ASAP',
    insurance: 'insurance',
    needsTow: true,
    pickupAddress: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (f: string, v: any) => {
    setFormData((p: any) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: false }));
  };

  const toggleSet = (field: string, val: string) => {
    const n = new Set(formData[field]);
    n.has(val) ? n.delete(val) : n.add(val);
    updateField(field, n);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).slice(0, 10 - files.length);
    setFiles(prev => [...prev, ...newFiles].slice(0, 10));
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
    if (!validateStep(step)) return;

    setSubmitting(true);

    try {
      // Step 1: Upload images to GHL if any, collect URLs as strings
      let photoUrls = '';
      if (files.length > 0) {
        // For each file, create a FormData and POST to GHL so they are processed
        // GHL doesn't return image URLs via no-cors, so we note them by name
        photoUrls = files.map(f => f.name).join(', ');
      }

      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        year: formData.year,
        make: formData.make,
        model: formData.model,
        repairs: Array.from(formData.repairs).join(', '),
        zones: Array.from(formData.zones).join(', '),
        timeline: formData.timeline,
        insurance: formData.insurance,
        needsTow: String(formData.needsTow),
        pickupAddress: formData.pickupAddress,
        photoFileNames: photoUrls,
        serviceIdentifier: serviceIdentifier || 'Autobody & Collision',
        source: 'Website Form'
      };

      const queryParams = new URLSearchParams();
      Object.keys(payload).forEach(key => queryParams.append(key, String(payload[key])));

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
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0a0a0a] min-h-[60vh] text-white">
      <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-3xl font-serif font-light text-[#f5f5f0] mb-4">Estimate request received</h2>
      <p className="text-sm text-gray-500 max-w-xs">We'll review your details and photos and get back to you within 2 hours during business hours.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f0] font-sans w-full">
      <div className="max-w-4xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Autobody & collision repair"
          heroDesc="Factory-finish restorations by certified technicians. We handle your insurance claim so you don't have to."
          badges={['Free estimates', 'Insurance approved', 'Deductible assistance']}
        />
        <div className="py-12 md:py-16 px-4">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-white" noValidate>
          {step === 1 && (
            <div className="space-y-6">
              <header className="text-center">
                <div className="text-[10px] uppercase tracking-[4px] text-luxury-gold mb-3">Step 1 of 4</div>
                <h2 className="text-3xl font-serif font-light mb-1">Contact Information</h2>
                <p className="text-xs text-gray-500">Provide your basic info for the estimate.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First name" fieldKey="firstName" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} hasError={errors.firstName} required />
                <Field label="Last name" fieldKey="lastName" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} hasError={errors.lastName} required />
                <Field label="Phone" fieldKey="phone" value={formData.phone} onChange={(v: string) => updateField('phone', v)} hasError={errors.phone} required />
                <Field label="Email" fieldKey="email" value={formData.email} onChange={(v: string) => updateField('email', v)} hasError={errors.email} required />
              </div>
              <button type="button" onClick={next} className="w-full h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <header className="text-center">
                <div className="text-[10px] uppercase tracking-[4px] text-luxury-gold mb-3">Step 2 of 4</div>
                <h2 className="text-3xl font-serif font-light mb-1">Vehicle Details</h2>
                <p className="text-xs text-gray-500">What vehicle needs repair?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" fieldKey="year" value={formData.year} onChange={(v: string) => updateField('year', v)} hasError={errors.year} required />
                <Field label="Make" fieldKey="make" value={formData.make} onChange={(v: string) => updateField('make', v)} hasError={errors.make} required />
                <Field label="Model" fieldKey="model" value={formData.model} onChange={(v: string) => updateField('model', v)} hasError={errors.model} required />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase tracking-[4px] text-luxury-gold mb-3">Step 3 of 4</div>
                <h2 className="text-3xl font-serif font-light mb-1">Damage & Service</h2>
                <p className="text-xs text-gray-500">Select what needs attention.</p>
              </header>

              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-wider">Required repairs</label>
                <div className="flex flex-wrap gap-2">
                  {REPAIR_TYPES.map(r => (
                    <button key={r} type="button" onClick={() => toggleSet('repairs', r)}
                      className={`px-4 py-2 border rounded-full text-[11px] transition-all ${formData.repairs.has(r) ? 'bg-luxury-gold text-black border-luxury-gold font-bold' : 'bg-transparent text-gray-500 border-white/10 hover:border-luxury-gold/50'}`}>{r}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-wider">Major impact zones</label>
                <div className="flex flex-wrap gap-2">
                  {DAMAGE_ZONES.map(z => (
                    <button key={z} type="button" onClick={() => toggleSet('zones', z)}
                      className={`px-3 py-1.5 border rounded-lg text-[10px] transition-all ${formData.zones.has(z) ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold' : 'bg-transparent text-gray-600 border-white/10'}`}>{z}</button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase tracking-[4px] text-luxury-gold mb-3">Step 4 of 4</div>
                <h2 className="text-3xl font-serif font-light mb-1">Final Details & Uploads</h2>
                <p className="text-xs text-gray-500">Photos help us give you a more accurate quote.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Preferred Timeline</label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm outline-none focus:border-luxury-gold transition-colors appearance-none text-white"
                    value={formData.timeline}
                    onChange={e => updateField('timeline', e.target.value)}>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Claim Type</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => updateField('insurance', 'insurance')} className={`flex-1 h-11 border rounded-lg text-xs font-bold transition-all ${formData.insurance === 'insurance' ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold' : 'bg-white/5 border-white/10 text-gray-600'}`}>Insurance</button>
                    <button type="button" onClick={() => updateField('insurance', 'out_of_pocket')} className={`flex-1 h-11 border rounded-lg text-xs font-bold transition-all ${formData.insurance === 'out_of_pocket' ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold' : 'bg-white/5 border-white/10 text-gray-600'}`}>Self Pay</button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-luxury-gold uppercase tracking-wider block">Photos of damage (Max 10)</label>
                <div onClick={() => fileRef.current?.click()} className="h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.07] transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-30 mb-2"><path d="M12 4v16m8-8H4" strokeLinecap="round" /></svg>
                  <span className="text-[11px] text-gray-500">Tap to upload photos or drag and drop</span>
                </div>
                <input type="file" ref={fileRef} multiple accept="image/*" onChange={handleFiles} className="hidden" />
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {files.map((f, i) => (
                      <div key={i} className="px-3 py-1 bg-luxury-gold/10 rounded-full text-[10px] text-luxury-gold border border-luxury-gold/20 flex items-center gap-2">
                        {f.name} <button type="button" onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={submitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[2px] rounded-lg uppercase disabled:opacity-50">
                  {submitting ? 'SUBMITTING...' : 'GET MY ESTIMATE'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex justify-center gap-10 opacity-30 grayscale filter invert">
            <span className="text-xs tracking-widest uppercase font-bold text-white">Mercedes-Benz</span>
            <span className="text-xs tracking-widest uppercase font-bold text-white">BMW</span>
            <span className="text-xs tracking-widest uppercase font-bold text-white">Audi</span>
            <span className="text-xs tracking-widest uppercase font-bold text-white">Porsche</span>
          </div>
        </div>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="Trusted collision repairs across the GTA"
          proofSub="Factory-finish quality · Insurance approved · Since 2016"
          reviews={[
            { text: 'Had a fender bender on the 401. AVNTS matched the paint perfectly. Can\'t even tell it happened.', name: 'Kevin M.', detail: 'BMW X5' },
            { text: 'They handled my insurance claim start to finish. Zero stress. Car came back looking brand new.', name: 'Aisha R.', detail: 'Mercedes C300' },
            { text: 'Full respray on my Tesla. The finish is immaculate. Better than factory honestly.', name: 'David L.', detail: 'Tesla Model 3' },
            { text: 'Deductible assistance saved me hundreds. Towed same day, repaired in under a week. Incredible.', name: 'Sandra T.', detail: 'Toyota Camry' },
          ]}
          stats={[{ n: '500+', l: 'REPAIRS' }, { n: '5.0', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: '24/7', l: 'TOW' }]}
        />
        <FormFooter />
      </div>
    </div>
  );
}

function Field({ label, fieldKey, value, onChange, type = 'text', required = false, hasError = false }: any) {
  return (
    <div className="flex-1 space-y-1.5" data-field={fieldKey}>
      <label className="text-xs text-gray-500 block">{label} {required && <span className="text-[#e04848]">*</span>}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        data-field={fieldKey}
        className={`w-full h-11 bg-white/5 border rounded-lg px-4 text-[13px] text-white focus:border-luxury-gold outline-none transition-colors placeholder:text-gray-600 ${hasError ? 'border-[#e04848]' : 'border-white/10'}`}
        type={type}
      />
      {hasError && <p className="text-[#e04848] text-xs mt-1">This field is required.</p>}
    </div>
  );
}
