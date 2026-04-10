import React, { useState } from 'react';

const GOLD = "#b8976a";

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

  const services = [
    "Engine diagnostics", "Oil change", "Brake repair", "Transmission",
    "Suspension", "Electrical", "Tire service", "A/C & heating",
    "Exhaust", "Body repair", "Pre-purchase inspection", "Other"
  ];

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

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
      serviceIdentifier: serviceIdentifier || "Mechanical Service",
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

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

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
    <div className="bg-luxury-black text-white py-12 md:py-20 px-4 min-h-screen w-full">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-white">
          {step === 1 && (
            <div className="space-y-6">
              <header>
                <div className="text-[10px] font-bold tracking-[3px] text-luxury-gold uppercase mb-2">Step 1 of 4</div>
                <h2 className="text-3xl font-serif font-medium mb-1">Contact Information</h2>
                <p className="text-xs text-gray-400 font-sans">Who are we helping today?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First name" placeholder="John" value={formData.firstName} onChange={v => updateField('firstName', v)} required />
                <Field label="Last name" placeholder="Smith" value={formData.lastName} onChange={v => updateField('lastName', v)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phone" type="tel" placeholder="(437) 555-0123" value={formData.phone} onChange={v => updateField('phone', v)} required />
                <Field label="Email" type="email" placeholder="john@email.com" value={formData.email} onChange={v => updateField('email', v)} required />
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
                <Field label="Year" placeholder="2024" value={formData.year} onChange={v => updateField('year', v)} required />
                <Field label="Make" placeholder="BMW" value={formData.make} onChange={v => updateField('make', v)} required />
                <Field label="Model" placeholder="M4" value={formData.model} onChange={v => updateField('model', v)} required />
              </div>
              <Field label="VIN (optional)" placeholder="e.g. 1HGCM82633A004352" value={formData.vin} onChange={v => updateField('vin', v)} />
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
                <Field label="Preferred Date" type="date" value={formData.appointmentDate} onChange={v => updateField('appointmentDate', v)} required />
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">Time preference</label>
                  <select
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

              <div className="space-y-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">Does your car need towing?</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('needsTow', true)}
                    className={`flex-1 py-4 rounded-lg text-xs font-semibold transition-all border ${formData.needsTow === true ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-500'
                      }`}
                  >
                    Yes, pick up my car
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('needsTow', false)}
                    className={`flex-1 py-4 rounded-lg text-xs font-semibold transition-all border ${formData.needsTow === false ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-500'
                      }`}
                  >
                    No, I'll drive in
                  </button>
                </div>
                {formData.needsTow && (
                  <div className="animate-fade-in">
                    <Field label="Pickup address" placeholder="Where is the vehicle located?" value={formData.pickupAddress} onChange={v => updateField('pickupAddress', v)} required />
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
                  {isSubmitting ? 'SENDING...' : 'BOOK SERVICE'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* TRUST */}
        <div className="mt-16 pt-12 border-t border-white/5 text-center px-4">
          <div className="text-luxury-gold text-lg tracking-[8px] mb-4">★★★★★</div>
          <h3 className="font-serif text-xl font-light mb-8">Toronto's choice for elite automotive care</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: "8+", l: "YEARS" }, { n: "2K+", l: "VEHICLES" }, { n: "4.9", l: "RATING" }, { n: "GTA", l: "COVERAGE" }].map((t, i) => (
              <div key={i}>
                <div className="text-2xl font-serif font-medium text-white">{t.n}</div>
                <div className="text-[10px] tracking-widest text-gray-600 uppercase mt-1">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, placeholder, value, onChange, type = "text", required = false }: any) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label} {required && <span className="text-luxury-gold">*</span>}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm focus:border-luxury-gold outline-none transition-colors font-sans text-white placeholder:text-gray-600"
      placeholder={placeholder}
    />
  </div>
);

export default MechanicalServiceForm;
