"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory, CATEGORY_COLORS } from "@/lib/types";

const EMPTY_FORM = {
  title: "",
  description: "",
  long_description: "",
  tags: "",
  category: "Web" as ProjectCategory,
  github_url: "",
  demo_url: "",
  image_url: "",
};

const CATEGORIES: ProjectCategory[] = ["IoT", "Embedded", "Web", "AI", "Other"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function login() {
    setLoading(true);
    setAuthError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadProjects();
    } else {
      setAuthError("ACCESS DENIED. Invalid credentials.");
    }
    setLoading(false);
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  }

  async function loadProjects() {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }

  async function addProject() {
    setSaving(true);
    setMsg("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setMsg("Project added successfully.");
      setForm(EMPTY_FORM);
      loadProjects();
    } else {
      const data = await res.json();
      setMsg(`Error: ${data.error}`);
    }
    setSaving(false);
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) loadProjects();
  }

  // ── Login screen ─────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center p-4">
        <div className="w-full max-w-sm glow-card p-8" style={{ background: "var(--void-1)" }}>
          {/* Header */}
          <div className="text-center mb-8">
            <p className="font-mono text-xs text-violet-glow tracking-widest mb-2">
              ADMIN ACCESS
            </p>
            <p className="font-mono text-lg text-text-primary">RESTRICTED AREA</p>
            <div className="w-8 h-px bg-violet-glow mx-auto mt-3 opacity-60" />
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="password"
              className="sci-input"
              placeholder="Enter access code..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              autoFocus
            />
            {authError && (
              <p className="font-mono text-xs text-red-400">{authError}</p>
            )}
            <button
              onClick={login}
              disabled={loading || !password}
              className="sci-btn w-full text-center justify-center disabled:opacity-40"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin panel ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-void py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="mono-label mb-1">ADMIN PANEL</p>
            <h1 className="font-mono text-2xl text-text-primary">Project Manager</h1>
          </div>
          <div className="flex gap-3">
            <a href="/" className="sci-btn text-sm">← back to site</a>
            <button onClick={logout} className="sci-btn text-sm" style={{ color: "var(--text-dim)" }}>
              logout
            </button>
          </div>
        </div>

        {/* Add project form */}
        <div className="glow-card p-6 mb-10" style={{ background: "var(--void-1)" }}>
          <h2 className="font-mono text-sm font-medium text-violet-glow mb-6">
            + Add New Project
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-text-dim">Title *</label>
              <input
                className="sci-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Project name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-text-dim">Category *</label>
              <select
                className="sci-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label className="font-mono text-xs text-text-dim">Short description *</label>
            <input
              className="sci-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="One-liner shown on the card"
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label className="font-mono text-xs text-text-dim">Full description</label>
            <textarea
              className="sci-input resize-none h-24"
              value={form.long_description}
              onChange={(e) => setForm({ ...form, long_description: e.target.value })}
              placeholder="Detailed description shown in the modal"
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label className="font-mono text-xs text-text-dim">Tags (comma-separated)</label>
            <input
              className="sci-input"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="ESP32, MQTT, Python"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-text-dim">GitHub URL</label>
              <input
                className="sci-input"
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-text-dim">Demo URL</label>
              <input
                className="sci-input"
                value={form.demo_url}
                onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-text-dim">Image URL</label>
              <input
                className="sci-input"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://...supabase.co/..."
              />
            </div>
          </div>

          {msg && (
            <p className={`font-mono text-xs mb-4 ${msg.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
              {msg}
            </p>
          )}

          <button
            onClick={addProject}
            disabled={saving || !form.title || !form.description}
            className="sci-btn disabled:opacity-40"
          >
            {saving ? "SAVING..." : "ADD PROJECT"}
          </button>
        </div>

        {/* Projects list */}
        <div>
          <h2 className="font-mono text-sm font-medium text-violet-glow mb-4">
            Existing Projects ({projects.length})
          </h2>
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="glow-card p-4 flex items-start justify-between gap-4"
                style={{ background: "var(--void-1)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-mono text-xs px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[p.category]}`}>
                      {p.category}
                    </span>
                    <h3 className="font-mono text-sm text-text-primary truncate">{p.title}</h3>
                  </div>
                  <p className="text-xs text-text-dim truncate">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tags.slice(0, 5).map((t) => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteProject(p.id)}
                  className="font-mono text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/60 px-3 py-1.5 rounded transition-all shrink-0"
                >
                  delete
                </button>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="font-mono text-xs text-text-dim py-6 text-center">
                No projects yet. Add your first one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
