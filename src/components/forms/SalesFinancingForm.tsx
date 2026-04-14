import React, { useState, useRef } from 'react';

const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dpEhUNA24tzTJXmQ2EBH/webhook-trigger/lFwNcdh8m73nk7G4n7AI';
const SHEETS_WEBHOOK = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';

const GOLD = '#C9A54E';
const DARK = '#0C0C0E';
const DARK2 = '#111115';
const DARK3 = '#141418';
const BORDER = '#28282E';
const MUTED = '#6E6E74';
const LIGHT = '#E8E4DA';

const makeModels: Record<string, string[]> = {
  'Acura': ['Integra','TLX','MDX','RDX'],
  'Alfa Romeo': ['Giulia','Stelvio','Tonale'],
  'Aston Martin': ['DB12','DBX','Vantage','DBS'],
  'Audi': ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','e-tron GT','RS 3','RS 5','RS 6 Avant','RS 7','RS Q8','S3','S4','S5','S6','S7','S8','TT'],
  'Bentley': ['Bentayga','Continental GT','Flying Spur'],
  'BMW': ['2 Series','3 Series','4 Series','5 Series','7 Series','8 Series','i4','i5','i7','iX','X1','X2','X3','X4','X5','X6','X7','XM','Z4','M2','M3','M4','M5','M8'],
  'Buick': ['Enclave','Encore GX','Envista'],
  'Cadillac': ['CT4','CT5','Escalade','Escalade V','LYRIQ','XT4','XT5','XT6'],
  'Chevrolet': ['Blazer','Camaro','Colorado','Corvette','Equinox','Malibu','Silverado 1500','Suburban','Tahoe','Trailblazer','Trax','Traverse'],
  'Dodge': ['Charger','Durango','Hornet'],
  'Ferrari': ['296 GTB','812','F8','Roma','SF90','Purosangue'],
  'Ford': ['Bronco','Edge','Escape','Expedition','Explorer','F-150','Maverick','Mustang','Mustang Mach-E','Ranger'],
  'Genesis': ['G70','G80','G90','GV60','GV70','GV80'],
  'GMC': ['Acadia','Canyon','Hummer EV','Sierra 1500','Sierra 2500HD','Terrain','Yukon'],
  'Honda': ['Accord','Civic','CR-V','HR-V','Odyssey','Passport','Pilot','Ridgeline'],
  'Hyundai': ['Elantra','IONIQ 5','IONIQ 6','Kona','Palisade','Santa Fe','Sonata','Tucson'],
  'Infiniti': ['Q50','QX50','QX55','QX60','QX80'],
  'Jaguar': ['E-PACE','F-PACE','F-TYPE','I-PACE','XF'],
  'Jeep': ['Compass','Gladiator','Grand Cherokee','Wagoneer','Wrangler'],
  'Kia': ['Carnival','EV6','EV9','Forte','K5','Niro','Sorento','Sportage','Stinger','Telluride'],
  'Lamborghini': ['Huracán','Revuelto','Urus'],
  'Land Rover': ['Defender','Discovery','Range Rover','Range Rover Sport','Range Rover Velar'],
  'Lexus': ['ES','GX','IS','LC','LS','LX','NX','RC','RX','TX'],
  'Lincoln': ['Aviator','Corsair','Nautilus','Navigator'],
  'Maserati': ['Ghibli','GranTurismo','Grecale','Levante','MC20','Quattroporte'],
  'Mazda': ['CX-30','CX-5','CX-50','CX-90','Mazda3','MX-5 Miata'],
  'McLaren': ['750S','Artura','GT'],
  'Mercedes-Benz': ['A-Class','AMG GT','C-Class','CLA','E-Class','G-Class','GLA','GLB','GLC','GLE','GLS','S-Class','SL'],
  'MINI': ['Clubman','Convertible','Countryman','Hardtop 2 Door','Hardtop 4 Door'],
  'Nissan': ['Altima','Ariya','GT-R','Kicks','Leaf','Murano','Pathfinder','Rogue','Sentra','Titan','Z'],
  'Polestar': ['Polestar 2','Polestar 3'],
  'Porsche': ['718 Boxster','718 Cayman','911','Cayenne','Macan','Panamera','Taycan'],
  'Ram': ['1500','2500','3500'],
  'Rivian': ['R1S','R1T'],
  'Rolls-Royce': ['Cullinan','Ghost','Phantom','Spectre'],
  'Subaru': ['Ascent','BRZ','Crosstrek','Forester','Impreza','Outback','WRX'],
  'Tesla': ['Model 3','Model S','Model X','Model Y','Cybertruck'],
  'Toyota': ['4Runner','Camry','Corolla','Crown','GR Supra','Highlander','Land Cruiser','Prius','RAV4','Sequoia','Sienna','Tacoma','Tundra'],
  'Volkswagen': ['Atlas','Golf GTI','Golf R','ID.4','Jetta','Tiguan'],
  'Volvo': ['C40 Recharge','EX30','EX90','S60','S90','XC40','XC60','XC90'],
};

const allMakes = Object.keys(makeModels);
const years = Array.from({ length: 8 }, (_, i) => String(2026 - i));
const tradeYears = Array.from({ length: 20 }, (_, i) => String(2026 - i));
const budgets = ['Under $20k','$20k–$30k','$30k–$40k','$40k–$60k','$60k–$80k','$80k–$100k','$100k+'];
const loanTerms = [24, 36, 48, 60, 72, 84, 96];
const creditRanges = ['Excellent (750+)','Good (700–749)','Fair (650–699)','Poor (below 650)','Not sure'];
const empStatuses = ['Employed full-time','Employed part-time','Self-employed','Retired','Student','Other'];
const provinces = ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador','Northwest Territories','Nova Scotia','Nunavut','Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon'];
const timeOptions = ['Less than 6 months','6–12 months','1–2 years','2–3 years','3–5 years','5+ years'];
const tradeConditions = ['Excellent','Good','Fair','Poor'];

function estimatePayment(price: number, down: number, termMonths: number, rate: number) {
  const p = price - down;
  if (p <= 0 || termMonths <= 0) return 0;
  const r = rate / 12;
  if (r === 0) return Math.round(p / termMonths);
  return Math.round((p * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1));
}

function getBudgetMid(b: string) {
  const map: Record<string, number> = { 'Under $20k': 15000, '$20k–$30k': 25000, '$30k–$40k': 35000, '$40k–$60k': 50000, '$60k–$80k': 70000, '$80k–$100k': 90000, '$100k+': 120000 };
  return map[b] || 0;
}

export default function SalesFinancingForm({ serviceIdentifier }: { serviceIdentifier?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<any>({
    licenseFront: null, licenseBack: null,
    firstName: '', lastName: '', dob: '',
    email: '', phone: '', contactMethod: 'phone',
    address: '', city: '', province: '', postal: '', timeAtAddress: '', housing: 'rent', housingPayment: '',
    prevAddress: '', prevCity: '', prevProvince: '', prevPostal: '',
    empStatus: '', employer: '', jobTitle: '', timeAtJob: '', monthlyIncome: '', otherIncomeSource: '', otherIncome: '',
    prevEmployer: '', prevJobTitle: '', prevTimeAtJob: '',
    creditScore: '', bankruptcy: 'none', existingCarPayment: '', otherDebt: '', sin: '',
    condition: 'new', make: '', model: '', year: '', budget: '',
    tradeIn: 'no', tradeMake: '', tradeModel: '', tradeYear: '', tradeMileage: '', tradeCondition: '', tradeOwing: '',
    downPayment: '', loanTerm: 60, prevDeclined: 'no',
    coApplicant: 'no', coName: '', coPhone: '', coEmail: '', coRelationship: '',
    consentShare: false, consentReferral: false, consentTerms: false, eSig: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const TOTAL = 9;
  const set = (k: string, v: any) => { setForm((p: any) => ({ ...p, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: false })); };
  const needsPrevAddress = ['Less than 6 months', '6–12 months', '1–2 years'].includes(form.timeAtAddress);
  const needsPrevEmployer = ['Less than 6 months', '6–12 months', '1–2 years'].includes(form.timeAtJob);
  const estPayment = estimatePayment(getBudgetMid(form.budget), Number(form.downPayment.replace(/[^0-9]/g, '')) || 0, form.loanTerm, 0.069);

  const handleFile = (key: string, setter: (s: string) => void) => {
    const el = document.createElement('input');
    el.type = 'file'; el.accept = 'image/*'; el.capture = 'environment';
    el.onchange = (e: any) => {
      const f = e.target.files[0];
      if (f) { set(key, f); const r = new FileReader(); r.onload = (ev: any) => setter(ev.target.result); r.readAsDataURL(f); }
    };
    el.click();
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (s === 0) { if (!form.firstName.trim()) newErrors.firstName = true; if (!form.lastName.trim()) newErrors.lastName = true; if (!form.dob) newErrors.dob = true; }
    if (s === 1) { if (!form.email.trim()) newErrors.email = true; if (!form.phone.trim()) newErrors.phone = true; }
    if (s === 2) { if (!form.address.trim()) newErrors.address = true; if (!form.city.trim()) newErrors.city = true; if (!form.province) newErrors.province = true; if (!form.postal.trim()) newErrors.postal = true; if (!form.timeAtAddress) newErrors.timeAtAddress = true; }
    if (s === 4) { if (!form.empStatus) newErrors.empStatus = true; if (!form.monthlyIncome.trim()) newErrors.monthlyIncome = true; }
    if (s === 5) { if (!form.creditScore) newErrors.creditScore = true; }
    if (s === 6) { if (!form.make) newErrors.make = true; if (!form.model) newErrors.model = true; if (!form.budget) newErrors.budget = true; }
    if (s === 8) { if (!form.consentShare) newErrors.consentShare = true; if (!form.consentReferral) newErrors.consentReferral = true; if (!form.consentTerms) newErrors.consentTerms = true; if (!form.eSig.trim()) newErrors.eSig = true; }
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
    return true;
  };

  const next = () => { if (validateStep(step)) setStep(s => Math.min(s + 1, 8)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep(8)) return;
    setSubmitting(true);
    const payload: Record<string, any> = {
      firstName: form.firstName, lastName: form.lastName, dob: form.dob,
      email: form.email, phone: form.phone, contactMethod: form.contactMethod,
      address: form.address, city: form.city, province: form.province, postal: form.postal,
      timeAtAddress: form.timeAtAddress, housing: form.housing, housingPayment: form.housingPayment,
      empStatus: form.empStatus, employer: form.employer, jobTitle: form.jobTitle,
      timeAtJob: form.timeAtJob, monthlyIncome: form.monthlyIncome, otherIncome: form.otherIncome,
      creditScore: form.creditScore, bankruptcy: form.bankruptcy,
      existingCarPayment: form.existingCarPayment, otherDebt: form.otherDebt,
      condition: form.condition, make: form.make, model: form.model, year: form.year, budget: form.budget,
      tradeIn: form.tradeIn, tradeMake: form.tradeMake, tradeModel: form.tradeModel, tradeYear: form.tradeYear,
      tradeMileage: form.tradeMileage, tradeCondition: form.tradeCondition, tradeOwing: form.tradeOwing,
      downPayment: form.downPayment, loanTerm: String(form.loanTerm), prevDeclined: form.prevDeclined,
      coApplicant: form.coApplicant, coName: form.coName, coPhone: form.coPhone, coEmail: form.coEmail,
      consentShare: String(form.consentShare), consentReferral: String(form.consentReferral),
      consentTerms: String(form.consentTerms), eSig: form.eSig,
      serviceIdentifier: serviceIdentifier || 'Sales & Financing',
      source: 'Website Form'
    };
    const queryParams = new URLSearchParams();
    Object.keys(payload).forEach(k => queryParams.append(k, String(payload[k])));
    try {
      await fetch(GHL_WEBHOOK, { method: 'POST', body: queryParams, mode: 'no-cors' });
      await fetch(SHEETS_WEBHOOK, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } catch (err) { console.error('Submission error:', err); }
    finally { setSubmitting(false); setSubmitted(true); }
  };

  // ── Styles ──
  const S: Record<string, React.CSSProperties> = {
    input: { width: '100%', boxSizing: 'border-box', background: DARK3, border: `0.5px solid ${BORDER}`, borderRadius: 3, color: '#D8D4CA', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' },
    inputErr: { width: '100%', boxSizing: 'border-box', background: DARK3, border: `0.5px solid #e04848`, borderRadius: 3, color: '#D8D4CA', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', outline: 'none' },
    label: { fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: MUTED, display: 'block', marginBottom: 5 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 14px' },
    h2: { fontFamily: "'Cormorant Garamond',Georgia,serif", color: '#F0EBE0', fontSize: 24, fontWeight: 400, margin: '0 0 3px' },
    sub: { fontSize: 13, color: '#6A6A70', margin: '0 0 22px' },
  };

  const Input = ({ label, placeholder, value, onChange, type = 'text', full = false, note = '', err = false }: any) => (
    <div style={full ? { gridColumn: '1/-1' } : {}}>
      <label style={S.label}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e: any) => onChange(e.target.value)}
        style={err ? S.inputErr : S.input}
        onFocus={(e: any) => { e.target.style.borderColor = GOLD + '88'; }}
        onBlur={(e: any) => { e.target.style.borderColor = err ? '#e04848' : BORDER; }} />
      {note && <p style={{ fontSize: 11, color: '#44444A', margin: '5px 0 0', lineHeight: 1.4 }}>{note}</p>}
      {err && <p style={{ fontSize: 11, color: '#e04848', margin: '4px 0 0' }}>This field is required.</p>}
    </div>
  );

  const Sel = ({ label, options, value, onChange, placeholder = 'Select...', full = false, err = false }: any) => (
    <div style={full ? { gridColumn: '1/-1' } : {}}>
      <label style={S.label}>{label}</label>
      <select value={value} onChange={(e: any) => onChange(e.target.value)}
        style={{ ...(err ? S.inputErr : S.input), appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236E6E74' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36 }}>
        <option value="">{placeholder}</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
      {err && <p style={{ fontSize: 11, color: '#e04848', margin: '4px 0 0' }}>This field is required.</p>}
    </div>
  );

  const RG = ({ name, options, value, onChange, max }: any) => (
    <div style={{ display: 'flex', gap: 8, marginTop: 6, maxWidth: max || 'none', flexWrap: 'wrap' as const }}>
      {options.map((o: any) => (
        <label key={o.v} style={{ textTransform: 'none', letterSpacing: 0, fontSize: 13, color: value === o.v ? '#D8D4CA' : '#8A8A90', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', background: value === o.v ? '#1E1E24' : DARK3, border: `0.5px solid ${value === o.v ? GOLD + '55' : BORDER}`, borderRadius: 3, padding: '9px 16px', flex: 1, justifyContent: 'center', transition: 'all 0.2s', minWidth: 60 }}>
          <input type="radio" name={name} checked={value === o.v} onChange={() => onChange(o.v)} style={{ accentColor: GOLD }} />{o.l}
        </label>
      ))}
    </div>
  );

  const Head = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '0.5px solid #1E1E24' }}>
      <div style={{ color: LIGHT, fontSize: 17, letterSpacing: 3, fontWeight: 500 }}>
        <span style={{ color: GOLD }}>AVNTS</span>
        <span style={{ fontSize: 10, letterSpacing: '1.5px', color: '#5E5E64', marginLeft: 6, textTransform: 'uppercase', fontWeight: 400 }}>Auto Group</span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', transition: 'all 0.3s', background: i === step ? GOLD : i < step ? GOLD + '55' : '#2A2A30' }} />
        ))}
      </div>
    </div>
  );

  const Foot = ({ showBack = true, label = 'Continue', onNext, disabled }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '0.5px solid #1E1E24', marginTop: 20 }}>
      {showBack ? <button onClick={back} style={{ background: 'transparent', border: '0.5px solid #333338', color: '#7A7A80', padding: '10px 22px', borderRadius: 3, fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Back</button> : <div />}
      <button onClick={onNext || next} disabled={disabled} style={{ background: disabled ? GOLD + '55' : GOLD, border: 'none', color: DARK, padding: '11px 30px', borderRadius: 3, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>{label}</button>
    </div>
  );

  const Tag = ({ n }: any) => (
    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, margin: '0 0 14px', padding: '3px 0', borderBottom: `0.5px solid ${GOLD}22`, display: 'inline-block' }}>
      {n === 'final' ? 'Final step' : `Step ${n} of ${TOTAL}`}
    </div>
  );

  const Div = () => <hr style={{ border: 'none', borderTop: '0.5px solid #1E1E24', margin: '20px 0' }} />;

  const UZ = ({ label, icon, preview, onClick }: any) => (
    <div onClick={onClick} style={{ border: preview ? `0.5px solid ${GOLD}44` : '1px dashed #2E2E34', borderRadius: 6, padding: preview ? 0 : '28px 16px', textAlign: 'center', background: DARK2, cursor: 'pointer', overflow: 'hidden', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {preview ? <img src={preview} alt={label} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 6 }} /> : (
        <>{icon}<p style={{ margin: '8px 0 0', fontSize: 12, color: '#5E5E64' }}>{label}</p><span style={{ fontSize: 11, color: GOLD, marginTop: 4 }}>Tap to upload</span></>
      )}
    </div>
  );

  const W = ({ children }: any) => (
    <div style={{ background: DARK, borderRadius: 12, overflow: 'hidden' }}>
      <Head /><div style={{ padding: '26px 24px 4px' }}>{children}</div>
    </div>
  );

  const TrustBar = () => (
    <div style={{ background: DARK, borderRadius: 12, padding: '14px 24px', marginTop: 24, border: '0.5px solid #1A1A20' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#5E5E64' }}>1,200+ clients matched</span>
        <span style={{ fontSize: 11, color: GOLD }}>★★★★★ <span style={{ color: '#8A8A90' }}>4.9 on Google</span></span>
        <span style={{ fontSize: 11, color: '#5E5E64' }}>Trusted partner network</span>
        <span style={{ fontSize: 11, color: '#5E5E64' }}>Free to apply</span>
      </div>
    </div>
  );

  if (submitted) return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: DARK, borderRadius: 12, padding: '48px 32px', textAlign: 'center', border: '0.5px solid #1A1A20' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: GOLD + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: '#F0EBE0', fontSize: 28, fontWeight: 400, margin: '0 0 8px' }}>Application received</h2>
        <p style={{ fontSize: 14, color: '#7A7A80', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 20px' }}>Thank you, {form.firstName || 'there'}. Our team will review your information and connect you with the best financing partner. Expect to hear from us within 24 hours.</p>
        <p style={{ fontSize: 12, color: '#44444A', lineHeight: 1.5, maxWidth: 380, margin: '0 auto' }}>All financing is subject to credit approval (OAC). Rates and payments shown are estimates and may vary based on your credit profile.</p>
      </div>
      <TrustBar />
    </div>
  );

  const CamIcon = <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#4A4A50" strokeWidth="1.2" /><circle cx="8.5" cy="11" r="2" stroke="#4A4A50" strokeWidth="1" /><path d="M3 16l4-4 3 3 4-5 7 6" stroke="#4A4A50" strokeWidth="1" /></svg>;
  const CardIcon = <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#4A4A50" strokeWidth="1.2" /><path d="M7 10h10M7 13h7" stroke="#4A4A50" strokeWidth="1" strokeLinecap="round" /></svg>;

  const pages = [
    // Step 0: ID
    <W key={0}><Tag n={1} />
      <h2 style={S.h2}>Verify your identity</h2>
      <p style={S.sub}>Upload your driver's license so our partners can verify your application</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <UZ label="License front" icon={CamIcon} preview={frontPreview} onClick={() => handleFile('licenseFront', setFrontPreview)} />
        <UZ label="License back" icon={CardIcon} preview={backPreview} onClick={() => handleFile('licenseBack', setBackPreview)} />
      </div>
      <div style={S.grid}>
        <Input label="First name" placeholder="Alexander" value={form.firstName} onChange={(v: string) => set('firstName', v)} err={errors.firstName} />
        <Input label="Last name" placeholder="Rothwell" value={form.lastName} onChange={(v: string) => set('lastName', v)} err={errors.lastName} />
        <Input label="Date of birth" value={form.dob} onChange={(v: string) => set('dob', v)} type="date" full err={errors.dob} />
      </div>
      <Foot showBack={false} />
    </W>,

    // Step 1: Contact
    <W key={1}><Tag n={2} />
      <h2 style={S.h2}>How can we reach you?</h2>
      <p style={S.sub}>We'll only contact you about your application</p>
      <div style={{ ...S.grid, gridTemplateColumns: '1fr' }}>
        <Input label="Email address" placeholder="alex@example.com" value={form.email} onChange={(v: string) => set('email', v)} type="email" err={errors.email} />
        <Input label="Phone number" placeholder="(416) 555-0100" value={form.phone} onChange={(v: string) => set('phone', v)} type="tel" err={errors.phone} />
        <div><label style={S.label}>Preferred contact method</label>
          <RG name="contactMethod" value={form.contactMethod} onChange={(v: string) => set('contactMethod', v)} options={[{ v: 'phone', l: 'Phone' }, { v: 'email', l: 'Email' }, { v: 'text', l: 'Text' }]} /></div>
      </div>
      <Foot />
    </W>,

    // Step 2: Address
    <W key={2}><Tag n={3} />
      <h2 style={S.h2}>Where do you live?</h2>
      <p style={S.sub}>Lenders require your current residential address</p>
      <div style={S.grid}>
        <Input label="Street address" placeholder="123 King Street West" value={form.address} onChange={(v: string) => set('address', v)} full err={errors.address} />
        <Input label="City" placeholder="Toronto" value={form.city} onChange={(v: string) => set('city', v)} err={errors.city} />
        <Sel label="Province" options={provinces} value={form.province} onChange={(v: string) => set('province', v)} err={errors.province} />
        <Input label="Postal code" placeholder="M5V 2T6" value={form.postal} onChange={(v: string) => set('postal', v)} err={errors.postal} />
        <Sel label="Time at this address" options={timeOptions} value={form.timeAtAddress} onChange={(v: string) => set('timeAtAddress', v)} err={errors.timeAtAddress} />
        <div style={{ gridColumn: '1/-1' }}><label style={S.label}>Housing status</label>
          <RG name="housing" value={form.housing} onChange={(v: string) => set('housing', v)} options={[{ v: 'rent', l: 'Rent' }, { v: 'own', l: 'Own' }, { v: 'other', l: 'Other' }]} /></div>
        <Input label="Monthly housing payment" placeholder="$1,500" value={form.housingPayment} onChange={(v: string) => set('housingPayment', v)} full />
      </div>
      {needsPrevAddress && <><Div />
        <p style={{ fontSize: 12, color: GOLD + 'aa', margin: '0 0 14px' }}>Previous address (required if under 2 years)</p>
        <div style={S.grid}>
          <Input label="Previous street address" placeholder="" value={form.prevAddress} onChange={(v: string) => set('prevAddress', v)} full />
          <Input label="City" placeholder="" value={form.prevCity} onChange={(v: string) => set('prevCity', v)} />
          <Sel label="Province" options={provinces} value={form.prevProvince} onChange={(v: string) => set('prevProvince', v)} />
          <Input label="Postal code" placeholder="" value={form.prevPostal} onChange={(v: string) => set('prevPostal', v)} />
        </div></>}
      <Foot />
    </W>,

    // Step 3: Social proof
    <div key={3} style={{ background: DARK, borderRadius: 12, padding: 24, border: '0.5px solid #1A1A20' }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, margin: '0 0 18px' }}>You're in great hands</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
        {[['1,200+', 'Clients matched'], ['4.9', 'Google rating'], ['96%', 'Financing secured']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center', padding: '16px 8px', background: DARK2, borderRadius: 4 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 26, color: '#F0EBE0', fontWeight: 400, display: 'block' }}>{n}</span>
            <span style={{ fontSize: 11, color: '#6A6A70', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 3, display: 'block' }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { q: 'AVNTS connected me with a lender that got me an incredible rate. Drove home in my Audi the same week.', w: 'Marcus T.', l: 'Toronto, ON' },
          { q: 'Two dealers turned me down. AVNTS found a partner who said yes in 24 hours. Can\'t recommend them enough.', w: 'Priya S.', l: 'Mississauga, ON' },
          { q: 'The whole process was seamless. I filled out one form and had three offers within 48 hours.', w: 'Jordan K.', l: 'Brampton, ON' },
        ].map((r, i) => (
          <div key={i} style={{ background: DARK2, borderRadius: 4, padding: '14px 16px' }}>
            <span style={{ color: GOLD, fontSize: 12, letterSpacing: 2 }}>★★★★★</span>
            <p style={{ fontSize: 13, color: '#A8A8AE', lineHeight: 1.6, margin: '8px 0 10px', fontStyle: 'italic' }}>"{r.q}"</p>
            <div style={{ fontSize: 12, color: '#5E5E64' }}><strong style={{ color: '#9A9A9E', fontWeight: 500 }}>{r.w}</strong> {r.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {['Trusted lending partners', '256-bit encryption', 'No obligation', 'Free to apply'].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, background: DARK2, borderRadius: 3, padding: '7px 12px' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4 7.5L8 3" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 11, color: '#8A8A90', letterSpacing: 0.3 }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button onClick={next} style={{ background: GOLD, border: 'none', color: DARK, padding: '11px 30px', borderRadius: 3, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Continue application</button>
      </div>
    </div>,

    // Step 4: Employment
    <W key={4}><Tag n={5} />
      <h2 style={S.h2}>Employment & income</h2>
      <p style={S.sub}>Helps our partners find you the best rate</p>
      <div style={S.grid}>
        <Sel label="Employment status" options={empStatuses} value={form.empStatus} onChange={(v: string) => set('empStatus', v)} full err={errors.empStatus} />
        <Input label="Employer name" placeholder="Company name" value={form.employer} onChange={(v: string) => set('employer', v)} />
        <Input label="Job title" placeholder="Your role" value={form.jobTitle} onChange={(v: string) => set('jobTitle', v)} />
        <Sel label="How long at this job" options={timeOptions} value={form.timeAtJob} onChange={(v: string) => set('timeAtJob', v)} />
        <Input label="Monthly gross income" placeholder="$5,000" value={form.monthlyIncome} onChange={(v: string) => set('monthlyIncome', v)} err={errors.monthlyIncome} />
        <Input label="Other income sources (optional)" placeholder="e.g. rental income, side business" value={form.otherIncomeSource} onChange={(v: string) => set('otherIncomeSource', v)} full />
        <Input label="Other monthly income" placeholder="$0" value={form.otherIncome} onChange={(v: string) => set('otherIncome', v)} full />
      </div>
      {needsPrevEmployer && <><Div />
        <p style={{ fontSize: 12, color: GOLD + 'aa', margin: '0 0 14px' }}>Previous employer (required if under 2 years)</p>
        <div style={S.grid}>
          <Input label="Previous employer" placeholder="" value={form.prevEmployer} onChange={(v: string) => set('prevEmployer', v)} />
          <Input label="Previous job title" placeholder="" value={form.prevJobTitle} onChange={(v: string) => set('prevJobTitle', v)} />
          <Sel label="Time at previous job" options={timeOptions} value={form.prevTimeAtJob} onChange={(v: string) => set('prevTimeAtJob', v)} full />
        </div></>}
      <Foot />
    </W>,

    // Step 5: Credit
    <W key={5}><Tag n={6} />
      <h2 style={S.h2}>Credit & financial profile</h2>
      <p style={S.sub}>Be honest, our partners work with all credit situations</p>
      <div style={S.grid}>
        <Sel label="Estimated credit score" options={creditRanges} value={form.creditScore} onChange={(v: string) => set('creditScore', v)} full err={errors.creditScore} />
        <div style={{ gridColumn: '1/-1' }}><label style={S.label}>Bankruptcy or consumer proposal?</label>
          <RG name="bankruptcy" value={form.bankruptcy} onChange={(v: string) => set('bankruptcy', v)} max="380px" options={[{ v: 'current', l: 'Current' }, { v: 'discharged', l: 'Discharged' }, { v: 'none', l: 'None' }]} /></div>
        <Input label="Existing car payment" placeholder="$0 per month" value={form.existingCarPayment} onChange={(v: string) => set('existingCarPayment', v)} />
        <Input label="Other monthly debt" placeholder="$0 per month" value={form.otherDebt} onChange={(v: string) => set('otherDebt', v)} />
      </div>
      <Div />
      <Input label="Social Insurance Number (optional)" placeholder="XXX XXX XXX" value={form.sin} onChange={(v: string) => set('sin', v)} full note="Only required if you'd like to authorize a credit check. Your SIN is encrypted and never stored." />
      <Foot />
    </W>,

    // Step 6: Vehicle
    <W key={6}><Tag n={7} />
      <h2 style={S.h2}>What are you looking for?</h2>
      <p style={S.sub}>We'll match you with options from our partner network</p>
      <div style={S.grid}>
        <div style={{ gridColumn: '1/-1' }}><label style={S.label}>Condition</label>
          <RG name="condition" value={form.condition} onChange={(v: string) => set('condition', v)} options={[{ v: 'new', l: 'New' }, { v: 'preowned', l: 'Pre-owned' }, { v: 'either', l: 'Either' }]} /></div>
        <Sel label="Make" options={allMakes} value={form.make} onChange={(v: string) => { set('make', v); set('model', ''); }} err={errors.make} />
        <Sel label="Model" options={form.make ? (makeModels[form.make] || []) : []} value={form.model} onChange={(v: string) => set('model', v)} placeholder={form.make ? 'Select model...' : 'Select make first'} />
        <Sel label="Year" options={years} value={form.year} onChange={(v: string) => set('year', v)} placeholder="Select year..." />
        <Sel label="Budget range" options={budgets} value={form.budget} onChange={(v: string) => set('budget', v)} placeholder="Select range..." err={errors.budget} />
      </div>
      <Div />
      <label style={S.label}>Have a vehicle to trade in?</label>
      <RG name="tradeIn" value={form.tradeIn} onChange={(v: string) => set('tradeIn', v)} max="220px" options={[{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }]} />
      {form.tradeIn === 'yes' && <div style={{ ...S.grid, marginTop: 20 }}>
        <Sel label="Trade-in make" options={allMakes} value={form.tradeMake} onChange={(v: string) => { set('tradeMake', v); set('tradeModel', ''); }} />
        <Sel label="Trade-in model" options={form.tradeMake ? (makeModels[form.tradeMake] || []) : []} value={form.tradeModel} onChange={(v: string) => set('tradeModel', v)} placeholder={form.tradeMake ? 'Select model...' : 'Select make first'} />
        <Sel label="Trade-in year" options={tradeYears} value={form.tradeYear} onChange={(v: string) => set('tradeYear', v)} placeholder="Year..." />
        <Input label="Mileage (km)" placeholder="80,000" value={form.tradeMileage} onChange={(v: string) => set('tradeMileage', v)} />
        <Sel label="Condition" options={tradeConditions} value={form.tradeCondition} onChange={(v: string) => set('tradeCondition', v)} />
        <Input label="Amount owing" placeholder="$0" value={form.tradeOwing} onChange={(v: string) => set('tradeOwing', v)} />
      </div>}
      <Foot />
    </W>,

    // Step 7: Financing
    <W key={7}><Tag n={8} />
      <h2 style={S.h2}>Financing preferences</h2>
      <p style={S.sub}>No commitment, just helps us find the best match</p>
      <div style={S.grid}>
        <Input label="Down payment amount" placeholder="$5,000" value={form.downPayment} onChange={(v: string) => set('downPayment', v)} />
        <div><label style={S.label}>Preferred loan term</label>
          <select value={form.loanTerm} onChange={(e: any) => set('loanTerm', Number(e.target.value))} style={{ ...S.input, appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236E6E74' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36 }}>
            {loanTerms.map(t => <option key={t} value={t}>{t} months</option>)}
          </select>
        </div>
      </div>
      {(form.budget && form.downPayment) && (
        <div style={{ background: DARK2, borderRadius: 6, padding: '16px 20px', marginTop: 20, border: `0.5px solid ${GOLD}22` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED, margin: '0 0 4px' }}>Estimated monthly payment</p>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 30, color: '#F0EBE0', fontWeight: 400, margin: 0 }}>${estPayment.toLocaleString()} <span style={{ fontSize: 13, color: '#6A6A70' }}>/mo</span></p>
            </div>
            <div style={{ background: GOLD + '18', borderRadius: 3, padding: '6px 12px' }}><span style={{ fontSize: 11, color: GOLD, letterSpacing: '0.5px' }}>OAC</span></div>
          </div>
          <p style={{ fontSize: 11, color: '#44444A', margin: '10px 0 0', lineHeight: 1.4 }}>*Estimated at 6.9% APR for illustration only. Actual rate, term, and payment are subject to credit approval.</p>
        </div>
      )}
      <Div />
      <div style={{ marginBottom: 16 }}><label style={S.label}>Previously declined for financing?</label>
        <RG name="prevDeclined" value={form.prevDeclined} onChange={(v: string) => set('prevDeclined', v)} max="220px" options={[{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }]} /></div>
      <Div />
      <label style={S.label}>Adding a co-applicant?</label>
      <RG name="coApplicant" value={form.coApplicant} onChange={(v: string) => set('coApplicant', v)} max="220px" options={[{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }]} />
      {form.coApplicant === 'yes' && <div style={{ ...S.grid, marginTop: 20 }}>
        <Input label="Co-applicant full name" placeholder="Full legal name" value={form.coName} onChange={(v: string) => set('coName', v)} full />
        <Input label="Phone" placeholder="(416) 555-0100" value={form.coPhone} onChange={(v: string) => set('coPhone', v)} />
        <Input label="Email" placeholder="email@example.com" value={form.coEmail} onChange={(v: string) => set('coEmail', v)} />
        <Sel label="Relationship" options={['Spouse', 'Common-law partner', 'Parent', 'Sibling', 'Friend', 'Other']} value={form.coRelationship} onChange={(v: string) => set('coRelationship', v)} full />
      </div>}
      <Foot />
    </W>,

    // Step 8: Consent
    <W key={8}><Tag n="final" />
      <h2 style={S.h2}>Review & submit</h2>
      <p style={S.sub}>You're one step away from getting matched</p>
      {[
        { k: 'consentShare', t: 'I consent to AVNTS Auto Group sharing my personal and financial information with its trusted lending and dealership partners for the purpose of arranging vehicle financing on my behalf.' },
        { k: 'consentReferral', t: 'I understand that AVNTS Auto Group is not a lender or licensed dealer, but acts as a referral service connecting me with third-party financing and dealership partners.' },
        { k: 'consentTerms', t: 'I agree to the terms of service and privacy policy.' },
      ].map(c => (
        <label key={c.k} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 12 }}>
          <input type="checkbox" checked={form[c.k]} onChange={(e: any) => set(c.k, e.target.checked)} style={{ accentColor: GOLD, marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: errors[c.k] ? '#e04848' : '#8A8A90', lineHeight: 1.6 }}>{c.t}{errors[c.k] && ' ← Required'}</span>
        </label>
      ))}
      <div style={{ background: DARK2, border: `0.5px solid ${BORDER}`, borderRadius: 4, padding: '14px 16px', marginTop: 16 }}>
        <label style={{ fontSize: 11, color: MUTED, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>E-signature: type your full legal name</label>
        <input value={form.eSig} onChange={(e: any) => set('eSig', e.target.value)} placeholder="Alexander Rothwell"
          style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, background: 'transparent', border: 'none', borderBottom: `0.5px solid ${errors.eSig ? '#e04848' : '#333338'}`, borderRadius: 0, color: '#F0EBE0', padding: '6px 0', width: '100%', boxSizing: 'border-box', outline: 'none' }} />
        {errors.eSig && <p style={{ fontSize: 11, color: '#e04848', margin: '4px 0 0' }}>Please type your full legal name as your e-signature.</p>}
      </div>
      <p style={{ fontSize: 11, color: '#44444A', lineHeight: 1.6, marginTop: 16 }}>By submitting this application, you authorize AVNTS Auto Group to share your information with our network of financing and dealership partners. Your data is protected with 256-bit encryption. All financing is subject to credit approval (OAC).</p>
      <Foot label={submitting ? 'Submitting...' : 'Submit application'} onNext={handleSubmit} disabled={submitting || !(form.consentShare && form.consentReferral && form.consentTerms && form.eSig.trim().length > 2)} />
    </W>,
  ];

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem', fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
        input::placeholder { color: #3E3E44 !important }
        select option { background: #141418; color: #D8D4CA }
        input[type="checkbox"] { cursor: pointer }
        * { scrollbar-width: thin; scrollbar-color: #28282E transparent }
      `}</style>
      {pages[step]}
      {step !== 3 && <TrustBar />}
    </div>
  );
}
