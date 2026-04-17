import { useState, useEffect } from "react";
import { Music, Gamepad2, UserPlus } from "lucide-react";

// ─── CONFIGURATION ───────────────────────────────────
// 1. Join the Lanyard Discord server: https://discord.gg/lanyard
// 2. Get your Discord User ID (Developer Mode → right-click profile → Copy User ID)
// 3. Paste it below
const DISCORD_USER_ID = "398926813406953484";
// ─────────────────────────────────────────────────────

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    global_name: string | null;
  };
  activities: {
    name: string;
    type: number;
    state?: string;
    details?: string;
    emoji?: { name: string; id?: string };
    assets?: {
      large_image?: string;
      large_text?: string;
    };
  }[];
  listening_to_spotify: boolean;
  spotify: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  } | null;
}

const STATUS_COLORS = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f43",
  offline: "#80848e",
} as const;

const STATUS_LABELS = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
} as const;

export default function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    if (!DISCORD_USER_ID) return;

    let heartbeatInterval: ReturnType<typeof setInterval>;
    let ws: WebSocket | null = null;

    // REST API for instant load
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setData(json.data);
      })
      .catch(() => {});

    // WebSocket for real-time updates
    try {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => {
        ws?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_USER_ID },
          })
        );
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.op === 1) {
          heartbeatInterval = setInterval(() => {
            ws?.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        }

        if (msg.op === 0 && msg.d) {
          const presence = msg.d;
          if (presence.discord_user) {
            setData(presence);
          }
        }
      };

      ws.onclose = () => clearInterval(heartbeatInterval);
    } catch {
      // WebSocket failed, REST handles it
    }

    return () => {
      clearInterval(heartbeatInterval);
      ws?.close();
    };
  }, []);

  if (!DISCORD_USER_ID) {
    return null;
  }

  // Show card even without data (offline/loading state)
  if (!data) {
    return (
      <div className="rounded-radius-card border border-border-subtle bg-bg-elevated p-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-surface text-text-muted">
              <Gamepad2 size={20} />
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-bg-elevated"
              style={{ backgroundColor: STATUS_COLORS.offline }}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-text">Yesse</p>
            <p className="text-xs text-text-muted">Offline</p>
          </div>
        </div>
      </div>
    );
  }

  const { discord_user, discord_status, spotify, activities } = data;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=128`;
  const displayName = discord_user.global_name || discord_user.username;

  // Find activities by type
  const customStatus = activities.find((a) => a.type === 4);
  const gameActivity = activities.find((a) => a.type === 0);

  return (
    <div className="rounded-radius-card border border-border-subtle bg-bg-elevated p-5">
      {/* Profile row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-12 w-12 rounded-full"
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-bg-elevated"
              style={{ backgroundColor: STATUS_COLORS[discord_status] }}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-text">{displayName}</p>
            <div className="flex items-center gap-1.5">
              {customStatus?.emoji && (
                <span className="text-xs">{customStatus.emoji.name}</span>
              )}
              <p className="text-xs text-text-muted">
                {customStatus?.state || STATUS_LABELS[discord_status]}
              </p>
            </div>
          </div>
        </div>
        <a
          href={`https://discord.com/users/${DISCORD_USER_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-radius-pill bg-[#5865F2] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.05] active:scale-[0.95]"
        >
          <UserPlus size={13} /> Add Friend
        </a>
      </div>

      {/* Spotify */}
      {spotify && (
        <div className="mt-4 flex items-center gap-3 rounded-radius-sm bg-surface p-3">
          <img
            src={spotify.album_art_url}
            alt={spotify.album}
            className="h-11 w-11 rounded-radius-sm"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Music size={12} className="shrink-0 text-[#1DB954]" />
              <p className="text-xs text-text-muted">Listening on Spotify</p>
            </div>
            <p className="truncate text-sm font-medium text-text">{spotify.song}</p>
            <p className="truncate text-xs text-text-secondary">
              {spotify.artist}
            </p>
          </div>
        </div>
      )}

      {/* Game activity */}
      {gameActivity && !spotify && (
        <div className="mt-4 flex items-center gap-3 rounded-radius-sm bg-surface p-3">
          <div className="grid h-11 w-11 place-items-center rounded-radius-sm bg-accent-subtle">
            <Gamepad2 size={18} className="text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-muted">Playing</p>
            <p className="truncate text-sm font-medium text-text">
              {gameActivity.name}
            </p>
            {gameActivity.details && (
              <p className="truncate text-xs text-text-secondary">
                {gameActivity.details}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}