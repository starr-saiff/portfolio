import { useState, useEffect } from 'react';
import { HiPencil, HiCheck, HiXMark } from 'react-icons/hi2';
import { portfolioAPI } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioContext';
import { FALLBACK_DATA } from '../../data/portfolioData';
import Modal from '../../components/Modal';

const D = FALLBACK_DATA.about;
const EMPTY = {
  introHeading: '', introHeadingHighlight: '', description: '', highlights: '',
  location: '', role: '', education: '', languages: '',
};

export default function AboutManager() {
  const { refreshPortfolio } = usePortfolioData();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY);

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Shows exactly what the website shows: saved value first, otherwise the built-in default
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolio();
      const a = data.about || {};
      setFormData({
        introHeading: a.introHeading || D.introHeading,
        introHeadingHighlight: a.introHeadingHighlight || D.introHeadingHighlight,
        description: a.description || D.introDescription,
        highlights: (a.highlights?.length ? a.highlights : D.highlights).join('\n'),
        location: a.location || data.profile?.location || D.location,
        role: a.role || data.profile?.title || D.role,
        education: a.education || D.education,
        languages: a.languages || D.languages,
      });
    } catch (error) {
      console.error('Error fetching about data:', error);
      alert('Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    fetchAboutData(); // discard unsaved edits
  };

  const handleSave = async () => {
    if (saving) return;
    try {
      setSaving(true);
      await portfolioAPI.updatePortfolio({
        about: {
          introHeading: formData.introHeading.trim(),
          introHeadingHighlight: formData.introHeadingHighlight.trim(),
          description: formData.description.trim(),
          highlights: formData.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
          location: formData.location.trim(),
          role: formData.role.trim(),
          education: formData.education.trim(),
          languages: formData.languages.trim(),
        },
      });
      await refreshPortfolio();
      await fetchAboutData();
      setShowModal(false);
      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error saving about data:', error);
      alert('Failed to save about data: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const Row = ({ label, value }) => (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-slate-200 whitespace-pre-line">{value || 'Not set'}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display text-gradient">About Section</h2>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
          <HiPencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-5">
        <Row label="Heading" value={`${formData.introHeading} & ${formData.introHeadingHighlight}`} />
        <Row label="Introduction" value={formData.description} />
        <Row label="Highlights (bullet points)" value={formData.highlights} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Location" value={formData.location} />
          <Row label="Role" value={formData.role} />
          <Row label="Education" value={formData.education} />
          <Row label="Languages" value={formData.languages} />
        </div>
        <p className="text-xs text-slate-500">
          The photo badges show your certificate count and project count automatically, so there is nothing to set for them.
        </p>
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title="Edit About Section" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Heading (first part)</label>
              <input className="form-input" value={formData.introHeading} onChange={set('introHeading')} placeholder="Aspiring Data Scientist" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Heading (coloured part)</label>
              <input className="form-input" value={formData.introHeadingHighlight} onChange={set('introHeadingHighlight')} placeholder="Student Leader" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Introduction paragraph</label>
            <textarea className="form-input resize-none" rows={5} value={formData.description} onChange={set('description')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Highlights (one per line)</label>
            <textarea className="form-input resize-none" rows={5} value={formData.highlights} onChange={set('highlights')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">📍 Location</label>
              <input className="form-input" value={formData.location} onChange={set('location')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">💼 Role</label>
              <input className="form-input" value={formData.role} onChange={set('role')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">🎓 Education</label>
              <input className="form-input" value={formData.education} onChange={set('education')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">🌍 Languages</label>
              <input className="form-input" value={formData.languages} onChange={set('languages')} placeholder="English, Arabic, Hausa, Yoruba" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={closeModal} className="btn-outline text-sm" disabled={saving}>
            <HiXMark className="w-4 h-4" />
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary text-sm" disabled={saving}>
            {saving ? 'Saving...' : (<><HiCheck className="w-4 h-4" />Save Changes</>)}
          </button>
        </div>
      </Modal>
    </div>
  );
}
