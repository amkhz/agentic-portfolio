// ============================================
// CONSTELLATION — Spatial navigation for the
// meta case study. Nodes are topics, connections
// are relationships. Pure data, no DOM.
// ============================================

// --- Types ---

export type NodeStatus = 'shipped' | 'active' | 'planned';
export type NodeSize = 'sm' | 'md' | 'lg';

export interface ConstellationNode {
  id: string;
  title: string;
  inscription: string;
  size: NodeSize;
  status: NodeStatus;
  connections: string[];
  /** Normalized 0-1 offset to nudge the algorithmic position. */
  offset?: { x: number; y: number };
  /** Hand-tuned position (0-1). Bypasses the layout algorithm entirely. */
  fixedPosition?: { x: number; y: number };
}

export interface ConnectionPeek {
  targetId: string;
  tease: string;
}

export interface PositionedNode extends ConstellationNode {
  position: { x: number; y: number };
}

export interface ConstellationData {
  nodes: PositionedNode[];
}

// --- Node definitions ---

// Positions are hand-tuned for spatial meaning:
// Left cluster = design foundation (Material, System)
// Right cluster = architecture (Structure, Process)
// Center = Sprint (origin), Craft (bridges both)
// Outer = Sound (creative thread), Lab (future)
export const constellationNodes: ConstellationNode[] = [
  {
    id: 'the-sprint',
    title: 'The Sprint',
    inscription: 'Tokens to production in 48 hours.',
    size: 'lg',
    status: 'shipped',
    connections: ['the-material', 'the-structure', 'the-process'],
    fixedPosition: { x: 0.50, y: 0.42 },
  },
  {
    id: 'the-material',
    title: 'The Material',
    inscription: 'From magic numbers to a system you can read.',
    size: 'md',
    status: 'shipped',
    connections: ['the-sprint', 'the-structure', 'the-craft'],
    fixedPosition: { x: 0.24, y: 0.30 },
  },
  {
    id: 'the-structure',
    title: 'The Structure',
    inscription: 'A full kitchen for making toast. Time to simplify.',
    size: 'md',
    status: 'shipped',
    connections: ['the-sprint', 'the-material', 'the-process'],
    fixedPosition: { x: 0.76, y: 0.28 },
  },
  {
    id: 'the-process',
    title: 'The Process',
    inscription: 'Crew members with skill sets, not magic text boxes.',
    size: 'md',
    status: 'shipped',
    connections: ['the-sprint', 'the-structure', 'the-craft', 'the-evolution'],
    fixedPosition: { x: 0.80, y: 0.55 },
  },
  {
    id: 'the-evolution',
    title: 'The Evolution',
    inscription: 'The crew that built itself out of a job.',
    size: 'md',
    status: 'shipped',
    connections: ['the-process', 'the-structure', 'the-craft'],
    fixedPosition: { x: 0.65, y: 0.70 },
  },
  {
    id: 'the-craft',
    title: 'The Craft',
    inscription: 'What earned confidence looks like in practice.',
    size: 'md',
    status: 'active',
    connections: ['the-material', 'the-process'],
    fixedPosition: { x: 0.50, y: 0.75 },
  },
  {
    id: 'the-sound',
    title: 'The Sound',
    inscription: 'Listening data as design material.',
    size: 'md',
    status: 'shipped',
    connections: ['the-sprint', 'the-process', 'the-material'],
    fixedPosition: { x: 0.35, y: 0.12 },
  },
  {
    id: 'the-system',
    title: 'The System',
    inscription: 'The design system as a living artifact.',
    size: 'md',
    status: 'shipped',
    connections: ['the-material', 'the-craft'],
    fixedPosition: { x: 0.16, y: 0.58 },
  },
  // Planned nodes
  {
    id: 'the-lab',
    title: 'The Lab',
    inscription: 'Speculative design for frontier technologies.',
    size: 'sm',
    status: 'planned',
    connections: ['the-process', 'the-craft'],
    fixedPosition: { x: 0.72, y: 0.85 },
  },
];

// --- Layout algorithm ---

/**
 * Seeded pseudo-random number generator (mulberry32).
 * Deterministic: same seed = same layout every render.
 */
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface LayoutOptions {
  /** Seed for deterministic randomness. Default: 42. */
  seed?: number;
  /** Base radius for node ring as fraction of field. Default: 0.3. */
  radius?: number;
  /** Random jitter applied to positions (0-1 scale). Default: 0.04. */
  jitter?: number;
  /** Center of the field (0-1). Default: { x: 0.5, y: 0.5 }. */
  center?: { x: number; y: number };
}

/**
 * Compute positioned nodes from node definitions.
 *
 * Nodes with fixedPosition use their hand-tuned coordinates directly.
 * Remaining nodes distribute radially around the center. Planned nodes
 * sit on a wider ring. Each algorithmic node gets seeded jitter plus
 * its per-node offset.
 */
export function buildConstellationLayout(
  nodes: ConstellationNode[],
  options: LayoutOptions = {},
): PositionedNode[] {
  const {
    seed = 42,
    radius = 0.3,
    jitter = 0.04,
    center = { x: 0.5, y: 0.5 },
  } = options;

  const rand = seededRandom(seed);
  const positioned: PositionedNode[] = [];

  // Hand-tuned nodes go directly
  const algorithmic: ConstellationNode[] = [];
  for (const node of nodes) {
    if (node.fixedPosition) {
      positioned.push({
        ...node,
        position: { x: clamp(node.fixedPosition.x), y: clamp(node.fixedPosition.y) },
      });
    } else {
      algorithmic.push(node);
    }
  }

  // Algorithmic placement for any nodes without fixedPosition
  if (algorithmic.length > 0) {
    const centerNode = algorithmic.find((n) => n.size === 'lg') ?? algorithmic[0];
    const orbitNodes = algorithmic.filter((n) => n.id !== centerNode.id);
    const shipped = orbitNodes.filter((n) => n.status !== 'planned');
    const planned = orbitNodes.filter((n) => n.status === 'planned');

    if (!centerNode.fixedPosition) {
      positioned.push({
        ...centerNode,
        position: {
          x: clamp(center.x + (centerNode.offset?.x ?? 0)),
          y: clamp(center.y + (centerNode.offset?.y ?? 0)),
        },
      });
    }

    const innerAngleStep = (2 * Math.PI) / Math.max(shipped.length, 1);
    const innerOffset = -Math.PI / 4;
    for (let i = 0; i < shipped.length; i++) {
      const node = shipped[i];
      const angle = innerOffset + i * innerAngleStep;
      const r = radius + (rand() - 0.5) * jitter * 2;
      const x = center.x + Math.cos(angle) * r + (node.offset?.x ?? 0) + (rand() - 0.5) * jitter;
      const y = center.y + Math.sin(angle) * r + (node.offset?.y ?? 0) + (rand() - 0.5) * jitter;
      positioned.push({ ...node, position: { x: clamp(x), y: clamp(y) } });
    }

    const outerRadius = radius * 1.6;
    const outerAngleStep = (2 * Math.PI) / Math.max(planned.length, 1);
    const outerOffset = Math.PI / 6;
    for (let i = 0; i < planned.length; i++) {
      const node = planned[i];
      const angle = outerOffset + i * outerAngleStep;
      const r = outerRadius + (rand() - 0.5) * jitter * 2;
      const x = center.x + Math.cos(angle) * r + (node.offset?.x ?? 0) + (rand() - 0.5) * jitter;
      const y = center.y + Math.sin(angle) * r + (node.offset?.y ?? 0) + (rand() - 0.5) * jitter;
      positioned.push({ ...node, position: { x: clamp(x), y: clamp(y) } });
    }
  }

  return positioned;
}

function clamp(v: number, min = 0.05, max = 0.95): number {
  return Math.max(min, Math.min(max, v));
}

/** Look up a node by id. */
export function getNode(nodes: PositionedNode[], id: string): PositionedNode | undefined {
  return nodes.find((n) => n.id === id);
}

/** Get all connections for a node as positioned nodes. */
export function getConnections(
  nodes: PositionedNode[],
  id: string,
): PositionedNode[] {
  const node = getNode(nodes, id);
  if (!node) return [];
  return node.connections
    .map((connId) => getNode(nodes, connId))
    .filter((n): n is PositionedNode => n != null);
}

/**
 * Logical reading order for the mobile strip.
 * Follows narrative flow, not spatial position.
 */
export const readingOrder: string[] = constellationNodes.map((n) => n.id);
