import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CheckCircle2Icon,
  Loader2Icon } from
'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { saveInquiry } from '../lib/firestore';
const PROJECT_TYPES = [
'Web App',
'Mobile App',
'Full-Stack',
'ML/AI',
'Consulting',
'Other'];

export function Inquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web App',
    budget: '',
    timeline: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveInquiry(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: 'Web App',
          budget: '',
          timeline: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit inquiry', error);
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };
  const formFieldVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    }
  };
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-24 pb-12 min-h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gh-muted hover:text-gh-text font-mono text-sm mb-8 transition-colors w-fit group">
          
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          cd ..
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gh-text font-mono mb-3 tracking-tight">
          ~/inquiry
        </h1>
        <p className="text-gh-muted font-mono text-sm sm:text-base">
          Let's build something great together. Tell me about your project.
        </p>
      </motion.div>

      <motion.div
        className="bg-gh-surface border border-gh-border rounded-lg p-6 sm:p-8 shadow-xl shadow-black/20 flex-grow relative overflow-hidden"
        variants={itemVariants}>
        
        <AnimatePresence mode="wait">
          {submitted ?
          <motion.div
            key="success"
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              type: 'spring',
              bounce: 0.5
            }}
            className="flex flex-col items-center justify-center py-16 text-center h-full">
            
              <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}>
              
                <CheckCircle2Icon className="w-20 h-20 text-gh-accent mb-6 drop-shadow-[0_0_15px_rgba(63,185,80,0.5)]" />
              </motion.div>
              <motion.h2
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4
              }}
              className="text-2xl font-bold text-gh-text font-mono mb-2">
              
                Inquiry Received
              </motion.h2>
              <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.6
              }}
              className="text-gh-muted font-mono text-sm max-w-md">
              
                Thank you for reaching out! I'll review your project details and
                get back to you soon.
              </motion.p>
            </motion.div> :

          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }}>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={formFieldVariants}>
                  <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                    Name *
                  </label>
                  <motion.div
                  className="relative flex items-center"
                  animate={{
                    scale: focusedField === 'name' ? 1.01 : 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25
                  }}>
                  
                    <span
                    className={`absolute left-3 font-mono transition-colors ${focusedField === 'name' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                    
                      {'>'}
                    </span>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all shadow-inner"
                    placeholder="Your name"
                    required />
                  
                  </motion.div>
                </motion.div>

                <motion.div className="space-y-2" variants={formFieldVariants}>
                  <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                    Email *
                  </label>
                  <motion.div
                  className="relative flex items-center"
                  animate={{
                    scale: focusedField === 'email' ? 1.01 : 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25
                  }}>
                  
                    <span
                    className={`absolute left-3 font-mono transition-colors ${focusedField === 'email' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                    
                      {'>'}
                    </span>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all shadow-inner"
                    placeholder="you@company.com"
                    required />
                  
                  </motion.div>
                </motion.div>
              </div>

              <motion.div className="space-y-2" variants={formFieldVariants}>
                <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                  Company/Organization (Optional)
                </label>
                <motion.div
                className="relative flex items-center"
                animate={{
                  scale: focusedField === 'company' ? 1.01 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}>
                
                  <span
                  className={`absolute left-3 font-mono transition-colors ${focusedField === 'company' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                  
                    {'>'}
                  </span>
                  <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all shadow-inner"
                  placeholder="Your company" />
                
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={formFieldVariants}>
                  <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                    Project Type *
                  </label>
                  <motion.div
                  className="relative flex items-center"
                  animate={{
                    scale: focusedField === 'projectType' ? 1.01 : 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25
                  }}>
                  
                    <span
                    className={`absolute left-3 font-mono z-10 transition-colors ${focusedField === 'projectType' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                    
                      {'>'}
                    </span>
                    <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('projectType')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all appearance-none cursor-pointer shadow-inner"
                    required>
                    
                      {PROJECT_TYPES.map((type) =>
                    <option key={type} value={type}>
                          {type}
                        </option>
                    )}
                    </select>
                  </motion.div>
                </motion.div>

                <motion.div className="space-y-2" variants={formFieldVariants}>
                  <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                    Budget (PHP ₱)
                  </label>
                  <motion.div
                  className="relative flex items-center"
                  animate={{
                    scale: focusedField === 'budget' ? 1.01 : 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25
                  }}>
                  
                    <span
                    className={`absolute left-3 font-mono transition-colors ${focusedField === 'budget' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                    
                      ₱
                    </span>
                    <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all shadow-inner"
                    placeholder="e.g., 10,000 - 50,000" />
                  
                  </motion.div>
                </motion.div>
              </div>

              <motion.div className="space-y-2" variants={formFieldVariants}>
                <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                  Timeline
                </label>
                <motion.div
                className="relative flex items-center"
                animate={{
                  scale: focusedField === 'timeline' ? 1.01 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}>
                
                  <span
                  className={`absolute left-3 font-mono transition-colors ${focusedField === 'timeline' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                  
                    {'>'}
                  </span>
                  <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('timeline')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all shadow-inner"
                  placeholder="e.g., 2-3 months, ASAP, Flexible" />
                
                </motion.div>
              </motion.div>

              <motion.div className="space-y-2" variants={formFieldVariants}>
                <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                  Project Description *
                </label>
                <motion.div
                className="relative"
                animate={{
                  scale: focusedField === 'message' ? 1.01 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}>
                
                  <span
                  className={`absolute left-3 top-3 font-mono transition-colors ${focusedField === 'message' ? 'text-gh-accent' : 'text-gh-muted'}`}>
                  
                    {'>'}
                  </span>
                  <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all resize-none shadow-inner"
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                  rows={6}
                  required />
                
                </motion.div>
              </motion.div>

              <motion.button
              variants={formFieldVariants}
              type="submit"
              disabled={loading}
              whileHover={{
                scale: loading ? 1 : 1.02
              }}
              whileTap={{
                scale: loading ? 1 : 0.98
              }}
              className="w-full bg-gh-accent hover:bg-gh-accent/90 text-gh-bg font-mono font-bold py-3 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
              
                {!loading &&
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear'
                }} />

              }
                {loading ?
              <>
                    <Loader2Icon className="w-4 h-4 animate-spin relative z-10" />
                    <span className="relative z-10">./sending</span>
                  </> :

              <>
                    <BriefcaseIcon className="w-4 h-4 relative z-10 group-hover:animate-bounce" />
                    <span className="relative z-10">./submit_inquiry</span>
                  </>
              }
              </motion.button>
            </motion.form>
          }
        </AnimatePresence>
      </motion.div>

      <motion.div className="mt-auto pt-8" variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.main>);

}