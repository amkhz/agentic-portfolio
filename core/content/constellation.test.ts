import { describe, it, expect } from 'vitest';
import {
  buildConstellationLayout,
  constellationNodes,
  getNode,
} from './constellation';
import type { ConstellationNode } from './constellation';

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
    // Exercise the ring algorithm directly with synthetic nodes (no fixedPosition)
    // so the assertion stays valid as the live constellation data evolves.
    const synthetic: ConstellationNode[] = [
      { id: 'c', title: 'C', inscription: '', size: 'lg', status: 'shipped', connections: [] },
      { id: 's1', title: 'S1', inscription: '', size: 'md', status: 'shipped', connections: [] },
      { id: 's2', title: 'S2', inscription: '', size: 'md', status: 'shipped', connections: [] },
      { id: 'p1', title: 'P1', inscription: '', size: 'sm', status: 'planned', connections: [] },
      { id: 'p2', title: 'P2', inscription: '', size: 'sm', status: 'planned', connections: [] },
    ];
    const laid = buildConstellationLayout(synthetic);
    const center = laid.find((n) => n.id === 'c')!.position;
    const shipped = laid.filter((n) => n.status === 'shipped' && n.size !== 'lg');
    const planned = laid.filter((n) => n.status === 'planned');

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

