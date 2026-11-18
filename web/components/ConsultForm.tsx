'use client';

import { useId, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AlertCircle, Check, Pencil, Phone } from 'lucide-react';
import { business, links, whatsappLink } from '@/lib/site';
import { WhatsApp } from './Icons';
import { track } from './ClientEffects';

const SERVICE_CHIPS = ['Ceramic', 'PPF', 'Tint / Wrap', 'Accessories', 'Restoration', 'Not sure'];

const digits = (v: string) => v.replace(/\D/g, '').slice(-10);
const formatPhone = (d: string) => (d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d);
const validPhone = (d: string) => /^[6-9]\d{9}$/.test(d);
const validName = (n: string) => n.trim().length >= 2 && n.trim().length <= 60;
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** The message the customer sends us on WhatsApp. Blank details are left out. */
export function buildConsultMessage({ name, phone, car, services }: { name: string; phone: string; car?: string; services: string[] }) {
  const wants = services.map((s) => (s === 'Not sure' ? 'Not sure yet, need advice' : s));
  const lines = [
    'Hi Shine Squad! 👋',
    `I'm ${clean(name)} (Phone: +91 ${formatPhone(phone)}).`,
    `I'd like a free consultation for my ${car && clean(car) ? clean(car) : 'car'}.`,
    wants.length ? `Interested in: ${wants.join(', ')}.` : '',
    'Please let me know a good time to visit. Thank you!',
    '(Sent from the Shine Squad website)',
  ];
  return lines.filter(Boolean).join('\n');
}

type Props = {
  variant?: 'card' | 'bar';
  source?: string;
  withCall?: boolean;
  /** On a service page, the service is added to the message automatically. */
  service?: string;
};

export default function ConsultForm({ variant = 'card', source = 'hero', withCall = true, service }: Props) {
  const isBar = variant === 'bar';
  const id = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [chosen, setChosen] = useState<string[]>([]);
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [sentText, setSentText] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const d = digits(phone);
  const nameErr = (touched.name || submitted) && !validName(name) ? 'Please enter your name.' : '';
  const phoneErr = (touched.phone || submitted) && !validPhone(d) ? 'Enter a 10-digit Indian mobile number.' : '';
  const toggle = (c: string) => setChosen((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
  const firstName = clean(name).split(' ')[0] || '';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!validName(name)) return nameRef.current?.focus();
    if (!validPhone(d)) return phoneRef.current?.focus();

    const services = [...(service ? [service] : []), ...chosen.filter((c) => c !== service)];
    const text = buildConsultMessage({ name, phone: d, car, services });
    const url = whatsappLink(text);

    // Open WhatsApp straight from the click so phones don't block it.
    // Phones hand wa.me to the WhatsApp app; computers open WhatsApp Web in a new tab.
    // (No 'noopener' feature string: with it, window.open always returns null and we couldn't detect a block.)
    const win = window.open(url, '_blank');
    if (win) {
      try {
        win.opener = null;
      } catch {
        /* cross-origin: nothing to clear */
      }
    } else {
      window.location.href = url;
    }

    track('generate_lead', { method: 'whatsapp', source, services: services.join(',') });
    setSentText(text);
    setSentUrl(url);
  }

  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } };

  return (
    <div className={`consult${isBar ? ' consult--bar' : ''}`} id={isBar ? 'book' : undefined}>
      {withCall && (
        <div className="consult__call">
          <span className="mono" style={{ color: 'var(--mist)' }}>Make an appointment or call us</span>
          <a href={links.tel} className="consult__phone link link--bare" data-track="click_call">
            <Phone aria-hidden="true" /> {business.phoneDisplay}
          </a>
          <span style={{ fontSize: '0.85rem', color: 'var(--smoke)' }}>Mon–Sat, 10 AM – 10 PM</span>
        </div>
      )}

      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait" initial={false}>
          {sentUrl ? (
            <motion.div key="ok" className="success" role="status" aria-live="polite" transition={{ duration: 0.22 }} {...fade}>
              <div className="success__head">
                <svg className="success__check" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l7 7 15-15" />
                </svg>
                <div>
                  <h2 className="h3">Opening WhatsApp{firstName ? `, ${firstName}` : ''}…</h2>
                  <p className="body" style={{ fontSize: '0.92rem', marginTop: 4 }}>
                    Your message is ready. Just press <b style={{ color: 'var(--pearl)' }}>Send</b> in WhatsApp and we&rsquo;ll reply during working hours.
                  </p>
                </div>
              </div>
              <pre className="wa-preview" aria-label="Your WhatsApp message">{sentText}</pre>
              <div className="success__actions">
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary" data-track="click_whatsapp">
                  <WhatsApp /> WhatsApp didn&rsquo;t open? Tap here
                </a>
                <button type="button" className="btn" onClick={() => setSentUrl(null)}>
                  <Pencil aria-hidden="true" /> Edit details
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} aria-describedby={`${id}-sub`} transition={{ duration: 0.22 }} {...fade}>
              <div className="consult__title">
                <h2 className="h3" id={`${id}-title`}>Free Car Consultation</h2>
                <p className="body" id={`${id}-sub`} style={{ fontSize: '0.92rem', marginTop: 6 }}>
                  Send us your details on WhatsApp. We&rsquo;ll reply to fix a time.
                </p>
              </div>

              <div className="field" data-filled={name.length > 0} data-invalid={!!nameErr}>
                <div className="field__box">
                  <input
                    ref={nameRef}
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    maxLength={60}
                    aria-invalid={!!nameErr}
                    aria-describedby={nameErr ? `${id}-name-err` : undefined}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    required
                  />
                  <label htmlFor={`${id}-name`}>Your name</label>
                </div>
                {nameErr && (
                  <span className="field__error" id={`${id}-name-err`} role="alert">
                    <AlertCircle aria-hidden="true" /> {nameErr}
                  </span>
                )}
              </div>

              <div className="field" data-filled data-prefixed data-invalid={!!phoneErr}>
                <div className="field__box">
                  <span className="field__prefix" aria-hidden="true">+91</span>
                  <input
                    ref={phoneRef}
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    value={formatPhone(d)}
                    aria-invalid={!!phoneErr}
                    aria-describedby={phoneErr ? `${id}-phone-err` : undefined}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    required
                  />
                  <label htmlFor={`${id}-phone`}>Your phone number</label>
                </div>
                {phoneErr && (
                  <span className="field__error" id={`${id}-phone-err`} role="alert">
                    <AlertCircle aria-hidden="true" /> {phoneErr}
                  </span>
                )}
              </div>

              {!isBar && (
                <>
                  <div className="field" data-filled={car.length > 0}>
                    <div className="field__box">
                      <input id={`${id}-car`} name="car" type="text" autoComplete="off" value={car} maxLength={60} onChange={(e) => setCar(e.target.value)} />
                      <label htmlFor={`${id}-car`}>Your car, e.g. Creta 2023 (optional)</label>
                    </div>
                  </div>
                  <fieldset className="fieldset">
                    <legend>What&rsquo;s it for? (optional)</legend>
                    <div className="chips">
                      {SERVICE_CHIPS.map((c) => (
                        <button key={c} type="button" className="chip" aria-pressed={chosen.includes(c)} onClick={() => toggle(c)}>
                          <Check aria-hidden="true" />
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              <button type="submit" className="btn btn--primary btn--xl btn--block">
                <WhatsApp /> Consult on WhatsApp
              </button>
              {!isBar && (
                <p className="consult__fine">
                  Opens WhatsApp with your message ready to send. <a className="link" href="/privacy">Privacy</a>
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
