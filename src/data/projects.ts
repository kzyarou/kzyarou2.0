export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: string;
  statusColor: string;
  version?: string;
  features: string[];
  architecture: string;
  category: string;
}

export const PROJECTS: Project[] = [
{
  slug: 'markit',
  name: 'MarkIt',
  description:
  'Direct marketplace connecting farmers & fisherfolk with buyers. Eliminates middlemen for fair trade.',
  longDescription:
  'A comprehensive Progressive Web Application (PWA) that empowers agricultural producers and fisherfolk to connect directly with consumers, restaurants, retailers, and institutional buyers. Built with modern web technologies, MarkIt provides a mobile-first, feature-rich platform for fair trade, transparent pricing, and efficient marketplace operations.',
  tech: [
  'React',
  'TypeScript',
  'Firebase',
  'Capacitor',
  'TailwindCSS',
  'Hugging Face AI'],

  status: 'Production Ready',
  statusColor: 'text-gh-accent',
  version: 'v1.0.4',
  features: [
  'Multi-role auth (Producer, Consumer, Admin)',
  'Harvest management with detailed product info',
  'Real-time messaging between users',
  'AI assistant "Therese" for agricultural guidance',
  'Price guarantee system and analytics',
  'Progressive Web App (PWA) with offline support',
  'i18n support (English, Tagalog, Waray)'],

  architecture: 'React + Firebase + Capacitor',
  category: 'Marketplace'
},
{
  slug: 'educhub',
  name: 'EducHub',
  description:
  'Philippine K-12 academic management platform for teachers and students. DepEd compliant.',
  longDescription:
  'A modern, all-in-one platform for managing student grades, attendance, and academic records, designed specifically for the Philippine K-12 education system. It empowers teachers and students to efficiently handle grades, attendance, and academic progress, while ensuring compliance with the Department of Education (DepEd) standards and legal requirements.',
  tech: ['React', 'TypeScript', 'Firebase', 'Capacitor', 'shadcn/ui'],
  status: 'Production',
  statusColor: 'text-gh-accent',
  features: [
  'Section and subject management',
  'DepEd-compliant grading with official transmutation table',
  'Daily attendance tracking',
  'Automated report cards and class records generation',
  'Role-based access for teachers and students'],

  architecture: 'React + Firebase + Capacitor',
  category: 'Education'
},
{
  slug: 'fintra',
  name: 'Fintra',
  description:
  'Complete financial management app with budgets, bills, and net worth tracking.',
  longDescription:
  'Your complete financial management app. Track transactions, manage budgets, set bill reminders, and monitor your net worth with visual dashboards and analytics. Designed to give users complete control over their personal finances with a clean, intuitive interface.',
  tech: ['React', 'TypeScript', 'Firebase', 'Capacitor'],
  status: 'Stable',
  statusColor: 'text-gh-blue',
  version: 'v2.0',
  features: [
  'Income and expense transaction tracking',
  'Advanced budget management with alerts',
  'Recurring bill reminders and tracking',
  'Net worth monitoring (Assets vs Liabilities)',
  'Custom categories with color coding',
  'Visual analytics and monthly trends',
  'Built-in calculator and currency converter'],

  architecture: 'React + Firebase + Capacitor',
  category: 'Finance'
},
{
  slug: 'handgestalk',
  name: 'HandGesTalk',
  description:
  'Real-time sign language translation using ML. Converts ASL hand gestures to text.',
  longDescription:
  'Real-time sign language translation app using machine learning. Converts American Sign Language (ASL) hand gestures to text using your camera. Built to bridge the communication gap between the deaf community and those who do not know sign language.',
  tech: ['React Native', 'TensorFlow', 'MediaPipe', 'Python'],
  status: 'In Development',
  statusColor: 'text-yellow-500',
  features: [
  'MediaPipe hand landmark detection',
  'TensorFlow gesture classification',
  'Real-time camera translation',
  'ASL alphabet support (A-Z, Space, Delete)'],

  architecture: 'React Native + Python ML',
  category: 'Machine Learning'
},
{
  slug: 'medichine',
  name: 'MediChine',
  description:
  'Cross-platform medication reminder app with smart local notifications and offline support.',
  longDescription:
  'A cross-platform medication reminder app built with Vite, Capacitor, and Firebase. Helps users track their medications and receive timely reminders. It supports both web (PWA) and Android platforms with local notifications.',
  tech: ['Vite', 'Capacitor', 'Firebase', 'JavaScript'],
  status: 'Production',
  statusColor: 'text-gh-accent',
  features: [
  'Secure email/password authentication via Firebase',
  'Custom medication scheduling and management',
  'Native local notifications via Capacitor',
  'Cross-platform support (PWA + Android)',
  'Offline functionality via service workers'],

  architecture: 'Vite + Capacitor + Firebase',
  category: 'Health'
}];