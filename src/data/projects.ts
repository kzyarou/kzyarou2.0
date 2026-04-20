export interface Project {
  num: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  version?: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  architecture: string;
  year: string;
  role: string;
  liveUrl?: string;
}

export const projects: Project[] = [
{
  num: '01',
  slug: 'markit',
  name: 'MarkIt',
  category: 'Marketplace',
  status: 'Production Ready',
  version: 'v1.0.4',
  tagline: 'Fair trade marketplace connecting producers directly to buyers.',
  description:
  'A comprehensive Progressive Web Application that empowers agricultural producers and fisherfolk to connect directly with consumers, restaurants, retailers, and institutional buyers. A mobile-first platform for fair trade, transparent pricing, and efficient marketplace operations.',
  features: [
  'Multi-role auth (Producer, Consumer, Admin)',
  'Harvest management with detailed product info',
  'Real-time messaging between users',
  'AI assistant "Therese" for agricultural guidance',
  'Price guarantee system and analytics',
  'PWA with offline support',
  'i18n (English, Tagalog, Waray)'],

  tech: [
  'React',
  'TypeScript',
  'Firebase',
  'Capacitor',
  'TailwindCSS',
  'Hugging Face AI'],

  architecture: 'React + Firebase + Capacitor',
  year: '2025',
  role: 'Full-stack development, product, UI/UX',
  liveUrl: 'https://markitph.vercel.app/auth'
},
{
  num: '02',
  slug: 'educhub',
  name: 'EducHub',
  category: 'Education',
  status: 'Production',
  tagline:
  'DepEd-compliant grading and records for the Philippine K-12 system.',
  description:
  'A modern, all-in-one platform for managing student grades, attendance, and academic records, designed for the Philippine K-12 education system. Empowers teachers and students while ensuring compliance with DepEd standards and legal requirements.',
  features: [
  'Section and subject management',
  'DepEd-compliant grading with official transmutation table',
  'Daily attendance tracking',
  'Automated report cards and class records generation',
  'Role-based access for teachers and students'],

  tech: ['React', 'TypeScript', 'Firebase', 'Capacitor', 'shadcn/ui'],
  architecture: 'React + Firebase + Capacitor',
  year: '2025',
  role: 'Full-stack development, UI/UX',
  liveUrl: 'https://educ-hub.vercel.app/auth'
},
{
  num: '03',
  slug: 'fintra',
  name: 'Fintra',
  category: 'Finance',
  status: 'Stable',
  version: 'v2.0',
  tagline: 'Personal finance, budgeting, and net worth — in one clean app.',
  description:
  'Your complete financial management app. Track transactions, manage budgets, set bill reminders, and monitor your net worth with visual dashboards and analytics. Designed to give users complete control over their personal finances with a clean, intuitive interface.',
  features: [
  'Income and expense transaction tracking',
  'Advanced budget management with alerts',
  'Recurring bill reminders and tracking',
  'Net worth monitoring (Assets vs Liabilities)',
  'Custom categories with color coding',
  'Visual analytics and monthly trends',
  'Built-in calculator and currency converter'],

  tech: ['React', 'TypeScript', 'Firebase', 'Capacitor'],
  architecture: 'React + Firebase + Capacitor',
  year: '2024',
  role: 'Full-stack development, UI/UX',
  liveUrl: 'https://fintraph.vercel.app/'
},
{
  num: '04',
  slug: 'handgestalk',
  name: 'HandGesTalk',
  category: 'Machine Learning',
  status: 'In Development',
  tagline: 'Real-time ASL to text translation using your camera.',
  description:
  'Real-time sign language translation app using machine learning. Converts American Sign Language (ASL) hand gestures to text using your camera. Built to bridge the communication gap between the deaf community and those who do not know sign language.',
  features: [
  'MediaPipe hand landmark detection',
  'TensorFlow gesture classification',
  'Real-time camera translation',
  'ASL alphabet support (A-Z, Space, Delete)'],

  tech: ['React Native', 'TensorFlow', 'MediaPipe', 'Python'],
  architecture: 'React Native + Python ML',
  year: '2026',
  role: 'ML engineering, mobile development'
},
{
  num: '05',
  slug: 'medichine',
  name: 'MediChine',
  category: 'Health',
  status: 'Production',
  tagline: 'Cross-platform medication reminders that actually show up.',
  description:
  'A cross-platform medication reminder app built with Vite, Capacitor, and Firebase. Helps users track their medications and receive timely reminders. Supports both web (PWA) and Android platforms with local notifications.',
  features: [
  'Secure email/password auth via Firebase',
  'Custom medication scheduling and management',
  'Native local notifications via Capacitor',
  'Cross-platform support (PWA + Android)',
  'Offline functionality via service workers'],

  tech: ['Vite', 'Capacitor', 'Firebase', 'JavaScript'],
  architecture: 'Vite + Capacitor + Firebase',
  year: '2024',
  role: 'Full-stack development'
}];


export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}