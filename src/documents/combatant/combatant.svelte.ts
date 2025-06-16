import { createSubscriber } from 'svelte/reactivity';

export class NimbleCombatant extends Combatant {
	#subscribe: any;

	constructor(data, context) {
		super(data, context);

		this.#subscribe = createSubscriber((update) => {
			const updateCombatantHook = Hooks.on('updateCombatant', (triggeringDocument, _, { diff }) => {
				if (diff === false) return;

				if (triggeringDocument._id === this.id) update();
			});

			return () => {
				Hooks.off('updateCombatant', updateCombatantHook);
			};
		});
	}

	get reactive() {
		this.#subscribe();

		return this;
	}

	override async _preCreate(data, options, userId) {
		if (data.type === 'character') return;

		this.updateSource({ initiative: 0 });
	}

	override getInitiativeRoll(formula: string | undefined, rollOptions: Record<string, any> = {}) {
		const { actor } = this;

		if (!formula) {
			if (!actor) formula = '0';
			else formula = actor._getInitiativeFormula(rollOptions);
		}

		const rollData = actor?.getRollData() || {};
		return Roll.create(formula!, rollData);
	}

	override async rollInitiative(
		formula: undefined | string,
		rollOptions: Record<string, any> = {},
	): Promise<this | undefined> {
		const roll = this.getInitiativeRoll(formula, rollOptions);
		await roll.evaluate();

		return this.update({ initiative: 0 });
	}

	override toObject(source = true) {
		const data = super.toObject(source);

		data.img = this.img;
		data.name = this.name;

		return data;
	}
}
