import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import SEO from '../components/seo/SEO';
import { ChevronRight, ExternalLink, Plus, Minus } from 'lucide-react';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import FlipText from '../components/ui/FlipText';
import { EXTERNAL_LINKS } from '../utils/constants';
import './FrostyPage.css';

function Icon({ n }: { n: string }) {
    const p = {
        snow: <path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M3.3 7l17.4 10M3.3 7l1.1 4.1M3.3 7l4.1-1.1M20.7 17l-4.1 1.1M20.7 17l-1.1-4.1M20.7 7L3.3 17M20.7 7l-4.1-1.1M20.7 7l-1.1 4.1M3.3 17l4.1 1.1M3.3 17l1.1-4.1" />,
        arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
        chat: <path d="M4 5h16v11H8l-4 4V5z" />,
        wa: <path d="M4 20l1.4-4A8 8 0 1112 20a8 8 0 01-6.6-3.5M9 10.5c.4 2 2.5 4.1 4.5 4.5.7.1 1.3-.5 1.5-1l-1.6-1-1 .7c-.8-.4-1.4-1-1.8-1.8l.7-1-1-1.6c-.5.2-1.1.8-1 1.5z" />,
        brain: <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 007 18a3 3 0 003 2V4zM15 4a3 3 0 013 3 3 3 0 011 5.8A3 3 0 0117 18a3 3 0 01-3 2V4z" />,
        cal: <path d="M4 6h16v14H4V6zM4 10h16M8 3v4M16 3v4M9 14h2M14 14h2" />,
        doc: <path d="M7 3h7l4 4v14H7V3zM14 3v4h4M9 12h7M9 16h7" />,
        user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0" />,
        hand: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0111.5-5.5M17 15l2 2 3-3" />,
        bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
        layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
        model: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v10M7 12h10M8.5 8.5l7 7M15.5 8.5l-7 7" />,
        plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 01-10 0V9zM12 17v4" />,
        shield: <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />,
        infinity: <path d="M6 9a3 3 0 100 6c2 0 3-2 6-3s4-3 6-3a3 3 0 110 6c-2 0-3-2-6-3S8 9 6 9z" />,
        chart: <path d="M4 20V4M4 20h16M8 16l3-4 3 2 4-6" />,
        check: <path d="M4 12l5 5L20 6" />,
        spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" />,
        globe: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />,
        /* industry glyphs — same 24px box, 1.6 stroke, round joins as the set above */
        /* a cart, not a bag — the bag silhouette reads as a waste bin at 25px */
        bag: <path d="M2.6 4.6h2.3l2.5 10.6h9.4l2.2-7.5H6.4M9.6 19.4a1.3 1.3 0 10-.1-2.6 1.3 1.3 0 00.1 2.6zM17 19.4a1.3 1.3 0 10-.1-2.6 1.3 1.3 0 00.1 2.6z" />,
        house: <path d="M3.5 11L12 4.6l8.5 6.4M6 9.9V20h12V9.9M10 20v-5.4h4V20" />,
        /* medical kit: a plain plus-in-circle reads as an "add" button */
        cross: <path d="M3.8 8.6h16.4v10.6H3.8zM9 8.6V6.7a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v1.9M12 11.2v5M9.5 13.7h5" />,
        cap: <path d="M2.6 9.4L12 5l9.4 4.4L12 13.8 2.6 9.4zM6.6 11.6V16c0 1.4 2.4 2.6 5.4 2.6s5.4-1.2 5.4-2.6v-4.4M20.4 10v4.6" />,
        /* second arc reads as broadcast, so it isn't mistaken for a volume icon */
        horn: <path d="M3.6 10.2v3.6a1 1 0 001 1h2.2l6.4 3.8V5.4L6.8 9.2H4.6a1 1 0 00-1 1zM16.8 9.2a4.2 4.2 0 010 5.6M19.4 7.2a7.6 7.6 0 010 9.6" />,
        /* wheels + roofline: without them this was indistinguishable from the sofa glyph */
        car: <path d="M3.6 14.4h16.8M6 14.4l1.7-5a1.2 1.2 0 011.1-.8h6.4a1.2 1.2 0 011.1.8l1.7 5M7.8 11.4h8.4M4.4 14.4v2.8M19.6 14.4v2.8M8.4 17.6a1.3 1.3 0 10-.1-2.6 1.3 1.3 0 00.1 2.6zM15.6 17.6a1.3 1.3 0 10-.1-2.6 1.3 1.3 0 00.1 2.6z" />,
        bank: <path d="M3.4 9.6L12 4.8l8.6 4.8M5.6 10.4v7.8M9.8 10.4v7.8M14.2 10.4v7.8M18.4 10.4v7.8M3 19.4h18" />,
        plane: <path d="M20.8 3.4L3.4 10.4l7.1 3.2 3.2 7.1 7.1-17.3z" />,
        sofa: <path d="M4.8 12.4V9.8a2 2 0 012-2h10.4a2 2 0 012 2v2.6M3.2 12.4h17.6V17H3.2v-4.6zM6.4 17v2.2M17.6 17v2.2" />,
        /* wrench, so it doesn't collide with the medical-kit glyph */
        tools: <path d="M17.4 4.6a4.6 4.6 0 00-6.1 6.1l-6.6 6.6a1.9 1.9 0 002.7 2.7l6.6-6.6a4.6 4.6 0 006.1-6.1l-2.9 2.9-2.7-.6-.6-2.7 2.9-2.9z" />,
        scales: <path d="M12 4.4v15M7.6 19.4h8.8M4.6 8.4h14.8M4.6 8.4L2.5 13a2.4 2.4 0 004.2 0L4.6 8.4zM19.4 8.4L17.3 13a2.4 2.4 0 004.2 0l-2.1-4.6z" />,
        /* longer bars — the previous plates were too short and read as brackets */
        bell: <path d="M6.6 7v10M17.4 7v10M3.6 9.6v4.8M20.4 9.6v4.8M6.6 12h10.8" />,
        truck: <path d="M3 7.6h10.6V16H3zM13.6 10.6h3.6l3 3V16h-6.6zM7.4 18.6a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zM17.6 18.6a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z" />,
        /* chimney stops this reading as a bar chart */
        factory: <path d="M3.4 19.8V12.2l5 2.9v-2.9l5 2.9V8.4h5.4v11.4H3.4zM16.6 8.4V4.8h2v3.6M7.4 19.8v-2.6M12.4 19.8v-2.6" />,
        dome: <path d="M3 18h18M5.2 18a6.8 6.8 0 0113.6 0M12 8.2V6.2M10.4 6.2h3.2" />,
        shears: <path d="M6.6 7.4l10.8 10.8M17.4 7.4l-6.4 6.4M7.4 8.2a2 2 0 11-4 0 2 2 0 014 0zM7.4 17.8a2 2 0 11-4 0 2 2 0 014 0z" />,
    }[n];
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>;
}

/* ---------- live chat demo ---------- */
const SCRIPT = [
    { r: "user", t: "Hi — I'm comparing a couple of vendors. Can you help?" },
    { r: "bot", t: "Of course. What are you trying to solve, and what's your timeline?" },
    { r: "user", t: "Need it live this quarter. Budget's approved." },
    { r: "bot", t: "Great fit. I can book 20 minutes with our specialist tomorrow at 4:30 PM — shall I lock it in?" },
    { r: "user", t: "Yes, please." },
    { r: "sys", t: "Meeting booked · lead tagged HOT · synced to dashboard" },
];
function ChatDemo() {
    const [items, setItems] = useState<any[]>([]);
    const [typing, setTyping] = useState(false);
    const body = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        let alive = true; const timers: ReturnType<typeof setTimeout>[] = [];
        const wait = (ms: number) => new Promise((res) => timers.push(setTimeout(res, ms)));
        (async function run() {
            while (alive) {
                setItems([]); setTyping(false);
                await wait(600);
                for (let i = 0; i < SCRIPT.length && alive; i++) {
                    const m = SCRIPT[i];
                    if (m.r === "bot") { setTyping(true); await wait(reduce ? 150 : 900); setTyping(false); }
                    setItems((p) => [...p, m]);
                    await wait(m.r === "sys" ? 1600 : reduce ? 250 : 850);
                }
                await wait(3200);
                if (reduce) break;
            }
        })();
        return () => { alive = false; timers.forEach(clearTimeout); };
    }, []);
    useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [items, typing]);
    return (
        <div className="fx-demo fx-reveal" aria-label="Frosty answering a live enquiry">
            <div className="fx-demo-top font-serif text-lg tracking-wide"><span className="live" /> Frosty · live conversation <span className="sp font-sans tracking-normal">web + whatsapp</span></div>
            <div className="fx-demo-body" ref={body}>
                {items.map((m, i) => (<div key={i} className={`fx-msg ${m.r} ${m.r === 'sys' ? 'font-serif text-[15px]' : ''}`}>{m.t}</div>))}
                {typing && <div className="fx-typing"><i /><i /><i /></div>}
            </div>
            <div className="fx-demo-foot">
                <span className="fx-pill">Answers in seconds</span>
                <span className="fx-pill">Qualifies intent</span>
                <span className="fx-pill" style={{ marginLeft: "auto", background: "#FBEEDA", color: "#7A5312" }}>24/7</span>
            </div>
        </div>
    );
}

/* ---------- "it acts": branching action diagram ----------
   Five equal boxes in a row implied a pipeline, which isn't what happens: one enquiry
   arrives and Frosty branches to whichever action the intent calls for. So this fans out
   from a single core, and plays a real enquiry down the branch it would actually trigger.
   Connector paths are measured from the rendered DOM (ResizeObserver), so they stay
   correct at any width instead of being hard-coded to a viewBox. */
const ACTS = [
    {
        i: "/icons/chat.png", h: "Answers & qualifies", p: "Understands the question and asks the right ones back.",
        q: "Do you work with clinics like ours?", via: "Website", out: "Intent understood · tagged WARM", c: "act-purple"
    },
    {
        i: "/icons/email.png", h: "Books meetings", p: "Drops a slot straight onto your team's calendar.",
        q: "Can someone walk me through it this week?", via: "WhatsApp", out: "Meeting booked · Thu 4:30 PM", c: "act-blue"
    },
    {
        i: "/icons/innovation.png", h: "Sends proposals & quotes", p: "Shares the right document at the right moment.",
        q: "Send me pricing for 50 seats.", via: "Website", out: "Quotation #218 sent on WhatsApp", c: "act-orange"
    },
    {
        i: "/icons/data-analytics.png", h: "Captures the lead", p: "Pulls contact and intent from a natural chat.",
        q: "I'm interested — here's my number.", via: "WhatsApp", out: "Lead saved · synced to your CRM", c: "act-green"
    },
    {
        i: "/icons/advisors.png", h: "Hands off to a human", p: "Escalates to your team with the full history.",
        q: "I'd rather speak to a person.", via: "Website", out: "Live chat handed to your team", c: "act-rose"
    },
];

function ActsDiagram() {
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);
    const [paths, setPaths] = useState<any[]>([]);
    const [feed, setFeed] = useState("");
    const wrap = useRef<HTMLDivElement>(null), core = useRef<HTMLDivElement>(null), tilt = useRef<HTMLDivElement>(null), enq = useRef<HTMLDivElement>(null);
    const nodes = useRef<(HTMLButtonElement | null)[]>([]);

    // Connector geometry, recomputed whenever the layout changes.
    useEffect(() => {
        const el = wrap.current; if (!el) return;
        // Control points sit exactly halfway, so they can never cross and kink the curve.
        const curve = (x1: number, y1: number, x2: number, y2: number) => {
            const m = (x1 + x2) / 2;
            return `M${x1.toFixed(1)},${y1.toFixed(1)} C${m.toFixed(1)},${y1.toFixed(1)} ${m.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
        };
        const measure = () => {
            const w = el.getBoundingClientRect(), c = core.current?.getBoundingClientRect();
            if (!c) return;
            const cx = c.left - w.left + c.width / 2, cy = c.top - w.top + c.height / 2;
            const e = enq.current?.getBoundingClientRect();
            setFeed(e ? curve(e.right - w.left, e.top - w.top + e.height / 2, cx, cy) : "");
            setPaths(nodes.current.map((n) => {
                if (!n) return "";
                const r = n.getBoundingClientRect();
                return curve(cx, cy, r.left - w.left, r.top - w.top + r.height / 2);
            }));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Pointer parallax — written straight to CSS vars so it never re-renders React.
    useEffect(() => {
        const el = tilt.current; if (!el) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            el.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        };
        const out = () => { el.style.setProperty("--tx", "0"); el.style.setProperty("--ty", "0"); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", out);
        return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", out); };
    }, []);

    // Autoplay, paused while the visitor is driving it themselves.
    useEffect(() => {
        if (held || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setInterval(() => setActive((a) => (a + 1) % ACTS.length), 3000);
        return () => clearInterval(t);
    }, [held]);

    const cur = ACTS[active];
    return (
        <div className="fx-acts fx-reveal">
            <div className="fx-acts-3d" ref={tilt}>
                <div className="fx-acts-grid" ref={wrap}>
                    <svg className={`fx-acts-svg ${cur.c}`} aria-hidden="true">
                        {feed && <path className="fx-link on" d={feed} style={{ stroke: '#8B5CF6' }} />}
                        {paths.map((d, i) => d && <path key={i} className={"fx-link" + (i === active ? " on" : "")} d={d} />)}
                        {feed && <path className="fx-pulse" d={feed} pathLength="100" style={{ stroke: '#8B5CF6' }} />}
                        {paths[active] && <path className="fx-pulse lag" d={paths[active]} pathLength="100" />}
                    </svg>

                    <div className="fx-enq" ref={enq}>
                        <span className="lbl">Enquiry in</span>
                        <p>“{cur.q}”</p>
                        <span className="via">via {cur.via}</span>
                    </div>

                    <div className="fx-brain">
                        <div className="node" ref={core}><img src="/icons/ai.png" alt="Brain" className="w-8 h-8 object-contain" /></div>
                        <small>Reads intent</small>
                    </div>

                    <div className="fx-act-list">
                        {ACTS.map((a, i) => (
                            <button
                                key={a.h}
                                ref={(n) => { nodes.current[i] = n; }}
                                className={`fx-act ${a.c}` + (i === active ? " on" : "")}
                                aria-pressed={i === active}
                                onClick={() => { setActive(i); setHeld(true); }}
                                onMouseEnter={() => { setActive(i); setHeld(true); }}
                                onMouseLeave={() => setHeld(false)}
                                onFocus={() => { setActive(i); setHeld(true); }}
                                onBlur={() => setHeld(false)}
                            >
                                <span className="ic"><img src={a.i} alt="" className="w-5 h-5 object-contain" /></span>
                                <b>{a.h}</b>
                                {/* Folds the detail into each button's accessible name, so the outcome
                    strip doesn't need a live region that would announce every 3s. */}
                                <span className="fx-sr">. {a.p} Example: “{a.q}” — {a.out}.</span>
                                <span className="tick"><Icon n="check" /></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fx-outcome" aria-hidden="true">
                <p>{cur.p}</p>
                <span className="chip"><Icon n="check" /> {cur.out}</span>
            </div>
        </div>
    );
}

/* ---------- dashboard preview ----------
   Rebuilt in HTML from the product screenshots rather than embedding them: the real
   captures carry a workspace name, a team member's name and live visitor chat, none of
   which belongs on a public page. All data below is illustrative. */
const DX_NAV = [["layers", "Overview"], ["plug", "Services"], ["doc", "Knowledge Base"],
["chart", "Analytics"], ["infinity", "Integrations"], ["bank", "Billing"], ["model", "Settings"]];
const DX_TABS = ["Analytics", "Conversations", "AI identity"];
const DX_ACTIVE = [3, 1, 1];
const DX_STATS = [["CONVERSATIONS", "214", "sessions"], ["MESSAGES", "1,480", "exchanged"],
["LEADS", "96", "captured"], ["CONVERSION", "45%", "lead rate"],
["AVG/SESSION", "6.9", "messages"], ["PEAK HOUR", "7pm", "Tue busiest"]];
const DX_TOPICS: [string, number, string][] = [["Pricing", 11, "#2D6A4F"], ["Delivery", 9, "#3E8063"], ["Booking", 6, "#5A9A7C"],
["Sizing", 6, "#7BB398"], ["Warranty", 5, "#A6CDB8"], ["Other", 3, "#B7791F"]];
const DX_SESSIONS = [["A7", "Visitor #a7f2", "Could you share your email so we can stay in touch?", "03:19 PM"],
["4C", "Visitor #4c1a", "Do you deliver to Pune?", "02:59 PM"],
["9B", "Visitor #9be3", "What is included in the package?", "01:06 PM"],
["2D", "Visitor #2dd8", "Can I speak to someone today?", "11:30 AM"]];

function DashboardPreview() {
    const [tab, setTab] = useState(0);
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        setTab((t) => (t + (e.key === "ArrowRight" ? 1 : DX_TABS.length - 1)) % DX_TABS.length);
    };
    const C = 2 * Math.PI * 32, total = DX_TOPICS.reduce((s, t) => s + t[1], 0);
    let acc = 0;

    return (
        <div className="fx-dxwrap fx-reveal">
            <div className="fx-dxtabs fx-flex-center" role="tablist" aria-label="Dashboard preview">
                {DX_TABS.map((t, i) => (
                    <button key={t} role="tab" id={"dxt-" + i} aria-controls="dxpanel" aria-selected={i === tab}
                        tabIndex={i === tab ? 0 : -1} className="fx-dxtab" onClick={() => setTab(i)} onKeyDown={onKey}>
                        {t}
                    </button>
                ))}
            </div>

            <div className="fx-dashx" id="dxpanel" role="tabpanel" aria-labelledby={"dxt-" + tab}>
                <aside className="fx-dx-side">
                    <div className="fx-dx-brand"><span className="fx-logo" aria-hidden="true" /> Frosty</div>
                    <div className="fx-dx-ws">
                        <div className="lb">WORKSPACE</div>
                        <div className="nm">Northline Interiors</div>
                    </div>
                    <div className="fx-dx-nav">
                        {DX_NAV.map(([ic, label], i) => (
                            <span key={label} className={i === DX_ACTIVE[tab] ? "on" : ""}><Icon n={ic} /> {label}</span>
                        ))}
                    </div>
                    <div className="fx-dx-user"><i>YT</i><b>Your team</b></div>
                </aside>

                <div className="fx-dx-main">
                    {tab === 0 && (
                        <>
                            <div className="fx-dx-h">Performance</div>
                            <div className="fx-dx-sub">Insights and metrics for your workspace.</div>
                            <div style={{ marginTop: 12 }} className="fx-dx-card fx-flex-between-wrap">
                                <div className="fx-dx-pills"><b>7d</b><b>14d</b><b className="on">30d</b><b>90d</b></div>
                                <div className="fx-dx-btn">Export</div>
                            </div>
                            <div className="fx-dx-stats">
                                {DX_STATS.map(([l, n, s]) => (
                                    <div className="fx-dx-stat" key={l}><div className="lb">{l}</div><div className="n">{n}</div><div className="su">{s}</div></div>
                                ))}
                            </div>
                            <div className="fx-dx-2col">
                                <div className="fx-dx-card">
                                    <div className="fx-dx-ct">Conversations &amp; messages</div>
                                    {/* preserveAspectRatio="none" so the plot fills the card instead of
                      letterboxing; non-scaling-stroke keeps the lines an even weight
                      despite the non-uniform x stretch. */}
                                    <svg viewBox="0 0 320 92" width="100%" height="92" preserveAspectRatio="none" aria-hidden="true">
                                        {[18, 42, 66].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#E7E0D1" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
                                        <path d="M0,72 C42,44 72,24 112,31 C152,38 190,56 232,46 C262,39 292,25 320,20 L320,92 L0,92 Z" fill="rgba(45,106,79,.10)" />
                                        <path d="M0,72 C42,44 72,24 112,31 C152,38 190,56 232,46 C262,39 292,25 320,20" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                        <path d="M0,84 C52,79 92,73 132,75 C182,77 222,69 262,65 C292,62 306,58 320,55" fill="none" stroke="#B7791F" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                    </svg>
                                    <div className="fx-dx-legend">
                                        <span><i style={{ background: "#2D6A4F" }} />Messages</span>
                                        <span><i style={{ background: "#B7791F" }} />Conversations</span>
                                    </div>
                                </div>
                                <div className="fx-dx-card">
                                    <div className="fx-dx-ct">Top topics</div>
                                    <svg viewBox="0 0 100 100" width="100%" height="104" aria-hidden="true">
                                        <g transform="rotate(-90 50 50)">
                                            {DX_TOPICS.map(([label, v, col]) => {
                                                const len = (C * v) / total, node = (
                                                    <circle key={label} cx="50" cy="50" r="32" fill="none" stroke={col} strokeWidth="13"
                                                        strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`} strokeDashoffset={-acc.toFixed(2)} />
                                                );
                                                // eslint-disable-next-line react-hooks/immutability
                                                acc += len; return node;
                                            })}
                                        </g>
                                        <text x="50" y="48" textAnchor="middle" fontSize="15" fontFamily="Fraunces, serif" fill="#2D241E" fontWeight="600">{total}</text>
                                        <text x="50" y="59" textAnchor="middle" fontSize="6.5" fontFamily="Outfit, sans-serif" fill="#8B8275">mentions</text>
                                    </svg>
                                    <div className="fx-dx-legend">
                                        {DX_TOPICS.slice(0, 4).map(([label, v, col]) => (
                                            <span key={label}><i style={{ background: col }} />{label} {v}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {tab === 1 && (
                        <>
                            <div className="fx-flex-between-wrap">
                                <div><div className="fx-dx-h">Website console<span className="fx-sr"> — Unified AI inbox for automated customer support and lead management</span></div><div className="fx-dx-sub">Every session, web and WhatsApp, in one place.</div></div>
                                <div className="fx-dx-pills"><b className="on">Website</b><b>WhatsApp</b></div>
                            </div>
                            <div className="fx-dx-split">
                                <div>
                                    {DX_SESSIONS.map(([av, who, what, when], i) => (
                                        <div className={"fx-dx-sess" + (i === 0 ? " on" : "")} key={who}>
                                            <i>{av}</i>
                                            <div className="w"><b>{who}</b><span>{what}</span></div>
                                            <span style={{ marginLeft: "auto", fontSize: 9, color: "var(--d-mut)", flex: "none" }}>{when}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="fx-dx-card fx-flex-col">
                                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                                        <span className="fx-dx-btn" style={{ background: "transparent", color: "var(--d-mut)", border: "1px solid var(--d-line)" }}>Lead</span>
                                        <span className="fx-dx-btn" style={{ background: "var(--d-ink)" }}>Insights</span>
                                        <span className="fx-dx-btn">AI mode</span>
                                    </div>
                                    <div className="fx-dx-bub u">hi</div>
                                    <div className="fx-dx-bub b">Hi there — happy to help. What should I call you?</div>
                                    <div className="fx-dx-bub u">Ravi</div>
                                    <div className="fx-dx-bub b">Great to meet you, Ravi. Could you share your email so we can stay in touch about our services?</div>
                                    <div className="fx-dx-input">Switch to human mode to reply manually…</div>
                                </div>
                            </div>
                        </>
                    )}

                    {tab === 2 && (
                        <>
                            <div className="fx-dx-h">Define your AI identity.<span className="fx-sr"> Custom AI chatbot personality and knowledge base settings</span></div>
                            <div className="fx-dx-sub">Shape the personality, tone and knowledge of your agent. Synchronised across every channel.</div>
                            <div className="fx-dx-field">
                                <div className="lb">AGENT NAME</div>
                                <div className="val">Frosty</div>
                            </div>
                            <div className="fx-dx-field">
                                <div className="lb">CONVERSATIONAL TONE</div>
                                <div className="fx-dx-tones">
                                    <b className="on">PROFESSIONAL</b><b>FRIENDLY</b><b>CASUAL</b><b>FORMAL</b>
                                </div>
                            </div>
                            <div className="fx-dx-field">
                                <div className="lb">CORE INSTRUCTIONS</div>
                                <div className="fx-dx-area">You are the front desk for Northline Interiors. Answer from our catalogue and pricing, qualify budget and timeline, and book a design consultation when the fit is right…</div>
                            </div>
                            <div className="fx-dx-save">SAVE AI IDENTITY</div>
                        </>
                    )}
                </div>
            </div>
            <p className="fx-src fx-text-center fx-mt-1-5rem">Product preview. Figures and conversations are illustrative.</p>
        </div>
    );
}

/* ---------- response-odds chart ----------
   Plotted from the only figures the primary sources actually publish. Oldroyd /
   InsideSales.com (2007) report RELATIVE odds ratios, never absolute percentages, so the
   y-axis is indexed odds with the five-minute bucket set to 100 — anything labelled
   "likelihood %" would be invented. Ratios are verbatim from the study:
     5 -> 10 min  "the dial to qualify odds decrease 4 times"   => 100 / 4  = 25
     5 -> 30 min  "odds of qualifying ... drop 21 times"        => 100 / 21 = 4.8
   Three discrete published buckets, so the control is a discrete selector: there is no
   defensible way to interpolate a continuous scrubber between them.

   DO NOT ADD A FOURTH BAR for 1 hr or 24 hr. Those figures come from HBR 2011, which uses a
   within-the-hour baseline, not this study's five-minute one. Splicing them onto this axis
   would also imply odds recover between 30 min and 1 hr. They stay in the stat tiles. */
const ODDS = [
    {
        t: "5 min", v: 100, tone: "g", head: "The window is open.",
        body: "The study's baseline. Every other number here is measured against this moment.",
        quote: null
    },
    {
        t: "10 min", v: 25, tone: "a", head: "Four times worse — after five more minutes.",
        body: "Five minutes of delay costs three-quarters of the odds.",
        quote: "From 5 minutes to 10 minutes the dial to qualify odds decrease 4 times."
    },
    {
        t: "30 min", v: 4.8, tone: "c", head: "21× worse. The lead has gone cold.",
        body: "Half an hour is the difference between a live conversation and a voicemail.",
        quote: "The odds of qualifying a lead if called in 5 minutes versus 30 minutes drop 21 times."
    },
];

function OddsChart() {
    const [sel, setSel] = useState(0);
    const [table, setTable] = useState(false);
    // A tap synthesises mouseenter, so on touch (and hybrid laptops) an incidental
    // pointer pass would change the selection. Probed in an effect, never during
    // render — this component still server-renders under "use client".
    const [hoverable, setHoverable] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setHoverable(matchMedia("(hover: hover)").matches); }, []);
    const cur = ODDS[sel];
    return (
        <div className="fx-chart">
            <div className="cap">Relative odds of qualifying a lead</div>
            {/* "An index, not a percentage" is load-bearing: without it a bar reading 100
          invites the reader to think we claim a 100% qualification rate. */}
            <div className="sub">By time to first response · five-minute bucket indexed to 100. An index, not a percentage.</div>

            <div className="fx-odds">
                <div className="fx-odds-y" aria-hidden="true">
                    {[100, 75, 50, 25, 0].map((n) => <span key={n}>{n}</span>)}
                </div>
                <div className="fx-odds-plot">
                    <div className="fx-odds-grid" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</div>
                    {ODDS.map((d, i) => (
                        <button
                            key={d.t}
                            className={"fx-col " + d.tone}
                            aria-pressed={i === sel}
                            onClick={() => setSel(i)}
                            onMouseEnter={() => { if (hoverable) setSel(i); }}
                            onFocus={() => setSel(i)}
                        >
                            <span className="v">{d.v}</span>
                            {/* Scale the value INTO the space left after the label, not by subtracting a
                  flat offset from each bar — subtracting distorts the ratios between them. */}
                            <span className="bar" style={{ height: `calc((100% - 34px) * ${d.v / 100})`, minHeight: 4 }} />
                            <span className="fx-sr">
                                At {d.t}, relative odds of qualifying are {d.v} against a five-minute baseline of 100.
                            </span>
                        </button>
                    ))}
                </div>
                <div className="fx-odds-x" aria-hidden="true">
                    {ODDS.map((d, i) => <span key={d.t} className={i === sel ? "on" : ""}>{d.t}</span>)}
                </div>
            </div>

            <div className="fx-before">
                <Icon n="bolt" /> Frosty replies in seconds — before this chart even starts.
            </div>

            <div className="fx-readout" style={{ minHeight: '140px' }}>
                <b>{cur.head}</b>
                <p>{cur.body}{cur.quote && <> The study's words: <q>{cur.quote}</q></>}</p>
            </div>

            <button className="fx-toggle" aria-expanded={table} onClick={() => setTable((v) => !v)}>
                {table ? "Hide the numbers" : "Show the numbers"}
            </button>
            {table && (
                <table className="fx-odds-table">
                    <caption className="fx-sr">Relative odds of qualifying a lead by time to first response</caption>
                    <thead><tr><th scope="col">Time to first response</th><th scope="col">Relative odds</th><th scope="col">vs. 5 min</th></tr></thead>
                    <tbody>
                        {ODDS.map((d) => (
                            <tr key={d.t}><th scope="row">{d.t}</th><td>{d.v}</td><td>{d.v === 100 ? "baseline" : `${Math.round(100 / d.v)}× lower`}</td></tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

/* ---------- industries: frost honeycomb ----------
   Short label is what you read; the fuller descriptor rides along in .fx-sr so the
   section still carries the long-tail terms for search and screen readers. */
const INDUSTRIES = [
    ["bag", "E-commerce", "AI chatbot for E-commerce and D2C brands"],
    ["house", "Real estate", "AI sales agent for Real estate and property"],
    ["cross", "Healthcare", "Automated customer support for Clinics and healthcare"],
    ["cap", "Education", "AI lead generation for Education and study-abroad consultancies"],
    ["horn", "Marketing", "24/7 AI agent for Marketing agencies"],
    ["car", "Automobile", "Conversational AI for Automobile and car dealerships"],
    ["bank", "Finance", "AI customer service for Financial services"],
    ["plane", "Travel", "Automated booking agent for Travel and hospitality"],
    ["sofa", "Interiors", "AI sales assistant for Interiors and renovation"],
    ["tools", "Home services", "Automated lead qualification for Home and repair services"],
    ["scales", "Legal", "AI receptionist for Legal and professional services"],
    ["bell", "Fitness", "24/7 support bot for Fitness and wellness"],
    ["truck", "Logistics", "AI query resolution for Logistics and freight"],
    ["factory", "Manufacturing", "B2B AI sales agent for Manufacturing"],
    ["dome", "Events", "Automated booking system for Events and catering"],
    ["shears", "Salons", "AI appointment booking for Beauty and salons"],
];

// Row patterns always step by ±1 so consecutive rows interlock once centred.
function hivePattern(w: number) {
    if (w >= 1080) return [5, 6, 5];
    if (w >= 800) return [4, 5, 4, 3];
    if (w >= 560) return [3, 4, 3, 4, 2];
    return [2, 3, 2, 3, 2, 3, 1];
}

function IndustryHive() {
    const [rows, setRows] = useState([5, 6, 5]);
    useEffect(() => {
        const on = () => setRows((prev) => {
            const next = hivePattern(window.innerWidth);
            return next.join() === prev.join() ? prev : next;   // don't re-render on every resize tick
        });
        on();
        window.addEventListener("resize", on);
        return () => window.removeEventListener("resize", on);
    }, []);

    const chunks = [];
    let i = 0;
    for (const n of rows) { if (i >= INDUSTRIES.length) break; chunks.push(INDUSTRIES.slice(i, i + n)); i += n; }
    if (i < INDUSTRIES.length) chunks.push(INDUSTRIES.slice(i));

    let hexIdx = 0; // running index across rows drives the per-hex entrance stagger (--i)
    return (
        <div className="fx-hive fx-reveal">
            {chunks.map((row, r) => (
                <div className="fx-hive-row" key={r}>
                    {row.map(([ic, short, full]) => {
                        const currentIdx = hexIdx++;
                        return (
                            <div className={`fx-hex hx-${currentIdx % 4}`} key={short} style={{ "--i": currentIdx } as React.CSSProperties}>
                                <span className="ic"><Icon n={ic} /></span>
                                <b>{short}<span className="fx-sr"> — {full}</span></b>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

/* ---------- reveal + count-up ---------- */
function useRevealAndCount() {
    useEffect(() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const runCount = (el: HTMLElement) => {
            if (el.dataset.done) return; el.dataset.done = "1";
            const end = parseFloat(el.dataset.count || "0"), dec = parseInt(el.dataset.decimals || "0"), suf = el.dataset.suffix || "";
            if (reduce) { el.textContent = end.toFixed(dec) + suf; return; }
            el.textContent = (0).toFixed(dec) + suf;
            const t0 = performance.now(), dur = 1400;
            const tick = (t: number) => { const p = Math.min((t - t0) / dur, 1); el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        };
        const els = Array.from(document.querySelectorAll(".fx-reveal, [data-count]")) as HTMLElement[];
        if (reduce) { els.forEach((e) => { e.classList.add("is-in"); if (e.hasAttribute("data-count")) runCount(e); }); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) { en.target.classList.add("is-in"); if (en.target.hasAttribute("data-count")) runCount(en.target as HTMLElement); io.unobserve(en.target); }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
        els.forEach((e) => io.observe(e));
        return () => io.disconnect();
    }, []);
}
const FAQ_THEMES = [
    {
        // Blue Theme
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/40',
        activeBorder: 'border-[#0EA5E9]/40',
        shadow: 'shadow-[0_10px_35px_rgba(14,165,233,0.06)]',
        badgeBg: 'bg-[#F0F9FF]',
        badgeBorder: 'border-[#BAE6FD]/50',
        badgeText: 'text-[#0284C7]',
        questionText: 'text-gray-900 group-hover:text-[#0284C7]',
        activeQuestionText: 'text-[#0284C7]',
        iconBgActive: 'bg-[#0284C7]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0F9FF]',
        iconBorderInactive: 'border-[#BAE6FD]/50',
        iconTextInactive: 'text-[#0284C7]',
    },
    {
        // Green Theme
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#2D6A4F]/40',
        activeBorder: 'border-[#2D6A4F]/40',
        shadow: 'shadow-[0_10px_35px_rgba(45,106,79,0.06)]',
        badgeBg: 'bg-[#F0FDF4]',
        badgeBorder: 'border-[#BBF7D0]/50',
        badgeText: 'text-[#047857]',
        questionText: 'text-gray-900 group-hover:text-[#047857]',
        activeQuestionText: 'text-[#047857]',
        iconBgActive: 'bg-[#047857]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0FDF4]',
        iconBorderInactive: 'border-[#BBF7D0]/50',
        iconTextInactive: 'text-[#047857]',
    },
    {
        // Pink Theme
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#BE123C]/40',
        activeBorder: 'border-[#BE123C]/40',
        shadow: 'shadow-[0_10px_35px_rgba(244,63,94,0.06)]',
        badgeBg: 'bg-[#FFF1F2]',
        badgeBorder: 'border-[#FFE4E6]/50',
        badgeText: 'text-[#BE123C]',
        questionText: 'text-gray-900 group-hover:text-[#BE123C]',
        activeQuestionText: 'text-[#BE123C]',
        iconBgActive: 'bg-[#BE123C]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF1F2]',
        iconBorderInactive: 'border-[#FFE4E6]/50',
        iconTextInactive: 'text-[#BE123C]',
    },
    {
        // Orange Theme
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#C2410C]/40',
        activeBorder: 'border-[#C2410C]/40',
        shadow: 'shadow-[0_10px_35px_rgba(234,88,12,0.06)]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeBorder: 'border-[#FFEDD5]/50',
        badgeText: 'text-[#C2410C]',
        questionText: 'text-gray-900 group-hover:text-[#C2410C]',
        activeQuestionText: 'text-[#C2410C]',
        iconBgActive: 'bg-[#C2410C]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF7ED]',
        iconBorderInactive: 'border-[#FFEDD5]/50',
        iconTextInactive: 'text-[#C2410C]',
    },
    {
        // Purple Theme
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#6D28D9]/40',
        activeBorder: 'border-[#6D28D9]/40',
        shadow: 'shadow-[0_10px_35px_rgba(109,40,217,0.06)]',
        badgeBg: 'bg-[#F5F3FF]',
        badgeBorder: 'border-[#DDD6FE]/50',
        badgeText: 'text-[#6D28D9]',
        questionText: 'text-gray-900 group-hover:text-[#6D28D9]',
        activeQuestionText: 'text-[#6D28D9]',
        iconBgActive: 'bg-[#6D28D9]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F5F3FF]',
        iconBorderInactive: 'border-[#DDD6FE]/50',
        iconTextInactive: 'text-[#6D28D9]',
    }
];

export default function FrostyPage() {

    const [faq, setFaq] = useState<string | null>(null);

    useRevealAndCount();

    const DEMO = "https://www.frostrek.ai/schedule-demo";

    // Source of truth for both the visible accordion and the FAQPage JSON-LD below,
    // so the two can never drift apart. Copy is verbatim from Frosty_Agent_FAQs.docx.
    const FAQ_GROUPS: [string, [string, string][]][] = [
        ["About Frosty", [
            ["What is Frosty?", "Frosty is an AI agent that talks to your website visitors and WhatsApp leads for you. It answers their questions in seconds, works out what they want, books meetings, and passes qualified leads to your team, day and night. Frostrek builds, trains, and runs it around your business, so you get a working agent without adding staff."],
            ["How is Frosty different from a basic automated chat?", "A basic automated chat follows a fixed script and gets stuck the moment a customer asks something it wasn't set up for. Frosty understands the actual question, replies in a natural way, and takes real steps like booking a call or sending a quote. It works more like a junior sales rep that never sleeps than a set of pre-written replies."],
            ["Can Frosty handle both my website and WhatsApp?", "Yes. Frosty runs on your website and on WhatsApp at the same time, using one shared memory. If someone starts a chat on your site and later messages you on WhatsApp, Frosty remembers the earlier conversation, so the customer never has to repeat themselves."],
            ["Can Frosty qualify leads and book meetings on its own?", "Yes. Frosty asks the right questions to understand budget, timeline, and intent, then tags each lead as warm or hot based on rules you set. When a lead is ready, it books a meeting straight into your calendar, sends a proposal or quote, and saves the contact details for your team to follow up."],
            ["Can Frosty handle customer support, not just lead generation?", "Yes. Frosty can handle around 90% of the everyday questions your customers ask, things like hours, pricing, availability, order and service queries, and how your process works. When something needs a person, it passes the conversation to your team, so support stays fast without your staff answering the same questions all day."],
            ["Does Frosty really work 24/7?", "Yes. Frosty answers the moment a message comes in, at any hour, including nights, weekends, and holidays. That matters because most buyers go with whoever replies first, and enquiries usually arrive long after your team has logged off."],
            ["Can't I just use ChatGPT for this?", "While ChatGPT is a powerful general-purpose assistant, it lacks deep integration into your business workflows. Frosty Agent is purpose-built for enterprise sales and support: it integrates directly into your website and WhatsApp, is strictly trained on your own proprietary knowledge base, and can autonomously execute actions like booking meetings, sending quotes, and capturing leads directly into your CRM. In short, ChatGPT gives you answers; Frosty acts as a 24/7 autonomous sales rep and support agent built around how you actually sell."],
        ]],
        ["Setting it up", [
            ["Do I need a developer to set up Frosty?", "No. The Frostrek team sets Frosty up for you. We customize and train the agent around your business and deploy it on your website and WhatsApp, so there's nothing for you to build or code. You tell us about your services, and we handle the rest during onboarding."],
            ["How does Frosty learn about my business?", "The Frostrek team trains and customizes Frosty around your business, your services, and your rates. It also reads the content on your website to build its knowledge, and you can share PDFs or documents to add to what it knows. That's why its answers match what you actually offer instead of sounding generic."],
            ["How long does it take to get Frosty live?", "It usually takes anywhere from a few hours to a few days. The timeline depends on the size of your knowledge base and what you need Frosty to do, so a straightforward setup goes live quickly while custom requirements take a little longer. The Frostrek team confirms the timeline with you upfront."],
            ["Will Frosty answer in my brand's voice?", "Yes. The team sets the tone Frosty uses, and it answers from your own content, so it sounds like your business rather than a generic script. You stay in control of how it speaks and what it's allowed to say."],
            ["Does Frosty work with my existing website?", "Yes. Frosty can be added to most common website setups, and the Frostrek team handles the integration for you. Your customers get the same agent on your site and on WhatsApp, working from one shared knowledge base."],
            ["Which AI models does Frosty use?", "Frosty uses a multi-model approach. The Frostrek team picks the best available model for each type of task, so the right model handles the right kind of work behind the scenes. If you have a preference, the setup can be customized to your requirements."],
        ]],
        ["How it works day to day", [
            ["How does Frosty make sure its answers are accurate?", "Frosty answers from your own content rather than making things up, so it stays grounded in what you actually offer. When it isn't confident or a question needs a person, it hands the conversation to your team instead of guessing, and that question can be added to its knowledge for next time."],
            ["Where do my conversations and leads end up?", "Everything lands in one live dashboard. You can see every conversation across your website and WhatsApp, old and new, with leads sorted by intent and every action logged, from meetings booked to quotes sent. You also get analytics on response times and where leads drop off."],
            ["Can my whole team use Frosty and take over chats?", "Yes. Frosty runs on a shared dashboard that your whole team can log into. Any team member can step into a live conversation with one click and continue with the full history in front of them, and different people can handle different conversations at the same time. Frosty picks each one back up automatically once your team is done."],
            ["Does Frosty connect with my CRM, calendar, and email?", "Yes. Frosty syncs qualified leads and their full history into your CRM, and it works with Google Calendar for bookings, Gmail for follow-ups, and Slack for team alerts. It does more than reply, it acts through the tools you already use."],
            ["What languages can Frosty speak?", "Frosty is a multi-language agent. It replies in the language your customer writes in and picks up the language automatically during the chat, so you can help visitors from different regions with one agent."],
            ["Can Frosty answer phone calls too?", "Yes, through a separate voice agent. It answers inbound calls, qualifies the caller the same way the website and WhatsApp agents do, and books a callback when no one is free to pick up. Voice is offered as an add-on, so ask the Frosty team to include it."],
        ]],
        ["Trust and getting started", [
            ["Is my data safe with Frosty?", "Yes. Frostrek is ISO 27001 and ISO 9001 certified and GDPR-ready. Your content is used only to train your own agent, and Frosty is built and hosted end to end by Frostrek rather than pieced together from other people's tools."],
            ["Who maintains and updates Frosty after it goes live?", "The Frostrek team does. We keep Frosty running, update it as your business changes, and retrain it when you add new services or content. If something needs adjusting, you have a team to reach rather than a tool you're left to manage on your own."],
            ["What types of businesses is Frosty for?", "Frosty fits any business that gets enquiries and wants to answer them fast. That includes marketing agencies, real estate, clinics and healthcare, education and study-abroad consultancies, car dealers, financial services, and online stores. If your leads come in through a website or WhatsApp, Frosty can capture and qualify them."],
            // Adapted from the doc: it routed all pricing to the team, which would contradict
            // the $200 starting price stated directly above. Keeps the same routing intent.
            ["How much does Frosty cost?", "Frosty Agent starts at $200/month for a single website and WhatsApp agent; final pricing depends on enquiry volume and is confirmed on a demo call."],
            ["How can I see Frosty in action?", "Book a demo and the Frostrek team will set Frosty up on a sample of your own content, so you can watch it answer a real enquiry before you decide. You can reach the Frosty team through the Book a Demo button or on WhatsApp."],
        ]],
    ];

    const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_GROUPS.flatMap(([, qs]) => qs).map(([q, a]) => ({
            "@type": "Question", name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
        })),
    });

    const softwareSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Frosty Agent",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, WhatsApp",
        "description": "Enterprise-grade AI agent that qualifies leads and answers questions on your website and WhatsApp 24/7.",
        "offers": {
            "@type": "Offer",
            "price": "200.00",
            "priceCurrency": "USD"
        },
        "dateModified": "2026-07-01T00:00:00+00:00",
        "publisher": {
            "@type": "Organization",
            "name": "Frostrek AI",
            "location": {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Gurugram",
                    "addressRegion": "Haryana",
                    "addressCountry": "IN"
                }
            }
        }
    });

    return (
        <div className="fx-root">
            <SEO
                title="Frosty Agent | Enterprise AI Chatbot & WhatsApp Assistant"
                description="Never lose a lead to a slow reply again. Frosty is an enterprise-grade AI agent that qualifies leads and answers questions on your website and WhatsApp 24/7."
                path="/products/frosty-agent"
                schema={[faqSchema, softwareSchema]}
                keywords="AI sales agent, AI chatbot for WhatsApp, automated lead qualification, 24/7 customer support AI, enterprise AI agent"
            />
            
            {/* HERO (Injected from original) */}
            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-[#F9FBFA]/50 font-body z-10">
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                        OUR PRODUCT
                        <ChevronRight className="w-3 h-3 ml-1 text-[#2D6A4F]/60" />
                    </motion.div>

                    {/* Headline */}
                    <h1 aria-label="Frosty Agent — Never lose a lead to a slow reply again." className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} aria-hidden="true">
                            Frosty Agent
                        </SplitTextReveal>
                        {' '}
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} aria-hidden="true">
                            — Never lose a lead
                        </SplitTextReveal>
                        <br className="hidden sm:block" />
                        {' '}
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} delay={0.3} aria-hidden="true">
                            to a slow reply again.
                        </SplitTextReveal>
                    </h1>

                    {/* Subtext */}
                    <SplitTextReveal
                        as="p"
                        className="text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed text-gray-500"
                        type="words" stagger={0.015} once={false} delay={0.6}
                    >
                        Frosty answers every website and WhatsApp enquiry in seconds, qualifies it, books the meeting, and hands your team a warm lead — 24/7, in your brand's voice.
                    </SplitTextReveal>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mt-10"
                    >
                        <a
                            href={EXTERNAL_LINKS.frosty}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group font-bold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 flex items-center gap-2 bg-[#2D6A4F] text-white hover:bg-[#1B4332] hover:shadow-xl hover:shadow-[#2D6A4F]/25 cursor-pointer border-none"
                        >
                            <FlipText className="text-white" hoverColor="text-white">
                                Try Frosty Free <ExternalLink className="w-4 h-4" />
                            </FlipText>
                        </a>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* WHAT IS FROSTY */}
            <section className="fx-sec">
                <div className="fx-wrap fx-split items-center">
                    <div className="fx-reveal">
                        <span className="fx-ey">PRODUCT OVERVIEW</span>
                        <h2 className="fx-h2">What is Frosty?</h2>
                        <p className="fx-lead text-gray-500">
                            Frosty is a production-grade autonomous AI agent platform built for businesses that want to convert website visitors and WhatsApp leads into real customers — without adding headcount. It combines omnichannel deployment, frontier AI models, a RAG-powered knowledge engine, and a human takeover console — all managed from a single dashboard.
                        </p>
                    </div>
                    <div className="fx-reveal relative">
                        <ChatDemo />
                    </div>
                </div>
            </section>
            
            {/* COST OF SLOW */}
            <section className="fx-sec" id="product">
                <div className="fx-wrap fx-split">
                    <div className="fx-reveal">
                        <span className="fx-ey">The cost of a slow reply</span>
                        {/* Was "decide the sale" — purchase attribution no study measures (the 2007 study
                states "This study did not address close ratios"). The data is about who gets
                a real conversation. */}
                        <h2 className="fx-h2">The first five minutes decide who they talk to.</h2>
                        {/* Was "Buyers reward whoever answers first" — that is the unsupported 78%
                purchase-attribution claim restated as prose. No source measures who wins
                the sale; they measure odds of qualifying. */}
                        <p className="fx-lead">Reply inside five minutes and your odds of qualifying the lead multiply — and almost nobody replies that fast. Frosty is built to win that window, every time.</p>
                        <div className="fx-stat-row">
                            <div className="fx-stat"><span className="n" data-count="7" data-suffix="×">7×</span><p>more likely to qualify a lead when you reply within the hour than an hour later.</p></div>
                            <div className="fx-stat"><span className="n" data-count="60" data-suffix="×">60×</span><p>more likely than the teams that wait a day or more.</p></div>
                            <div className="fx-stat bad"><span className="n" data-count="0.4" data-decimals="1" data-suffix="%">0.4%</span><p>of first replies actually go out inside five minutes.</p></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-6 text-center lg:text-left">Source: Oldroyd / InsideSales.com (2007) and Harvard Business Review (2011).</p>
                    </div>
                    <div className="fx-reveal">
                        <OddsChart />
                    </div>
                </div>
            </section>

            {/* TWO AGENTS */}
            <section className="fx-sec fx-bg-tint-2">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">One brain, two front doors</span>
                        <h2 className="fx-h2">Two agents. One conversation.</h2>
                        <p className="fx-lead">The web and WhatsApp agents share a single memory — so a visitor who starts on your site and finishes on WhatsApp never repeats themselves.</p>
                    </div>
                    <div className="fx-agents fx-reveal">
                        <div className="fx-agent a-blue relative pb-6">
                            <div className="absolute top-7 right-7">
                                <span className="inline-block px-3 py-1 rounded-full border border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold tracking-wider uppercase">OUTBOUND</span>
                            </div>
                            <div className="ic"><img src="/icons/world.png" alt="Web" className="w-6 h-6 object-contain" /></div>
                            <h3>Sales and Outreach Calling<span className="fx-sr"> — AI outbound sales bot for qualifying leads</span></h3>
                            <p>Upload your lead list or connect your CRM. The agent dials, pitches, qualifies, and books. It runs hundreds of conversations in parallel while your reps focus on closing.</p>
                            <div className="mt-8 pt-5 border-t border-[#BAE6FD]/50">
                                <p className="text-[12px] font-bold text-[#0284C7] uppercase">FOR: Real Estate • Finance • Sales Teams</p>
                            </div>
                        </div>
                        <div className="fx-core">
                            <div className="orb"><img src="/icons/ai.png" alt="Memory" className="w-8 h-8 object-contain" /></div>
                            <small>Shared contextual memory</small>
                        </div>
                        <div className="fx-agent a-green relative pb-6">
                            <div className="absolute top-7 right-7">
                                <span className="inline-block px-3 py-1 rounded-full border border-[#BBF7D0] bg-[#DCFCE7] text-[#166534] text-[10px] font-bold tracking-wider uppercase">INBOUND</span>
                            </div>
                            <div className="ic"><img src="/icons/chat.png" alt="WhatsApp" className="w-6 h-6 object-contain" /></div>
                            <h3>Support and Query Resolution<span className="fx-sr"> — Inbound AI customer support agent</span></h3>
                            <p>Every inbound call is answered instantly. The agent resolves common queries, collects information, and escalates only what truly needs a human, with full context handed over.</p>
                            <div className="mt-8 pt-5 border-t border-[#BBF7D0]/50">
                                <p className="text-[12px] font-bold text-[#166534] uppercase">FOR: Customer Support • Finance • Real Estate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IT ACTS */}
            <section className="fx-sec" id="how">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">Not a chatbot</span>
                        <h2 className="fx-h2">It doesn't just chat. It acts.</h2>
                        <p className="fx-lead">Rule-based bots frustrate people with scripts. Frosty understands intent and takes the next step on its own — tap or hover any action to follow the enquiry that triggers it.</p>
                    </div>
                    <ActsDiagram />
                </div>
            </section>

            {/* DASHBOARD */}
            <section className="fx-sec fx-bg-tint-2" id="dashboard">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-680">
                        <span className="fx-ey">Your command centre</span>
                        <h2 className="fx-h2" style={{ maxWidth: '100%', textWrap: 'initial' }}>Every lead - and everything about it<br />in one place.</h2>
                        <p className="fx-lead">Everything both agents do lands in one live dashboard, so your team works the hottest leads first without digging.</p>
                    </div>
                    <DashboardPreview />
                    <ul className="fx-feat fx-dash-feat">
                        <li><span className="ck"><Icon n="check" /></span><span><b>All conversations stored</b> — web and WhatsApp, old, new and live.</span></li>
                        <li><span className="ck"><Icon n="check" /></span><span><b>Warm / hot tagging by intent</b>, to rules you control.</span></li>
                        <li><span className="ck"><Icon n="check" /></span><span><b>Full activity log</b> — meetings, proposals and quotes, per lead.</span></li>
                        <li><span className="ck"><Icon n="check" /></span><span><b>One-click human takeover</b>, with full history.</span></li>
                        <li><span className="ck"><Icon n="check" /></span><span><b>Analytics, funnel drop-off &amp; CRM sync.</b></span></li>
                        <li><span className="ck"><Icon n="check" /></span><span><b>Tone and instructions you control</b>, tuned by our team.</span></li>
                    </ul>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="fx-sec">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">Under the hood</span>
                        <h2 className="fx-h2">Enterprise-grade, engineered end to end.</h2>
                        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold">Last updated: July 2026</p>
                        <p className="fx-lead">Not a wrapper on a template. A production platform Frostrek built from scratch.</p>
                    </div>
                    <div className="fx-bento">
                        <div className="fx-tile wide t-green fx-reveal">
                            <div className="ic"><img src="/icons/data-analytics.png" alt="Knowledge" className="w-6 h-6 object-contain" /></div>
                            <h3>RAG knowledge engine<span className="fx-sr"> — Custom AI knowledge base trained on your company data</span></h3>
                            <p>We feed Frosty your PDFs and crawl up to 200 pages of your site. It chunks, embeds and indexes them into a semantic brain — so answers are grounded in your content, never generic.</p>
                        </div>
                        <div className="fx-tile third t-blue fx-reveal">
                            <div className="ic"><img src="/icons/ai.png" alt="Models" className="w-6 h-6 object-contain" /></div>
                            {/* Aligned to the FAQ doc: the Frostrek team routes models (done-for-you),
                  rather than the customer switching them — the old copy contradicted that. */}
                            <h3>The right model for every task<span className="fx-sr"> — Multi-model AI orchestration for enterprise tasks</span></h3>
                            <p>Multi-model under the hood — Gemini and GPT-4o. Our team picks and tunes the best model for each job in your workspace.</p>
                        </div>
                        <div className="fx-tile third t-orange fx-reveal">
                            <div className="ic"><img src="/icons/collaboration.png" alt="Tools" className="w-6 h-6 object-contain" /></div>
                            <h3>Acts through your tools<span className="fx-sr"> — Seamless AI CRM and calendar integration</span></h3>
                            <p>Calendar for bookings, Gmail for follow-ups, Slack for alerts, WhatsApp for chat.</p>
                        </div>
                        <div className="fx-tile third t-purple fx-reveal">
                            <div className="ic"><img src="/icons/advisors.png" alt="Human" className="w-6 h-6 object-contain" /></div>
                            <h3>Human-in-the-loop<span className="fx-sr"> — Live chat agent takeover for seamless support escalations</span></h3>
                            <p>Pause the agent in one click, take over live, auto-resume when you're done.</p>
                        </div>
                        <div className="fx-tile third t-rose fx-reveal">
                            <div className="ic"><img src="/icons/shield.png" alt="Secure" className="w-6 h-6 object-contain" /></div>
                            <h3>Secure &amp; certified</h3>
                            <p>ISO 27001 &amp; ISO 9001 certified, GDPR-ready. Your content trains only your own agent.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SETUP */}
            <section className="fx-sec fx-bg-tint-2">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">Done for you</span>
                        <h2 className="fx-h2">The Frostrek team sets Frosty up for you.</h2>
                        <p className="fx-lead">We customize and train the agent around your business and deploy it on your website and WhatsApp, so there is nothing for you to build or code. You tell us about your services, and we handle the rest during onboarding.</p>
                    </div>
                    <div className="fx-timeline">
                        {[["Tell us about your business", "A short onboarding session: your services, pricing, common questions and how you like to speak to customers.", "tl-blue"],
                        ["We customize and train Frosty", "Our team builds the agent on your content, tone and rules, then tests it against real customer questions.", "tl-green"],
                        ["We deploy — you convert", "We put Frosty live on your website and WhatsApp and keep tuning it, while your team focuses on closing.", "tl-orange"]].map((s, i) => (
                            <div className={`fx-tl fx-reveal ${s[2]}`} key={s[0]}>
                                <div className="num">{i + 1}</div>
                                <h4>{s[0]}<span className="fx-sr"> — Fully managed AI agent onboarding and deployment</span></h4>
                                <p>{s[1]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY */}
            <section className="fx-sec">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">Why Frostrek</span>
                        <h2 className="fx-h2">Built for how you actually sell.</h2>
                    </div>
                    <div className="fx-why fx-reveal">
                        {[["/icons/data-analytics.png", "Grounded in your data", "Trained on your products, pricing and policies — accurate answers, never made up.", "w-green"],
                        ["/icons/world.png", "Web + WhatsApp continuity", "One conversation across channels; customers never start over.", "w-blue"],
                        ["/icons/innovation.png", "Your team, amplified", "Frosty absorbs volume and repeat questions so people do the high-value work.", "w-orange"],
                        ["/icons/shield.png", "Enterprise-grade & certified", "ISO 27001 & ISO 9001 certified, GDPR-ready — built in Gurugram by a 50+ engineer team.", "w-rose"]].map((w) => (
                            <div className={`fx-w ${w[3]}`} key={w[1]}>
                                <div className="ic"><img src={w[0]} alt="" className="w-6 h-6 object-contain" /></div>
                                <div><h3>{w[1]}</h3><p>{w[2]}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="fx-sec" style={{ background: "var(--tint-2)", paddingBottom: 90 }}>
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-680">
                        <span className="fx-ey">Who it's for</span>
                        <h2 className="fx-h2">If you live on inbound, Frosty pays for itself.</h2>
                        <p className="fx-lead">From e-commerce to clinics to car showrooms — if your leads arrive through a website or WhatsApp, Frosty can answer them, qualify them and act on them.</p>
                    </div>
                    <IndustryHive />
                </div>
            </section>

            {/* PRICING */}
            <section className="fx-sec" id="pricing">
                <div className="fx-wrap">
                    <div className="fx-reveal text-center mx-auto flex flex-col items-center fx-max-w-640">
                        <span className="fx-ey">Pricing · India</span>
                        <h2 className="fx-h2">One agent, priced around you.</h2>
                        <p className="fx-lead">No tiers to compare. We scope Frosty to your business and quote it from a single starting price.</p>
                    </div>
                    <div className="fx-pricebar fx-reveal">
                        <div>
                            <span className="fx-amt-from">Plans start at</span>
                            <div className="fx-amt">$200</div>
                            <span className="fx-amt-per">per month</span>
                        </div>
                        <div className="fx-price-body">
                            <h3>The enterprise-grade Frosty Agent.</h3>
                            <p className="text-sm font-semibold mb-2">Frosty Agent starts at $200/month for a single website and WhatsApp agent; final pricing depends on enquiry volume and is confirmed on a demo call.</p>
                            <p>Built, trained and deployed by the Frostrek team around your business — not a template you configure yourself.</p>
                            <ul className="fx-incl">
                                <li><Icon n="check" /> Website + WhatsApp agent</li>
                                <li><Icon n="check" /> Live dashboard &amp; CRM sync</li>
                                <li><Icon n="check" /> Human takeover, any time</li>
                                <li><Icon n="check" /> Trained on your own content</li>
                            </ul>
                            <div className="fx-ctas">
                                <a className="fx-btn fx-btn-primary" href={DEMO}>Book a demo <Icon n="arrow" /></a>
                                <a className="fx-btn fx-btn-ghost" href="https://www.frostrek.ai/contact">Talk to us</a>
                            </div>
                        </div>
                    </div>
                    <p className="fx-note">Final pricing depends on enquiry volume and how much we build around you. We'll quote it on the demo call.</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="fx-sec fx-bg-tint-2">
                <div className="fx-wrap">
                    <div className="fx-reveal fx-text-center fx-max-w-640 fx-margin-auto">
                        <span className="fx-ey">Questions</span>
                        <h2 className="fx-h2 fx-margin-y-16-auto">Everything you need to know.</h2>
                    </div>
                </div>
                <div className="fx-reveal w-full max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-start mt-12">
                        {FAQ_GROUPS.map(([group, qs], g) => (
                            <div className="w-full" key={group}>
                                <div className="text-center mb-8">
                                    <span className="fx-ey">{group}</span>
                                </div>

                                <div className="space-y-4 text-left">
                                    {qs.map(([q, a], i) => {
                                        const key = g + "-" + i;
                                        const isActive = faq === key;
                                        const globalIndex = FAQ_GROUPS.slice(0, g).reduce((acc, [, faqs]) => acc + faqs.length, 0) + i;
                                        const theme = FAQ_THEMES[globalIndex % FAQ_THEMES.length];

                                        return (
                                            <motion.div
                                                key={key}
                                                id={`faq-${q.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                                className={`rounded-2xl border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${isActive ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-lg'}`}
                                            >
                                                <button
                                                    onClick={() => setFaq(isActive ? null : key)}
                                                    className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                                >
                                                    <div className="flex items-center gap-4 md:gap-6">
                                                        <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <span className={`font-serif text-[20px] font-medium transition-colors duration-300 ${isActive ? theme.activeQuestionText : theme.questionText}`}>
                                                            {q}
                                                        </span>
                                                    </div>
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${isActive
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                        }`}>
                                                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    </div>
                                                </button>

                                                <motion.div
                                                    initial={false}
                                                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-6 pt-2 md:pl-[5.5rem] leading-relaxed text-[15px] text-gray-500">
                                                        {a}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
            </section>

            {/* CTA */}
            <section className="fx-sec" style={{ paddingTop: 40 }}>
                <div className="fx-wrap">
                    <div className="fx-cta fx-reveal">
                        <h2>Capture every enquiry — starting this week.</h2>
                        <p>Book a 20-minute demo and we'll set Frosty up on your website and WhatsApp, trained on your own content. You'll see it answer a real enquiry before you decide.</p>
                        <div className="fx-ctas">
                            <a className="fx-btn fx-btn-light" href={DEMO}>Book a demo <Icon n="arrow" /></a>
                            <a className="fx-btn" style={{ background: "rgba(255,255,255,.14)", color: "#fff" }} href="https://wa.me/17574722491">Chat on WhatsApp</a>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

