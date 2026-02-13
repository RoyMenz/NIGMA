import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../lib/apiClient';
const TOKEN_KEY = 'nigma_admin_token';
const DEFAULT_EMAIL = 'developers@nigmafest.in';

type EventSummary = {
  eventId: number;
  eventName: string;
  minMembers: number;
  maxMembers: number;
  registrationsCount: number;
  participantsCount: number;
};

type RegistrationMember = {
  fullName: string;
  college: string;
  city: string;
  phone: string;
};

type EventRegistration = {
  registrationId: number;
  eventId: number;
  createdAt: string;
  members: RegistrationMember[];
};

type OverviewData = {
  dailyRegistrations: Array<{ date: string; count: number }>;
  topColleges: Array<{ name: string; count: number }>;
  topCities: Array<{ name: string; count: number }>;
};

type SummaryResponse = {
  totals: { events: number; registrations: number; participants: number };
  events: EventSummary[];
};

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

const AdminApp: React.FC = () => {
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) ?? '');
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [dataError, setDataError] = useState('');

  const sortedEvents = useMemo(
    () => [...(summary?.events ?? [])].sort((a, b) => a.eventId - b.eventId),
    [summary],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setSummary(null);
    setOverview(null);
    setRegistrations([]);
    setSelectedEventId(null);
    setPassword('');
  }, []);

  const loadSummaryAndInsights = useCallback(
    async (activeToken: string) => {
      const [summaryRes, overviewRes] = await Promise.all([
        apiFetch('/api/admin/events-summary', { headers: authHeader(activeToken) }),
        apiFetch('/api/admin/insights/overview', { headers: authHeader(activeToken) }),
      ]);

      if (summaryRes.status === 401 || overviewRes.status === 401) {
        logout();
        throw new Error('Session expired. Please login again.');
      }
      if (!summaryRes.ok) throw new Error(`Could not load events summary (${summaryRes.status})`);
      if (!overviewRes.ok) throw new Error(`Could not load insights (${overviewRes.status})`);

      const summaryJson = await summaryRes.json();
      const overviewJson = await overviewRes.json();
      const nextSummary = summaryJson.data as SummaryResponse;
      setSummary(nextSummary);
      setOverview(overviewJson.data as OverviewData);

      const firstEventId = nextSummary.events[0]?.eventId ?? null;
      setSelectedEventId((curr) => curr ?? firstEventId);
    },
    [logout],
  );

  const loadRegistrations = useCallback(
    async (activeToken: string, eventId: number) => {
      const response = await apiFetch(`/api/admin/events/${eventId}/registrations`, {
        headers: authHeader(activeToken),
      });
      if (response.status === 401) {
        logout();
        throw new Error('Session expired. Please login again.');
      }
      if (!response.ok) throw new Error(`Could not load registrations (${response.status})`);
      const json = await response.json();
      setRegistrations((json.data as EventRegistration[]) ?? []);
    },
    [logout],
  );

  useEffect(() => {
    if (!token) return;
    let isCancelled = false;
    (async () => {
      try {
        setLoading(true);
        setDataError('');
        await loadSummaryAndInsights(token);
      } catch (err) {
        if (!isCancelled) setDataError(err instanceof Error ? err.message : 'Failed loading admin data');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();
    return () => {
      isCancelled = true;
    };
  }, [token, loadSummaryAndInsights]);

  useEffect(() => {
    if (!token || !selectedEventId) return;
    let isCancelled = false;
    (async () => {
      try {
        setLoading(true);
        setDataError('');
        await loadRegistrations(token, selectedEventId);
      } catch (err) {
        if (!isCancelled) setDataError(err instanceof Error ? err.message : 'Failed loading registrations');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();
    return () => {
      isCancelled = true;
    };
  }, [token, selectedEventId, loadRegistrations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      setLoading(true);
      const response = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setAuthError(response.status === 401 ? 'Invalid email or password.' : 'Login failed.');
        return;
      }
      const json = await response.json();
      const nextToken = String(json?.data?.token ?? '');
      if (!nextToken) {
        setAuthError('Login failed.');
        return;
      }
      localStorage.setItem(TOKEN_KEY, nextToken);
      setToken(nextToken);
      setPassword('');
    } catch {
      setAuthError('Network error while logging in.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0b1420] text-white flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-[#111c2d] border border-white/10 rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-bold">NIGMA Admin Login</h1>
          <p className="text-sm text-white/70">Use admin credentials to view registrations and insights.</p>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full rounded-lg bg-[#0b1420] border border-white/20 p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="w-full rounded-lg bg-[#0b1420] border border-white/20 p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {authError ? <p className="text-red-400 text-sm">{authError}</p> : null}
          <button
            className="w-full rounded-lg bg-[#c9a24d] text-[#0b1420] font-semibold p-2 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1420] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">NIGMA Admin Dashboard</h1>
          <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10" onClick={logout} type="button">
            Logout
          </button>
        </div>

        {dataError ? <p className="text-red-400">{dataError}</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4">
            <p className="text-sm text-white/70">Total Events</p>
            <p className="text-2xl font-semibold">{summary?.totals.events ?? 0}</p>
          </div>
          <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4">
            <p className="text-sm text-white/70">Total Registrations</p>
            <p className="text-2xl font-semibold">{summary?.totals.registrations ?? 0}</p>
          </div>
          <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4">
            <p className="text-sm text-white/70">Total Participants</p>
            <p className="text-2xl font-semibold">{summary?.totals.participants ?? 0}</p>
          </div>
        </div>

        <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4 space-y-3">
          <h2 className="text-lg font-semibold">Event Summary</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-white/70 border-b border-white/10">
                  <th className="py-2 pr-4">Event ID</th>
                  <th className="py-2 pr-4">Event Name</th>
                  <th className="py-2 pr-4">Team Size</th>
                  <th className="py-2 pr-4">Registrations</th>
                  <th className="py-2 pr-4">Participants</th>
                </tr>
              </thead>
              <tbody>
                {sortedEvents.map((event) => (
                  <tr key={event.eventId} className="border-b border-white/5">
                    <td className="py-2 pr-4">{event.eventId}</td>
                    <td className="py-2 pr-4">{event.eventName}</td>
                    <td className="py-2 pr-4">
                      {event.minMembers === event.maxMembers ? event.minMembers : `${event.minMembers}-${event.maxMembers}`}
                    </td>
                    <td className="py-2 pr-4">{event.registrationsCount}</td>
                    <td className="py-2 pr-4">{event.participantsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4 space-y-2">
            <h2 className="text-lg font-semibold">Top Colleges</h2>
            {(overview?.topColleges ?? []).map((row) => (
              <div className="flex justify-between text-sm border-b border-white/5 py-1" key={row.name}>
                <span>{row.name}</span>
                <span>{row.count}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4 space-y-2">
            <h2 className="text-lg font-semibold">Top Cities</h2>
            {(overview?.topCities ?? []).map((row) => (
              <div className="flex justify-between text-sm border-b border-white/5 py-1" key={row.name}>
                <span>{row.name}</span>
                <span>{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-lg font-semibold">Registrations by Event</h2>
            <select
              className="rounded-lg bg-[#0b1420] border border-white/20 p-2"
              value={selectedEventId ?? ''}
              onChange={(e) => setSelectedEventId(Number(e.target.value))}
            >
              {sortedEvents.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventId} - {event.eventName}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-white/70 border-b border-white/10">
                  <th className="py-2 pr-4">Registration ID</th>
                  <th className="py-2 pr-4">Created At</th>
                  <th className="py-2 pr-4">Members</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r.registrationId} className="border-b border-white/5 align-top">
                    <td className="py-2 pr-4">{r.registrationId}</td>
                    <td className="py-2 pr-4">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <div className="space-y-1">
                        {r.members.map((m, idx) => (
                          <div key={`${r.registrationId}-${idx}`} className="text-xs text-white/90">
                            {m.fullName} | {m.college} | {m.city} | {m.phone}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 ? (
                  <tr>
                    <td className="py-3 text-white/70" colSpan={3}>
                      No registrations for this event.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#111c2d] border border-white/10 rounded-xl p-4 space-y-2">
          <h2 className="text-lg font-semibold">Daily Registrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {(overview?.dailyRegistrations ?? []).map((row) => (
              <div className="rounded-lg bg-[#0b1420] border border-white/10 p-2 text-sm" key={row.date}>
                <p className="text-white/70">{row.date}</p>
                <p className="font-semibold">{row.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
