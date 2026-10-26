import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioContext';
import Modal from '../../components/Modal';

const BASE_CATEGORIES = [
  { name: 'Data Science & AI', color: '#00d4ff' },
  { name: 'Leadership & Communication', color: '#7c3aed' },
  { name: 'Creative & Performing Arts', color: '#f59e0b' },
  { name: 'Sports & Fitness', color: '#10b981' },
];
const EMPTY_FORM = { name: '', category: BASE_CATEGORIES[0].name };

export default function SkillsManager() {
  const { refreshPortfolio } = usePortfolioData();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Base categories plus any other category already stored in the database
  const categories = [
    ...BASE_CATEGORIES,
    ...Array.from(new Set(skills.map((s) => s.category)))
      .filter((n) => n && !BASE_CATEGORIES.some((b) => b.name === n))
      .map((n) => ({ name: n, color: '#00d4ff' })),
  ];
  const colorOf = (name) => categories.find((c) => c.name === name)?.color || '#00d4ff';

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      const flat = (data.skills || []).flatMap((cat, ci) =>
        (cat.items || []).map((item, ii) => ({
          _id: `${cat.category}-${item}-${ci}-${ii}`,
          name: item,
          category: cat.category,
        }))
      );
      setSkills(flat);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const saveSkills = async (updated) => {
    try {
      setSaving(true);
      const byCategory = {};
      updated.forEach((s) => {
        (byCategory[s.category] = byCategory[s.category] || []).push(s.name);
      });
      const backendFormat = Object.entries(byCategory).map(([category, items]) => ({ category, items }));
      await portfolioAPI.updateSection('skills', backendFormat);
      setSkills(updated);
      await refreshPortfolio();
      return true;
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Failed to save skills: ' + error.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setFormData({ name: skill.name, category: skill.category });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  const handleSubmit = async () => {
    if (saving || !formData.name.trim()) return;
    const name = formData.name.trim();
    const updated = editingId
      ? skills.map((s) => (s._id === editingId ? { ...s, name, category: formData.category } : s))
      : [...skills, { _id: `new-${Date.now()}`, name, category: formData.category }];
    if (await saveSkills(updated)) closeModal();
  };

  const handleDelete = async (id) => {
    if (saving) return;
    if (confirm('Are you sure you want to delete this skill?')) {
      await saveSkills(skills.filter((s) => s._id !== id));
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
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-gradient">Skills</h2>
          <p className="text-sm text-slate-400 mt-1">{skills.length} skills across {categories.filter((c) => skills.some((s) => s.category === c.name)).length} categories</p>
        </div>
        <button onClick={openAddModal} className="btn-primary text-sm" disabled={saving}>
          <HiPlus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={editingId ? 'Edit Skill' : 'Add New Skill'} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="form-input"
              placeholder="e.g., Public Speaking"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button onClick={closeModal} className="btn-outline text-sm" disabled={saving}>
            <HiXMark className="w-4 h-4" />
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary text-sm" disabled={saving || !formData.name.trim()}>
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <HiCheck className="w-4 h-4" />
                {editingId ? 'Update Skill' : 'Add Skill'}
              </>
            )}
          </button>
        </div>
      </Modal>

      {categories.map((category) => {
        const list = skills.filter((s) => s.category === category.name);
        if (list.length === 0) return null;
        return (
          <div key={category.name} className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
              {category.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((skill) => (
                <div key={skill._id} className="glass-card px-4 py-3 rounded-xl flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: colorOf(skill.category) }} />
                  <span className="flex-1 min-w-0 truncate font-medium text-slate-200">{skill.name}</span>
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-[#00d4ff] transition-colors"
                    disabled={saving}
                  >
                    <HiPencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-400 hover:text-red-400 transition-colors"
                    disabled={saving}
                  >
                    <HiTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
