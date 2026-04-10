import React, { useState } from 'react';

const GOLD = "#b8976a";

const FLEET = [
  { id: 'm4', name: 'BMW M4 Competition', year: 2024, price: 0, cat: ['sports', 'luxury'], tags: ['Performance', '503 HP', 'AWD'], desc: 'Ultimate precision. Aggressive stance. Pure adrenaline.', badge: 'Popular', badgeType: 'pop', featured: true },
  { id: 'uruso', name: 'Lamborghini Urus', year: 2023, price: 0, cat: ['suv', 'luxury'], tags: ['Super SUV', '650 HP', 'V8'], desc: 'The soul of a super sports car with the functionality of an SUV.', badge: 'Rare', mid: true },
  { id: 'g63', name: 'Mercedes G63 AMG', year: 2024, price: 0, cat: ['suv', 'luxury'], tags: ['Icon', 'V8 Biturbo', 'Luxury'], desc: 'Off-road legend. On-road prestige. Unmistakable.', badge: 'Limited', mid: true },
  { id: 'cla250', name: 'Mercedes CLA 250', year: 2020, color: 'White', colorHex: '#e8e8e8', price: 0, cat: ['luxury'], tags: ['Coupe', 'Turbo'], desc: 'Coupe lines, sedan comfort. All white everything.', badge: 'New' },
  { id: 'beetle', name: 'VW Beetle Convertible', year: 2019, price: 0, cat: ['economy'], tags: ['Convertible', 'Iconic', 'Fun'], desc: 'Main character energy. Top down vibes only.', badge: 'Popular', badgeType: 'pop' },
  { id: 'a220', name: 'Mercedes A220', year: 2020, color: 'White', colorHex: '#e8e8e8', price: 0, cat: ['luxury', 'economy'], tags: ['Sedan', 'Compact', 'Turbo'], desc: 'Entry-level Benz, top-level flex.', badge: 'New' },
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

  const filteredFleet = selectedCat === 'all' ? FLEET : FLEET.filter(c => c.cat.includes(selectedCat));
  const selectedCar = FLEET.find(c => c.id === formData.selectedCarId);

  const updateField = (f: string, v: any) => setFormData((p: any) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      ...formData,
      selectedCarName: selectedCar?.name || 'Unknown',
      serviceIdentifier: serviceIdentifier || "Car Rentals",
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
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#050505] min-h-[60vh] text-white w-full">
      <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-6 text-luxury-gold">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-3xl font-serif font-light mb-4 text-white">Reservation Confirmed</h2>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">Thank you, {formData.firstName}. We've received your request for the {selectedCar?.name}. A specialist will reach out within the hour to arrange fulfillment.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f0] font-sans py-12 md:py-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12 max-w-xl mx-auto">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-luxury-gold' : 'bg-white/10'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-in text-white">
          {step === 1 && (
            <div className="max-w-xl mx-auto space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 1 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Your Information</h2>
                <p className="text-xs text-gray-500">Let's start with who's driving.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name" value={formData.firstName} onChange={v => updateField('firstName', v)} required />
                <Field label="Last Name" value={formData.lastName} onChange={v => updateField('lastName', v)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Phone" value={formData.phone} onChange={v => updateField('phone', v)} required />
                <Field label="Email" value={formData.email} onChange={v => updateField('email', v)} required />
              </div>
              <button type="button" onClick={next} className="w-full h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg">SELECT VEHICLE</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <header className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-[4px] text-luxury-gold mb-3">Step 2 of 4</div>
                <h2 className="text-4xl font-serif font-light mb-2 text-white">Select Your Ride</h2>
                <div className="flex gap-1.5 flex-wrap justify-center mt-6">
                  {['all', 'luxury', 'sports', 'suv', 'electric', 'economy'].map(cat => (
                    <button key={cat} type="button" onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all uppercase tracking-widest ${selectedCat === cat ? 'bg-luxury-gold text-black border-luxury-gold' : 'bg-transparent text-gray-500 border-white/10 hover:border-luxury-gold/50'}`}>{cat}</button>
                  ))}
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFleet.map(car => (
                  <div key={car.id} onClick={() => updateField('selectedCarId', car.id)}
                    className={`relative bg-[#0f0f0f] rounded-2xl border transition-all cursor-pointer group overflow-hidden ${formData.selectedCarId === car.id ? 'border-luxury-gold ring-1 ring-luxury-gold shadow-[0_0_30px_rgba(184,151,106,0.1)]' : 'border-white/5 hover:border-luxury-gold/20'}`}>
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
                <button type="button" onClick={next} disabled={!formData.selectedCarId} className="flex-1 h-14 bg-luxury-gold text-black font-bold rounded-lg disabled:opacity-50">CONTINUE</button>
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
                <Field label="Pickup Date" type="date" value={formData.startDate} onChange={v => updateField('startDate', v)} required />
                <Field label="Return Date" type="date" value={formData.endDate} onChange={v => updateField('endDate', v)} required />
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
                <Field label="Delivery Address" placeholder="Street, City, Postal Code" value={formData.deliveryAddress} onChange={v => updateField('deliveryAddress', v)} required />
              )}
              <div className="flex gap-4">
                <button type="button" onClick={back} className="flex-1 h-14 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-lg">BACK</button>
                <button type="submit" disabled={submitting} className="flex-1 h-14 bg-luxury-gold text-black font-bold tracking-[3px] rounded-lg disabled:opacity-50">
                  {submitting ? 'SENDING...' : 'CONFIRM RESERVATION'}
                </button>
              </div>
            </div>
          )}
        </form>

        <footer className="mt-24 text-center border-t border-white/5 pt-12 flex flex-col items-center">
          <div className="font-semibold text-2xl tracking-[12px] text-white/20 mb-2 uppercase">AVNTS</div>
          <div className="text-[10px] text-white/20 uppercase tracking-[4px]">7A Musgrave Street, Toronto ON</div>
        </footer>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }: any) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest block">{label}</label>
      <input
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-sm text-white focus:border-luxury-gold outline-none transition-colors font-sans placeholder:text-gray-600"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
