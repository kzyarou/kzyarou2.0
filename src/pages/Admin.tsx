import React, {
  useEffect,
  useMemo,
  useState,
  createElement,
  Component } from
'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOutIcon,
  EyeIcon,
  MessageSquareIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  LoaderIcon,
  ArrowLeftIcon,
  MailIcon,
  SearchIcon,
  DownloadIcon,
  Trash2Icon,
  CheckCheckIcon,
  CircleDotIcon,
  UsersIcon,
  LinkIcon,
  FilterIcon,
  AlertTriangleIcon,
  XIcon } from
'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp } from
'firebase/firestore';
import { auth, db, ADMIN_EMAIL } from '../lib/firebase';
import {
  deleteContact,
  markContactRead,
  deleteVisits,
  deleteAllVisits,
  deleteContacts,
  deleteAllContacts } from
'../lib/analytics';
interface Visit {
  id: string;
  path: string;
  createdAt?: Timestamp;
  userAgent?: string;
  referrer?: string;
}
interface Contact {
  id: string;
  intent: 'feedback' | 'work';
  name: string;
  email: string;
  company?: string;
  budget?: string;
  rating?: string;
  message: string;
  read?: boolean;
  createdAt?: Timestamp;
}
type Tab = 'overview' | 'hotspots' | 'feedback' | 'inquiries' | 'visits';
type TimeRange = '24h' | '7d' | '30d' | 'all';
const rangeMs: Record<TimeRange, number> = {
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
  all: Infinity
};
export function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<Tab>('overview');
  const [loadingData, setLoadingData] = useState(true);
  const [range, setRange] = useState<TimeRange>('7d');
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setAuthChecked(true);
      if (!u || u.email !== ADMIN_EMAIL) {
        navigate('/login', {
          replace: true
        });
        return;
      }
      setUser(u);
    });
    return () => unsub();
  }, [navigate]);
  useEffect(() => {
    if (!user) return;
    let loaded = 0;
    const markLoaded = () => {
      loaded += 1;
      if (loaded >= 2) setLoadingData(false);
    };
    const unsubV = onSnapshot(
      query(collection(db, 'visits'), orderBy('createdAt', 'desc')),
      (snap) => {
        setVisits(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as any)
          })) as Visit[]
        );
        markLoaded();
      },
      () => markLoaded()
    );
    const unsubC = onSnapshot(
      query(collection(db, 'contacts'), orderBy('createdAt', 'desc')),
      (snap) => {
        setContacts(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as any)
          })) as Contact[]
        );
        markLoaded();
      },
      () => markLoaded()
    );
    return () => {
      unsubV();
      unsubC();
    };
  }, [user]);
  const scopedVisits = useMemo(() => {
    if (range === 'all') return visits;
    const cutoff = Date.now() - rangeMs[range];
    return visits.filter((v) => (v.createdAt?.toMillis?.() ?? 0) >= cutoff);
  }, [visits, range]);
  const stats = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const today = visits.filter(
      (v) => now - (v.createdAt?.toMillis?.() ?? 0) < day
    );
    const uniqueUAs = new Set(scopedVisits.map((v) => v.userAgent || 'unknown')).
    size;
    const feedbacks = contacts.filter((c) => c.intent === 'feedback');
    const inquiries = contacts.filter((c) => c.intent === 'work');
    const unread = contacts.filter((c) => !c.read).length;
    return {
      totalVisits: visits.length,
      scopedVisits: scopedVisits.length,
      visitsToday: today.length,
      uniqueUAs,
      feedbackCount: feedbacks.length,
      inquiryCount: inquiries.length,
      unread,
      feedbacks,
      inquiries
    };
  }, [visits, scopedVisits, contacts]);
  const hotspots = useMemo(() => {
    const counts = new Map<string, number>();
    scopedVisits.forEach((v) => {
      const p = v.path || '/';
      counts.set(p, (counts.get(p) || 0) + 1);
    });
    return Array.from(counts.entries()).
    map(([path, count]) => ({
      path,
      count
    })).
    sort((a, b) => b.count - a.count);
  }, [scopedVisits]);
  const referrers = useMemo(() => {
    const counts = new Map<string, number>();
    scopedVisits.forEach((v) => {
      const raw = (v.referrer || '').trim();
      let host = 'Direct / unknown';
      if (raw) {
        try {
          host = new URL(raw).hostname || raw;
        } catch {
          host = raw;
        }
      }
      counts.set(host, (counts.get(host) || 0) + 1);
    });
    return Array.from(counts.entries()).
    map(([host, count]) => ({
      host,
      count
    })).
    sort((a, b) => b.count - a.count);
  }, [scopedVisits]);
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', {
      replace: true
    });
  };
  if (!authChecked || !user) {
    return (
      <div className="min-h-screen bg-abyss flex items-center justify-center">
        <LoaderIcon className="w-6 h-6 text-amber animate-spin" />
      </div>);

  }
  return (
    <div className="min-h-screen bg-abyss text-cream">
      <header className="sticky top-0 z-40 bg-abyss/90 backdrop-blur-md border-b border-forest">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-mono text-xs text-cream-dim hover:text-amber transition-colors tracking-widest uppercase flex items-center gap-2">
              
              <ArrowLeftIcon className="w-3 h-3" />
              Site
            </Link>
            <span className="w-px h-4 bg-forest" />
            <span className="font-mono text-xs text-amber tracking-[0.3em] uppercase">
              Admin · kzyarou
            </span>
            {stats.unread > 0 &&
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase bg-amber text-abyss px-2 py-1">
                <CircleDotIcon className="w-3 h-3" />
                {stats.unread} new
              </span>
            }
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono text-[10px] text-cream-dim tracking-wider">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-moss text-cream hover:border-amber hover:text-amber transition-colors">
              
              <LogOutIcon className="w-3 h-3" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 md:py-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-amber tracking-[0.3em]">
                DASHBOARD
              </span>
              <span className="w-16 h-px bg-moss" />
              <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
                Live · Firestore
              </span>
            </div>
            <h1 className="font-serif font-light text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Command <span className="italic text-amber-bright">center.</span>
            </h1>
          </div>

          <TimeRangeToggle value={range} onChange={setRange} />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
          <StatCard
            icon={EyeIcon}
            label={`Visits (${rangeLabel(range)})`}
            value={stats.scopedVisits}
            hint={`${stats.totalVisits} all-time`} />
          
          <StatCard
            icon={UsersIcon}
            label="Unique agents"
            value={stats.uniqueUAs}
            hint={rangeLabel(range)} />
          
          <StatCard
            icon={TrendingUpIcon}
            label="Today"
            value={stats.visitsToday}
            hint="last 24h" />
          
          <StatCard
            icon={MessageSquareIcon}
            label="Feedbacks"
            value={stats.feedbackCount} />
          
          <StatCard
            icon={BriefcaseIcon}
            label="Inquiries"
            value={stats.inquiryCount} />
          
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-forest">
          {(
          [
          {
            id: 'overview',
            label: 'Overview'
          },
          {
            id: 'hotspots',
            label: `Hotspots (${hotspots.length})`
          },
          {
            id: 'visits',
            label: `Visits (${stats.scopedVisits})`
          },
          {
            id: 'feedback',
            label: `Feedback (${stats.feedbackCount})`
          },
          {
            id: 'inquiries',
            label: `Inquiries (${stats.inquiryCount})`
          }] as
          {
            id: Tab;
            label: string;
          }[]).
          map((t) =>
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-mono text-[10px] md:text-xs tracking-widest uppercase px-4 py-3 -mb-px border-b transition-colors ${tab === t.id ? 'border-amber text-amber' : 'border-transparent text-cream-dim hover:text-cream'}`}>
            
              {t.label}
            </button>
          )}
        </div>

        {loadingData ?
        <div className="py-24 flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 text-amber animate-spin" />
          </div> :

        <>
            {tab === 'overview' &&
          <OverviewTab
            hotspots={hotspots.slice(0, 6)}
            referrers={referrers.slice(0, 6)}
            recentVisits={scopedVisits.slice(0, 10)}
            recentContacts={contacts.slice(0, 5)} />

          }
            {tab === 'hotspots' &&
          <HotspotsTab hotspots={hotspots} total={stats.scopedVisits} />
          }
            {tab === 'visits' &&
          <VisitsTab visits={scopedVisits} allVisitsCount={visits.length} />
          }
            {tab === 'feedback' &&
          <ContactsTab items={stats.feedbacks} kind="feedback" />
          }
            {tab === 'inquiries' &&
          <ContactsTab items={stats.inquiries} kind="work" />
          }
          </>
        }
      </div>
    </div>);

}
function rangeLabel(r: TimeRange) {
  return r === 'all' ? 'all time' : r;
}
function TimeRangeToggle({
  value,
  onChange



}: {value: TimeRange;onChange: (r: TimeRange) => void;}) {
  const options: TimeRange[] = ['24h', '7d', '30d', 'all'];
  return (
    <div className="inline-flex border border-forest">
      {options.map((o) =>
      <button
        key={o}
        onClick={() => onChange(o)}
        className={`font-mono text-[10px] tracking-widest uppercase px-3 py-2 transition-colors ${value === o ? 'bg-amber text-abyss' : 'text-cream-dim hover:text-amber'}`}>
        
          {o}
        </button>
      )}
    </div>);

}
function StatCard({
  icon: Icon,
  label,
  value,
  hint







}: {icon: ComponentType<{className?: string;}>;label: string;value: number;hint?: string;}) {
  return (
    <div className="bg-deep border border-forest p-5 md:p-6">
      <Icon className="w-5 h-5 text-amber mb-6" />
      <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-2">
        {label}
      </div>
      <div className="font-serif text-4xl md:text-5xl font-light text-cream tabular-nums">
        {value.toLocaleString()}
      </div>
      {hint &&
      <div className="mt-2 font-mono text-[10px] tracking-wider text-cream-dim/60">
          {hint}
        </div>
      }
    </div>);

}
function OverviewTab({
  hotspots,
  referrers,
  recentVisits,
  recentContacts











}: {hotspots: {path: string;count: number;}[];referrers: {host: string;count: number;}[];recentVisits: Visit[];recentContacts: Contact[];}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <section>
        <SectionTitle n="01" label="Top hotspots" />
        <BarList
          items={hotspots.map((h) => ({
            label: h.path,
            count: h.count
          }))}
          total={hotspots.reduce((s, h) => s + h.count, 0)} />
        
      </section>
      <section>
        <SectionTitle n="02" label="Top referrers" icon={LinkIcon} />
        <BarList
          items={referrers.map((r) => ({
            label: r.host,
            count: r.count
          }))}
          total={referrers.reduce((s, r) => s + r.count, 0)} />
        
      </section>
      <section>
        <SectionTitle n="03" label="Recent visits" />
        <ul className="divide-y divide-forest border-y border-forest">
          {recentVisits.length === 0 &&
          <li className="py-6 font-mono text-xs text-cream-dim">
              No visits in this range.
            </li>
          }
          {recentVisits.map((v) =>
          <li
            key={v.id}
            className="py-4 flex items-center justify-between gap-4">
            
              <span className="font-mono text-xs md:text-sm text-cream truncate">
                {v.path}
              </span>
              <span className="font-mono text-[10px] text-cream-dim shrink-0">
                {formatTime(v.createdAt)}
              </span>
            </li>
          )}
        </ul>
      </section>
      <section>
        <SectionTitle n="04" label="Latest submissions" />
        <ContactsList
          items={recentContacts.slice(0, 5)}
          kind="all"
          compact
          selection={null} />
        
      </section>
    </div>);

}
function HotspotsTab({
  hotspots,
  total






}: {hotspots: {path: string;count: number;}[];total: number;}) {
  return (
    <div>
      <SectionTitle
        n="·"
        label={`${hotspots.length} unique paths · ${total} visits`} />
      
      <BarList
        items={hotspots.map((h) => ({
          label: h.path,
          count: h.count
        }))}
        total={total} />
      
    </div>);

}
function VisitsTab({
  visits,
  allVisitsCount



}: {visits: Visit[];allVisitsCount: number;}) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    kind: 'selected' | 'all';
  }>(null);
  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return visits;
    return visits.filter(
      (v) =>
      (v.path || '').toLowerCase().includes(n) ||
      (v.referrer || '').toLowerCase().includes(n) ||
      (v.userAgent || '').toLowerCase().includes(n)
    );
  }, [visits, q]);
  // Clean up selection when items disappear
  useEffect(() => {
    const ids = new Set(visits.map((v) => v.id));
    setSelected((prev) => {
      const next = new Set<string>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next.size === prev.size ? prev : next;
    });
  }, [visits]);
  const visibleIds = filtered.slice(0, 200).map((v) => v.id);
  const allVisibleSelected =
  visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleAllVisible = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };
  const clearSelection = () => setSelected(new Set());
  const exportCsv = () => {
    const rows = [
    ['path', 'createdAt', 'referrer', 'userAgent'],
    ...filtered.map((v) => [
    v.path || '',
    v.createdAt?.toDate?.().toISOString() || '',
    v.referrer || '',
    (v.userAgent || '').replace(/\n/g, ' ')]
    )];

    downloadCsv('visits.csv', rows);
  };
  const runDelete = async (kind: 'selected' | 'all') => {
    setBusy(true);
    try {
      if (kind === 'all') {
        await deleteAllVisits();
      } else {
        await deleteVisits(Array.from(selected));
      }
      setSelected(new Set());
      setConfirm(null);
    } catch (e) {
      console.error(e);
      alert('Delete failed. Check console for details.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search path, referrer, UA…" />
        
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border border-moss text-cream hover:border-amber hover:text-amber transition-colors">
          
          <DownloadIcon className="w-3 h-3" />
          Export CSV
        </button>
        <button
          onClick={() =>
          setConfirm({
            kind: 'all'
          })
          }
          disabled={allVisitsCount === 0}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border border-red-500/40 text-red-300 hover:border-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          
          <Trash2Icon className="w-3 h-3" />
          Clear all logs
        </button>
        <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim ml-auto">
          {filtered.length} shown
        </span>
      </div>

      <SelectionBar
        selectedCount={selected.size}
        onClear={clearSelection}
        onDelete={() =>
        setConfirm({
          kind: 'selected'
        })
        }
        label="visit" />
      

      <ul className="divide-y divide-forest border-y border-forest">
        <li className="py-3 grid grid-cols-12 gap-3 items-center bg-deep/40">
          <span className="col-span-1 md:col-span-1">
            <Checkbox
              checked={allVisibleSelected}
              onChange={toggleAllVisible}
              ariaLabel="Select all visible" />
            
          </span>
          <span className="col-span-11 md:col-span-11 font-mono text-[9px] tracking-widest uppercase text-cream-dim/60">
            Select all visible ({visibleIds.length})
          </span>
        </li>
        {filtered.length === 0 &&
        <li className="py-6 font-mono text-xs text-cream-dim">
            No matching visits.
          </li>
        }
        {filtered.slice(0, 200).map((v) =>
        <li
          key={v.id}
          className={`py-4 grid grid-cols-12 gap-3 items-center transition-colors ${selected.has(v.id) ? 'bg-amber/5' : ''}`}>
          
            <span className="col-span-1 md:col-span-1">
              <Checkbox
              checked={selected.has(v.id)}
              onChange={() => toggleOne(v.id)}
              ariaLabel={`Select visit ${v.path}`} />
            
            </span>
            <span className="col-span-11 md:col-span-3 font-mono text-xs md:text-sm text-cream truncate">
              {v.path}
            </span>
            <span className="col-span-6 md:col-span-4 font-mono text-[10px] text-cream-dim truncate">
              {v.referrer || '— direct —'}
            </span>
            <span className="col-span-6 md:col-span-3 font-mono text-[10px] text-cream-dim/60 truncate">
              {shortenUA(v.userAgent)}
            </span>
            <span className="col-span-12 md:col-span-1 font-mono text-[10px] text-cream-dim md:text-right">
              {formatTime(v.createdAt)}
            </span>
          </li>
        )}
      </ul>
      {filtered.length > 200 &&
      <p className="mt-4 font-mono text-[10px] text-cream-dim/60 tracking-wider">
          Showing latest 200 — refine your search to see more.
        </p>
      }

      <ConfirmDialog
        open={!!confirm}
        busy={busy}
        onCancel={() => setConfirm(null)}
        onConfirm={() => confirm && runDelete(confirm.kind)}
        title={
        confirm?.kind === 'all' ?
        `Delete all ${allVisitsCount.toLocaleString()} visit logs?` :
        `Delete ${selected.size} selected visit${selected.size === 1 ? '' : 's'}?`
        }
        description="This permanently removes the records from Firestore. It cannot be undone."
        confirmLabel={
        confirm?.kind === 'all' ? 'Delete everything' : 'Delete selected'
        } />
      
    </div>);

}
function ContactsTab({
  items,
  kind



}: {items: Contact[];kind: 'feedback' | 'work';}) {
  const [q, setQ] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    kind: 'selected' | 'all';
  }>(null);
  useEffect(() => {
    const ids = new Set(items.map((c) => c.id));
    setSelected((prev) => {
      const next = new Set<string>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next.size === prev.size ? prev : next;
    });
  }, [items]);
  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter((c) => {
      if (unreadOnly && c.read) return false;
      if (!n) return true;
      return (
        c.name?.toLowerCase().includes(n) ||
        c.email?.toLowerCase().includes(n) ||
        c.message?.toLowerCase().includes(n) ||
        c.company?.toLowerCase().includes(n));

    });
  }, [items, q, unreadOnly]);
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const selectAllFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((c) => next.add(c.id));
      return next;
    });
  };
  const clearSelection = () => setSelected(new Set());
  const exportCsv = () => {
    const rows = [
    [
    'name',
    'email',
    'intent',
    'rating',
    'company',
    'budget',
    'message',
    'createdAt',
    'read'],

    ...filtered.map((c) => [
    c.name || '',
    c.email || '',
    c.intent,
    c.rating || '',
    c.company || '',
    c.budget || '',
    (c.message || '').replace(/\n/g, ' '),
    c.createdAt?.toDate?.().toISOString() || '',
    String(!!c.read)]
    )];

    downloadCsv(`${kind}.csv`, rows);
  };
  const runDelete = async (which: 'selected' | 'all') => {
    setBusy(true);
    try {
      if (which === 'all') {
        // Delete all items of this kind (not the whole collection, just these)
        await deleteContacts(items.map((c) => c.id));
      } else {
        await deleteContacts(Array.from(selected));
      }
      setSelected(new Set());
      setConfirm(null);
    } catch (e) {
      console.error(e);
      alert('Delete failed. Check console for details.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search name, email, message…" />
        
        <button
          onClick={() => setUnreadOnly((v) => !v)}
          className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border transition-colors ${unreadOnly ? 'border-amber text-amber' : 'border-moss text-cream-dim hover:text-amber hover:border-amber'}`}>
          
          <FilterIcon className="w-3 h-3" />
          Unread only
        </button>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border border-moss text-cream hover:border-amber hover:text-amber transition-colors">
          
          <DownloadIcon className="w-3 h-3" />
          Export CSV
        </button>
        <button
          onClick={() =>
          setConfirm({
            kind: 'all'
          })
          }
          disabled={items.length === 0}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border border-red-500/40 text-red-300 hover:border-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          
          <Trash2Icon className="w-3 h-3" />
          Clear all
        </button>
        <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim ml-auto">
          {filtered.length} / {items.length}
        </span>
      </div>

      <SelectionBar
        selectedCount={selected.size}
        onClear={clearSelection}
        onDelete={() =>
        setConfirm({
          kind: 'selected'
        })
        }
        extraAction={
        filtered.length > 0 &&
        <button
          onClick={selectAllFiltered}
          className="font-mono text-[10px] tracking-widest uppercase text-cream-dim hover:text-amber transition-colors">
          
              Select all filtered ({filtered.length})
            </button>

        }
        label={kind === 'work' ? 'inquiry' : 'feedback'} />
      

      <ContactsList
        items={filtered}
        kind={kind}
        selection={{
          selected,
          toggleOne
        }} />
      

      <ConfirmDialog
        open={!!confirm}
        busy={busy}
        onCancel={() => setConfirm(null)}
        onConfirm={() => confirm && runDelete(confirm.kind)}
        title={
        confirm?.kind === 'all' ?
        `Delete all ${items.length} ${kind === 'work' ? 'inquiries' : 'feedback submissions'}?` :
        `Delete ${selected.size} selected ${kind === 'work' ? 'inquir' : 'feedback'}${selected.size === 1 ? 'y' : selected.size > 0 && kind === 'work' ? 'ies' : 's'}?`
        }
        description="This permanently removes the records from Firestore. It cannot be undone."
        confirmLabel={
        confirm?.kind === 'all' ? 'Delete everything' : 'Delete selected'
        } />
      
    </div>);

}
function ContactsList({
  items,
  kind,
  compact,
  selection








}: {items: Contact[];kind: 'feedback' | 'work' | 'all';compact?: boolean;selection: {selected: Set<string>;toggleOne: (id: string) => void;} | null;}) {
  const [busy, setBusy] = useState<string>('');
  const handleToggleRead = async (c: Contact) => {
    setBusy(c.id);
    try {
      await markContactRead(c.id, !c.read);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy('');
    }
  };
  const handleDelete = async (c: Contact) => {
    if (
    !confirm(
      `Delete submission from ${c.name || c.email}? This cannot be undone.`
    ))

    return;
    setBusy(c.id);
    try {
      await deleteContact(c.id);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy('');
    }
  };
  if (items.length === 0) {
    return (
      <p className="font-mono text-xs text-cream-dim py-8">
        No {kind === 'all' ? 'submissions' : kind} yet.
      </p>);

  }
  return (
    <ul className="space-y-4">
      <AnimatePresence initial={false}>
        {items.map((c) => {
          const isSelected = selection?.selected.has(c.id) ?? false;
          return (
            <motion.li
              key={c.id}
              layout
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.98
              }}
              transition={{
                duration: 0.25
              }}
              className={`relative bg-deep border p-6 md:p-7 transition-colors ${isSelected ? 'border-amber bg-amber/5' : !c.read ? 'border-amber/50' : 'border-forest'}`}>
              
              {selection &&
              <div className="absolute top-5 left-5">
                  <Checkbox
                  checked={isSelected}
                  onChange={() => selection.toggleOne(c.id)}
                  ariaLabel={`Select submission from ${c.name}`} />
                
                </div>
              }
              {!c.read &&
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase bg-amber text-abyss px-2 py-0.5">
                  <CircleDotIcon className="w-2.5 h-2.5" />
                  New
                </span>
              }
              <div
                className={`flex items-start justify-between gap-4 mb-4 flex-wrap ${selection ? 'pl-8' : ''}`}>
                
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className={`font-mono text-[10px] tracking-widest uppercase px-2 py-1 ${c.intent === 'work' ? 'bg-amber text-abyss' : 'bg-moss/60 text-amber-bright'}`}>
                      
                      {c.intent === 'work' ? 'Inquiry' : 'Feedback'}
                    </span>
                    {c.rating &&
                    <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">
                        · {c.rating}
                      </span>
                    }
                  </div>
                  <div
                    className={`font-serif font-light text-cream leading-tight ${compact ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                    
                    {c.name || 'Anonymous'}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-xs text-amber hover:text-amber-bright transition-colors break-all">
                    
                    <MailIcon className="w-3 h-3" />
                    {c.email}
                  </a>
                </div>
                <div className="text-right">
                  {c.company &&
                  <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">
                      {c.company}
                    </div>
                  }
                  {c.budget &&
                  <div className="font-mono text-xs text-amber-bright mt-1">
                      {c.budget}
                    </div>
                  }
                  <div className="font-mono text-[10px] text-cream-dim/60 mt-1">
                    {formatTime(c.createdAt)}
                  </div>
                </div>
              </div>
              <p
                className={`text-cream-dim font-light leading-relaxed whitespace-pre-wrap ${selection ? 'pl-8' : ''} ${compact ? 'line-clamp-3' : ''}`}>
                
                {c.message}
              </p>
              <div
                className={`mt-5 pt-5 border-t border-forest flex items-center gap-2 flex-wrap ${selection ? 'pl-8' : ''}`}>
                
                <button
                  onClick={() => handleToggleRead(c)}
                  disabled={busy === c.id}
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-moss text-cream-dim hover:text-amber hover:border-amber transition-colors disabled:opacity-50">
                  
                  <CheckCheckIcon className="w-3 h-3" />
                  {c.read ? 'Mark unread' : 'Mark read'}
                </button>
                <a
                  href={`mailto:${c.email}?subject=${encodeURIComponent(c.intent === 'work' ? 'Re: your project inquiry' : 'Re: your feedback')}`}
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-moss text-cream-dim hover:text-amber hover:border-amber transition-colors">
                  
                  <MailIcon className="w-3 h-3" />
                  Reply
                </a>
                <button
                  onClick={() => handleDelete(c)}
                  disabled={busy === c.id}
                  className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-red-500/30 text-red-300/80 hover:text-red-300 hover:border-red-400 transition-colors disabled:opacity-50">
                  
                  <Trash2Icon className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </motion.li>);

        })}
      </AnimatePresence>
    </ul>);

}
function SelectionBar({
  selectedCount,
  onClear,
  onDelete,
  extraAction,
  label






}: {selectedCount: number;onClear: () => void;onDelete: () => void;extraAction?: React.ReactNode;label: string;}) {
  return (
    <AnimatePresence>
      {selectedCount > 0 &&
      <motion.div
        initial={{
          opacity: 0,
          y: -8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: -8
        }}
        transition={{
          duration: 0.2
        }}
        className="mb-4 flex items-center gap-3 flex-wrap bg-amber/10 border border-amber/40 px-4 py-3">
        
          <span className="font-mono text-xs tracking-widest uppercase text-amber">
            {selectedCount} {label}
            {selectedCount === 1 ? '' : 's'} selected
          </span>
          <span className="flex-1" />
          {extraAction}
          <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 bg-red-500/90 text-abyss hover:bg-red-400 transition-colors">
          
            <Trash2Icon className="w-3 h-3" />
            Delete selected
          </button>
          <button
          onClick={onClear}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-moss text-cream-dim hover:text-amber hover:border-amber transition-colors">
          
            <XIcon className="w-3 h-3" />
            Clear
          </button>
        </motion.div>
      }
    </AnimatePresence>);

}
function Checkbox({
  checked,
  onChange,
  ariaLabel




}: {checked: boolean;onChange: () => void;ariaLabel: string;}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? 'bg-amber border-amber' : 'border-moss hover:border-amber bg-transparent'}`}>
      
      {checked &&
      <svg
        viewBox="0 0 12 12"
        className="w-3 h-3 text-abyss"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5">
        
          <path
          d="M2 6.5L5 9.5L10 3.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
        
        </svg>
      }
    </button>);

}
function ConfirmDialog({
  open,
  busy,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel








}: {open: boolean;busy: boolean;onCancel: () => void;onConfirm: () => void;title: string;description: string;confirmLabel: string;}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        className="fixed inset-0 z-[80] bg-abyss/80 backdrop-blur-sm flex items-center justify-center px-6">
        
          <motion.div
          initial={{
            scale: 0.96,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          exit={{
            scale: 0.96,
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="w-full max-w-md bg-deep border border-red-500/40 p-8">
          
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center">
                <AlertTriangleIcon className="w-4 h-4 text-red-300" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-red-300">
                Destructive action
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-cream font-light leading-tight mb-3">
              {title}
            </h3>
            <p className="text-cream-dim font-light leading-relaxed text-sm mb-8">
              {description}
            </p>
            <div className="flex items-center justify-end gap-3 flex-wrap">
              <button
              onClick={onCancel}
              disabled={busy}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 border border-moss text-cream hover:border-amber hover:text-amber transition-colors disabled:opacity-50">
              
                Cancel
              </button>
              <button
              onClick={onConfirm}
              disabled={busy}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2.5 bg-red-500 text-abyss hover:bg-red-400 transition-colors disabled:opacity-60">
              
                {busy ?
              <>
                    <LoaderIcon className="w-3 h-3 animate-spin" />
                    Deleting…
                  </> :

              <>
                    <Trash2Icon className="w-3 h-3" />
                    {confirmLabel}
                  </>
              }
              </button>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}
function BarList({
  items,
  total






}: {items: {label: string;count: number;}[];total: number;}) {
  const max = Math.max(...items.map((i) => i.count), 1);
  if (items.length === 0) {
    return <p className="font-mono text-xs text-cream-dim py-8">No data yet.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((h) => {
        const pct = h.count / max * 100;
        const share = total ? (h.count / total * 100).toFixed(1) : '0.0';
        return (
          <li key={h.label} className="bg-deep border border-forest p-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-mono text-xs md:text-sm text-cream truncate">
                {h.label}
              </span>
              <span className="font-mono text-[10px] text-cream-dim shrink-0 tabular-nums">
                {h.count.toLocaleString()} · {share}%
              </span>
            </div>
            <div className="h-1 w-full bg-forest overflow-hidden">
              <div
                className="h-full bg-amber transition-all"
                style={{
                  width: `${pct}%`
                }} />
              
            </div>
          </li>);

      })}
    </ul>);

}
function SearchInput({
  value,
  onChange,
  placeholder




}: {value: string;onChange: (v: string) => void;placeholder?: string;}) {
  return (
    <div className="relative flex-1 min-w-[240px] max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream-dim" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-deep border border-forest pl-9 pr-3 py-2.5 font-mono text-xs text-cream placeholder:text-cream-dim/40 focus:outline-none focus:border-amber transition-colors" />
      
    </div>);

}
function SectionTitle({
  n,
  label,
  icon: Icon






}: {n: string;label: string;icon?: ComponentType<{className?: string;}>;}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-xs text-amber tracking-[0.3em]">{n}</span>
      <span className="w-12 h-px bg-moss" />
      {Icon && <Icon className="w-3.5 h-3.5 text-cream-dim" />}
      <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>);

}
function formatTime(ts?: Timestamp) {
  if (!ts?.toDate) return '—';
  const d = ts.toDate();
  const now = Date.now();
  const diff = now - d.getTime();
  const min = 60 * 1000;
  const hr = 60 * min;
  const day = 24 * hr;
  if (diff < min) return 'just now';
  if (diff < hr) return `${Math.floor(diff / min)}m ago`;
  if (diff < day) return `${Math.floor(diff / hr)}h ago`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  return d.toLocaleDateString();
}
function shortenUA(ua?: string) {
  if (!ua) return '—';
  const match = ua.match(/(Chrome|Firefox|Safari|Edge|OPR)\/[\d.]+/);
  const platform = ua.match(/\(([^)]+)\)/)?.[1]?.split(';')[0] || '';
  return [match?.[0], platform].filter(Boolean).join(' · ') || ua.slice(0, 40);
}
function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.
  map((r) =>
  r.
  map((cell) => {
    const s = String(cell ?? '');
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }).
  join(',')
  ).
  join('\n');
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}