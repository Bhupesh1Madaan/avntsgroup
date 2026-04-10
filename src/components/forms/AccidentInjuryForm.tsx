import React, { useState } from 'react';

const ACCENT = "#c8a84e";

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

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

  const toggleInjury = (id: string) => {
    const next = new Set(formData.selectedInjuries);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateField('selectedInjuries', next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      ...formData,
      selectedInjuries: Array.from(formData.selectedInjuries).join(", "),
      serviceIdentifier: serviceIdentifier || "Accident Injury",
      source: "Website Form"
    };

    const queryParams = new URLSearchParams();
    Object.keys(payload).forEach(key => {
      queryParams.append(key, String(payload[key]));
    });

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI', {
        method: 'POST',
        body: queryParams,
        mode: 'no-cors'
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 1));

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
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0ede6] font-sans py-12 md:py-20 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in text-white">
          {step === 1 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 01</div>
                <h2 className="text-4xl font-serif font-light mb-1">Contact Details</h2>
                <p className="text-xs text-gray-500">Confidential information for our records.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} required />
                <Field label="Last Name" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} required />
                <Field label="Phone" value={formData.phone} onChange={(v: string) => updateField('phone', v)} required />
                <Field label="Email" value={formData.email} onChange={(v: string) => updateField('email', v)} required />
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
                <Field label="Accident Date" type="date" value={formData.accidentDate} onChange={(v: string) => updateField('accidentDate', v)} required />
                <Field label="Accident Location" placeholder="City, Intersection" value={formData.location} onChange={(v: string) => updateField('location', v)} required />
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
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[140px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="Describe the incident in your own words..."
                  value={formData.description} onChange={e => updateField('description', e.target.value)} />
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <input type="checkbox" checked={formData.needsLegalSupport} onChange={e => updateField('needsLegalSupport', e.target.checked)} className="w-5 h-5 accent-luxury-gold" />
                <span className="text-xs text-gray-400">I would like to be connected with a legal professional for a free consultation.</span>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={submitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg uppercase disabled:opacity-50">
                  {submitting ? 'SENDING...' : 'SUBMIT REPORT'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }: any) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[10px] tracking-[1.5px] uppercase text-luxury-gold block font-bold">{label}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-sm text-white focus:border-luxury-gold outline-none transition-colors font-sans placeholder:text-gray-600"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
