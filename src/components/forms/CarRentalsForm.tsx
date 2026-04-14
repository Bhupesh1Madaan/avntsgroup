import React, { useState, useRef } from 'react';
import { FormHeader, FormSocialProof, FormFooter } from './FormBranding';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzlN1LezMPwnkOJgCB90vSxLtH02GvtkQAKU4Fr--4UAJgtA-Hxecx3fNdBG5MpBKdq/exec';

const FLEET = [
  { id: 'm4', name: 'BMW M4 Competition', year: 2024, price: 0, cat: ['sports', 'luxury'], tags: ['Performance', '503 HP', 'AWD'], desc: 'Ultimate precision. Aggressive stance. Pure adrenaline.', badge: 'Popular' },
  { id: 'uruso', name: 'Lamborghini Urus', year: 2023, price: 0, cat: ['suv', 'luxury'], tags: ['Super SUV', '650 HP', 'V8'], desc: 'The soul of a super sports car with the functionality of an SUV.', badge: 'Rare' },
  { id: 'g63', name: 'Mercedes G63 AMG', year: 2024, price: 0, cat: ['suv', 'luxury'], tags: ['Icon', 'V8 Biturbo', 'Luxury'], desc: 'Off-road legend. On-road prestige. Unmistakable.', badge: 'Limited' },
  { id: 'cla250', name: 'Mercedes CLA 250', year: 2020, price: 0, cat: ['luxury'], tags: ['Coupe', 'Turbo'], desc: 'Coupe lines, sedan comfort. All white everything.', badge: 'New' },
  { id: 'beetle', name: 'VW Beetle Convertible', year: 2019, price: 0, cat: ['economy'], tags: ['Convertible', 'Iconic', 'Fun'], desc: 'Main character energy. Top down vibes only.', badge: 'Popular' },
  { id: 'a220', name: 'Mercedes A220', year: 2020, price: 0, cat: ['luxury', 'economy'], tags: ['Sedan', 'Compact', 'Turbo'], desc: 'Entry-level Benz, top-level flex.', badge: 'New' },
  { id: 'model3p', name: 'Tesla Model 3 Performance', year: 2023, price: 0, cat: ['electric', 'sports'], tags: ['Performance', 'AWD', 'Electric'], desc: 'Track mode unlocked. Quiet but violent.' },
  { id: 'model3', name: 'Tesla Model 3 Long Range', year: 2023, price: 0, cat: ['electric'], tags: ['AWD', 'Electric', '534km'], desc: 'Silent speed. Autopilot. Zero gas bills.' },
  { id: 'cx50', name: 'Mazda CX-50', year: 2025, price: 0, cat: ['suv'], tags: ['AWD', 'Crossover', 'Turbo'], desc: 'Adventure-ready crossover. Punches way above.' },
  { id: 'camry', name: 'Toyota Camry', year: 2024, price: 0, cat: ['economy'], tags: ['Sedan', 'Reliable', 'Fuel-Efficient'], desc: 'Reliable legend. Gas sipper. Just works.' },
];

export default function CarRentalsForm({ serviceIdentifier }: { serviceIdentifier?: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: '', lastName: '', phone: '', email: '',
    selectedCarId: '',
    startDate: '', endDate: '',
    mileageNeeded: 'standard',
    deliveryMode: 'deliver',
    deliveryAddress: ''
  });
  const [selectedCat, setSelectedCat] = useState('all');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const filteredFleet = selectedCat === 'all' ? FLEET : FLEET.filter(c => c.cat.includes(selectedCat));
  const selectedCar = FLEET.find(c => c.id === formData.selectedCarId);

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
      if (!formData.selectedCarId) newErrors.selectedCarId = true;
    }
    if (s === 3) {
      if (!formData.startDate) newErrors.startDate = true;
      if (!formData.endDate) newErrors.endDate = true;
    }
    if (s === 4) {
      if (formData.deliveryMode === 'deliver' && !formData.deliveryAddress.trim()) newErrors.deliveryAddress = true;
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

    setSubmitting(true);

    const payload: any = {
      ...formData,
      selectedCarName: selectedCar?.name || 'Unknown',
      serviceIdentifier: serviceIdentifier || 'Car Rentals',
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
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#050505] min-h-[60vh] text-white w-full">
      <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-3xl font-serif font-light mb-4 text-white">Reservation Confirmed</h2>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. We've received your request for the {selectedCar?.name}. A specialist will reach out within the hour to arrange fulfillment.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f0] font-sans w-full">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BRANDING */}
        <FormHeader
          heroTitle="Luxury vehicle rentals"
          heroDesc="Access Toronto's most exclusive fleet. Delivered to your door, fulfilled to a five-star standard."
          badges={['Doorstep delivery', 'Unlimited options', 'Elite fleet']}
        />
        <div className="py-12 md:py-16 px-4">
        {/* Progress */}
        <div className="flex gap-2 mb-12 max-w-xl mx-auto">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="animate-fade-in text-white" noValidate>
          {step === 1 && (
            <div className="max-w-xl mx-auto space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 1 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Your Information</h2>
                <p className="text-xs text-gray-500">Let's start with who's driving.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" fieldKey="firstName" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} hasError={errors.firstName} required />
                <Field label="Last Name" fieldKey="lastName" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} hasError={errors.lastName} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phone" fieldKey="phone" value={formData.phone} onChange={(v: string) => updateField('phone', v)} hasError={errors.phone} required />
                <Field label="Email" fieldKey="email" value={formData.email} onChange={(v: string) => updateField('email', v)} hasError={errors.email} required />
              </div>
              <button type="button" onClick={next} className="w-full h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg">SELECT VEHICLE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 2 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Select Your Ride</h2>
                {errors.selectedCarId && (
                  <p className="text-[#e04848] text-xs mt-2" data-field="selectedCarId">Please select a vehicle to continue.</p>
                )}
                <div className="flex gap-1.5 flex-wrap justify-center mt-6">
                  {['all', 'luxury', 'sports', 'suv', 'electric', 'economy'].map(cat => (
                    <button key={cat} type="button" onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all uppercase tracking-widest ${selectedCat === cat ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent text-gray-500 border-white/10 hover:border-luxury-gold/50'}`}>{cat}</button>
                  ))}
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFleet.map(car => (
                  <div key={car.id} onClick={() => { updateField('selectedCarId', car.id); if (errors.selectedCarId) setErrors(p => ({ ...p, selectedCarId: false })); }}
                    className={`relative bg-[#0f0f0f] rounded-2xl border transition-all cursor-pointer group overflow-hidden ${formData.selectedCarId === car.id ? 'border-luxury-gold ring-1 ring-luxury-gold shadow-[0_0_30px_rgba(184,151,106,0.1)]' : errors.selectedCarId ? 'border-[#e04848]/30 hover:border-luxury-gold/20' : 'border-white/5 hover:border-luxury-gold/20'}`}>
                    <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center p-8">
                      <span className="text-xl font-bold text-white/10 tracking-[10px] uppercase">{car.name.split(' ').pop()}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{car.name}</h3>
                        {car.price > 0 && <span className="text-luxury-gold font-bold">${car.price}/d</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mb-4 h-8 overflow-hidden">{car.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {car.tags.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 max-w-xl mx-auto">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="button" onClick={next} className="flex-1 h-14 bg-luxury-gold text-black font-bold rounded-lg">CONTINUE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-xl mx-auto space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 3 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Rental Duration</h2>
                <p className="text-xs text-gray-500">When do you need the {selectedCar?.name}?</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Pickup Date" fieldKey="startDate" type="date" value={formData.startDate} onChange={(v: string) => updateField('startDate', v)} hasError={errors.startDate} required />
                <Field label="Return Date" fieldKey="endDate" type="date" value={formData.endDate} onChange={(v: string) => updateField('endDate', v)} hasError={errors.endDate} required />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-luxury-gold uppercase tracking-[2px]">Daily Mileage Needed</label>
                <div className="grid grid-cols-2 gap-2">
                  {['standard', 'unlimited'].map(m => (
                    <button key={m} type="button" onClick={() => updateField('mileageNeeded', m)}
                      className={`h-11 border rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${formData.mileageNeeded === m ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent border-white/10 text-gray-600'}`}>{m}</button>
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
            <div className="max-w-xl mx-auto space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 4 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Logistics</h2>
                <p className="text-xs text-gray-500">Almost there. How should we fulfill this?</p>
              </header>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => updateField('deliveryMode', 'deliver')} className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-all ${formData.deliveryMode === 'deliver' ? 'bg-luxury-gold/5 border-luxury-gold' : 'bg-transparent border-white/10 opacity-30'}`}>
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${formData.deliveryMode === 'deliver' ? 'text-luxury-gold' : ''}`}>Delivery</span>
                  <span className="text-[9px] text-gray-500 mt-1">To your doorstep</span>
                </button>
                <button type="button" onClick={() => updateField('deliveryMode', 'pickup')} className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-all ${formData.deliveryMode === 'pickup' ? 'bg-luxury-gold/5 border-luxury-gold' : 'bg-transparent border-white/10 opacity-30'}`}>
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${formData.deliveryMode === 'pickup' ? 'text-luxury-gold' : ''}`}>Pickup</span>
                  <span className="text-[9px] text-gray-500 mt-1">From our showroom</span>
                </button>
              </div>
              {formData.deliveryMode === 'deliver' && (
                <Field label="Delivery Address" fieldKey="deliveryAddress" placeholder="Street, City, Postal Code" value={formData.deliveryAddress} onChange={(v: string) => updateField('deliveryAddress', v)} hasError={errors.deliveryAddress} required />
              )}
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={submitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg disabled:opacity-50">
                  {submitting ? 'SUBMITTING...' : 'CONFIRM RESERVATION'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
        {/* SOCIAL PROOF */}
        <FormSocialProof
          proofTitle="Toronto's favourite luxury rental experience"
          proofSub="Exotic rentals · Delivered to you · Since 2016"
          reviews={[
            { text: 'Rented the Urus for the weekend. Delivery was on time and the car was immaculate. Will never use anyone else.', name: 'Marcus O.', detail: 'Lamborghini Urus' },
            { text: 'The G63 was a statement. AVNTS made the process effortless from booking to return.', name: 'Priya N.', detail: 'Mercedes G63 AMG' },
            { text: 'Got the Tesla for a client road trip. Clean, fast, and the delivery was flawless.', name: 'Jordan C.', detail: 'Tesla Model 3 Performance' },
            { text: 'Rented the M4 for a photoshoot. The team went out of their way to make it perfect.', name: 'Leila B.', detail: 'BMW M4 Competition' },
          ]}
          stats={[{ n: '10+', l: 'VEHICLES' }, { n: '4.9', l: 'RATING' }, { n: '8+', l: 'YEARS' }, { n: '24/7', l: 'SUPPORT' }]}
        />
        <FormFooter />
      </div>
    </div>
  );
}

function Field({ label, fieldKey, value, onChange, type = 'text', required = false, placeholder = '', hasError = false }: any) {
  return (
    <div className="flex-1 space-y-1.5" data-field={fieldKey}>
      <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest block">{label}{required && <span className="text-[#e04848] ml-1">*</span>}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        data-field={fieldKey}
        className={`w-full h-11 bg-white/5 border rounded-lg px-4 text-sm text-white focus:border-luxury-gold outline-none transition-colors font-sans placeholder:text-gray-600 ${hasError ? 'border-[#e04848]' : 'border-white/10'}`}
        type={type}
        placeholder={placeholder}
      />
      {hasError && <p className="text-[#e04848] text-xs mt-1">This field is required.</p>}
    </div>
  );
}
