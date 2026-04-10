import React, { useState } from 'react';

const GOLD = "#C9A54E";

const SalesFinancingForm = ({ serviceIdentifier }: { serviceIdentifier?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    desiredVehicle: '', budget: '', creditScore: 'Good (670-739)',
    employmentStatus: 'Employed', annualIncome: '', currentEmployer: '',
    consentShare: false, consentReferal: false, consentTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      ...formData,
      serviceIdentifier: serviceIdentifier || "Sales & Financing",
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0C0C0E] min-h-[60vh] text-[#D8D4CA]">
        <div className="w-16 h-16 border-2 border-[#C9A54E] rounded-full flex items-center justify-center mb-6 text-[#C9A54E]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-serif font-light mb-4 text-[#D8D4CA]">Application Submitted</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. Our finance specialists are reviewing your application and will contact you within 24 hours with your approval status.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#D8D4CA] font-sans py-12 md:py-20 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#C9A54E]' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in relative z-10 text-[#D8D4CA]">
          {step === 1 && (
            <div className="space-y-6">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[10px] font-bold tracking-[3px] text-[#C9A54E] uppercase">Section 01</div>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-4xl font-serif font-medium mb-1">Contact Details</h2>
                <p className="text-xs text-[#6E6E74]">Basic information to start your file.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" value={formData.firstName} onChange={v => updateField('firstName', v)} required />
                <Field label="Last Name" value={formData.lastName} onChange={v => updateField('lastName', v)} required />
                <Field label="Phone" value={formData.phone} onChange={v => updateField('phone', v)} required />
                <Field label="Email" value={formData.email} onChange={v => updateField('email', v)} required />
              </div>
              <button type="button" onClick={next} className="w-full h-14 bg-[#C9A54E] text-black font-bold tracking-[2px] rounded-lg">CONTINUE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[10px] font-bold tracking-[3px] text-[#C9A54E] uppercase">Section 02</div>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-4xl font-serif font-medium mb-1">Vehicle Selection</h2>
                <p className="text-xs text-[#6E6E74]">What kind of vehicle are you looking for?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Desired Vehicle" placeholder="e.g. BMW X5, Tesla Model 3" value={formData.desiredVehicle} onChange={v => updateField('desiredVehicle', v)} required />
                <Field label="Estimated Budget" placeholder="e.g. $40,000" value={formData.budget} onChange={v => updateField('budget', v)} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-[1.5px] uppercase text-[#6E6E74] block font-bold">Estimated Credit Score</label>
                <select className="w-full bg-[#141418] border border-[#28282E] rounded p-3 h-12 text-sm text-[#D8D4CA] outline-none focus:border-[#C9A54E88] transition-colors appearance-none"
                  value={formData.creditScore} onChange={e => updateField('creditScore', e.target.value)}>
                  {['Excellent (740+)', 'Good (670-739)', 'Fair (580-669)', 'Low (<580)', 'Not Sure'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-[#C9A54E] text-black font-bold rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[10px] font-bold tracking-[3px] text-[#C9A54E] uppercase">Section 03</div>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-4xl font-serif font-medium mb-1">Employment & Income</h2>
                <p className="text-xs text-[#6E6E74]">We use this to verify your purchasing power.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex-1">
                  <label className="text-[10px] tracking-[1.5px] uppercase text-[#6E6E74] block font-bold">Employment Status</label>
                  <select className="w-full bg-[#141418] border border-[#28282E] rounded p-3 h-12 text-sm text-[#D8D4CA] outline-none focus:border-[#C9A54E88] appearance-none"
                    value={formData.employmentStatus} onChange={e => updateField('employmentStatus', e.target.value)}>
                    {['Employed', 'Self-Employed', 'Student', 'Retired', 'Unemployed'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <Field label="Annual Gross Income" placeholder="e.g. $85,000" value={formData.annualIncome} onChange={v => updateField('annualIncome', v)} required />
              </div>
              <Field label="Current Employer" placeholder="Company Name" value={formData.currentEmployer} onChange={v => updateField('currentEmployer', v)} />
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-[#C9A54E] text-black font-bold rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[10px] font-bold tracking-[3px] text-[#C9A54E] uppercase">Section 04</div>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-4xl font-serif font-medium mb-1">Final Consent</h2>
                <p className="text-xs text-[#6E6E74]">Review and submit your application.</p>
              </header>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <Checkbox label="I authorize AVNTS Autogroup to share this information with their financial partners for the purpose of a credit application." checked={formData.consentShare} onChange={v => updateField('consentShare', v)} />
                <Checkbox label="I understand that this is a preliminary application and not a final credit approval." checked={formData.consentReferal} onChange={v => updateField('consentReferal', v)} />
                <Checkbox label="I agree to the Terms of Service and Privacy Policy of AVNTS Autogroup." checked={formData.consentTerms} onChange={v => updateField('consentTerms', v)} />
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button
                  type="submit"
                  disabled={submitting || !formData.consentTerms || !formData.consentShare}
                  className="flex-1 h-14 bg-[#C9A54E] text-black font-bold tracking-[2px] rounded-lg uppercase disabled:opacity-50"
                >
                  {submitting ? 'SENDING...' : 'SUBMIT APPLICATION'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-10 opacity-30">
          <span className="text-[10px] uppercase tracking-widest font-bold">Sercured by SSL</span>
          <span className="text-[10px] uppercase tracking-widest font-bold">Fast Approval</span>
          <span className="text-[10px] uppercase tracking-widest font-bold">No Obligation</span>
        </div>
      </div>
    </div>
  );
};

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }: any) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[10px] tracking-[1.5px] uppercase text-[#6E6E74] block font-bold">{label}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#141418] border border-[#28282E] rounded h-12 px-4 text-sm text-[#D8D4CA] outline-none focus:border-[#C9A54E88] transition-colors placeholder:text-[#3A3A40]"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

function Checkbox({ label, checked, onChange }: any) {
  return (
    <label className="flex gap-4 cursor-pointer group py-2">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="mt-1 accent-[#C9A54E] w-4 h-4" />
      <span className="text-xs text-[#8A8A90] leading-relaxed group-hover:text-[#D8D4CA] transition-colors">{label}</span>
    </label>
  );
}

export default SalesFinancingForm;
