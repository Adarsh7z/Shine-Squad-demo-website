import { hours, dayNames } from './site';

export type OpenStatus = { open: boolean; label: string; detail: string; today: number };

function nowInKolkata(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  return { day: wd, minutes };
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hh}:${String(m).padStart(2, '0')} ${suffix}` : `${hh} ${suffix}`;
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = nowInKolkata(date);
  const today = hours[day];
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: 'Open now', detail: `Closes ${fmt12(today.close)}`, today: day };
  }
  // find next opening
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (!h) continue;
    if (i === 0 && minutes >= toMin(h.open)) continue;
    const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : dayNames[d].slice(0, 3);
    return { open: false, label: 'Closed', detail: `Opens ${when} ${fmt12(h.open)}`, today: day };
  }
  return { open: false, label: 'Closed', detail: '', today: day };
}
