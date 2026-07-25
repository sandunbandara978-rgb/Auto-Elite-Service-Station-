const SectionHeader = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : ''}>
    <p className="text-sm uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    {description ? <p className="mt-4 text-lg text-slate-300">{description}</p> : null}
  </div>
);

export default SectionHeader;
