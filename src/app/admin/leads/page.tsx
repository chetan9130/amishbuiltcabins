"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Shield,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");

  const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "QUOTE_SENT", "FOLLOW_UP", "WON", "LOST"];
  const SOURCES = ["CONTACT_FORM", "AI_CHAT", "QUOTE_WIZARD", "FLOOR_PLAN_UPLOAD", "WEBSITE"];

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/leads", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (sourceFilter !== "ALL") url.searchParams.set("source", sourceFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setLeads(json.data || []);
      }
    } catch (e) {
      console.error("Error loading leads:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sourceFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete lead inquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert(json.error?.message || "Failed to delete lead.");
      }
    } catch (e) {
      alert("Failed to delete lead.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Lead Inquiries & Customer Intake
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review incoming consultation requests, AI chat interactions, and blueprint uploads (Phase 3 foundation).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchLeads();
          }}
          className="relative w-full md:w-80"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, location..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-800 font-semibold focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-800 font-semibold focus:outline-none"
            >
              <option value="ALL">All Sources</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading leads...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No customer inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Location / ZIP</th>
                  <th className="py-3.5 px-4">Details / Notes</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a href={`mailto:${lead.email}`} className="hover:underline">
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone && (
                        <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <a href={`tel:${lead.phone}`} className="hover:underline">
                            {lead.phone}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {lead.location || lead.zip || "Not provided"}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs">
                      {lead.enquiryDetails && (
                        <div className="italic text-gray-800 line-clamp-2">
                          &ldquo;{lead.enquiryDetails}&rdquo;
                        </div>
                      )}
                      {lead.notes && (
                        <div className="text-[10px] text-gray-400 mt-1">Note: {lead.notes}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white border border-gray-200 text-gray-800 focus:outline-none"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(lead.id, lead.name)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
