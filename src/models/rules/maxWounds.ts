import { NimbleBaseRule } from './base.js';

function schema() {
	const { fields } = foundry.data;

	return {
		value: new fields.StringField({ required: true, nullable: false, initial: '' }),
		type: new fields.StringField({ required: true, nullable: false, initial: 'maxWounds' }),
	};
}

declare namespace MaxWoundsRule {
	type Schema = NimbleBaseRule.Schema & ReturnType<typeof schema>;
}

class MaxWoundsRule extends NimbleBaseRule<MaxWoundsRule.Schema> {
	static override defineSchema(): MaxWoundsRule.Schema {
		return {
			...super.defineSchema(),
			...schema(),
		};
	}

	override tooltipInfo(): string {
		return super.tooltipInfo(new Map([['value', 'string']]));
	}

	override prePrepareData(): void {
		const { item } = this;
		if (!item.isEmbedded) return;

		const { actor } = item;
		const value = this.resolveFormula(this.value) ?? 0;
		const originalValue: number =
			foundry.utils.getProperty(actor.system, 'attributes.wounds.bonus') ?? 0;

		const modifiedValue = originalValue + value;
		foundry.utils.setProperty(actor.system, 'attributes.wounds.bonus', modifiedValue);
	}
}

export { MaxWoundsRule };
