import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioContext';

export default function Experience() {
  const { portfolioData } = usePortfolioData();
  const { achievement, experience = [], educationList = [] } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-[#7c3aed] top-20 right-0 opacity-[0.06]" />
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <h2 className="section-title">Leadership & <span className="text-gradient">Experience</span></h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">Elected, trusted and active across student leadership, ambassadorship and research.</p>
        </motion.div>

        {achievement && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-6 md:p-10 mb-14 border border-[#00d4ff]/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏆</span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white">{achievement.title}</h3>
            </div>
            <p className="text-slate-400 mb-6">{achievement.subtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievement.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 p-4 text-center">
                  <span className="text-3xl font-bold font-display text-gradient block">{s.value}</span>
                  <span className="text-xs text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
            {achievement.outcome && <p className="text-slate-300 mt-6 font-medium">{achievement.outcome}</p>}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#00d4ff]/60 via-[#7c3aed]/40 to-transparent" />
            {experience.map((e, i) => (
              <motion.div key={`${e.org}-${e.role}`} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }} className="relative pl-10 pb-8">
                <span className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-[#0a0a0f] ${e.highlight ? 'bg-[#00d4ff] shadow-[0_0_14px_#00d4ff]' : 'bg-[#7c3aed]'}`} />
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-bold text-white">{e.role}</h4>
                    <span className="text-xs text-slate-400">{e.period}</span>
                  </div>
                  <p className="text-[#00d4ff] text-sm font-medium">{e.org}</p>
                  {e.desc && <p className="text-slate-400 text-sm mt-2">{e.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white">Education</h3>
            {educationList.map((ed) => (
              <div key={ed.school} className="glass-card rounded-2xl p-5">
                <p className="text-white font-semibold">{ed.degree}</p>
                <p className="text-[#00d4ff] text-sm">{ed.school}</p>
                <p className="text-xs text-slate-400 mt-1">{ed.period}</p>
                {ed.note && <p className="text-sm text-slate-300 mt-2">{ed.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
