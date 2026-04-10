import React, { useState } from 'react';

const GOLD = "#b8976a";

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

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: any = {
      ...formData,
      serviceIdentifier: serviceIdentifier || "Insurance Services",
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
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 1));

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
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-20 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in font-sans text-white">
          {step === 1 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Section 01</div>
                <h2 className="text-4xl font-serif font-light mb-1">Personal Profile</h2>
                <p className="text-xs text-gray-500">Confidential details for your insurance quote.</p>
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
                <h2 className="text-4xl font-serif font-light mb-1">Vehicle Information</h2>
                <p className="text-xs text-gray-500">What vehicle are we insuring?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" value={formData.year} onChange={(v: string) => updateField('year', v)} required />
                <Field label="Make" value={formData.make} onChange={(v: string) => updateField('make', v)} required />
                <Field label="Model" value={formData.model} onChange={(v: string) => updateField('model', v)} required />
              </div>
              <Field label="Current Insurance Provider" placeholder="Company Name (if any)" value={formData.currentInsurance} onChange={(v: string) => updateField('currentInsurance', v)} />
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
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[140px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="High-value modifications, multiple drivers, storage conditions..."
                  value={formData.additionalInfo} onChange={e => updateField('additionalInfo', e.target.value)} />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg uppercase disabled:opacity-50">
                  {isSubmitting ? 'SENDING...' : 'REQUEST QUOTE'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

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

export default InsuranceServicesForm;
