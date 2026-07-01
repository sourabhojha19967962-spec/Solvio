'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  Building2,
  Clock,
  RefreshCw,
  Download,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WaitlistEntry {
  email: string;
  company: string;
  joinedAt: string;
}

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWaitlist = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist');
      const data = await res.json();
      if (res.ok) {
        setEntries(data.entries || []);
        setCount(data.count || 0);
      } else {
        setError(data.error || 'Failed to load');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const exportCSV = () => {
    const header = 'Email,Company,Joined At\n';
    const rows = entries.map(e =>
      `"${e.email}","${e.company}","${new Date(e.joinedAt).toLocaleDateString()}"`
    ).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solvio-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Solvio
            </a>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h1 className="text-lg font-bold text-slate-900">Admin</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV} disabled={entries.length === 0} className="gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={fetchWaitlist} className="gap-1.5">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-xs text-slate-500">Total Signups</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {entries.filter(e => e.company).length}
                </div>
                <div className="text-xs text-slate-500">With Company</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {entries.length > 0
                    ? new Date(entries[0].joinedAt).toLocaleDateString()
                    : '—'}
                </div>
                <div className="text-xs text-slate-500">Latest Signup</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Waitlist Table */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Waitlist Entries</h2>
            <Badge variant="outline" className="text-xs">
              {count} total
            </Badge>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin" />
              Loading...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No signups yet. Share your demo link to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry, i) => (
                    <tr key={entry.email} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {count - i}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-900">{entry.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {entry.company || <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {new Date(entry.joinedAt).toLocaleDateString()} {new Date(entry.joinedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
