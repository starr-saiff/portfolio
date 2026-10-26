import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioContext';
import Modal from '../../components/Modal';

const EMPTY = { position: '', company: '', start: '', end: '', current: false, description: '' };
const toMonth = (d) => (d ? new Date(d).toISOString().slice(0, 7) : ''); // "2026-06"
const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : '');
const periodOf = (e) => `${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate) || '—'}`;

export default function ExperienceManager() {
  const { refreshPortfolio } = usePortfolioData();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      setExperience(data.experience || []);
    } catch (error) {
      console.error('Error fetching experience:', error);
      alert('Failed to load experience data');
    } finally {
      setLoading(false);
    }
  };

  // Newest start date first, so the timeline on the website is always in order
  const saveExperience = async (list) => {
    const sorted = [...list].sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0));
    try {
      setSaving(true);
      await portfolioAPI.updateSection('experience', sorted);
      await refreshPortfolio();
      await fetchExperience(); // reload so ids and dates match the database
      return true;
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience: ' + error.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      position: item.position || '',
      company: item.company || '',
      start: toMonth(item.startDate),
      end: toMonth(item.endDate),
      current: !!item.current,
      description: item.description || '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(EMPTY);
  };

  const handleSubmit = async () => {
    if (saving) return;
    if (!formData.start) return alert('Please choose a start date');
    if (!formData.current && !formData.end) return alert('Choose an end date, or tick "I currently work here"');
    const fields = {
      position: formData.position.trim(),
      company: formData.company.trim(),
      startDate: new Date(`${formData.start}-01T00:00:00Z`),
      endDate: formData.current ? undefined : new Date(`${formData.end}-01T00:00:00Z`),
      current: formData.current,
      description: formData.description.trim(),
    };
    const updated = editingId
      ? experience.map((item) => (item._id === editingId ? { ...item, ...fields } : item))
      : [...experience, { ...fields, technologies: [] }];
    if (await saveExperience(updated)) closeModal();
  };

  const handleDelete = async (id) => {
    if (saving) return;
    if (confirm('Are you sure you want to delete this experience?')) {
      await saveExperience(experience.filter((item) => item._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-gradient">Experience & Leadership</h2>
          <p className="text-sm text-slate-400 mt-1">{experience.length} roles · sorted newest first on the website</p>
        </div>
        <button onClick={openAddModal} className="btn-primary text-sm" disabled={saving}>
          <HiPlus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={editingId ? 'Edit Experience' : 'Add New Experience'} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Position / Title</label>
            <input className="form-input" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} placeholder="e.g., UGC Creator" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company / Organisation</label>
            <input className="form-input" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="e.g., Maybank" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Start (month)</label>
              <input type="month" className="form-input" value={formData.start} onChange={(e) => setFormData({ ...formData, start: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">End (month)</label>
              <input type="month" className="form-input disabled:opacity-50" disabled={formData.current} value={formData.end} onChange={(e) => setFormData({ ...formData, end: e.target.value })} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={formData.current} onChange={(e) => setFormData({ ...formData, current: e.target.checked })} />
            I currently work here (shows "Present")
          </label>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description (optional)</label>
            <textarea className="form-input resize-none" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="One or two sentences about what you did" />
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={closeModal} className="btn-outline text-sm" disabled={saving}>
            <HiXMark className="w-4 h-4" />
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary text-sm" disabled={saving || !formData.position.trim() || !formData.company.trim()}>
            {saving ? 'Saving...' : (<><HiCheck className="w-4 h-4" />{editingId ? 'Update' : 'Add'}</>)}
          </button>
        </div>
      </Modal>

      <div className="space-y-4">
        {experience.map((item) => (
          <div key={item._id} className="glass-card p-5 rounded-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-200">{item.position}</h3>
                <p className="text-sm text-[#00d4ff]">{item.company}</p>
                <p className="text-sm text-slate-500 mt-1">{periodOf(item)}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => handleEdit(item)} disabled={saving} className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff]"><HiPencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} disabled={saving} className="p-2 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400"><HiTrash className="w-4 h-4" /></button>
              </div>
            </div>
            {item.description && <p className="text-sm text-slate-400 mt-3">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
