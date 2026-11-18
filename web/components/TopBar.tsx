import { MapPin, Phone } from 'lucide-react';
import { business, links } from '@/lib/site';
import OpenStatus from './OpenStatus';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__inner">
        <OpenStatus />
        <div className="topbar__group">
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className="status" data-track="click_directions">
            <MapPin size={13} aria-hidden="true" /> Next to KIMS, Minister Road
          </a>
          <a href={links.tel} className="status" data-track="click_call">
            <Phone size={13} aria-hidden="true" /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
