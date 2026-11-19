'use client';

import { useId, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AlertCircle, ArrowRight, Check, Pencil } from 'lucide-react';
import { MAIN_ACTION, whatsappLink } from '@/lib/site';
import { WhatsApp } from './Icons';
import { track } from './ClientEffects';

const SERVICE_CHIPS = ['Ceramic', 'PPF', 'Tint or wrap', 'Accessories', 'Restoration', 'Not sure'];

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
  source?: string;
  /** On a service page, the service is added to the message automatically. */
  service?: string;
};

export default function ConsultForm({ source = 'home', service }: Props) {
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
  const nameErr = (touched.name || submitted) && !validName(name) ? 'Write your name, at least two letters.' : '';
  const phoneErr = (touched.phone || submitted) && !validPhone(d) ? 'Write a 10-digit mobile number, starting with 6, 7, 8 or 9.' : '';
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
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="consult">
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait" initial={false}>
          {sentUrl ? (
            <motion.div key="ok" className="success" role="status" aria-live="polite" transition={{ duration: 0.22, ease }} {...fade}>
              <div className="success__head">
                <h3 className="serif t-m">Opening WhatsApp{firstName ? `, ${firstName}` : ''}</h3>
                <p className="muted">Your message is ready. Press Send in WhatsApp and we reply during opening hours.</p>
              </div>
              <pre className="wa-preview" aria-label="Your WhatsApp message">{sentText}</pre>
              <div className="success__actions">
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="cta cta--solid" data-track="click_whatsapp">
                  <WhatsApp /> Open WhatsApp again
                </a>
                <button type="button" className="cta" onClick={() => setSentUrl(null)}>
                  <Pencil aria-hidden="true" /> Edit details
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} aria-label={MAIN_ACTION} transition={{ duration: 0.22, ease }} {...fade}>
              <div className="field-row">
                <div className="field" data-invalid={!!nameErr}>
                  <label htmlFor={`${id}-name`}>Name</label>
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
                  </div>
                  {nameErr && (
                    <span className="field__error" id={`${id}-name-err`} role="alert">
                      <AlertCircle aria-hidden="true" /> {nameErr}
                    </span>
                  )}
                </div>

                <div className="field" data-invalid={!!phoneErr}>
                  <label htmlFor={`${id}-phone`}>Mobile number</label>
                  <div className="field__box">
                    <span className="field__prefix" aria-hidden="true">
                      +91
                    </span>
                    <input
                      ref={phoneRef}
                      id={`${id}-phone`}
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={formatPhone(d)}
                      aria-invalid={!!phoneErr}
                      aria-describedby={phoneErr ? `${id}-phone-err` : undefined}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      required
                    />
                  </div>
                  {phoneErr && (
                    <span className="field__error" id={`${id}-phone-err`} role="alert">
                      <AlertCircle aria-hidden="true" /> {phoneErr}
                    </span>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor={`${id}-car`}>Car and year (optional)</label>
                <div className="field__box">
                  <input id={`${id}-car`} name="car" type="text" autoComplete="off" value={car} maxLength={60} onChange={(e) => setCar(e.target.value)} />
                </div>
              </div>

              {!service && (
                <fieldset className="fieldset">
                  <legend>What it&rsquo;s for (optional)</legend>
                  <div className="chips">
                    {SERVICE_CHIPS.map((c) => (
                      <button key={c} type="button" className="chip" aria-pressed={chosen.includes(c)} onClick={() => toggle(c)}>
                        <Check aria-hidden="true" />
                        {c}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <p className="sr-only" role="status" aria-live="polite">
                {submitted && (nameErr || phoneErr) ? `Check the form: ${[nameErr, phoneErr].filter(Boolean).join(" ")}` : ""}
              </p>
              <button type="submit" className="cta cta--solid cta--block">
                {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
              </button>
              <p className="consult__fine">
                <WhatsApp /> Opens WhatsApp with your details filled in. Nothing is stored on this website.{' '}
                <a className="link" href="/privacy">
                  Privacy
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
