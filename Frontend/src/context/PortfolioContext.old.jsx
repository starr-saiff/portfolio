import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

// ─── FALLBACK DATA (Used while loading or if API fails) ────────────────────
// This data is used as a fallback if the API is not available

import { FALLBACK_DATA } from '../data/portfolioData';

const transformPortfolioData = (dbData) => {
  if (!dbData) return FALLBACK_DATA;

  return {
    // Hero
    name: dbData.profile?.name || FALLBACK_DATA.name,
    role: dbData.profile?.title || FALLBACK_DATA.role,
    typingPhrases: FALLBACK_DATA.typingPhrases,
    heroDescription: dbData.profile?.bio || FALLBACK_DATA.heroDescription,
    cvUrl: dbData.profile?.resume || FALLBACK_DATA.cvUrl,

    // Profile
    profile: {
      name: dbData.profile?.name || FALLBACK_DATA.name,
      title: dbData.profile?.title || FALLBACK_DATA.role,
      profileImage: dbData.profile?.profileImage || null,
      email: dbData.profile?.email || FALLBACK_DATA.contact.email,
    },

    // About
    about: {
      introHeading: dbData.profile?.title || FALLBACK_DATA.about.introHeading,
      introHeadingHighlight: FALLBACK_DATA.about.introHeadingHighlight,
      introDescription: dbData.about?.description || FALLBACK_DATA.about.introDescription,
      yearsOfExperience: FALLBACK_DATA.about.yearsOfExperience,
      yearsLabel: FALLBACK_DATA.about.yearsLabel,
      projectsDone: dbData.projects?.length || FALLBACK_DATA.about.projectsDone,
      location: dbData.profile?.location || FALLBACK_DATA.about.location,
      role: dbData.profile?.title || FALLBACK_DATA.about.role,
      education: FALLBACK_DATA.about.education,
      languages: FALLBACK_DATA.about.languages,
      highlights: dbData.about?.highlights || FALLBACK_DATA.about.highlights,
    },

    // Social Links - Keep static for now
    socials: FALLBACK_DATA.socials,
    achievement: dbData.achievement?.title ? dbData.achievement : FALLBACK_DATA.achievement,
    certifications: dbData.certifications?.length ? dbData.certifications : FALLBACK_DATA.certifications,
    educationList: dbData.education?.length ? dbData.education.map(e => ({
      school: e.institution, degree: e.degree, note: e.description,
      period: [e.startDate, e.endDate].map(d => d ? new Date(d).getFullYear() : 'Present').join(' – '),
    })) : FALLBACK_DATA.education,
    experience: dbData.experience?.length ? dbData.experience.map((e, i) => {
      const f = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return { role: e.position, org: e.company, desc: e.description === `${e.position} at ${e.company}` ? '' : e.description,
        period: `${e.startDate ? f(e.startDate) : ''} – ${e.current ? 'Present' : (e.endDate ? f(e.endDate) : '')}`, highlight: i === 0 };
    }) : FALLBACK_DATA.experience,

    // Contact
    contact: {
      email: dbData.contact?.email || FALLBACK_DATA.contact.email,
      phone: dbData.contact?.phone || FALLBACK_DATA.contact.phone,
      location: dbData.profile?.location || FALLBACK_DATA.contact.location,
    },

    // Skills - Transform from database format
    // Prioritize techStack over skills if it exists
    skillCategories: (() => {
      // If techStack exists and has data, use it
      if (dbData.techStack?.length > 0) {
        // Group techStack by category
        const grouped = dbData.techStack.reduce((acc, tech) => {
          // Trim whitespace from category name to avoid duplicates
          const category = (tech.category || 'Tools').trim();
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            name: tech.name,
                        icon: tech.icon || 'FaCode',
            color: '#00d4ff'
          });
          return acc;
        }, {});

        // Map to category format with colors
        const categoryConfig = {
          'Frontend': { color: '#00d4ff', emoji: '🎨' },
          'Backend': { color: '#7c3aed', emoji: '⚙️' },
          'Tools & Cloud': { color: '#10b981', emoji: '🛠️' },
          'Database': { color: '#f59e0b', emoji: '🗄️' },
          'Cloud': { color: '#10b981', emoji: '☁️' },
          'Tools': { color: '#10b981', emoji: '🛠️' },
        };

        return Object.entries(grouped).map(([category, skills], index) => {
          const config = categoryConfig[category] || { color: '#00d4ff', emoji: '🎨' };
          return {
            id: `${category}-${index}`,
            name: category,
            color: config.color,
            emoji: config.emoji,
            skills: skills.map(skill => ({
              ...skill,
              color: config.color
            }))
          };
        });
      }
      
      // Fallback to skills field if techStack is empty
      if (dbData.skills?.length > 0) {
        return dbData.skills.map((skillCategory, index) => {
          const categoryConfig = {
            'Frontend': { color: '#00d4ff', emoji: '🎨' },
            'Backend': { color: '#7c3aed', emoji: '⚙️' },
            'Tools & Cloud': { color: '#10b981', emoji: '🛠️' },
            'Database': { color: '#f59e0b', emoji: '🗄️' },
            'Tools': { color: '#10b981', emoji: '🛠️' },
          };
          
          const config = categoryConfig[skillCategory.category] || { color: '#00d4ff', emoji: '🎨' };
          
          return {
            id: `${skillCategory.category}-${index}`,
            name: skillCategory.category,
            color: config.color,
            emoji: config.emoji,
            skills: skillCategory.items?.map(item => ({
              name: item,
                            icon: 'FaCode',
              color: config.color
            })) || []
          };
        });
      }
      
      // Final fallback to static data
      return FALLBACK_DATA.skillCategories;
    })(),

    // Projects - Transform from database format
    projects: dbData.projects?.map((project, index) => ({
      id: project._id || index + 1,
      title: project.title,
      description: project.description,
      gradientStart: '#00d4ff',
      gradientEnd: '#7c3aed',
      accentColor: project.featured ? '#00d4ff' : '#7c3aed',
      tags: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: project.image || null,
      emoji: '🚀',
      isFeatured: project.featured || false,
    })) || FALLBACK_DATA.projects,
  };
};

// Context
const PortfolioContext = createContext(null);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const data = await portfolioAPI.getPortfolio();
        const transformedData = transformPortfolioData(data);
        setPortfolioData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
        // Keep using fallback data on error
        setPortfolioData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const refreshPortfolio = async () => {
    try {
      const data = await portfolioAPI.getPortfolio();
      const transformedData = transformPortfolioData(data);
      setPortfolioData(transformedData);
      return transformedData;
    } catch (err) {
      console.error('Error refreshing portfolio:', err);
      throw err;
    }
  };

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      loading, 
      error,
      refreshPortfolio 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Export for backward compatibility
export const PORTFOLIO_DATA = FALLBACK_DATA;
