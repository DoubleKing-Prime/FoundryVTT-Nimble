import type { MigrationBase } from './MigrationBase.js';
import { MigrationRunner } from './MigrationRunner.js';
import * as Migrations from './migrations/index.js';

class MigrationList {
	static #list: { new (): MigrationBase; version: number }[] = Object.values(Migrations);

	static get latestVersion(): number {
		return Math.max(...this.#list.map((m) => m.version));
	}

	static constructAll(): MigrationBase[] {
		return this.#list.map((M) => new M());
	}

	static constructFromVersion(version?: number) {
		const minVersion = Number(version) || MigrationRunner.RECOMMENDED_SAFE_VERSION;

		return this.#list.reduce((acc, M) => {
			if (M.version > minVersion) acc.push(new M());
			return acc;
		}, [] as MigrationBase[]);
	}

	static constructRange(min: number, max = Number.POSITIVE_INFINITY) {
		return this.#list.reduce((acc, M) => {
			if (M.version >= min && M.version <= max) acc.push(new M());
			return acc;
		}, [] as MigrationBase[]);
	}
}

export { MigrationList };
