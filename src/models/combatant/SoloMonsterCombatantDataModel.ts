const { fields } = foundry.data;

const nimbleSoloMonsterCombatantSchema = () => ({
	sort: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
});

declare namespace NimbleSoloMonsterCombatantData {
	type Schema = DataSchema & ReturnType<typeof nimbleSoloMonsterCombatantSchema>;
	interface BaseData extends Record<string, unknown> {}
	interface DerivedData extends Record<string, unknown> {}
}

class NimbleSoloMonsterCombatantData extends foundry.abstract.TypeDataModel<
	NimbleSoloMonsterCombatantData.Schema,
	ChatMessage.ConfiguredInstance,
	NimbleSoloMonsterCombatantData.BaseData,
	NimbleSoloMonsterCombatantData.DerivedData
> {
	static override defineSchema(): NimbleSoloMonsterCombatantData.Schema {
		return {
			...nimbleSoloMonsterCombatantSchema(),
		};
	}
}

export { NimbleSoloMonsterCombatantData };
