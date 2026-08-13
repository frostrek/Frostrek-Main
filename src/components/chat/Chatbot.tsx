import React, { useState, useRef, useEffect, useMemo } from "react";
import { Send, Trash2, Minus, ChevronDown, Phone, PhoneOff } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { apiBaseToWsBase, DEFAULT_BOT_CHANNEL, FROSTY_BOT_API_KEY, resolveBotApiBase, resolveBotWsBases } from "../../utils/botApi";

// ═══════════════════════════════════════════════════════════════════
// THEME TOKENS — Frostrek site palette (#2D6A4F, #1B4332, #E8F5EE)
// ═══════════════════════════════════════════════════════════════════
const DARK = {
  void: "#1B4332",
  pane: "#1E3B32",
  card: "#234D3F",
  surface: "#2D6A4F",
  input: "#163028",
  text: "#F9FAFB",
  textMuted: "#A7C4B8",
  textDim: "#7A9E90",
  bronze: "#3D8B6E",
  bronzeDark: "#2D6A4F",
  bronzeLight: "#5BA88A",
  gold: "#5BA88A",
  goldDark: "#3D8B6E",
  goldLight: "#7BC4A8",
  accent: "#3D8B6E",
  error: "#EF4444",
  userBubbleBg: `linear-gradient(135deg, #2D6A4F, #1B4332)`,
  userBubbleText: "#FFFFFF",
  scrollThumb: `linear-gradient(180deg, #2D6A4F 0%, #3D8B6E 100%)`,
  scrollThumbHover: `linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)`,
};

const LIGHT = {
  void: "#FFFFFF",
  pane: "#FCFCFC",
  card: "#FFFFFF",
  surface: "#E8F5EE",
  input: "#F4FAF7",
  text: "#2D241E",
  textMuted: "#64748B",
  textDim: "#94A3B8",
  bronze: "#2D6A4F",
  bronzeDark: "#1B4332",
  bronzeLight: "#3D8B6E",
  gold: "#3D8B6E",
  goldDark: "#256045",
  goldLight: "#5BA88A",
  accent: "#2D6A4F",
  error: "#EF4444",
  userBubbleBg: `linear-gradient(135deg, #2D6A4F, #1B4332)`,
  userBubbleText: "#FFFFFF",
  scrollThumb: `linear-gradient(180deg, #2D6A4F 0%, #3D8B6E 100%)`,
  scrollThumbHover: `linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)`,
};

// --- WhatsApp-style typing indicator ---
const FrostyTypingIndicator = ({ T }: { T: typeof DARK }) => (
  <>
    <style>{`
      @keyframes frosty-wa-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
      .frosty-wa-dot {
        width: 7px;
        height: 7px;
        border-radius: 9999px;
        animation: frosty-wa-bounce 1.25s ease-in-out infinite;
      }
    `}</style>
    <div className="flex items-center gap-1.5 py-1">
      <span
        className="text-xs font-medium tracking-wide"
        style={{ color: T.textMuted, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        Frosty Typing
      </span>
      <div className="flex items-center gap-[4px]">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="frosty-wa-dot"
            style={{
              background: T.bronze,
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  </>
);

// --- SMOOTH TYPING EFFECT COMPONENT ---
const renderMessageWithLinks = (text: string, keyPrefix = "lnk"): React.ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a key={`${keyPrefix}-a-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity" onClick={(e) => e.stopPropagation()}>
          {part}
        </a>
      );
    }
    return <React.Fragment key={`${keyPrefix}-t-${i}`}>{part}</React.Fragment>;
  });
};

const renderInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderMessageWithLinks(text.slice(lastIndex, match.index), `${keyPrefix}-${k++}`));
    }
    nodes.push(<strong key={`${keyPrefix}-b-${k++}`}>{match[1]}</strong>);
    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderMessageWithLinks(text.slice(lastIndex), `${keyPrefix}-${k++}`));
  }

  return nodes.length ? nodes : renderMessageWithLinks(text, keyPrefix);
};

const renderMarkdownMessage = (text: string): React.ReactNode => {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  const listItems: React.ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(
      <ul key={`ul-${key++}`} className="list-disc pl-5 my-2 space-y-1.5">
        {listItems.splice(0, listItems.length)}
      </ul>
    );
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^[*\-•]\s+(.*)$/);

    if (bulletMatch) {
      listItems.push(
        <li key={`li-${key++}`}>{renderInlineMarkdown(bulletMatch[1], `li-${key}`)}</li>
      );
      continue;
    }

    flushList();

    if (!trimmed) {
      if (blocks.length) blocks.push(<div key={`sp-${key++}`} className="h-2" />);
      continue;
    }

    blocks.push(
      <p key={`p-${key++}`} className={blocks.length ? "mt-2 first:mt-0" : ""}>
        {renderInlineMarkdown(line, `p-${key}`)}
      </p>
    );
  }

  flushList();
  return blocks.length ? <>{blocks}</> : null;
};


const SmoothTypingMessage = ({ content, onUpdate }: { content: string, onUpdate?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    onUpdate?.();
  }, [displayedContent, onUpdate]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    // Safety snap if the final content is completely different from the stream
    // (e.g. it was streaming JSON syntax and then snapped to the parsed text)
    if (displayedContent.length > 0 && !content.startsWith(displayedContent) && content !== displayedContent) {
      const snapTimer = window.setTimeout(() => setDisplayedContent(content), 0);
      return () => clearTimeout(snapTimer);
    }

    if (displayedContent.length < content.length) {
      interval = setInterval(() => {
        setDisplayedContent(prev => {
          if (!content.startsWith(prev)) return content;
          const nextChars = content.slice(prev.length, prev.length + 2);
          const nextStr = prev + nextChars;
          if (nextStr.length >= content.length) {
            clearInterval(interval);
            return content;
          }
          return nextStr;
        });
      }, 15);
    } else if (displayedContent !== content) {
      const syncTimer = window.setTimeout(() => setDisplayedContent(content), 0);
      return () => clearTimeout(syncTimer);
    }
    return () => clearInterval(interval);
  }, [content, displayedContent]);

  return <>{renderMarkdownMessage(displayedContent)}</>;
};

const SplashAnimation = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: isDark ? 'rgba(27, 67, 50, 0.45)' : 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
      }}>

      {/* 5-second timeline container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center animate-[splashTimeline_5s_ease-in-out_forwards]">

        <div className="relative w-40 h-40 flex items-center justify-center animate-[breathe_3s_ease-in-out_infinite]">
          {/* Ring 1 - Outer */}
          <div className="absolute w-36 h-36 rounded-full border border-transparent animate-[spin_3s_linear_infinite]"
            style={{ borderTopColor: isDark ? 'rgba(61, 139, 110, 0.8)' : 'rgba(45, 106, 79, 0.5)', borderRightColor: isDark ? 'rgba(61, 139, 110, 0.3)' : 'rgba(45, 106, 79, 0.2)' }}>
          </div>

          {/* Ring 2 - Middle (Counter-spin) */}
          <div className="absolute w-28 h-28 rounded-full border border-transparent animate-[spin_2s_linear_infinite_reverse]"
            style={{ borderBottomColor: isDark ? 'rgba(91, 168, 138, 0.9)' : 'rgba(45, 106, 79, 0.65)', borderLeftColor: isDark ? 'rgba(91, 168, 138, 0.35)' : 'rgba(45, 106, 79, 0.25)' }}>
          </div>

          {/* Ring 3 - Inner */}
          <div className="absolute w-20 h-20 rounded-full border border-transparent animate-[spin_1.5s_linear_infinite]"
            style={{ borderTopColor: isDark ? '#5BA88A' : '#2D6A4F', borderLeftColor: isDark ? 'rgba(91, 168, 138, 0.5)' : 'rgba(45, 106, 79, 0.35)' }}>
          </div>

          {/* Core Pulse */}
          <div className="absolute w-12 h-12 flex items-center justify-center rounded-full animate-ping opacity-20"
            style={{ background: isDark ? '#3D8B6E' : '#2D6A4F' }}>
          </div>

          {/* Center Bot Icon */}
          <div className="relative z-10 p-4 rounded-full" style={{ background: isDark ? 'rgba(45, 106, 79, 0.15)' : 'rgba(232, 245, 238, 0.9)', backdropFilter: 'blur(4px)' }}>
            <img src="/icons/chat.png" alt="" className="w-7 h-7 object-contain" loading="lazy" />
          </div>
        </div>

        {/* Engaging Timeline Text */}
        <div className="mt-8 flex flex-col items-center h-14 relative w-full">

          {/* Text slider mask (exactly the height of one line) */}
          <div className="h-6 overflow-hidden flex flex-col items-center w-full relative">
            <div className="flex flex-col items-center transition-transform animate-[textSlide_5s_ease-in-out_forwards]">
              <span className="h-6 flex items-center justify-center text-[11px] font-[500] tracking-[0.2em] uppercase opacity-70" style={{ color: isDark ? '#E8F5EE' : '#2D6A4F' }}>Initializing</span>
              <span className="h-6 flex items-center justify-center text-[11px] font-[500] tracking-[0.2em] uppercase opacity-70" style={{ color: isDark ? '#E8F5EE' : '#2D6A4F' }}>Connecting</span>
              <span className="h-6 flex items-center justify-center text-[11px] font-[500] tracking-[0.2em] uppercase opacity-70" style={{ color: isDark ? '#E8F5EE' : '#2D6A4F' }}>Ready</span>
            </div>
          </div>

          {/* Bouncing dots under the text */}
          <div className="flex gap-1.5 mt-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full animate-[bounce_1s_infinite]" style={{ background: isDark ? '#5BA88A' : '#2D6A4F', animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full animate-[bounce_1s_infinite]" style={{ background: isDark ? '#5BA88A' : '#2D6A4F', animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full animate-[bounce_1s_infinite]" style={{ background: isDark ? '#5BA88A' : '#2D6A4F', animationDelay: '0.4s' }}></div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes splashTimeline {
          0% { opacity: 0; transform: scale(0.95); filter: blur(5px); }
          10% { opacity: 1; transform: scale(1); filter: blur(0px); }
          90% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.1); filter: blur(15px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes textSlide {
          0%, 25% { transform: translateY(0); }
          35%, 65% { transform: translateY(-24px); }
          75%, 100% { transform: translateY(-48px); }
        }
      `}</style>
    </div>
  );
};

const API_KEY = FROSTY_BOT_API_KEY;

const normalizeChannel = (channel: string) => {
  const value = String(channel || DEFAULT_BOT_CHANNEL).trim().toLowerCase();
  if (value === "website_bot" || value === "dashboard-preview" || value === "web") {
    return DEFAULT_BOT_CHANNEL;
  }
  return value || DEFAULT_BOT_CHANNEL;
};

let tenantContextCache: { apiKey: string; tenantId: string } | null = null;
const WARMUP_SESSION_ID = "__frosty_prewarm__";


interface ChatWidgetProps {
  apiKey?: string;
  channel?: string;
}

type SlotOffer = {
  account_id: string;
  owner_name?: string;
  owner_email?: string;
  slots: Array<{
    start: string;
    end: string;
    start_iso?: string;
    end_iso?: string;
  }>;
};

type ServerPollMessage = {
  role: string;
  content: string;
};

type ChatMessage = {
  role: string;
  content: string;
  rawBuffer?: string;
  statusLine?: string;
  slotOffers?: SlotOffer[];
};

export default function ChatWidget({
  apiKey = API_KEY,
  channel = "website"
}: ChatWidgetProps) {
  const resolvedApiKey = String(apiKey || "").trim();
  const resolvedChannel = normalizeChannel(channel);
  const { isDark } = useTheme();
  const T = useMemo(() => (isDark ? DARK : LIGHT), [isDark]);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSplashing, setIsSplashing] = useState(false);
  const [hasWarmedUp, setHasWarmedUp] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'ai' | 'human'>('ai');
  const chatModeRef = useRef<'ai' | 'human'>('ai');
  const wsRef = useRef<WebSocket | null>(null);
  const wsConnectRef = useRef<Promise<WebSocket | null> | null>(null);
  const wsReconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tenantIdRef = useRef<string>("default");
  const sessionIdRef = useRef<string>("");
  const lastWarmupAtRef = useRef<number>(0);
  const greetingWarmupRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    chatModeRef.current = chatMode;
  }, [chatMode]);

  const isOpenRef = useRef(false);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Voice call state
  const [isInCall, setIsInCall] = useState(false);
  const [callStatus, setCallStatus] = useState<"connecting" | "listening" | "thinking" | "speaking" | "idle">("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const callWsRef = useRef<WebSocket | null>(null);
  const callMediaRef = useRef<MediaRecorder | null>(null);
  const callStreamRef = useRef<MediaStream | null>(null);
  const callAudioQueueRef = useRef<Uint8Array[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Click-outside refs
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);

  // ── Drag state for FAB ──
  const [, setFabPos] = useState<{ x: number; y: number }>({ x: 1000, y: 24 });
  const fabPosRef = useRef<{ x: number; y: number }>({ x: 1000, y: 24 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; fabX: number; fabY: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const snapSideRef = useRef<'left' | 'right'>('right');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const snapFab = () => {
      const buttonWidth = 64;
      const padding = 24;
      const screenWidth = window.innerWidth;

      const snappedX = snapSideRef.current === 'left' 
        ? padding 
        : Math.max(padding, screenWidth - buttonWidth - padding);
      const snappedY = padding;

      const snappedPos = { x: snappedX, y: snappedY };
      fabPosRef.current = snappedPos;
      setFabPos(snappedPos);
    };

    snapFab();

    window.addEventListener('resize', snapFab);
    return () => window.removeEventListener('resize', snapFab);
  }, []);

  const getFabPosition = () => fabPosRef.current;

  // Is FAB on right half of screen?
  const isFabOnRight = () => {
    if (typeof window === 'undefined') return true;
    return getFabPosition().x > window.innerWidth / 2;
  };

  // Is FAB on top half of screen?
  const isFabOnTop = () => {
    if (typeof window === 'undefined') return false;
    return getFabPosition().y > window.innerHeight / 2;
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    const pos = getFabPosition();
    dragStartRef.current = { x: clientX, y: clientY, fabX: pos.x, fabY: pos.y };
    hasDraggedRef.current = false;
    isDraggingRef.current = true;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !dragStartRef.current) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = dragStartRef.current.y - clientY; // inverted because y is from bottom
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5) hasDraggedRef.current = true;
    if (!hasDraggedRef.current) return;

    const absX = dragStartRef.current.fabX + dx;
    const absY = dragStartRef.current.fabY - (clientY - dragStartRef.current.y);
    const newPos = {
      x: Math.max(12, Math.min(window.innerWidth - 76, absX)),
      y: Math.max(12, Math.min(window.innerHeight - 76, absY)),
    };
    fabPosRef.current = newPos;
    setFabPos(newPos);
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    dragStartRef.current = null;

    // Magnetic pull: snap to nearest bottom corner (left or right) upon release
    if (typeof window !== 'undefined') {
      const buttonWidth = 64; // w-16 = 64px
      const padding = 24; // margin from screen edge
      const screenWidth = window.innerWidth;
      const currentX = fabPosRef.current.x;
      const centerX = currentX + buttonWidth / 2;

      const isLeft = centerX < screenWidth / 2;
      snapSideRef.current = isLeft ? 'left' : 'right';

      // Snap to left corner (24px) or right corner (screenWidth - buttonWidth - padding)
      const snappedX = isLeft 
        ? padding 
        : Math.max(padding, screenWidth - buttonWidth - padding);
      const snappedY = padding; // Always snap to bottom corner

      const snappedPos = { x: snappedX, y: snappedY };
      fabPosRef.current = snappedPos;
      setFabPos(snappedPos);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      if (e.touches.length === 1) {
        e.preventDefault();
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Animated close
  const triggerClose = () => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    if (wsReconnectTimerRef.current) {
      clearTimeout(wsReconnectTimerRef.current);
      wsReconnectTimerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 700);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isOpen && !isClosing &&
        chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node) &&
        fabRef.current && !fabRef.current.contains(e.target as Node)
      ) triggerClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
    // triggerClose is intentionally omitted — re-binding on every render would stack listeners incorrectly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isClosing]);

  useEffect(() => {
    if (isOpen && isAtBottom) {
      scrollToBottom(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Polling for admin/human messages + authoritative session mode
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(async () => {
      const sid = sessionIdRef.current;
      if (!sid) return;
      try {
        const apiBase = resolveApiBase();
        const bridged = getBridgedSessionId(sid);
        const res = await fetch(`${apiBase}/chat/messages?session_id=${encodeURIComponent(bridged)}`, {
          headers: { 'x-api-key': apiKey || API_KEY },
        });
        if (res.ok) {
          const data = await res.json();
          const serverMode = String(data?.mode || "").toLowerCase();
          if (serverMode === "ai" || serverMode === "human") {
            setChatMode((prev) => {
              if (prev !== serverMode) {
                const notice =
                  serverMode === "human"
                    ? "You are connected to a support agent."
                    : prev === "human"
                      ? "AI assistant is now active."
                      : "";
                if (notice) {
                  setMessages((msgs) => {
                    if (msgs.some((m) => m.role === "system" && m.content === notice)) return msgs;
                    return [...msgs, { role: "system", content: notice }];
                  });
                }
              }
              if (prev === serverMode) return prev;
              return serverMode as "ai" | "human";
            });
            if (serverMode === "human") {
              void connectSocket(sid);
            }
          }
          if (data.messages && Array.isArray(data.messages) && serverMode === "human") {
            setMessages((prev) => {
              const serverMsgs: ChatMessage[] = data.messages.map((m: ServerPollMessage) => ({
                role: m.role === "admin" ? "assistant" : m.role,
                content: m.content,
              }));
              const hasNewAdminMsg = data.messages.some((m: ServerPollMessage) =>
                m.role === "admin" &&
                !prev.some((pm) => pm.content === m.content)
              );
              if (!hasNewAdminMsg) return prev;

              // Merge: keep local system notices + optimistic user msgs not yet on server.
              const systemMsgs = prev.filter((m) => m.role === "system");
              const serverKeys = new Set(
                serverMsgs.map((m) => `${m.role}::${String(m.content || "").trim()}`)
              );
              const pendingUser = prev.filter(
                (m) =>
                  m.role === "user" &&
                  String(m.content || "").trim() &&
                  !serverKeys.has(`user::${String(m.content || "").trim()}`)
              );
              const next = [...serverMsgs, ...pendingUser];
              for (const s of systemMsgs) {
                if (!next.some((m) => m.role === "system" && m.content === s.content)) {
                  next.push(s);
                }
              }
              return next;
            });
          }
        }
      } catch {
        // silent fallback
      }
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, apiKey]);

  // Scroll to bottom immediately (used during streaming)
  const scrollToBottom = (smooth = true) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
  };

  // Removed custom wheel event that broke scrolling. 
  // Using native CSS overscroll-contain instead.

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const threshold = 60;
    const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    setIsAtBottom(atBottom);
  };


  const generateSessionId = () => {
    let sid = sessionStorage.getItem("frosty_session");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("frosty_session", sid);
    }
    return sid;
  };

  const getBridgedSessionId = (sid: string) => {
    if (!sid) return sid;
    if (sid.includes("--")) return sid;
    const tid = tenantIdRef.current || "default";
    return `${tid}--${resolvedChannel}--${sid}`;
  };


  const resolveApiBase = resolveBotApiBase;

  const resolveWsBases = () => resolveBotWsBases(resolveApiBase());

  const attachSocketHandlers = (ws: WebSocket) => {
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const role = String(data?.role || "").toLowerCase();
        const text = String(data?.text || "").trim();

        if (data.mode === "ai" || data.mode === "human") {
          setChatMode(data.mode);
          if (data.mode === "human" && sessionIdRef.current) {
            void connectSocket(sessionIdRef.current);
          }
        }

        if (!text) return;

        if (role === "assistant") {
          // Backend only returns assistant replies on the chat WS when mode is AI.
          if (data.mode !== "human") {
            setChatMode("ai");
          }
          setMessages(prev => [...prev, { role: 'assistant', content: text }]);
        } else if (role === "admin" || role === "agent") {
          setChatMode("human");
          // Normalize to assistant so it renders properly with an avatar
          setMessages(prev => [...prev, { role: 'assistant', content: text }]);
        } else {
          const lower = text.toLowerCase();
          if (lower.includes("connected to a support agent")) {
            setChatMode("human");
            if (sessionIdRef.current) void connectSocket(sessionIdRef.current);
          } else if (
            lower.includes("ai assistant is now active") ||
            lower.includes("ai is now active")
          ) {
            setChatMode("ai");
          }
          setMessages(prev => {
            if (prev.some((m) => m.role === "system" && m.content === text)) return prev;
            return [...prev, { role: 'system', content: text }];
          });
        }

        setIsLoading(false);
        setTimeout(() => scrollToBottom(), 50);
      } catch {
        // Ignore malformed ws payloads.
      }
    };

    ws.onclose = () => {
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
      setIsLoading(false);
      // Keep trying while Live Support is active — claim/release notices need a live WS.
      if (chatModeRef.current === "human" && sessionIdRef.current && isOpenRef.current) {
        if (wsReconnectTimerRef.current) clearTimeout(wsReconnectTimerRef.current);
        wsReconnectTimerRef.current = setTimeout(() => {
          if (chatModeRef.current === "human" && sessionIdRef.current && isOpenRef.current) {
            void connectSocket(sessionIdRef.current);
          }
        }, 2000);
      }
    };
  };

  const connectSocket = async (sessionId: string): Promise<WebSocket | null> => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      return wsRef.current;
    }
    if (wsConnectRef.current) {
      return wsConnectRef.current;
    }

    const attempt = async (): Promise<WebSocket | null> => {
      const bases = resolveWsBases();
      const rawId = sessionId.includes("--") ? sessionId : getBridgedSessionId(sessionId);
      const bridgedId = encodeURIComponent(rawId);
      for (const base of bases) {
        const url = `${base.replace(/\/$/, "")}/ws/chat/${bridgedId}`;
        try {
          const ws = await new Promise<WebSocket>((resolve, reject) => {
            const candidate = new WebSocket(url);
            const timer = setTimeout(() => {
              try { candidate.close(); } catch { /* no-op */ }
              reject(new Error("timeout"));
            }, 2500);

            candidate.onopen = () => {
              clearTimeout(timer);
              resolve(candidate);
            };
            candidate.onerror = () => {
              clearTimeout(timer);
              try { candidate.close(); } catch { /* no-op */ }
              reject(new Error("error"));
            };
            candidate.onclose = () => {
              clearTimeout(timer);
              reject(new Error("closed"));
            };
          });

          wsRef.current = ws;
          attachSocketHandlers(ws);
          return ws;
        } catch {
          // Try next candidate.
        }
      }
      return null;
    };

    wsConnectRef.current = attempt();
    const connected = await wsConnectRef.current;
    wsConnectRef.current = null;
    return connected;
  };

  const ensureTenantContext = async () => {
    if (!resolvedApiKey) return;
    if (
      tenantContextCache?.apiKey === resolvedApiKey &&
      tenantContextCache.tenantId &&
      tenantContextCache.tenantId !== "default"
    ) {
      tenantIdRef.current = tenantContextCache.tenantId;
      return;
    }
    try {
      const apiBase = resolveApiBase();
      const res = await fetch(`${apiBase}/tenant/bot-config`, {
        headers: {
          "x-api-key": resolvedApiKey,
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      const tenantId = String(data?.tenant_id || data?.tenant?.tenant_id || "").trim();
      if (tenantId) {
        tenantIdRef.current = tenantId;
        tenantContextCache = { apiKey: resolvedApiKey, tenantId };
      }
    } catch {
      // Keep default tenant fallback.
    }
  };

  const streamResponse = async (
    fetchPromise: Promise<Response>,
    opts?: { onFirstToken?: () => void }
  ) => {
    const response = await fetchPromise;
    if (!response.ok) throw new Error("Network response was not ok");

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() || "";

      for (const part of parts) {
        if (part.startsWith("data: ")) {
          const jsonStr = part.replace("data: ", "").trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.status) {
              setMessages((prev) => {
                const updated = [...prev];
                const targetIdx = updated.map(m => m.role).lastIndexOf("assistant");
                if (targetIdx >= 0) {
                  updated[targetIdx] = {
                    ...updated[targetIdx],
                    statusLine: String(data.status),
                  };
                }
                return updated;
              });
            }

            if (data.token) {
              opts?.onFirstToken?.();
              setMessages((prev) => {
                const updated = [...prev];
                const targetIdx = updated.map(m => m.role).lastIndexOf("assistant");
                if (targetIdx === -1) return updated;
                const prevMsg = updated[targetIdx];
                
                const newRaw = (prevMsg.rawBuffer !== undefined ? prevMsg.rawBuffer : prevMsg.content) + data.token;
                let displayStr = newRaw;
                
                const trimmedRaw = newRaw.trimStart();
                if (trimmedRaw.startsWith("{") && trimmedRaw.includes('"reply"')) {
                  const replyIndex = newRaw.indexOf('"reply"');
                  if (replyIndex !== -1) {
                     const afterReply = newRaw.substring(replyIndex + 7);
                     const colonMatch = afterReply.match(/^\s*:\s*"/);
                     if (colonMatch) {
                        const start = colonMatch[0].length;
                        let innerStr = afterReply.substring(start);
                        if (innerStr.endsWith('"}') || innerStr.endsWith('"\n}')) {
                            innerStr = innerStr.replace(/"\s*}$/, '');
                        }
                        displayStr = innerStr.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
                     } else {
                        displayStr = "";
                     }
                  } else {
                     displayStr = "";
                  }
                } else if (trimmedRaw.startsWith("{")) {
                  displayStr = "";
                }

                updated[targetIdx] = {
                  ...prevMsg,
                  rawBuffer: newRaw,
                  content: displayStr,
                };
                return updated;
              });
              // Auto-scroll on every token if user is near bottom
              const container = scrollContainerRef.current;
              if (container) {
                const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
                if (nearBottom) container.scrollTop = container.scrollHeight;
              }
            }

            // Human takeover: switch to live support immediately (agent already claimed).
            if (data.human_takeover) {
              setMessages((prev) => {
                // Remove trailing empty assistant bubble
                let updated = [...prev];
                const targetIdx = updated.map(m => m.role).lastIndexOf("assistant");
                if (targetIdx !== -1 && !updated[targetIdx].content) {
                  updated.splice(targetIdx, 1);
                }
                const notice = "You are connected to a support agent.";
                if (!updated.some((m) => m.role === "system" && m.content === notice)) {
                  updated = [...updated, { role: "system", content: notice }];
                }
                return updated;
              });
              setChatMode("human");
              if (sessionIdRef.current) void connectSocket(sessionIdRef.current);
              setIsLoading(false);
              return; // stop processing this stream
            }

            if (data.final && data.final.reply) {
              let finalText = String(data.final.reply || "");
              // Safety: never show raw classifier JSON in the bubble
              const trimmed = finalText.trim();
              if (trimmed.startsWith("{") && trimmed.includes('"reply"')) {
                try {
                  const parsed = JSON.parse(trimmed);
                  if (parsed && typeof parsed.reply === "string" && parsed.reply.trim()) {
                    finalText = parsed.reply;
                  }
                } catch {
                  // keep original
                }
              }
              setMessages((prev) => {
                const updated = [...prev];
                const targetIdx = updated.map(m => m.role).lastIndexOf("assistant");
                if (targetIdx === -1) return updated;
                updated[targetIdx] = {
                  ...updated[targetIdx],
                  content: finalText,
                  statusLine: undefined,
                  slotOffers: data.final.slot_offers || undefined,
                };
                return updated;
              });
              setIsLoading(false);
              // Scroll to bottom when final reply arrives
              setTimeout(() => scrollToBottom(), 50);
            }

            // Handle final with empty reply (e.g. disabled/human mode)
            if (data.final && data.final.reply === "") {
              setMessages((prev) => {
                const targetIdx = prev.map(m => m.role).lastIndexOf("assistant");
                if (targetIdx !== -1 && !prev[targetIdx].content) {
                  const updated = [...prev];
                  updated.splice(targetIdx, 1);
                  return updated;
                }
                return prev;
              });
            }


          } catch {
            // Ignore malformed chunks
          }
        }
      }
    }
  };

  const runSilentWarmup = async (sessionId: string = WARMUP_SESSION_ID) => {
    try {
      await ensureTenantContext();
      const apiBase = resolveApiBase();
      const response = await fetch(`${apiBase}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": resolvedApiKey,
        },
        body: JSON.stringify({
          message: "hi",
          session_id: getBridgedSessionId(sessionId),
          channel: resolvedChannel,
        }),
      });
      if (!response.ok || !response.body) return;
      const reader = response.body.getReader();
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
    } catch {
      // Warmup is best-effort and should never disrupt UX.
    }
  };

  const runGreetingWarmup = async () => {
    if (!resolvedApiKey) return;
    if (greetingWarmupRef.current) {
      await greetingWarmupRef.current;
      return;
    }
    greetingWarmupRef.current = runSilentWarmup(WARMUP_SESSION_ID);
    await greetingWarmupRef.current;
  };

  useEffect(() => {
    if (!resolvedApiKey) return;
    void runGreetingWarmup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedApiKey, resolvedChannel]);

  const handleOpenWidget = async () => {
    setIsOpen(true);
    const sessionId = generateSessionId();
    sessionIdRef.current = sessionId;

    if (!hasWarmedUp) {
      // ── Show splash + loader IMMEDIATELY — before any network calls ────
      setHasWarmedUp(true);
      setIsSplashing(true);
      setIsLoading(true);
      lastWarmupAtRef.current = Date.now();
      setMessages([{ role: "assistant", content: "" }]);

      await ensureTenantContext();
      await runGreetingWarmup();
      void connectSocket(sessionId);

      const apiBase = resolveApiBase();
      const splashTimer = setTimeout(() => setIsSplashing(false), 2000);
      let splashDismissed = false;
      const dismissSplash = () => {
        if (splashDismissed) return;
        splashDismissed = true;
        clearTimeout(splashTimer);
        setIsSplashing(false);
      };

      // Stream the warmup "hi" — dismiss splash on first token or 2s timeout
      void streamResponse(
        fetch(`${apiBase}/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": resolvedApiKey,
          },
          body: JSON.stringify({
            message: "hi",
            session_id: getBridgedSessionId(sessionId),
            channel: resolvedChannel,
          }),
        }),
        { onFirstToken: dismissSplash }
      )
        .catch(() => {
          setMessages([{ role: "assistant", content: "Hi there! How can I help you today?" }]);
        })
        .finally(() => {
          dismissSplash();
          setIsLoading(false);
        });

      return;
    }

    // Widget re-opened after first warmup — resolve tenant + reconnect silently
    await ensureTenantContext();
    void connectSocket(sessionId);

    const now = Date.now();
    if (now - lastWarmupAtRef.current > 30000) {
      lastWarmupAtRef.current = now;
      void runSilentWarmup(sessionId);
    }
  };


  const sendHiddenMessage = async (hiddenText: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    const sessionId = sessionIdRef.current || generateSessionId();
    sessionIdRef.current = sessionId;
    await ensureTenantContext();
    try {
      const apiBase = resolveApiBase();
      await streamResponse(
        fetch(`${apiBase}/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": resolvedApiKey,
          },
          body: JSON.stringify({
            message: hiddenText,
            session_id: getBridgedSessionId(sessionId),
            channel: resolvedChannel,
          }),
        }),
      );
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Sorry, I couldn't complete that booking. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    const sessionId = sessionIdRef.current || generateSessionId();
    sessionIdRef.current = sessionId;

    if (chatMode === "human") {
      const bridgedId = getBridgedSessionId(sessionId);
      try {
        const apiBase = resolveApiBase();
        const res = await fetch(`${apiBase}/chat/handoff-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": resolvedApiKey,
          },
          body: JSON.stringify({
            message: userText,
            session_id: bridgedId,
            channel: resolvedChannel,
          }),
        });
        if (!res.ok) throw new Error(`handoff-message ${res.status}`);
        void connectSocket(sessionId);
        return;
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "system", content: "Could not deliver your message to live support. Please try again." },
        ]);
        return;
      }
    }

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "" },
    ]);
    setTimeout(() => scrollToBottom(false), 20);

    await ensureTenantContext();

    try {
      const apiBase = resolveApiBase();
      await streamResponse(
        fetch(`${apiBase}/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": resolvedApiKey,
          },
          body: JSON.stringify({
            message: userText,
            session_id: getBridgedSessionId(sessionId),
            channel: resolvedChannel,
          }),
        })
      );
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };



  // ── Voice Call ──────────────────────────────────────────────────────────────
  const audioContextRef = useRef<AudioContext | null>(null);
  const pcmWorkletRef = useRef<AudioWorkletNode | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      callStreamRef.current = stream;
      setIsInCall(true);
      setCallStatus("connecting");
      setLiveTranscript("");
      flushPlayback();

      const apiBase = resolveApiBase();
      const wsBase = apiBaseToWsBase(apiBase);
      const sid = getBridgedSessionId(sessionIdRef.current || generateSessionId());
      const wsUrl = `${wsBase}/ws/voice-call/${encodeURIComponent(sid)}`;
      const ws = new WebSocket(wsUrl);
      callWsRef.current = ws;

      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        // Send init handshake with API key
        ws.send(JSON.stringify({ api_key: resolvedApiKey }));
      };

      ws.onmessage = async (event) => {
        if (event.data instanceof ArrayBuffer) {
          playPcmChunk(new Uint8Array(event.data));
          return;
        }
        if (event.data instanceof Blob) {
          const buf = await event.data.arrayBuffer();
          playPcmChunk(new Uint8Array(buf));
          return;
        }

        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "ready") {
            setCallStatus("listening");
            startMicStream(ws, stream);
          }
          else if (msg.type === "transcript") {
            setLiveTranscript(msg.text);
          }
          else if (msg.type === "user_final") {
            setMessages(prev => [...prev, { role: "user", content: msg.text }]);
            setLiveTranscript("");
          }
          else if (msg.type === "thinking") {
            setCallStatus("thinking");
          }
          else if (msg.type === "bot_reply") {
            setMessages(prev => [...prev, { role: "assistant", content: msg.text }]);
          }
          else if (msg.type === "audio_end") {
            setCallStatus("listening");
          }
          else if (msg.type === "interrupted") {
            // Barge-in: flush all queued audio immediately
            flushPlayback();
            setCallStatus("listening");
          }
          else if (msg.type === "error") {
            console.error("[CALL] Server error:", msg.message);
            endCall();
          }
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        if (callWsRef.current === ws) {
          endCall();
        }
      };

      ws.onerror = () => {
        console.error("[CALL] WebSocket error");
        endCall();
      };

    } catch (err) {
      console.error("[CALL] Mic error:", err);
      alert("Cannot access microphone. Please check browser permissions.");
      setIsInCall(false);
      setCallStatus("idle");
    }
  };

  const startMicStream = async (ws: WebSocket, stream: MediaStream) => {
    try {
      const ctx = new AudioContext({ sampleRate: 16000 });
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      audioContextRef.current = ctx;

      // Register inline PCM processor worklet
      const processorCode = `
        class PcmProcessor extends AudioWorkletProcessor {
          process(inputs) {
            const input = inputs[0]?.[0];
            if (input) {
              const pcm16 = new Int16Array(input.length);
              for (let i = 0; i < input.length; i++) {
                const s = Math.max(-1, Math.min(1, input[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
            }
            return true;
          }
        }
        registerProcessor("pcm-processor", PcmProcessor);
      `;
      const blob = new Blob([processorCode], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      await ctx.audioWorklet.addModule(url);
      URL.revokeObjectURL(url);

      const source = ctx.createMediaStreamSource(stream);
      const worklet = new AudioWorkletNode(ctx, "pcm-processor");
      pcmWorkletRef.current = worklet;

      worklet.port.onmessage = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(e.data); // Send raw PCM Int16 bytes
        }
      };

      source.connect(worklet);
      // Do NOT connect worklet to destination — we don't want local echo
      setCallStatus("listening");
    } catch (err) {
      console.error("[Frosty] AudioWorklet setup failed, falling back to MediaRecorder", err);
      // Fallback to MediaRecorder for browsers without AudioWorklet support
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      callMediaRef.current = rec;
      rec.ondataavailable = (e) => { if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) ws.send(e.data); };
      rec.start(250);
    }
  };

  const playPcmChunk = (pcmBytes: Uint8Array) => {
    if (!pcmBytes.length) return;
    setCallStatus("speaking");

    try {
      if (!playbackCtxRef.current || playbackCtxRef.current.state === "closed") {
        playbackCtxRef.current = new AudioContext({ sampleRate: 24000 });
        nextPlayTimeRef.current = 0;
      }
      const ctx = playbackCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Convert raw PCM 16-bit LE to Float32 safely using DataView
      const samplesCount = Math.floor(pcmBytes.byteLength / 2);
      if (samplesCount === 0) return;
      const dataView = new DataView(pcmBytes.buffer, pcmBytes.byteOffset, pcmBytes.byteLength);
      const float32 = new Float32Array(samplesCount);
      for (let i = 0; i < samplesCount; i++) {
        float32[i] = dataView.getInt16(i * 2, true) / 32768.0;
      }

      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.copyToChannel(float32, 0);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const now = ctx.currentTime;
      const startTime = Math.max(now, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + buffer.duration;
    } catch (err) {
      console.warn("[Frosty] PCM playback error", err);
    }
  };

  const flushPlayback = () => {
    // Close and recreate playback context to instantly stop all queued audio
    try {
      playbackCtxRef.current?.close();
    } catch {
      // AudioContext may already be closed.
    }
    playbackCtxRef.current = null;
    nextPlayTimeRef.current = 0;
  };

  const endCall = () => {
    // Clean up AudioWorklet
    try { pcmWorkletRef.current?.disconnect(); } catch { /* no-op */ }
    pcmWorkletRef.current = null;
    try { audioContextRef.current?.close(); } catch { /* no-op */ }
    audioContextRef.current = null;

    // Clean up MediaRecorder fallback
    if (callMediaRef.current && callMediaRef.current.state !== "inactive") {
      callMediaRef.current.stop();
    }
    callMediaRef.current = null;

    // Stop stream tracks
    if (callStreamRef.current) {
      callStreamRef.current.getTracks().forEach(t => t.stop());
      callStreamRef.current = null;
    }

    // Close WebSocket
    if (callWsRef.current) {
      try { callWsRef.current.send(JSON.stringify({ type: "hangup" })); } catch { /* no-op */ }
      try { callWsRef.current.close(); } catch { /* no-op */ }
      callWsRef.current = null;
    }

    // Clean up playback
    flushPlayback();

    setIsInCall(false);
    setCallStatus("idle");
    setLiveTranscript("");
    callAudioQueueRef.current = [];
  };


  // Whether to show welcome screen (no real messages yet)
  const hasRealMessages = messages.some(m => m.content && m.content.trim().length > 0);

  return (
    <>
      <style>{`
        .frostrek-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .frostrek-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .frostrek-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2D6A4F 0%, #3D8B6E 100%);
          border-radius: 10px;
        }
        .frostrek-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%);
        }
        @keyframes notif-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
      `}</style>

      <style>{`
        @keyframes fab-pop-in {
          0%   { transform: scale(0) rotate(-200deg); opacity:0; }
          65%  { transform: scale(1.18) rotate(12deg);  opacity:1; }
          82%  { transform: scale(0.93) rotate(-6deg); }
          100% { transform: scale(1) rotate(0deg);     opacity:1; }
        }
        @keyframes fab-pop-out {
          0%   { transform: scale(1) rotate(0deg);   opacity:1; }
          100% { transform: scale(0) rotate(180deg); opacity:0; }
        }
        @keyframes window-open {
          0%   { transform: scale(0.45) translateY(80px);  opacity:0; filter:blur(16px); }
          55%  { transform: scale(1.03) translateY(-6px);  opacity:1; filter:blur(0); }
          75%  { transform: scale(0.98) translateY(3px); }
          100% { transform: scale(1)    translateY(0);    opacity:1; filter:blur(0); }
        }
        @keyframes window-close {
          0%   { transform: scale(1) translateY(0) rotate(0deg);     opacity:1; filter:blur(0); }
          25%  { transform: scale(1.04) translateY(-10px) rotate(0deg); opacity:1; }
          100% { transform: scale(0.08) translateY(140px) rotate(10deg); opacity:0; filter:blur(20px); }
        }
      `}</style>

      {/* ── Floating Action Button — chatbot.webp with red notification dot ── */}
      <div
        ref={fabRef}
        className="fixed z-50"
        style={{
          left: getFabPosition().x,
          bottom: getFabPosition().y,
          transition: isDraggingRef.current
            ? 'none'
            : 'left 0.35s cubic-bezier(0.25, 1, 0.5, 1), bottom 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
          animation: isOpen
            ? 'fab-pop-out 0.38s cubic-bezier(0.4,0,1,1) forwards'
            : 'fab-pop-in 0.72s cubic-bezier(0.34,1.56,0.64,1) forwards',
          pointerEvents: isOpen ? 'none' : 'auto',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
        onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX, e.clientY); }}
        onTouchStart={(e) => { if (e.touches.length === 1) handleDragStart(e.touches[0].clientX, e.touches[0].clientY); }}
      >
        <button
          onClick={() => { if (!hasDraggedRef.current) handleOpenWidget(); }}
          className="relative w-16 h-16 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
          style={{ background: 'transparent' }}
        >
          <img
            src="/chatbot.webp"
            alt="Chat with Frostrek"
            className="w-14 h-14 object-contain rounded-full drop-shadow-lg"
            loading="lazy"
            width={512}
            height={512}
          />
          {/* Pulsing red notification dot */}
          <span
            className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white"
            style={{ animation: 'notif-pulse 2s ease-in-out infinite' }}
          />
        </button>
      </div>

      {/* ── Chat Window ── */}
      <div
        ref={chatWindowRef}
        className="fixed w-[calc(100vw-48px)] sm:w-[380px] h-[calc(100vh-180px)] sm:h-[600px] flex flex-col z-50 rounded-2xl min-h-0"
        data-lenis-prevent
        style={{
          left: isFabOnRight() ? undefined : getFabPosition().x,
          right: isFabOnRight() ? (typeof window !== 'undefined' ? window.innerWidth - getFabPosition().x - 64 : 24) : undefined,
          top: isFabOnTop() ? (typeof window !== 'undefined' ? window.innerHeight - getFabPosition().y - 64 : 24) : undefined,
          bottom: isFabOnTop() ? undefined : getFabPosition().y,
          transformOrigin: isFabOnTop()
            ? (isFabOnRight() ? 'top right' : 'top left')
            : (isFabOnRight() ? 'bottom right' : 'bottom left'),
          animation: (!isOpen && !isClosing)
            ? 'none'
            : isClosing
              ? 'window-close 0.70s cubic-bezier(0.4,0,1,1) forwards'
              : 'window-open  0.72s cubic-bezier(0.34,1.56,0.64,1) forwards',
          pointerEvents: (!isOpen || isClosing) ? 'none' : 'auto',
          display: (!isOpen && !isClosing) ? 'none' : 'flex',
          boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        {/* Main panel — clean white with subtle rounded border */}
        <div className="flex-1 flex flex-col min-h-0 rounded-2xl overflow-hidden relative bg-white" style={{
          border: '1px solid #E2E8F0',
        }}>

          {isSplashing && <SplashAnimation isDark={isDark} />}

          {/* Wrapper to fade in after splash */}
          <div className={`absolute inset-0 flex flex-col min-h-0 transition-opacity duration-1000 ${isSplashing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* ── Header — Sky-blue ── */}
            <div className="relative px-4 py-3 flex items-center justify-between" style={{
              background: '#BAE6FD',
              borderBottom: '2px solid #7DD3FC',
            }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-[#7DD3FC] flex items-center justify-center shadow-sm overflow-hidden">
                  <img src="/chatbot.webp" alt="Frostrek" className="w-7 h-7 object-contain translate-y-0.5" loading="lazy" width={512} height={512} />
                </div>
                <div>
                  <h3 className="font-serif font-extrabold text-sm tracking-wide text-gray-900 flex items-center gap-2">
                    Frostrek Assistant
                    {chatMode === 'human' && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter bg-[#E8F5EE] text-[#2D6A4F] border border-[#BBF7D0]">
                        Live Support
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] font-bold tracking-wider" style={{ color: '#0EA5E9' }}>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setMessages([]); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/40"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={triggerClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/40"
                  title="Minimize"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* ── Chat Body — clean white ── */}
            <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col" style={{ background: '#FAFCFB' }}>
              <div
                ref={scrollContainerRef}
                className="h-full min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y px-4 py-3 pb-[70px] space-y-4 frostrek-scrollbar"
                data-lenis-prevent
                onScroll={handleScroll}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Welcome screen when no real messages */}
                {!hasRealMessages && !isLoading && (
                  <div className="flex flex-col items-center justify-center text-center py-8 px-2 gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center shadow-sm">
                      <img src="/chatbot.webp" alt="Frosty" className="w-10 h-10 object-contain" loading="lazy" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-gray-800">Hey there! 👋</h4>
                      <p className="text-sm text-gray-500 mt-1">I'm Frosty, your AI assistant.<br/>How can I help you today?</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {[
                        { label: '💡 Get ideas', query: 'Give me some innovative tech ideas' },
                        { label: '📊 Analytics', query: 'Tell me about your analytics solutions' },
                        { label: '🛠️ Support', query: 'I need technical support' },
                      ].map((sug) => (
                        <button
                          key={sug.label}
                          type="button"
                          onClick={() => { setInput(sug.query); }}
                          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors hover:bg-[#E8F5EE]"
                          style={{ borderColor: '#2D6A4F', color: '#2D6A4F' }}
                        >
                          {sug.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => {
                  const normalizedRole = String(msg.role || "").toLowerCase();
                  const isUser = normalizedRole === "user";
                  const isAdmin = normalizedRole === "admin" || normalizedRole === "agent";
                  const isAssistant = normalizedRole === "assistant";
                  const isSystem = normalizedRole === "system";

                  if (isSystem) {
                    return (
                      <div key={i} className="flex justify-center px-2">
                        <div
                          className="text-[11px] font-semibold text-center px-3 py-1.5 rounded-full"
                          style={{
                            color: '#2D6A4F',
                            background: '#E8F5EE',
                            border: '1px dashed #BBF7D0',
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      {/* Bot / Admin avatar */}
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden shadow-sm" style={{
                          background: '#FFFFFF',
                          border: '1.5px solid #BBF7D0',
                        }}>
                          {isAdmin ? (
                            <span className="text-[9px] font-bold text-[#2D6A4F]">STAFF</span>
                          ) : (
                            <img src="/chatbot.webp" alt="Frosty" className="w-5 h-5 object-contain" loading="lazy" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 max-w-[80%]">
                        {isAdmin && (
                          <div className="text-[9px] font-bold uppercase tracking-widest px-1 text-gray-400">Live Support</div>
                        )}
                        <div
                          className="relative px-3.5 py-2.5 text-sm leading-relaxed shadow-sm"
                          style={isUser
                            ? {
                              background: '#2D6A4F',
                              color: '#FFFFFF',
                              borderRadius: '1rem 0.25rem 1rem 1rem',
                            }
                            : {
                              background: isAdmin ? '#E8F5EE' : '#FFFFFF',
                              border: isAdmin ? '1px solid #BBF7D0' : '1.5px solid #D1FAE5',
                              color: '#1F2937',
                              borderRadius: '0.25rem 1rem 1rem 1rem',
                              fontFamily: "'Inter', system-ui, sans-serif",
                              lineHeight: '1.6',
                            }
                          }
                        >
                          {(isAssistant || isAdmin) && (
                            <div className="frostrek-markdown">
                              {msg.statusLine ? (
                                <div className="text-xs italic mb-2 opacity-70">{msg.statusLine}</div>
                              ) : null}
                              {msg.content ? <SmoothTypingMessage content={msg.content} onUpdate={() => { if (isAtBottom) scrollToBottom(false); }} /> : <FrostyTypingIndicator T={T} />}
                            </div>
                          )}
                          {!isAssistant && !isAdmin && <div className="whitespace-pre-wrap">{renderMessageWithLinks(msg.content)}</div>}

                          {/* Slot booking UI */}
                          {msg.slotOffers && msg.slotOffers.length > 0 ? (
                            <div className="mt-3 space-y-2">
                              {msg.slotOffers.map((offer) => (
                                <div
                                  key={offer.account_id}
                                  className="rounded-lg border p-2"
                                  style={{ borderColor: '#BBF7D0' }}
                                >
                                  <div className="text-xs font-bold text-gray-700">{offer.owner_name || offer.owner_email}</div>
                                  {offer.owner_email ? (
                                    <div className="text-[10px] text-gray-400 mb-2">{offer.owner_email}</div>
                                  ) : null}
                                  <div className="flex flex-wrap gap-2">
                                    {offer.slots.map((slot, si) => (
                                      <button
                                        key={`${offer.account_id}-${si}`}
                                        type="button"
                                        onClick={() =>
                                          void sendHiddenMessage(
                                            `__BOOK_SLOT__${JSON.stringify({
                                              account_id: offer.account_id,
                                              start_iso: slot.start_iso,
                                              end_iso: slot.end_iso,
                                              owner_name: offer.owner_name || offer.owner_email,
                                            })}`,
                                          )
                                        }
                                        className="text-[11px] px-2 py-1 rounded border transition-colors hover:bg-[#E8F5EE]"
                                        style={{ borderColor: '#2D6A4F66', color: '#2D6A4F' }}
                                      >
                                        {slot.start} – {slot.end}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* User avatar */}
                      {isUser && (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden bg-gray-100 border border-gray-200">
                          <span className="text-[9px] font-bold text-gray-500">You</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Jump to bottom */}
              <div className={`absolute left-0 right-0 bottom-4 flex justify-center transition-all duration-300 ${isAtBottom ? 'translate-y-10 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                <button
                  onClick={() => scrollToBottom(true)}
                  className="p-2 rounded-full shadow-lg transition-all z-10 bg-white border border-gray-200"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* ── Input Area — clean white with green focus ── */}
            <div className="p-3 flex flex-col gap-2 bg-white" style={{ borderTop: '1px solid #E2E8F0' }}>
              <form onSubmit={sendMessage} className="relative flex items-center gap-2">
                {/* Voice Call */}
                <button
                  type="button"
                  onClick={isInCall ? endCall : startCall}
                  disabled={(isLoading && !isInCall) || chatMode === 'human'}
                  title={isInCall ? 'End call' : 'Start voice call'}
                  className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${isInCall ? 'animate-pulse' : 'disabled:opacity-40'}`}
                  style={isInCall
                    ? { background: '#FEE2E2', color: '#EF4444', border: '1px solid #FCA5A5' }
                    : { color: '#9CA3AF' }
                  }
                >
                  {isInCall ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </button>

                <div className="relative flex-1">
                  {isInCall ? (
                    <div
                      className="w-full rounded-xl py-2.5 pl-4 pr-4 text-[13px] flex items-center justify-between bg-gray-50 border border-gray-200"
                    >
                      <span className="truncate flex-1 text-gray-700">
                        {liveTranscript || (
                          <span className="opacity-50 italic text-gray-400">
                            {callStatus === 'connecting' && 'Connecting...'}
                            {callStatus === 'listening' && 'Listening...'}
                            {callStatus === 'thinking' && 'Thinking...'}
                            {callStatus === 'speaking' && 'Speaking...'}
                            {callStatus === 'idle' && 'Call ended'}
                          </span>
                        )}
                      </span>
                      <div className="flex gap-1 ml-2">
                        <div className={`w-2 h-2 rounded-full ${callStatus === 'listening' ? 'bg-[#2D6A4F] animate-pulse' : 'bg-gray-300'}`} />
                        <div className={`w-2 h-2 rounded-full ${callStatus === 'thinking' ? 'bg-[#3D8B6E] animate-pulse' : 'bg-gray-300'}`} />
                        <div className={`w-2 h-2 rounded-full ${callStatus === 'speaking' ? 'bg-[#5BA88A] animate-pulse' : 'bg-gray-300'}`} />
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      disabled={isLoading || isInCall}
                      className="w-full rounded-xl py-2.5 pl-4 pr-10 text-sm border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all disabled:opacity-50 font-medium"
                    />
                  )}
                  {!isInCall && (
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading || isInCall}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors disabled:opacity-30 bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Powered by footer */}
              <div className="flex justify-center pb-0.5">
                <span className="text-[10px] text-gray-400 font-medium">
                  Powered by <span className="font-semibold text-[#2D6A4F]">Frostrek AI</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
