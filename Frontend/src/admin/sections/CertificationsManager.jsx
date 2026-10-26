import { useState, useEffect, useMemo } from 'react';
import { HiPlus, HiPencil, HiTrash, HiStar, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioContext';

const EMPTY = { name: '', issuer: '', date: '', url: '', featured: false };

export default function CertificationsManager() {
  const { refreshPortfolio } = usePortfolioData();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(null); // null = closed
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await portfolioAPI.getPortfolio();
        setCerts(data.certifications || []);
      } catch (e) {
        alert('Failed to load certifications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (next) => {
    try {
      setSaving(true);
      await portfolioAPI.updateSection('certifications', next);
      setCerts(next);
      await refreshPortfolio();
    } catch (e) {
      alert('Failed to save: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.issuer.trim()) return alert('Name and issuer are required');
    const clean = { ...form, name: form.name.trim(), issuer: form.issuer.trim() };
    const next = editIndex === null ? [clean, ...certs] : certs.map((c, i) => (i === editIndex ? { ...c, ...clean } : c));
    await persist(next);
    setForm(null);
    setEditIndex(null);
  };

  const remove = async (i) => {
    if (!window.confirm(`Delete "${certs[i].name}"?`)) return;
    await persist(certs.filter((_, idx) => idx !== i));
  };

  const toggleFeatured = (i) => persist(certs.map((c, idx) => (idx === i ? { ...c, featured: !c.featured } : c)));

  const shown = useMemo(() => {
    const q = query.toLowerCase();
    return certs.map((c, i) => ({ c, i })).filter(({ c }) => !q || `${c.name} ${c.issuer}`.toLowerCase().includes(q));
  }, [certs, query]);

  if (loading) return <p className="text-slate-400">Loading certifications...</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Certifications</h2>
          <p className="text-sm text-slate-400">{certs.length} total · {certs.filter((c) => c.featured).length} featured (shown as cards on the site)</p>
        </div>
        <button className="btn-primary" onClick={() => { setForm({ ...EMPTY }); setEditIndex(null); }}>
          <HiPlus className="w-4 h-4" /> Add certification
        </button>
      </div>

      <input className="form-input mb-4 w-full" placeholder="Search by name or issuer..." value={query} onChange={(e) => setQuery(e.target.value)} />

      {form && (
        <form onSubmit={submit} className="glass-card rounded-2xl p-5 mb-6 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex justify-between items-center">
            <h3 className="text-white font-semibold">{editIndex === null ? 'New certification' : 'Edit certification'}</h3>
            <button type="button" onClick={() => { setForm(null); setEditIndex(null); }} className="text-slate-400 hover:text-white"><HiXMark className="w-5 h-5" /></button>
          </div>
          <input className="form-input md:col-span-2" placeholder="Certificate name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="form-input" placeholder="Issuer (e.g. IBM, Coursera) *" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
          <input className="form-input" placeholder="Date (e.g. Aug 2026)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="form-input md:col-span-2" placeholder="Verification link (https://...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Feature as a card
          </label>
          <div className="md:col-span-2 flex gap-3">
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-outline" onClick={() => { setForm(null); setEditIndex(null); }}>Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {shown.map(({ c, i }) => (
          <div key={c._id || `${c.name}-${i}`} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
            <button title="Toggle featured" onClick={() => toggleFeatured(i)} disabled={saving}>
              <HiStar className={`w-5 h-5 ${c.featured ? 'text-yellow-400' : 'text-slate-600'}`} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{c.name}</p>
              <p className="text-xs text-slate-400">{c.issuer} · {c.date}</p>
            </div>
            <button className="text-slate-400 hover:text-[#00d4ff]" onClick={() => { setForm({ ...EMPTY, ...c }); setEditIndex(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><HiPencil className="w-4 h-4" /></button>
            <button className="text-slate-400 hover:text-red-400" onClick={() => remove(i)}><HiTrash className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
