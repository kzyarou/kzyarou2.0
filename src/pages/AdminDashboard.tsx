import React, { useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import {
  UsersIcon,
  MessageSquareIcon,
  BriefcaseIcon,
  StarIcon,
  CalendarIcon,
  RefreshCwIcon,
  Loader2Icon } from
'lucide-react';
import { useAuth } from '../lib/AuthContext';
import {
  getVisitCount,
  getAllFeedback,
  getAllInquiries,
  FeedbackData,
  InquiryData } from
'../lib/firestore';
import { Footer } from '../components/Footer';
export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [visitCount, setVisitCount] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [visits, fbData, inqData] = await Promise.all([
      getVisitCount(),
      getAllFeedback(),
      getAllInquiries()]
      );
      setVisitCount(visits);
      setFeedback(fbData);
      setInquiries(inqData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setDataLoading(false);
    }
  };
  useEffect(() => {
    if (user?.email === 'kzyaroudev@gmail.com') {
      fetchData();
    }
  }, [user]);
  if (authLoading) return null;
  if (!user || user.email !== 'kzyaroudev@gmail.com') {
    return <Navigate to="/" replace />;
  }
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
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };
  return (
    <motion.main
      className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-24 pb-12 min-h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-8">
        
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gh-text font-mono mb-3 tracking-tight">
            ~/admin/dashboard
          </h1>
          <p className="text-gh-muted font-mono text-sm sm:text-base">
            System overview and incoming communications.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={dataLoading}
          className="flex items-center gap-2 text-xs font-mono bg-gh-surface border border-gh-border px-4 py-2 rounded-md hover:bg-gh-border/50 hover:text-gh-text transition-colors disabled:opacity-50">
          
          <RefreshCwIcon
            className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
          
          <span className="hidden sm:inline">Refresh Data</span>
        </button>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-gh-surface border border-gh-border rounded-lg p-6 flex items-start gap-4 shadow-lg shadow-black/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gh-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-3 bg-gh-bg rounded-md border border-gh-border">
            <UsersIcon className="w-6 h-6 text-gh-accent" />
          </div>
          <div>
            <p className="text-xs font-mono text-gh-muted uppercase tracking-wider mb-1">
              Total Visitors
            </p>
            <p className="text-3xl font-bold font-mono text-gh-text">
              {dataLoading ? '-' : visitCount}
            </p>
          </div>
        </div>

        <div className="bg-gh-surface border border-gh-border rounded-lg p-6 flex items-start gap-4 shadow-lg shadow-black/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gh-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-3 bg-gh-bg rounded-md border border-gh-border">
            <MessageSquareIcon className="w-6 h-6 text-gh-blue" />
          </div>
          <div>
            <p className="text-xs font-mono text-gh-muted uppercase tracking-wider mb-1">
              Feedback
            </p>
            <p className="text-3xl font-bold font-mono text-gh-text">
              {dataLoading ? '-' : feedback.length}
            </p>
          </div>
        </div>

        <div className="bg-gh-surface border border-gh-border rounded-lg p-6 flex items-start gap-4 shadow-lg shadow-black/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-3 bg-gh-bg rounded-md border border-gh-border">
            <BriefcaseIcon className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-mono text-gh-muted uppercase tracking-wider mb-1">
              Inquiries
            </p>
            <p className="text-3xl font-bold font-mono text-gh-text">
              {dataLoading ? '-' : inquiries.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Inquiries Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <h2 className="text-lg font-mono text-gh-text mb-4 flex items-center gap-2 border-b border-gh-border pb-2">
          <BriefcaseIcon className="w-4 h-4 text-yellow-500" />
          ~/admin/inquiries
        </h2>
        {dataLoading ?
        <div className="py-8 text-center text-gh-muted font-mono text-sm flex items-center justify-center gap-2">
            <Loader2Icon className="w-4 h-4 animate-spin" /> Loading
            inquiries...
          </div> :
        inquiries.length === 0 ?
        <div className="bg-gh-surface border border-gh-border border-dashed rounded-lg p-8 text-center text-gh-muted font-mono text-sm">
            No inquiries received yet.
          </div> :

        <div className="space-y-4">
            {inquiries.map((inq: any) =>
          <div
            key={inq.id}
            className="bg-gh-surface border border-gh-border rounded-lg p-5 shadow-sm">
            
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-gh-text text-lg">
                      {inq.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm font-mono text-gh-muted">
                      <a
                    href={`mailto:${inq.email}`}
                    className="hover:text-gh-blue transition-colors">
                    
                        {inq.email}
                      </a>
                      {inq.company &&
                  <>
                          <span className="hidden sm:inline text-gh-border">
                            |
                          </span>
                          <span>{inq.company}</span>
                        </>
                  }
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-mono bg-gh-bg px-2.5 py-1 rounded border border-gh-border text-gh-text">
                      {inq.projectType}
                    </span>
                    <span className="text-xs font-mono text-gh-muted flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(inq.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm font-mono bg-gh-bg p-3 rounded border border-gh-border">
                  <div>
                    <span className="text-gh-muted">Budget:</span>{' '}
                    <span className="text-gh-text">
                      {inq.budget || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gh-muted">Timeline:</span>{' '}
                    <span className="text-gh-text">
                      {inq.timeline || 'Not specified'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-gh-muted uppercase tracking-wider mb-2">
                    Message
                  </p>
                  <p className="text-gh-text text-sm whitespace-pre-wrap bg-gh-bg/50 p-4 rounded border border-gh-border/50">
                    {inq.message}
                  </p>
                </div>
              </div>
          )}
          </div>
        }
      </motion.div>

      {/* Feedback Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-lg font-mono text-gh-text mb-4 flex items-center gap-2 border-b border-gh-border pb-2">
          <MessageSquareIcon className="w-4 h-4 text-gh-blue" />
          ~/admin/feedback
        </h2>
        {dataLoading ?
        <div className="py-8 text-center text-gh-muted font-mono text-sm flex items-center justify-center gap-2">
            <Loader2Icon className="w-4 h-4 animate-spin" /> Loading feedback...
          </div> :
        feedback.length === 0 ?
        <div className="bg-gh-surface border border-gh-border border-dashed rounded-lg p-8 text-center text-gh-muted font-mono text-sm">
            No feedback received yet.
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.map((fb: any) =>
          <div
            key={fb.id}
            className="bg-gh-surface border border-gh-border rounded-lg p-5 shadow-sm flex flex-col h-full">
            
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gh-text">
                      {fb.name || 'Anonymous'}
                    </h3>
                    <span className="text-xs font-mono text-gh-muted flex items-center gap-1 mt-1">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(fb.createdAt)}
                    </span>
                  </div>
                  <span className="text-xs font-mono bg-gh-bg px-2 py-1 rounded border border-gh-border text-gh-text">
                    {fb.feedbackType}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) =>
              <StarIcon
                key={star}
                className={`w-4 h-4 ${star <= fb.rating ? 'fill-gh-accent text-gh-accent' : 'text-gh-border'}`} />

              )}
                </div>
                <p className="text-gh-text text-sm whitespace-pre-wrap bg-gh-bg/50 p-3 rounded border border-gh-border/50 flex-grow">
                  {fb.message}
                </p>
              </div>
          )}
          </div>
        }
      </motion.div>

      <motion.div className="mt-auto pt-8" variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.main>);

}