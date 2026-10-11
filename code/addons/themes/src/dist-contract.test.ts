import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const DTS_ARTIFACT = join(import.meta.dirname, '../dist/index.d.ts');
const CONSUMER_FIXTURE = join(import.meta.dirname, '__testfixtures__/typescript-consumer.mts');
const TYPESCRIPT = createRequire(import.meta.url).resolve('typescript/bin/tsc');
const DTS_BUILT = existsSync(DTS_ARTIFACT);

describe('Themes declaration contract', () => {
  it.runIf(process.env.CI)('is built before this suite runs', () => {
    expect(DTS_BUILT).toBe(true);
  });

  it.runIf(DTS_BUILT)('accepts the default and named exports in a NodeNext consumer', () => {
    execFileSync(
      process.execPath,
      [
        TYPESCRIPT,
        '--module',
        'NodeNext',
        '--moduleResolution',
        'NodeNext',
        '--target',
        'ES2022',
        '--strict',
        '--skipLibCheck',
        '--types',
        'node',
        '--noEmit',
        CONSUMER_FIXTURE,
      ],
      { stdio: 'pipe' }
    );
  });
});
