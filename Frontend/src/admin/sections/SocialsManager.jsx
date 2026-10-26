import { useState, useEffect } from 'react';
import { HiPlus, HiTrash, HiArrowUp, HiArrowDown, HiCheck } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioContext';
import { FALLBACK_DATA } from '../../data/portfolioData';
import { iconOptions, normalizeIcon, getSocialIcon } from '../../utils/socialIcons';

const slug = (v) => v.toLowerCase().replace(/[^a-z0-9_-]/g, '');
const isLink = (v) => /^(https?:\/\/|mailto:|tel:)/i.test(v.trim());

export default function SocialsManager() {
  const { refreshPortfolio } = usePortfolioData();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await portfolioAPI.getPortfolio();
        // Saved list first; otherwise the socials already on your site (no blank rows)
        const source = data.socials?.length ? data.socials : FALLBACK_DATA.socials;
        setList(source.map((s) => ({ id: s.id || '', label: s.label || '', href: s.href || '', icon: normalizeIcon(s.icon) })));
      } catch (e) {
        alert('Failed to load social links');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const update = (i, field, value) => {
    setList(list.map((s, idx) => (idx === i ? { ...s, [field]: field === 'id' ? slug(value) : value } : s)));
    setDirty(true);
  };
  const add = () => { setList([...list, { id: '', label: '', href: '', icon: 'link' }]); setDirty(true); };
  const remove = (i) => {
    if (!window.confirm(`Remove "${list[i].label || list[i].id || 'this social'}"?`)) return;
    setList(list.filter((_, idx) => idx !== i));
    setDirty(true);
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    setList(next);
    setDirty(true);
  };

  const save = async () => {
    if (saving) return;
    if (list.length === 0) return alert('Keep at least one social link.');
    const ids = new Set();
    for (const [n, s] of list.entries()) {
      const row = `Row ${n + 1}`;
      if (!s.id.trim()) return alert(`${row}: Platform ID is required (e.g. youtube).`);
      if (ids.has(s.id)) return alert(`${row}: the Platform ID "${s.id}" is used twice. IDs must be unique.`);
      ids.add(s.id);
      if (!s.label.trim()) return alert(`${row}: Label is required (e.g. YouTube).`);
      const waAuto = s.id === 'whatsapp' && !s.href.trim(); // WhatsApp can follow your phone number
      if (!waAuto && !isLink(s.href)) return alert(`${row}: URL must start with https:// (or mailto: / tel:).`);
    }
    try {
      setSaving(true);
      await portfolioAPI.updateSection('socials', list.map((s) => ({ id: s.id.trim(), label: s.label.trim(), href: s.href.trim(), icon: s.icon })));
      await refreshPortfolio();
      setDirty(false);
      alert('Social links saved!');
    } catch (e) {
      alert('Failed to save: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-400">Loading social links...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-gradient">Social Links</h2>
          <p className="text-sm text-slate-400 mt-1">These icons appear in the Hero, Contact and Footer, in this order.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={add} className="btn-outline text-sm" disabled={saving}><HiPlus className="w-4 h-4" /> Add Social</button>
          <button onClick={save} className="btn-primary text-sm" disabled={saving || !dirty}>
            {saving ? 'Saving...' : (<><HiCheck className="w-4 h-4" /> Save Changes</>)}
          </button>
        </div>
      </div>
      {dirty && <p className="text-xs text-amber-400 mb-3">You have unsaved changes.</p>}

      <div className="space-y-4">
        {list.map((s, i) => {
          const Icon = getSocialIcon(s.icon);
          return (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00d4ff]"><Icon className="w-5 h-5" /></span>
                  <span className="text-slate-200 font-semibold">{s.label || 'New social'}</span>
                </div>
                <div className="flex gap-1">
                  <button title="Move up" onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 disabled:opacity-30"><HiArrowUp className="w-4 h-4" /></button>
                  <button title="Move down" onClick={() => move(i, 1)} disabled={i === list.length - 1} className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 disabled:opacity-30"><HiArrowDown className="w-4 h-4" /></button>
                  <button title="Remove" onClick={() => remove(i)} className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Platform ID</label>
                  <input className="form-input" value={s.id} onChange={(e) => update(i, 'id', e.target.value)} placeholder="example" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Label</label>
                  <input className="form-input" value={s.label} onChange={(e) => update(i, 'label', e.target.value)} placeholder="Example" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">URL</label>
                  <input className="form-input" value={s.href} onChange={(e) => update(i, 'href', e.target.value)}
                    placeholder={s.id === 'whatsapp' ? 'Leave empty to use the phone number from the Contact tab' : 'https://example.com'} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Icon</label>
                  <select className="form-input" value={s.icon} onChange={(e) => update(i, 'icon', e.target.value)}>
                    {iconOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
