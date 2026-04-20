import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  MessageSquareIcon,
  BriefcaseIcon,
  SendIcon,
  CheckIcon,
  AlertCircleIcon,
  LoaderIcon } from
'lucide-react';
import { saveContactSubmission } from '../lib/analytics';
type Intent = 'feedback' | 'work' | null;
export function ContactPage() {
  const [intent, setIntent] = useState<Intent>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    rating: '',
    message: ''
  });
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intent || submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await saveContactSubmission({
        intent,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        budget: form.budget.trim() || undefined,
        rating: form.rating || undefined,
        message: form.message.trim()
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('[contact] save failed', err);
      const code = err?.code || '';
      if (code === 'permission-denied') {
        setError(
          "Message couldn't be delivered — the server rejected the request (permission denied). Please email hello@kzyarou.dev directly."
        );
      } else if (code === 'unavailable') {
        setError('Network issue — please check your connection and try again.');
      } else {
        setError(
          `Something went wrong sending your message. Please try again or email hello@kzyarou.dev directly.`
        );
      }
    } finally {
      setSubmitting(false);
    }
  };
  const reset = () => {
    setIntent(null);
    setSubmitted(false);
    setError('');
    setForm({
      name: '',
      email: '',
      company: '',
      budget: '',
      rating: '',
      message: ''
    });
  };
  return (
    <div className="bg-abyss text-cream min-h-screen pt-28 md:pt-36 pb-24 md:pb-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-cream-dim hover:text-amber transition-colors tracking-widest uppercase mb-12 md:mb-16">
          
          <ArrowLeftIcon className="w-4 h-4" />
          Back home
        </Link>

        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber tracking-[0.3em]">
              CONTACT
            </span>
            <span className="w-16 h-px bg-moss" />
            <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
              hello@kzyarou.dev
            </span>
          </div>
          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8
            }}
            className="font-display font-normal text-[14vw] md:text-[9vw] leading-[0.85] tracking-tight text-bone">
            
            Say <span className="italic text-ember">hello.</span>
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="mt-8 max-w-2xl text-cream-dim text-lg md:text-xl font-light leading-relaxed">
            
            Before we begin — what brings you here today?
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {intent === null &&
          <motion.div
            key="choose"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            transition={{
              duration: 0.5
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <IntentCard
              icon={MessageSquareIcon}
              label="Leave feedback"
              title="I just want to say something."
              description="Thoughts on my work, a project, a kind word, or constructive critique. All of it lands in my inbox."
              onClick={() => setIntent('feedback')} />
            
              <IntentCard
              icon={BriefcaseIcon}
              label="Work with me"
              title="I'd like to build something."
              description="Freelance commission, full-stack product, landing page, or programming tutoring. Let's talk scope."
              onClick={() => setIntent('work')}
              accent />
            
            </motion.div>
          }

          {intent !== null && !submitted &&
          <motion.div
            key="form"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            transition={{
              duration: 0.5
            }}>
            
              <button
              onClick={reset}
              className="inline-flex items-center gap-2 font-mono text-xs text-cream-dim hover:text-amber transition-colors tracking-widest uppercase mb-10">
              
                <ArrowLeftIcon className="w-3 h-3" />
                Change intent
              </button>

              <div className="mb-10">
                <div className="font-mono text-[10px] tracking-widest uppercase text-amber mb-3">
                  {intent === 'feedback' ? 'Feedback' : 'Work inquiry'}
                </div>
                <h2 className="font-serif text-4xl md:text-6xl font-light text-cream leading-tight">
                  {intent === 'feedback' ?
                <>
                      Tell me{' '}
                      <span className="italic text-amber-bright">
                        what you think.
                      </span>
                    </> :

                <>
                      Tell me about{' '}
                      <span className="italic text-amber-bright">
                        the project.
                      </span>
                    </>
                }
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required />
                
                  <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required />
                
                </div>

                {intent === 'work' &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field
                  label="Company / Organization"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Optional" />
                
                    <Field
                  label="Estimated budget (USD)"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. $500 – $2,000" />
                
                  </div>
              }

                {intent === 'feedback' &&
              <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-3">
                      Overall rating
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Loved it', 'Solid', 'Mixed', 'Needs work'].map((r) =>
                  <button
                    key={r}
                    type="button"
                    onClick={() =>
                    setForm({
                      ...form,
                      rating: r
                    })
                    }
                    className={`font-mono text-xs tracking-widest uppercase px-4 py-2.5 border transition-colors ${form.rating === r ? 'border-amber bg-amber text-abyss' : 'border-moss text-cream-dim hover:border-amber hover:text-amber'}`}>
                    
                          {r}
                        </button>
                  )}
                    </div>
                  </div>
              }

                <Field
                label={
                intent === 'feedback' ?
                'Your message' :
                'Describe the project'
                }
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                textarea
                placeholder={
                intent === 'feedback' ?
                'What stood out, what could be better, or just a note…' :
                'Scope, goals, timeline, tech preferences — anything you have so far.'
                } />
              

                {error &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="flex items-start gap-3 border border-red-500/40 bg-red-500/5 p-4">
                
                    <AlertCircleIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="font-mono text-xs md:text-sm text-red-300 leading-relaxed">
                      {error}
                    </p>
                  </motion.div>
              }

                <div className="pt-4 flex items-center gap-6 flex-wrap">
                  <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-4 bg-amber text-abyss px-8 py-5 font-mono text-sm tracking-wider uppercase hover:bg-amber-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  
                    {submitting ?
                  <>
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                        Sending…
                      </> :

                  <>
                        <SendIcon className="w-4 h-4" />
                        Send message
                        <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                  }
                  </button>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim/60">
                    Usually replies within 48h
                  </span>
                </div>
              </form>
            </motion.div>
          }

          {submitted &&
          <motion.div
            key="success"
            initial={{
              opacity: 0,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="py-16 md:py-24 text-center max-w-2xl mx-auto">
            
              <motion.div
              initial={{
                scale: 0,
                rotate: -45
              }}
              animate={{
                scale: 1,
                rotate: 0
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber text-abyss mb-8">
              
                <CheckIcon className="w-10 h-10" strokeWidth={2.5} />
              </motion.div>
              <h2 className="font-serif font-light text-5xl md:text-7xl text-cream leading-[0.95] mb-6">
                Message{' '}
                <span className="italic text-amber-bright">received.</span>
              </h2>
              <p className="text-cream-dim text-lg font-light leading-relaxed mb-12">
                Thanks for reaching out
                {form.name ? `, ${form.name.split(' ')[0]}` : ''}. I'll get back
                to you at{' '}
                <span className="text-amber font-mono text-base">
                  {form.email}
                </span>{' '}
                within 48 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                onClick={reset}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 border border-moss text-cream hover:border-amber hover:text-amber transition-colors">
                
                  Send another
                </button>
                <Link
                to="/"
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase px-6 py-3 bg-amber text-abyss hover:bg-amber-bright transition-colors">
                
                  Back home
                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}
interface IntentCardProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
  title: string;
  description: string;
  onClick: () => void;
  accent?: boolean;
}
function IntentCard({
  icon: Icon,
  label,
  title,
  description,
  onClick,
  accent
}: IntentCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -4
      }}
      transition={{
        duration: 0.3
      }}
      className={`group relative text-left bg-deep border p-8 md:p-10 flex flex-col h-full overflow-hidden transition-colors duration-500 ${accent ? 'border-amber/40 hover:border-amber' : 'border-forest hover:border-amber/60'}`}>
      
      <Icon className="w-8 h-8 text-amber mb-10" />
      <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-3">
        {label}
      </div>
      <h3 className="font-serif text-3xl md:text-4xl font-light text-cream mb-4 leading-tight group-hover:text-amber-bright transition-colors">
        {title}
      </h3>
      <p className="text-cream-dim leading-relaxed font-light flex-1">
        {description}
      </p>
      <div className="mt-8 pt-6 border-t border-forest flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-amber">
        Continue
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>);

}
interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}
function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
  textarea
}: FieldProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-3">
        {label}
        {required && <span className="text-amber ml-1">*</span>}
      </span>
      {textarea ?
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={6}
        className="w-full bg-transparent border-0 border-b border-forest text-cream font-serif text-xl md:text-2xl font-light py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-cream-dim/40 resize-none" /> :


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-forest text-cream font-serif text-xl md:text-2xl font-light py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-cream-dim/40" />

      }
    </label>);

}