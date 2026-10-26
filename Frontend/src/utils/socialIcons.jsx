import {
  FaGithub, FaLinkedinIn, FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter,
  FaYoutube, FaTiktok, FaTelegramPlane, FaGlobe, FaEnvelope, FaLink,
} from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';

// Icons you can pick for a social link (shown in the admin "Social Links" tab and on the site)
export const iconOptions = [
  { value: 'github',    label: 'GitHub',    Icon: FaGithub },
  { value: 'linkedin',  label: 'LinkedIn',  Icon: FaLinkedinIn },
  { value: 'credly',    label: 'Credly',    Icon: SiCredly },
  { value: 'whatsapp',  label: 'WhatsApp',  Icon: FaWhatsapp },
  { value: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { value: 'facebook',  label: 'Facebook',  Icon: FaFacebookF },
  { value: 'twitter',   label: 'X / Twitter', Icon: FaTwitter },
  { value: 'youtube',   label: 'YouTube',   Icon: FaYoutube },
  { value: 'tiktok',    label: 'TikTok',    Icon: FaTiktok },
  { value: 'telegram',  label: 'Telegram',  Icon: FaTelegramPlane },
  { value: 'website',   label: 'Website',   Icon: FaGlobe },
  { value: 'email',     label: 'Email',     Icon: FaEnvelope },
  { value: 'link',      label: 'Other link', Icon: FaLink },
];

// Older saved data used names like "FaGithub"; map them to the simple names above
const LEGACY = {
  FaGithub: 'github', FaLinkedinIn: 'linkedin', FaWhatsapp: 'whatsapp', FaInstagram: 'instagram',
  FaFacebookF: 'facebook', SiCredly: 'credly', CredlyIcon: 'credly', FaCode: 'credly',
};

export const normalizeIcon = (value) => LEGACY[value] || value || 'link';

export const getSocialIcon = (value) =>
  (iconOptions.find((o) => o.value === normalizeIcon(value)) || { Icon: FaLink }).Icon;
