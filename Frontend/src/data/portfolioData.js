import certifications from './certifications.json';

// Single source of truth for the default content. The admin panel (MongoDB)
// overrides these when data exists. Edit here for quick changes.
export const FALLBACK_DATA = {
  name: 'Khalid Abdussamii',
  role: 'Computer Science Student | Aspiring Data Scientist',
  typingPhrases: [
    'Aspiring Data Scientist',
    'Machine Learning Enthusiast',
    'SRC (Student Representative Council) Exco – Art & Culture',
    'Highest-Voted SRC (Student Representative Council) Candidate',
    'Student Leader & Performer',
    '2-Time Cleanest & Most Organized Room Award Winner (2025–2026)',
    'AI Enthusiast',
    'Deep Learning Explorer',
    'Computer Science Student',
    'Future AI Engineer',
    'Robotics Enthusiast',
  ],
  heroDescription:
    'Computer Science student at Albukhary International University building a career in Data Science, Machine Learning and AI, backed by ' +
    `${certifications.length} verified certificates from IBM, DeepLearning.AI, Imperial College London and the University of Michigan. ` +
    'Elected to the Student Representative Council as the highest-voted general-seat candidate, I combine technical depth with proven leadership.',
  cvUrl: '', // empty = "CV coming soon". Upload your PDF via the admin panel later.

  about: {
    introHeading: 'Aspiring Data Scientist',
    introHeadingHighlight: 'Student Leader',
    introDescription:
      "I'm Khalid, a BSc (Hons) Computer Science student at Albukhary International University with a focus on Machine Learning, Deep Learning and Data Analytics. " +
      'Beyond the code, I lead: I was the highest-voted candidate in the AIU SRC general-seat election, now serve as Exco of Art & Culture, ' +
      'and have held leadership roles across NISCO, AFSA and the School of Computing & Informatics. I also perform, sing and compete, which keeps my communication sharp and my teamwork instinctive.',
    yearsOfExperience: certifications.length,
    yearsLabel: 'Certificates',
    projectsDone: 6,
    location: '',
    role: 'Aspiring Data Scientist | CS Student | SRC Exco, Art & Culture',
    education: "BSc (Hons) Computer Science, AIU · Dean's List",
    languages: 'English, Arabic, Hausa, Yoruba',
    highlights: [
      'Highest-voted candidate in the AIU SRC general-seat election (655 votes, #1 of 29)',
      'Exco of Art & Culture, Student Representative Council (2026–2027 term)',
      `${certifications.length} verified certificates: IBM Data Science & Data Analyst, DeepLearning.AI Deep Learning Specialization`,
      "Dean's List Award recipient · Global #Mbassador 2026",
    ],
  },

  // Highlight card for the election result (verified from the official results slide)
  achievement: {
    title: 'Highest-Voted SRC Candidate',
    subtitle: 'AIU Student Representative Council Election · Academic Year 2025/2026',
    stats: [
      { value: '655', label: 'Votes received' },
      { value: '#1', label: 'Of 29 general-seat candidates' },
      { value: '4.48%', label: 'Share of all votes' },
      { value: '76%', label: 'Voter turnout (1,473 of 1,873)' },
    ],
    outcome: 'Elected Exco of Art & Culture for the 2026–2027 term.',
  },

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/starr-saiff', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/khalid-abdussamii-10a66335a', icon: 'linkedin' },
    { id: 'credly', label: 'Credly', href: 'https://www.credly.com/users/khalid-abdussamii', icon: 'credly' },
    { id: 'whatsapp', label: 'WhatsApp', href: '', icon: 'whatsapp' },
  ],

  contact: {
    email: '',
    phone: '',
    location: '',
    availability: 'Open to internships, graduate roles and exciting collaborations.',
  },

  experience: [
    {
      role: 'Exco of Art & Culture', org: 'AIU Student Representative Council', period: 'Jun 2026 – Present', location: 'Alor Setar', type: 'Leadership', highlight: true,
      desc: 'Elected to the SRC after topping the general-seat vote; leads art and culture initiatives for the AIU student body.'
    },
    { role: 'Ambassador', org: 'Maybank', period: 'May 2026 – Present', location: 'Bandar Baru Bangi', type: 'Ambassador', desc: '' },
    { role: 'Public Relations Officer', org: 'Nigerian Students Community (NISCO), AIU', period: 'Apr 2026 – Present', location: 'Alor Setar', type: 'Leadership', desc: '' },
    { role: 'ICT Coordinator', org: 'African Students Association (AFSA), AIU', period: 'Feb 2026 – Present', location: 'Alor Setar', type: 'Leadership', desc: '' },
    { role: 'Research & Innovation Manager', org: 'Global Services Consult (GSC)', period: 'Feb 2026 – Present', location: 'Alor Setar', type: 'Professional', desc: '' },
    { role: 'Event Coordinator', org: 'School of Computing & Informatics Committee, AIU', period: 'Dec 2025 – Present', location: 'Alor Setar', type: 'Leadership', desc: '' },
    { role: 'Head Boy (Senior Prefect)', org: 'Al-Ikhlas Comprehensive Schools', period: 'Until 2023', location: 'Kaduna', type: 'Leadership', desc: '' },
  ],

  education: [
    { school: 'Albukhary International University (AIU)', degree: 'BSc (Hons) Computer Science', period: 'Oct 2024 – Oct 2027', note: "Dean's List Award recipient · SRC Member" },
    { school: 'Al-Ikhlas Comprehensive Schools', degree: 'Science, Art & Commerce', period: '2008 – 2023', note: 'Student Senior Prefect (Head Boy)' },
  ],

  certifications,

  skillCategories: [
    { name: 'Data Science & AI', color: '#00d4ff', emoji: '🧠', skills: ['Machine Learning', 'Deep Learning', 'Artificial Intelligence (AI)', 'Data Science', 'Computer Science', 'Robotics'].map(n => ({ name: n })) },
    { name: 'Leadership & Communication', color: '#7c3aed', emoji: '🎤', skills: ['Leadership', 'Public Speaking', 'Public Relations', 'Public Affairs', 'Communication', 'Teamwork', 'Event Management', 'Time Management', 'Critical Thinking'].map(n => ({ name: n })) },
    { name: 'Creative & Performing Arts', color: '#f59e0b', emoji: '🎨', skills: ['Performing Arts', 'Vocal Performance', 'Singer-songwriter', 'Artist', 'Drawing', 'Visual Arts'].map(n => ({ name: n })) },
    { name: 'Sports & Fitness', color: '#10b981', emoji: '🏅', skills: ['Brazilian Jiu-Jitsu', 'Rugby', 'Football', 'Running', 'Cycling', 'Fitness Training'].map(n => ({ name: n })) },
  ],

  projects: [
    { id: 1, title: 'Data Science Capstone', description: 'Capstone project in data science, built in Jupyter Notebook.', tags: 'Python, Jupyter, Data Science', githubUrl: 'https://github.com/starr-saiff/capstone-project-data-science', liveUrl: '', emoji: '📊', gradientStart: '#00d4ff', gradientEnd: '#7c3aed', accentColor: '#00d4ff', isFeatured: true },
    { id: 2, title: 'Student Performance Prediction', description: 'A student performance prediction project built with JavaScript, in collaboration with Musa.', tags: 'JavaScript, Prediction', githubUrl: 'https://github.com/starr-saiff/std-perf-pred-Musa-x-Khalid_v2', liveUrl: '', emoji: '🎓', gradientStart: '#8b5cf6', gradientEnd: '#3b82f6', accentColor: '#a78bfa', isFeatured: true },
    { id: 3, title: 'Data Science Tools', description: 'A collection of data science tools and notebooks.', tags: 'Python, Jupyter', githubUrl: 'https://github.com/starr-saiff/my-data-science-tools', liveUrl: '', emoji: '🛠️', gradientStart: '#10b981', gradientEnd: '#059669', accentColor: '#10b981', isFeatured: false },
    { id: 4, title: 'Tesla Analysis', description: 'Jupyter Notebook project on Tesla data.', tags: 'Python, Jupyter', githubUrl: 'https://github.com/starr-saiff/tesla', liveUrl: '', emoji: '🚗', gradientStart: '#ef4444', gradientEnd: '#b91c1c', accentColor: '#ef4444', isFeatured: false },
    { id: 5, title: 'Booklist App', description: 'A booklist application built with JavaScript.', tags: 'JavaScript', githubUrl: 'https://github.com/starr-saiff/starrsaiff_booklist', liveUrl: '', emoji: '📚', gradientStart: '#eab308', gradientEnd: '#ca8a04', accentColor: '#eab308', isFeatured: false },
    { id: 6, title: 'Food Ordering System Requirements', description: 'Requirements documentation for a food ordering system.', tags: 'Requirements, Documentation', githubUrl: 'https://github.com/starr-saiff/FoodOrder-System-Requirements', liveUrl: '', emoji: '🍽️', gradientStart: '#f59e0b', gradientEnd: '#ef4444', accentColor: '#f59e0b', isFeatured: false },
  ],
};
