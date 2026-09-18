"use client";

import { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Home,
} from "lucide-react";

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const STATUSES = ["PENDING", "REVIEWED", "ESTIMATE_SENT", "ACCEPTED", "DECLINED"];

  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/quotations", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setQuotations(json.data || []);
      }
    } catch (e) {
      console.error("Error loading quotations:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/quotations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setQuotations((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
      }
    } catch (e) {
      alert("Failed to update quotation status.");
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (!confirm(`Delete quotation from "${customerName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/quotations/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setQuotations((prev) => prev.filter((q) => q.id !== id));
      } else {
        alert(json.error?.message || "Failed to delete quotation.");
      }
    } catch (e) {
      alert("Failed to delete quotation.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Quotation Submissions
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review pricing calculations, selected add-ons, and sizing configurations submitted through the Quote Wizard (Phase 3 foundation).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchQuotations();
          }}
          className="relative w-full sm:w-80"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, email, or model..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
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
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading quote records...</span>
          </div>
        ) : quotations.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No quote submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Configured Model</th>
                  <th className="py-3.5 px-4">Size & Options</th>
                  <th className="py-3.5 px-4">Estimated Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotations.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{quote.customerName}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a href={`mailto:${quote.customerEmail}`} className="hover:underline">
                          {quote.customerEmail}
                        </a>
                      </div>
                      {quote.customerPhone && (
                        <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{quote.customerPhone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-[#e20b16]" />
                        <span>{quote.modelName || "Custom Configuration"}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {quote.timeline ? `Timeline: ${quote.timeline}` : ""}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 text-[11px]">
                      <div>{quote.sqft ? `${quote.sqft.toLocaleString()} sq ft` : "Standard Size"}</div>
                      {quote.requirements && (
                        <div className="italic text-gray-500 line-clamp-1 mt-0.5">
                          {quote.requirements}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-[#e20b16]">
                        {quote.estimatedAmount ? `$${quote.estimatedAmount.toLocaleString()}` : "Pending Estimate"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={quote.status}
                        onChange={(e) => handleStatusChange(quote.id, e.target.value)}
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
                      {new Date(quote.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(quote.id, quote.customerName)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Quote"
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
