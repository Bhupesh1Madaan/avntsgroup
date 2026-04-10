import React, { useState, useRef } from "react";

const GOLD = "#b8976a";
const REPAIR_TYPES = ["Collision repair", "Dent removal", "Scratch / paint", "Bumper repair", "Full respray", "Fender repair", "Frame straightening", "Hail damage", "Rust repair", "Panel replacement", "Headlight restore", "Other"];
const DAMAGE_ZONES = ["Front bumper", "Rear bumper", "Driver side", "Passenger side", "Hood", "Trunk", "Roof", "Front fender L", "Front fender R", "Rear quarter L", "Rear quarter R", "Door(s)"];
const TIMELINES = ["ASAP", "This week", "Next week", "Flexible", "Just need a quote"];

export default function AutobodyForm({ serviceIdentifier }: { serviceIdentifier?: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    year: '', make: '', model: '',
    repairs: new Set(["Collision repair"]),
    zones: new Set(["Front bumper", "Hood"]),
    timeline: "ASAP",
    insurance: "insurance",
    needsTow: true,
    pickupAddress: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      ...formData,
      repairs: Array.from(formData.repairs).join(", "),
      zones: Array.from(formData.zones).join(", "),
      serviceIdentifier: serviceIdentifier || "Autobody & Collision",
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
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0a0a0a] min-h-[60vh] text-white">
      <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-3xl font-serif font-light text-[#f5f5f0] mb-4">Estimate request received</h2>
      <p className="text-sm text-gray-500 max-w-xs">We'll review your details and photos and get back to you within 2 hours during business hours.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] font-sans py-12 md:py-20 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-white">
          {step === 1 && (
            <div className="space-y-6">
              <header className="text-center">
                <div className="text-[10px] uppercase tracking-[4px] text-luxury-gold mb-3">Step 1 of 4</div>
                <h2 className="text-3xl font-serif font-light mb-1">Contact Information</h2>
                <p className="text-xs text-gray-500">Provide your basic info for the estimate.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First name" value={formData.firstName} onChange={v => updateField('firstName', v)} required />
                <Field label="Last name" value={formData.lastName} onChange={v => updateField('lastName', v)} required />
                <Field label="Phone" value={formData.phone} onChange={v => updateField('phone', v)} required />
                <Field label="Email" value={formData.email} onChange={v => updateField('email', v)} required />
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
                <Field label="Year" value={formData.year} onChange={v => updateField('year', v)} required />
                <Field label="Make" value={formData.make} onChange={v => updateField('make', v)} required />
                <Field label="Model" value={formData.model} onChange={v => updateField('model', v)} required />
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
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm outline-none focus:border-luxury-gold transition-colors appearance-none text-white"
                    value={formData.timeline} onChange={e => updateField('timeline', e.target.value)}>
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
                  {submitting ? 'SENDING...' : 'GET MY ESTIMATE'}
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
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: any) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="text-xs text-gray-500 block">{label} {required && <span className="text-luxury-gold">*</span>}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-[13px] text-white focus:border-luxury-gold outline-none transition-colors placeholder:text-gray-600"
        type={type}
      />
    </div>
  );
}
