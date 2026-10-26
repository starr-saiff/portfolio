import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { usePortfolioData } from '../context/PortfolioContext';

export default function Certifications() {
  const { portfolioData } = usePortfolioData();
  const certs = portfolioData.certifications || [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [issuer, setIssuer] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const issuers = useMemo(() => ['All', ...Array.from(new Set(certs.map((c) => c.issuer)))], [certs]);
  const featured = certs.filter((c) => c.featured);
  const list = certs.filter((c) => issuer === 'All' || c.issuer === issuer);
  const visible = showAll ? list : list.slice(0, 12);

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="section-title">Certifications & <span className="text-gradient">Credentials</span></h2>
          <p className="text-slate-400 mt-3">{certs.length} verified credentials from IBM, DeepLearning.AI, Imperial College London, University of Michigan and more.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {featured.map((c, i) => (
            <motion.a key={c.name} href={c.url || undefined} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 border border-[#00d4ff]/15 hover:border-[#00d4ff]/50 transition-colors block">
              <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-wide">{c.issuer}</span>
              <h3 className="text-white font-bold mt-1 leading-snug">{c.name}</h3>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">{c.date}{c.url && <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />}</p>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {issuers.map((n) => (
            <button key={n} onClick={() => { setIssuer(n); setShowAll(false); }}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${issuer === n ? 'bg-[#00d4ff]/15 border-[#00d4ff] text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}>{n}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map((c) => (
            <a key={c.name + c.date} href={c.url || undefined} target="_blank" rel="noreferrer" className="rounded-xl bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 block">
              <p className="text-sm text-white font-medium leading-snug">{c.name}</p>
              <p className="text-xs text-slate-400 mt-1">{c.issuer} · {c.date}</p>
            </a>
          ))}
        </div>
        {list.length > 12 && (
          <div className="text-center mt-8">
            <button className="btn-outline" onClick={() => setShowAll((s) => !s)}>{showAll ? 'Show less' : `Show all ${list.length}`}</button>
          </div>
        )}
      </div>
    </section>
  );
}
