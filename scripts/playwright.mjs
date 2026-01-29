import { spawnSync } from 'node:child_process';
import os from 'node:os';

const args = process.argv.slice(2);
if (args.length === 0) {
	args.push('test');
}

// Playwright detects Apple Silicon by checking CPU model strings. In some sandboxed
// environments `os.cpus()` can be empty on macOS, which makes Playwright think it's x64
// and look for `*-mac-x64` browser binaries. Force the correct platform only in that case.
const cpus = os.cpus();
const hasCpuInfo = Array.isArray(cpus) && cpus.length > 0 && cpus.some((cpu) => cpu?.model);
if (process.platform === 'darwin' && process.arch === 'arm64' && !hasCpuInfo) {
	const [darwinMajorRaw] = os.release().split('.');
	const darwinMajor = Number(darwinMajorRaw || 0);

	// Playwright uses `mac${darwinMajor - 9}` and caps at 15 (current stable).
	const LAST_STABLE_MACOS_MAJOR_VERSION = 15;
	const macMajor = Math.min(darwinMajor - 9, LAST_STABLE_MACOS_MAJOR_VERSION);

	process.env.PLAYWRIGHT_HOST_PLATFORM_OVERRIDE = `mac${macMajor}-arm64`;
}

const playwrightBin = process.platform === 'win32' ? 'playwright.cmd' : 'playwright';
const result = spawnSync(playwrightBin, args, { stdio: 'inherit' });

process.exit(result.status ?? 1);
