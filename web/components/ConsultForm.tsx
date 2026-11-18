'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AlertCircle, ArrowRight, Check, Phone } from 'lucide-react';
import { business, links, whatsappLink } from '@/lib/site';
import { WhatsApp } from './Icons';
import { track } from './ClientEffects';

const SERVICE_CHIPS = ['Ceramic', 'PPF', 'Tint / Wrap', 'Accessories', 'Restoration', 'Not sure'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const digits = (v: string) => v.replace(/\D/g, '').slice(0, 10);
const formatPhone = (d: string) => (d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d);
const validPhone = (d: string) => /^[6-9]\d{9}$/.test(d);
const validName = (n: string) => n.trim().length >= 2 && n.trim().length <= 60;

export default function ConsultForm({ variant = 'card', source = 'hero', withCall = true }: { variant?: 'card' | 'bar'; source?: string; withCall?: boolean }) {
  const compact = !withCall;
  const isBar = variant === 'bar';
  const id = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [chosen, setChosen] = useState<string[]>([]);
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState(false);
  const started = useRef<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const d = digits(phone);
  const nameErr = (touched.name || submitted) && !validName(name) ? 'Please enter your name.' : '';
  const phoneErr = (touched.phone || submitted) && !validPhone(d) ? 'Enter a 10-digit Indian mobile number.' : '';

  const toggle = (c: string) => setChosen((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  const firstName = name.trim().split(/\s+/)[0] || '';
  const waText = `Hi Shine Squad, I'm ${name.trim() || 'interested'}. I'd like a free consultation${chosen.length ? ` for ${chosen.join(', ')}` : ''}.`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!validName(name)) return nameRef.current?.focus();
    if (!validPhone(d)) return phoneRef.current?.focus();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: d,
          services: chosen,
          company: hpRef.current?.value ?? '',
          elapsed: Date.now() - started.current,
          page: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
          source,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error('failed');
      setStatus('success');
      track('generate_lead', { source, services: chosen.join(',') });
    } catch {
      setStatus('error');
    }
  }

  const busy = status === 'submitting';
  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } };

  return (
    <div className={`consult${isBar ? ' consult--bar' : ''}`} id={isBar ? 'book' : undefined}>
      {!compact && (
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
        {status === 'success' ? (
          <motion.div key="ok" className="success" role="status" aria-live="polite" transition={{ duration: 0.22 }} {...fade}>
            <svg className="success__check" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="26" cy="26" r="24" />
              <path d="M15 27l7 7 15-15" />
            </svg>
            <h2 className="h3">Got it{firstName ? `, ${firstName}` : ''}.</h2>
            <p className="body">
              We&rsquo;ll call you on <b style={{ color: 'var(--pearl)' }}>+91 {formatPhone(d)}</b> during working hours to fix a time. Want to start now? Send us your car&rsquo;s photos on WhatsApp.
            </p>
            <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn--block" data-track="click_whatsapp">
              <WhatsApp style={{ color: '#25D366' }} /> Continue on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} aria-describedby={`${id}-sub`} transition={{ duration: 0.22 }} {...fade}>
            <div className="consult__title">
              <h2 className="h3" id={`${id}-title`}>Free Car Consultation</h2>
              <p className="body" id={`${id}-sub`} style={{ fontSize: '0.92rem', marginTop: 6 }}>
                Tell us about your car. We&rsquo;ll call you back to fix a time.
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
                  disabled={busy}
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
                  placeholder="70131 46997"
                  value={formatPhone(d)}
                  disabled={busy}
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

            {!isBar && (<fieldset className="fieldset">
              <legend>What&rsquo;s it for? (optional)</legend>
              <div className="chips">
                {SERVICE_CHIPS.map((c) => (
                  <button key={c} type="button" className="chip" aria-pressed={chosen.includes(c)} onClick={() => toggle(c)} disabled={busy}>
                    <Check aria-hidden="true" />
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>)}

            <input ref={hpRef} className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {status === 'error' && (
              <div className="field__error" role="alert" style={{ alignItems: 'flex-start', lineHeight: 1.5 }}>
                <AlertCircle aria-hidden="true" style={{ marginTop: 3 }} />
                <span>
                  Couldn&rsquo;t send that, sorry. Call us or message us on WhatsApp and we&rsquo;ll book you in straight away.{' '}
                  <a className="link" href={links.tel}>Call</a> ·{' '}
                  <a className="link" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </span>
              </div>
            )}

            <button type="submit" className="btn btn--primary btn--xl btn--block" disabled={busy} aria-busy={busy}>
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Booking…
                </>
              ) : (
                <>
                  Book Appointment <ArrowRight className="arrow" aria-hidden="true" />
                </>
              )}
            </button>
            {!isBar && (
              <p className="consult__fine">
                No spam. We only call about your car. <a className="link" href="/privacy">Privacy</a>
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
