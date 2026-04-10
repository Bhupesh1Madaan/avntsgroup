import React, { useState } from 'react';

const GOLD = "#b8976a";

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

  const services = [
    "Interior Detail", "Exterior Detail", "Ceramic Coating", "Paint Correction",
    "Window Tinting", "Vinyl Wrap", "PPF (Paint Protection)", "Engine Bay Detail"
  ];

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

  const toggleService = (svc: string) => {
    const newSet = new Set(formData.selectedServices);
    if (newSet.has(svc)) newSet.delete(svc);
    else newSet.add(svc);
    updateField('selectedServices', newSet);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: any = {
      ...formData,
      selectedServices: Array.from(formData.selectedServices).join(", "),
      serviceIdentifier: serviceIdentifier || "Detailing & Wrapping",
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
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Reservation Confirmed</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Your detailing request has been received. Our concierge team will reach out shortly to finalize your quote and booking.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-20 px-4 w-full font-sans">
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
                <h2 className="text-4xl font-serif font-light mb-1">Personal Details</h2>
                <p className="text-xs text-gray-500">How can we contact you about your quote?</p>
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
                <h2 className="text-4xl font-serif font-light mb-1">Vehicle Specification</h2>
                <p className="text-xs text-gray-500">Tell us what we'll be working on.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Year" value={formData.year} onChange={(v: string) => updateField('year', v)} required />
                <Field label="Make" value={formData.make} onChange={(v: string) => updateField('make', v)} required />
                <Field label="Model" value={formData.model} onChange={(v: string) => updateField('model', v)} required />
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
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl min-h-[120px] p-4 text-sm focus:border-luxury-gold outline-none transition-colors resize-none text-white placeholder:text-gray-600"
                  placeholder="Specific concerns, special requests, or existing damage..."
                  value={formData.additionalNotes} onChange={e => updateField('additionalNotes', e.target.value)} />
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
                <Field label="Preferred Date" type="date" value={formData.preferredDate} onChange={(v: string) => updateField('preferredDate', v)} required />
                <div className="space-y-1.5 flex-1">
                  <label className="text-[10px] tracking-[1.5px] uppercase text-luxury-gold block font-bold">Time Window</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-sm outline-none focus:border-luxury-gold appearance-none text-white"
                    value={formData.preferredTime} onChange={e => updateField('preferredTime', e.target.value)}>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 7pm)</option>
                    <option value="first">First Available</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg disabled:opacity-50 uppercase">
                  {isSubmitting ? 'SENDING...' : 'RESERVE NOW'}
                </button>
              </div>
            </div>
          )}
        </form>

        <footer className="mt-20 pt-10 border-t border-white/5 opacity-30 text-center">
          <div className="text-[10px] tracking-[8px] uppercase font-bold">Pristine Protection Since 2016</div>
        </footer>
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

export default DetailingForm;
