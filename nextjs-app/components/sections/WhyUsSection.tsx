import { Shield, Award, Clock, Map, Users, Globe } from 'lucide-react';
import { WHY_US } from '@/data/site';

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <Shield size={28} />,
  award: <Award size={28} />,
  clock: <Clock size={28} />,
  map: <Map size={28} />,
  users: <Users size={28} />,
  globe: <Globe size={28} />,
};

export default function WhyUsSection() {
  return (
    <section className="py-20 px-6" style={{ background: '#DCEEE7' }}>
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <div className="text-center mb-14">
          <p className="text-xs font-extrabold tracking-[.24em] mb-3" style={{ color: '#2F7A63' }}>
            WHY SAHAPATHIKA
          </p>
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: 'clamp(32px,4vw,50px)', color: '#16211D' }}
          >
            Travel with <em className="not-italic" style={{ color: '#E5483D' }}>confidence</em>
          </h2>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {WHY_US.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6"
              style={{ boxShadow: '0 4px 20px -8px rgba(22,33,29,.12)' }}
            >
              <div className="mb-4 inline-flex" style={{ color: '#E5483D' }}>
                {ICON_MAP[item.icon]}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: '#16211D' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B655C' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
