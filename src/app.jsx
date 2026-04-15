const { useState, useEffect, useMemo, useCallback, useRef, Fragment } = React;

// ═══════════════════════════════════════════════════════════════
// CONSTANTS & HELPERS
// ═══════════════════════════════════════════════════════════════

const CAT_COLORS = {
  "Arrays & Hashing":"#4f8ff7","Two Pointers":"#22c55e","Sliding Window":"#eab308",
  "Stack":"#f97316","Binary Search":"#06b6d4","Linked List":"#a855f7",
  "Trees":"#10b981","Tries":"#14b8a6","Heap / Priority Queue":"#ec4899",
  "Graphs":"#6366f1","Dynamic Programming":"#f43f5e","Greedy":"#84cc16",
  "Backtracking":"#f59e0b","Intervals":"#8b5cf6","Math & Bit Manipulation":"#06b6d4",
  "String":"#ec4899","Design":"#f97316","Sorting & Searching":"#06b6d4","Matrix":"#8b5cf6",
};

const DIFF_COLORS = {
  Easy: { bg: "rgba(34,197,94,.12)", border: "rgba(34,197,94,.3)", text: "#4ade80" },
  Medium: { bg: "rgba(234,179,8,.12)", border: "rgba(234,179,8,.3)", text: "#fbbf24" },
  Hard: { bg: "rgba(239,68,68,.12)", border: "rgba(239,68,68,.3)", text: "#f87171" },
};

function useLocalStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch { return def; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [val]);
  return [val, setVal];
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

function App() {
  const [view, setView] = useState("problems"); // "problems" | "guide"
  const [solved, setSolved] = useLocalStorage("dsa_solved_v2", {});
  const [notes, setNotes] = useLocalStorage("dsa_notes_v2", {});
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideExpanded, setGuideExpanded] = useState({});

  const problems = ALL_PROBLEMS;
  const categories = ALL_CATEGORIES;

  // Stats
  const stats = useMemo(() => {
    const total = problems.length;
    const solvedCount = Object.values(solved).filter(Boolean).length;
    const easy = problems.filter(p => p.diff === "Easy").length;
    const med = problems.filter(p => p.diff === "Medium").length;
    const hard = problems.filter(p => p.diff === "Hard").length;
    const solvedEasy = problems.filter(p => p.diff === "Easy" && solved[p.id]).length;
    const solvedMed = problems.filter(p => p.diff === "Medium" && solved[p.id]).length;
    const solvedHard = problems.filter(p => p.diff === "Hard" && solved[p.id]).length;
    return { total, solvedCount, easy, med, hard, solvedEasy, solvedMed, solvedHard };
  }, [problems, solved]);

  // Filtered problems
  const filtered = useMemo(() => {
    return problems.filter(p => {
      if (catFilter !== "All" && p.cat !== catFilter) return false;
      if (diffFilter && p.diff !== diffFilter) return false;
      if (statusFilter === "done" && !solved[p.id]) return false;
      if (statusFilter === "todo" && solved[p.id]) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) ||
          p.pattern.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q);
      }
      return true;
    });
  }, [problems, catFilter, diffFilter, statusFilter, search, solved]);

  // Group by category
  const grouped = useMemo(() => {
    const map = {};
    for (const p of filtered) {
      if (!map[p.cat]) map[p.cat] = [];
      map[p.cat].push(p);
    }
    return map;
  }, [filtered]);

  const toggleSolved = (id) => {
    setSolved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const saveNote = (id, text) => {
    setNotes(prev => ({ ...prev, [id]: text }));
  };

  const exportProgress = () => {
    const data = { solved, notes, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'dsa_progress.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.solved) setSolved(data.solved);
          if (data.notes) setNotes(data.notes);
          alert('Progress imported successfully!');
        } catch { alert('Invalid file format'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 20px 80px" }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32, animation: "fadeIn .5s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", background: "linear-gradient(135deg, #4f8ff7, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DSA Mastery
            </h1>
            <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>
              {stats.total} problems · {categories.length} categories · Interactive guides · Progress tracking
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <NavBtn active={view === "problems"} onClick={() => setView("problems")}>Problems</NavBtn>
            <NavBtn active={view === "guide"} onClick={() => setView("guide")}>Learning Guides</NavBtn>
          </div>
        </div>
      </div>

      {view === "problems" ? (
        <>
          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24, animation: "fadeIn .5s ease .1s both" }}>
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Solved" value={stats.solvedCount} total={stats.total} color="var(--green)" />
            <StatCard label="Easy" value={`${stats.solvedEasy}/${stats.easy}`} color="#4ade80" />
            <StatCard label="Medium" value={`${stats.solvedMed}/${stats.med}`} color="#fbbf24" />
            <StatCard label="Hard" value={`${stats.solvedHard}/${stats.hard}`} color="#f87171" />
            <div style={{ background: "var(--bg2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
              <button onClick={exportProgress} style={smallBtnStyle}>Export Progress</button>
              <button onClick={importProgress} style={smallBtnStyle}>Import Progress</button>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, animation: "fadeIn .5s ease .2s both" }}>
            <CatTab active={catFilter === "All"} onClick={() => setCatFilter("All")} color="var(--accent)">All ({stats.total})</CatTab>
            {categories.map(cat => {
              const count = problems.filter(p => p.cat === cat).length;
              const solvedCat = problems.filter(p => p.cat === cat && solved[p.id]).length;
              return <CatTab key={cat} active={catFilter === cat} onClick={() => setCatFilter(cat)} color={CAT_COLORS[cat]}>
                {cat} ({solvedCat}/{count})
              </CatTab>;
            })}
          </div>

          {/* SEARCH & FILTERS */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, animation: "fadeIn .5s ease .3s both" }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems, patterns, tags..."
              style={inputStyle}
            />
            <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} style={selectStyle}>
              <option value="">All difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
              <option value="">All status</option>
              <option value="done">Solved</option>
              <option value="todo">Unsolved</option>
            </select>
          </div>

          {/* PROBLEMS TABLE */}
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", animation: "fadeIn .5s ease .4s both" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--bg2)" }}>
                  <th style={thStyle} width="36"></th>
                  <th style={thStyle} width="40">#</th>
                  <th style={{ ...thStyle, textAlign: "left" }}>Problem</th>
                  <th style={thStyle} width="80">Difficulty</th>
                  <th style={{ ...thStyle, textAlign: "left" }} width="15%">Pattern</th>
                  <th style={thStyle} width="60">Source</th>
                  <th style={thStyle} width="70"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(grouped).map(([cat, probs]) => (
                  <Fragment key={cat}>
                    {catFilter === "All" && (
                      <tr style={{ background: "var(--bg3)" }}>
                        <td colSpan={7} style={{ padding: "8px 14px", fontSize: 12, fontWeight: 600, color: CAT_COLORS[cat] || "var(--text2)", letterSpacing: ".03em" }}>
                          {cat} ({probs.filter(p => solved[p.id]).length}/{probs.length})
                        </td>
                      </tr>
                    )}
                    {probs.map(p => (
                      <ProblemRow key={p.id} p={p} solved={!!solved[p.id]} hasNote={!!notes[p.id]}
                        onToggle={() => toggleSolved(p.id)}
                        onOpen={() => setSelectedProblem(p)} />
                    ))}
                  </Fragment>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>
                    No problems match your filters.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* LEARNING GUIDES VIEW */
        <div style={{ animation: "fadeIn .5s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 32 }}>
            {categories.filter(c => GUIDES[c]).map(cat => (
              <GuideCard key={cat} cat={cat} guide={GUIDES[cat]} color={CAT_COLORS[cat]}
                onOpen={() => { setSelectedGuide(cat); setGuideExpanded({}); }} />
            ))}
          </div>
        </div>
      )}

      {/* PROBLEM DETAIL MODAL */}
      {selectedProblem && (
        <Modal onClose={() => setSelectedProblem(null)}>
          <ProblemDetail p={selectedProblem} solved={!!solved[selectedProblem.id]}
            note={notes[selectedProblem.id] || ""}
            onToggle={() => toggleSolved(selectedProblem.id)}
            onSaveNote={(text) => saveNote(selectedProblem.id, text)} />
        </Modal>
      )}

      {/* GUIDE DETAIL MODAL */}
      {selectedGuide && GUIDES[selectedGuide] && (
        <Modal onClose={() => setSelectedGuide(null)} wide>
          <GuideDetail cat={selectedGuide} guide={GUIDES[selectedGuide]}
            color={CAT_COLORS[selectedGuide]}
            problems={problems.filter(p => p.cat === selectedGuide)}
            solved={solved}
            expanded={guideExpanded}
            setExpanded={setGuideExpanded} />
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function NavBtn({ active, onClick, children }) {
  return <button onClick={onClick} style={{
    padding: "8px 18px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font)",
    borderRadius: 20, border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
    background: active ? "rgba(79,143,247,.12)" : "transparent",
    color: active ? "var(--accent)" : "var(--text2)", cursor: "pointer",
    transition: "all .15s",
  }}>{children}</button>;
}

function StatCard({ label, value, total, color }) {
  const pct = total ? Math.round((parseInt(value) / total) * 100) : null;
  return (
    <div style={{ background: "var(--bg2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: color || "var(--text)" }}>{value}</div>
      {pct !== null && (
        <div style={{ height: 3, background: "var(--border)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: pct + "%", background: color || "var(--accent)", borderRadius: 2, transition: "width .5s" }} />
        </div>
      )}
    </div>
  );
}

function CatTab({ active, onClick, color, children }) {
  return <button onClick={onClick} style={{
    padding: "5px 14px", fontSize: 12, fontWeight: 500, fontFamily: "var(--font)",
    borderRadius: 20, cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
    border: active ? `1px solid ${color}` : "1px solid var(--border)",
    background: active ? `${color}18` : "transparent",
    color: active ? color : "var(--text2)",
  }}>{children}</button>;
}

function ProblemRow({ p, solved, hasNote, onToggle, onOpen }) {
  const dc = DIFF_COLORS[p.diff];
  return (
    <tr style={{ cursor: "pointer" }} onClick={onOpen}>
      <td style={tdStyle} onClick={e => { e.stopPropagation(); onToggle(); }}>
        <input type="checkbox" checked={solved} readOnly style={{ width: 15, height: 15, cursor: "pointer", accentColor: "var(--green)" }} />
      </td>
      <td style={{ ...tdStyle, color: "var(--text3)", fontSize: 12 }}>{p.id}</td>
      <td style={{ ...tdStyle, textAlign: "left" }}>
        <span style={{ fontWeight: 500, color: solved ? "var(--green)" : "var(--text)" }}>
          {solved && <span style={{ marginRight: 6, fontSize: 10, color: "var(--green)" }}>✓</span>}
          {p.title}
        </span>
        {hasNote && <span style={{ marginLeft: 6, fontSize: 10, color: "var(--text3)" }}>📝</span>}
      </td>
      <td style={tdStyle}>
        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>
          {p.diff}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: "left", fontSize: 12, color: "var(--text2)" }}>{p.pattern}</td>
      <td style={{ ...tdStyle, fontSize: 11, color: "var(--text3)" }}>
        <a href={p.link} target="_blank" rel="noopener" onClick={e => e.stopPropagation()} style={{ color: "var(--accent)", textDecoration: "none" }}>{p.src} ↗</a>
      </td>
      <td style={tdStyle}>
        <button style={{ fontSize: 11, padding: "3px 10px", border: "1px solid var(--border)", borderRadius: 4, background: "none", color: "var(--text2)", cursor: "pointer", fontFamily: "var(--font)" }}>Details</button>
      </td>
    </tr>
  );
}

function ProblemDetail({ p, solved, note, onToggle, onSaveNote }) {
  const [localNote, setLocalNote] = useState(note);
  const [saved, setSaved] = useState(false);
  const dc = DIFF_COLORS[p.diff];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>{p.title}</h2>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ padding: "2px 10px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>{p.diff}</span>
            <span style={tagStyle}>{p.cat}</span>
            <span style={tagStyle}>{p.pattern}</span>
            <a href={p.link} target="_blank" rel="noopener" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>View on {p.src} ↗</a>
          </div>
        </div>
        <button onClick={onToggle} style={{
          padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
          background: solved ? "var(--green)" : "var(--bg3)", color: solved ? "#000" : "var(--text)",
        }}>
          {solved ? "✓ Solved" : "Mark Solved"}
        </button>
      </div>

      <Section title="Problem">{p.desc}</Section>
      <Section title="Approach / Hint">
        <div style={{ padding: 14, background: "rgba(79,143,247,.06)", borderRadius: 8, border: "1px solid rgba(79,143,247,.15)", lineHeight: 1.7 }}>{p.hint}</div>
      </Section>
      <Section title="Solution (JavaScript)">
        <pre style={codeBlockStyle}>{p.code}</pre>
      </Section>
      <Section title="Complexity">
        <span style={{ color: "var(--text2)" }}>{p.complex}</span>
      </Section>
      <Section title="Key Concepts">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.tags.map(t => <span key={t} style={tagStyle}>{t}</span>)}
        </div>
      </Section>
      <Section title="Your Notes">
        <textarea value={localNote} onChange={e => setLocalNote(e.target.value)}
          placeholder="Write your notes, edge cases, approach..."
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", fontFamily: "var(--font)", fontSize: 13, resize: "vertical", minHeight: 80, background: "var(--bg)", color: "var(--text)", outline: "none" }} />
        <button onClick={() => { onSaveNote(localNote); setSaved(true); setTimeout(() => setSaved(false), 1500); }}
          style={{ marginTop: 8, padding: "6px 18px", fontSize: 13, border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg3)", color: "var(--text)", cursor: "pointer", fontFamily: "var(--font)" }}>
          {saved ? "✓ Saved!" : "Save Note"}
        </button>
      </Section>
    </div>
  );
}

function GuideCard({ cat, guide, color, onOpen }) {
  return (
    <div onClick={onOpen} style={{
      background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px",
      cursor: "pointer", transition: "all .2s", borderLeft: `3px solid ${color}`,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.borderColor = color; }}
    onMouseLeave={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{guide.icon}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color }}>{cat}</span>
      </div>
      <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.6 }}>{guide.tagline}</p>
      <div style={{ marginTop: 12, fontSize: 12, color: "var(--accent)" }}>Open Guide →</div>
    </div>
  );
}

function GuideDetail({ cat, guide, color, problems, solved, expanded, setExpanded }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 28 }}>{guide.icon}</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color }}>{cat}</h2>
      </div>
      <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>{guide.tagline}</p>

      <Section title="Overview">
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, fontSize: 14, color: "var(--text)" }}>{guide.overview}</div>
      </Section>

      <Section title="When to Use">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.whenToUse.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color, fontWeight: 700, fontSize: 12, marginTop: 2 }}>→</span>
              <span style={{ fontSize: 14, lineHeight: 1.6 }}>{w}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Key Patterns">
        {guide.keyPatterns.map((pat, i) => (
          <div key={i} style={{ marginBottom: 16, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--bg3)", border: "none", cursor: "pointer", color: "var(--text)", fontFamily: "var(--font)", fontSize: 14, fontWeight: 600, textAlign: "left" }}>
              <span>{pat.name}</span>
              <span style={{ fontSize: 12, color: "var(--text3)" }}>{expanded[i] ? "▾" : "▸"}</span>
            </button>
            {expanded[i] && (
              <div style={{ padding: 16, animation: "fadeIn .2s ease" }}>
                <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{pat.desc}</p>
                <pre style={codeBlockStyle}>{pat.code}</pre>
              </div>
            )}
          </div>
        ))}
      </Section>

      <Section title="Complexity">
        <span style={{ fontSize: 14, color: "var(--text2)" }}>{guide.complexity}</span>
      </Section>

      <Section title="Pro Tips">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.tips.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--yellow)", fontSize: 12, marginTop: 2 }}>💡</span>
              <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Practice Problems (${problems.length})`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {problems.map(p => {
            const dc = DIFF_COLORS[p.diff];
            const isSolved = solved[p.id];
            return (
              <a key={p.id} href={p.link} target="_blank" rel="noopener"
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 6, textDecoration: "none", color: "var(--text)", background: isSolved ? "rgba(34,197,94,.06)" : "transparent", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                onMouseLeave={e => e.currentTarget.style.background = isSolved ? "rgba(34,197,94,.06)" : "transparent"}>
                {isSolved && <span style={{ color: "var(--green)", fontSize: 12 }}>✓</span>}
                <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{p.title}</span>
                <span style={{ padding: "1px 8px", borderRadius: 4, fontSize: 10, fontWeight: 500, background: dc.bg, color: dc.text }}>{p.diff}</span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>{p.src} ↗</span>
              </a>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>{title}</div>
      {typeof children === "string" ? <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>{children}</div> : children}
    </div>
  );
}

function Modal({ onClose, children, wide }) {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)", animation: "fadeIn .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--bg2)", borderRadius: 16, border: "1px solid var(--border)",
        padding: "28px 28px 24px", width: wide ? "min(900px, 94vw)" : "min(700px, 94vw)",
        maxHeight: "85vh", overflowY: "auto", position: "relative", animation: "slideUp .3s ease",
      }}>
        <button onClick={onClose} style={{
          position: "sticky", top: 0, float: "right", background: "var(--bg3)", border: "1px solid var(--border)",
          borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: "var(--text2)", fontSize: 14, zIndex: 10,
        }}>✕</button>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const thStyle = { padding: "10px 12px", textAlign: "center", fontWeight: 600, fontSize: 11, color: "var(--text3)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 2, textTransform: "uppercase", letterSpacing: ".04em" };
const tdStyle = { padding: "10px 12px", borderBottom: "1px solid var(--border)", textAlign: "center", verticalAlign: "middle" };
const tagStyle = { display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 11, background: "var(--bg3)", color: "var(--text2)", border: "1px solid var(--border)" };
const inputStyle = { flex: 1, minWidth: 200, padding: "9px 14px", fontSize: 13, border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", color: "var(--text)", outline: "none", fontFamily: "var(--font)" };
const selectStyle = { padding: "9px 14px", fontSize: 13, border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", color: "var(--text)", cursor: "pointer", outline: "none", fontFamily: "var(--font)" };
const codeBlockStyle = { background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "16px 18px", fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.7, overflowX: "auto", whiteSpace: "pre", color: "#c9d1d9" };
const smallBtnStyle = { padding: "5px 12px", fontSize: 11, border: "1px solid var(--border)", borderRadius: 6, background: "var(--bg3)", color: "var(--text2)", cursor: "pointer", fontFamily: "var(--font)" };

// Render
ReactDOM.render(<App />, document.getElementById("root"));
