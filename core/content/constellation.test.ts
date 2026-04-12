import { describe, it, expect } from 'vitest';
import {
  buildConstellationLayout,
  constellationNodes,
  getNode,
  getConnections,
} from './constellation';

describe('buildConstellationLayout', () => {
  const positioned = buildConstellationLayout(constellationNodes);

  it('returns positioned nodes for all input nodes', () => {
    expect(positioned).toHaveLength(constellationNodes.length);
  });

  it('places the center node near the center', () => {
    const sprint = positioned.find((n) => n.id === 'the-sprint');
    expect(sprint).toBeDefined();
    expect(sprint!.position.x).toBeCloseTo(0.5, 0);
    expect(sprint!.position.y).toBeCloseTo(0.5, 0);
  });

  it('clamps all positions within 0.05-0.95', () => {
    for (const node of positioned) {
      expect(node.position.x).toBeGreaterThanOrEqual(0.05);
      expect(node.position.x).toBeLessThanOrEqual(0.95);
      expect(node.position.y).toBeGreaterThanOrEqual(0.05);
      expect(node.position.y).toBeLessThanOrEqual(0.95);
    }
  });

  it('produces deterministic layout with same seed', () => {
    const a = buildConstellationLayout(constellationNodes, { seed: 99 });
    const b = buildConstellationLayout(constellationNodes, { seed: 99 });
    expect(a).toEqual(b);
  });

  it('uses fixedPosition when provided, ignoring seed', () => {
    const a = buildConstellationLayout(constellationNodes, { seed: 1 });
    const b = buildConstellationLayout(constellationNodes, { seed: 2 });
    const material = constellationNodes.find((n) => n.id === 'the-material')!;
    const posA = a.find((n) => n.id === 'the-material')!.position;
    const posB = b.find((n) => n.id === 'the-material')!.position;
    // Fixed positions are identical regardless of seed
    expect(posA.x).toBeCloseTo(posB.x, 5);
    expect(posA.x).toBeCloseTo(material.fixedPosition!.x, 2);
  });

  it('places planned nodes further from center than shipped nodes', () => {
    const center = positioned.find((n) => n.id === 'the-sprint')!.position;
    const shipped = positioned.filter((n) => n.status === 'shipped' && n.size !== 'lg');
    const planned = positioned.filter((n) => n.status === 'planned');

    const avgShippedDist =
      shipped.reduce((sum, n) => {
        const dx = n.position.x - center.x;
        const dy = n.position.y - center.y;
        return sum + Math.sqrt(dx * dx + dy * dy);
      }, 0) / shipped.length;

    const avgPlannedDist =
      planned.reduce((sum, n) => {
        const dx = n.position.x - center.x;
        const dy = n.position.y - center.y;
        return sum + Math.sqrt(dx * dx + dy * dy);
      }, 0) / planned.length;

    expect(avgPlannedDist).toBeGreaterThan(avgShippedDist);
  });
});

describe('getNode', () => {
  const positioned = buildConstellationLayout(constellationNodes);

  it('finds a node by id', () => {
    const node = getNode(positioned, 'the-sprint');
    expect(node).toBeDefined();
    expect(node!.title).toBe('The Sprint');
  });

  it('returns undefined for unknown id', () => {
    expect(getNode(positioned, 'nonexistent')).toBeUndefined();
  });
});

describe('getConnections', () => {
  const positioned = buildConstellationLayout(constellationNodes);

  it('returns connected nodes', () => {
    const connections = getConnections(positioned, 'the-sprint');
    const ids = connections.map((n) => n.id);
    expect(ids).toContain('the-material');
    expect(ids).toContain('the-structure');
    expect(ids).toContain('the-process');
  });

  it('returns empty array for unknown node', () => {
    expect(getConnections(positioned, 'nope')).toEqual([]);
  });
});
