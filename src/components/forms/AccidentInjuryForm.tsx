import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

export default function AccidentInjuryForm({ serviceIdentifier }: { serviceIdentifier?: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    accidentDate: '', location: '', description: '',
    accidentType: 'Rear-end',
    injurySeverity: 'Mild',
    selectedInjuries: new Set<string>(),
    needsLegalSupport: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (f: string, v: any) => {
    setFormData((p: any) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: false }));
  };

  const toggleInjury = (id: string) => {
    const next = new Set(formData.selectedInjuries);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateField('selectedInjuries', next);
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
      if (!formData.accidentDate) newErrors.accidentDate = true;
      if (!formData.location.trim()) newErrors.location = true;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstKey = Object.keys(newErrors)[0];
      const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, 4));
  };
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setSubmitting(true);

    const payload: any = {
      ...formData,
      selectedInjuries: Array.from(formData.selectedInjuries).join(', '),
      serviceIdentifier: serviceIdentifier || 'Accident Injury',
      source: 'Website Form'
    };
    // Remove Set from payload
    delete payload.selectedInjuries;
    payload.selectedInjuries = Array.from(formData.selectedInjuries).join(', ');

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
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div className="text-center py-20 px-4 bg-[#0e0e0e] min-h-[60vh] flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#4ead6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <h2 className="font-serif text-3xl mb-4">Report Submitted</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Our support network team will review your information and reach out within 24 hours to discuss your legal and medical options.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0ede6] font-sans w-full">
      <div className="max-w-3xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Accident & injury claims support"
          heroDesc="We connect you with certified legal and medical professionals to protect your rights after any motor vehicle accident."
          badges={['Free consultation', 'No-win no-fee', 'Medical referrals']}
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
                <h2 className="text-4xl font-serif font-light mb-1">Contact Details</h2>
                <p className="text-xs text-gray-500">Confidential information for our records.</p>
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
                <h2 className="text-4xl font-serif font-light mb-1">Incident Profile</h2>
                <p className="text-xs text-gray-500">Tell us what happened.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Accident Date" fieldKey="accidentDate" type="date" value={formData.accidentDate} onChange={(v: string) => updateField('accidentDate', v)} hasError={errors.accidentDate} required />
                <Field label="Accident Location" fieldKey="location" placeholder="City, Intersection" value={formData.location} onChange={(v: string) => updateField('location', v)} hasError={errors.location} required />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Accident Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Rear-end', 'Side-swipe', 'T-bone', 'Head-on', 'Unsure'].map(t => (
                    <button key={t} type="button" onClick={() => updateField('accidentType', t)}
                      className={`h-11 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${formData.accidentType === t ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{t}</button>
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
                <h2 className="text-4xl font-serif font-light mb-2">Injury Details</h2>
                <p className="text-xs text-gray-500">How were you affected?</p>
              </header>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Neck / Whiplash', 'Back Pain', 'Shoulder / Arm', 'Knee / Leg', 'Head / Brain', 'Emotional / PTSD', 'Internal'].map(i => (
                  <button key={i} type="button" onClick={() => toggleInjury(i)}
                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold border transition-all uppercase tracking-widest ${formData.selectedInjuries.has(i) ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent text-gray-500 border-white/10 hover:border-luxury-gold/50'}`}>{i}</button>
                ))}
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Injury Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mild', 'Moderate', 'Severe'].map(s => (
                    <button key={s} type="button" onClick={() => updateField('injurySeverity', s)}
                      className={`h-11 border rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${formData.injurySeverity === s ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{s}</button>
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
                <h2 className="text-4xl font-serif font-light mb-1">Final Details</h2>
                <p className="text-xs text-gray-500">Provide any additional context.</p>
              </header>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Brief Description of Accident</label>
                <textarea
                  className={`w-full bg-white/5 border rounded-xl min-h-[140px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600 ${errors.description ? 'border-[#e04848]' : 'border-white/10'}`}
                  data-field="description"
                  placeholder="Describe the incident in your own words..."
                  required
                  value={formData.description}
                  onChange={e => { updateField('description', e.target.value); if (errors.description) setErrors(p => ({ ...p, description: false })); }}
                />
                {errors.description && <p className="text-[#e04848] text-xs mt-1">Please describe the accident.</p>}
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <input type="checkbox" checked={formData.needsLegalSupport} onChange={e => updateField('needsLegalSupport', e.target.checked)} className="w-5 h-5 accent-luxury-gold" />
                <span className="text-xs text-gray-400">I would like to be connected with a legal professional for a free consultation.</span>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={submitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg uppercase disabled:opacity-50">
                  {submitting ? 'SUBMITTING...' : 'SUBMIT REPORT'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="GTA's trusted accident support network"
          proofSub="Legal referrals · Medical connections · Insurance guidance · Since 2016"
          reviews={[
            { text: 'AVNTS connected me with a lawyer within hours. They handled everything while I recovered.', name: 'Sarah M.', detail: 'Rear-end collision, 401' },
            { text: 'I had no idea what to do after my accident. AVNTS guided me through every step.', name: 'James T.', detail: 'T-bone, Toronto' },
            { text: 'Got proper physiotherapy and legal help. My settlement was far better than expected.', name: 'Rania K.', detail: 'Side-swipe, Brampton' },
            { text: 'One call and everything was set up. Professional, fast, and compassionate.', name: 'David L.', detail: 'Mississauga, ON' },
          ]}
          stats={[{ n: '800+', l: 'CLAIMS' }, { n: '4.9', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: '24/7', l: 'SUPPORT' }]}
        />
        <FormFooter />
      </div>
    </div>
  );
}

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
