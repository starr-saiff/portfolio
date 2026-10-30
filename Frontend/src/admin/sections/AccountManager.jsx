import { useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import { authAPI } from '../../services/api';

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem('admin_user')) || {};
  } catch {
    return {};
  }
};

export default function AccountManager() {
  const [user, setUser] = useState(readUser());
  const [form, setForm] = useState({ currentPassword: '', newUsername: '', newEmail: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'error', text }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.currentPassword) return setMessage({ type: 'error', text: 'Enter your current password.' });
    if (!form.newUsername.trim() && !form.newEmail.trim() && !form.newPassword) {
      return setMessage({ type: 'error', text: 'Fill in at least one thing to change.' });
    }
    if (form.newPassword && form.newPassword.length < 8) {
      return setMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
    }
    if (form.newPassword !== form.confirmPassword) {
      return setMessage({ type: 'error', text: 'The new password and its confirmation do not match.' });
    }

    try {
      setSaving(true);
      await authAPI.updateAccount({
        currentPassword: form.currentPassword,
        newUsername: form.newUsername,
        newEmail: form.newEmail,
        newPassword: form.newPassword,
      });
      setUser(readUser());
      setForm({ currentPassword: '', newUsername: '', newEmail: '', newPassword: '', confirmPassword: '' });
      setMessage({ type: 'ok', text: 'Account updated. Use the new details the next time you log in.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold font-display text-gradient mb-1">Account</h2>
      <p className="text-sm text-slate-400 mb-6">
        Logged in as <span className="text-slate-200">{user.username || 'admin'}</span>
        {user.email ? <> · {user.email}</> : null}
      </p>

      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 space-y-5" autoComplete="off">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Current password *</label>
          <input
  type="password"
  className="form-input"
  name="acct-current-password"
  value={form.currentPassword}
  onChange={set('currentPassword')}
  autoComplete="new-password"
  readOnly
  onFocus={(e) => e.target.removeAttribute('readonly')}
/>
        </div>

        <hr className="border-white/10" />
        <p className="text-xs text-slate-500">Fill in only what you want to change. Empty boxes stay as they are.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New username</label>
            <input
  className="form-input"
  name="acct-new-username"
  value={form.newUsername}
  onChange={set('newUsername')}
  placeholder="example-username"
  autoComplete="off"
  readOnly
  onFocus={(e) => e.target.removeAttribute('readonly')}
/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New email</label>
            <input
  type="email"
  className="form-input"
  name="acct-new-email"
  value={form.newEmail}
  onChange={set('newEmail')}
  placeholder="dash@example.com"
  autoComplete="off"
  readOnly
  onFocus={(e) => e.target.removeAttribute('readonly')}
/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New password</label>
            <input type="password" className="form-input" value={form.newPassword} onChange={set('newPassword')} placeholder="At least 8 characters" autoComplete="new-password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm new password</label>
            <input type="password" className="form-input" value={form.confirmPassword} onChange={set('confirmPassword')} autoComplete="new-password" />
          </div>
        </div>

        {message && (
          <p className={`text-sm ${message.type === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>{message.text}</p>
        )}

        <button type="submit" className="btn-primary text-sm" disabled={saving}>
          {saving ? 'Saving...' : (<><HiCheck className="w-4 h-4" /> Save changes</>)}
        </button>
      </form>
    </div>
  );
}
