const steps = [
  { t: 'Consult with real samples', d: 'See and feel coatings, films, leatherettes and mats in the showroom before you decide.' },
  { t: 'Inspect and quote', d: 'We check the paint under studio lights and give you a clear price and ready time before work starts.' },
  { t: 'Work in our bay, with updates', d: 'Progress photos on WhatsApp while we work, so you always know where your car is at.' },
  { t: 'Handover and care guide', d: 'We walk round the car with you and explain exactly how to look after it.' },
];

export default function Process() {
  return (
    <section className="section" id="process" aria-labelledby="process-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Your visit</p>
            <h2 className="h2 reveal" id="process-h">
              How a visit works
            </h2>
          </div>
          <p className="lead reveal">No surprises on price or timing. You know the scope before we start, and you see the progress while we work.</p>
        </div>
        <div className="steps" role="list">
          <span className="steps__line" aria-hidden="true">
            <i />
          </span>
          {steps.map((s, i) => (
            <div className="step" role="listitem" key={s.t}>
              <span className="mono">0{i + 1}</span>
              <h3 className="h3">{s.t}</h3>
              <p className="body">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
