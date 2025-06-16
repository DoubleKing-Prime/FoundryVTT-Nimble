import { NimbleBackgroundData } from './BackgroundDataModel.js';
import { NimbleBoonData } from './BoonDataModel.js';
import { NimbleClassData } from './ClassDataModel.js';
import { NimbleFeatureData } from './FeatureDataModel.js';
import { NimbleMonsterFeatureData } from './MonsterFeatureDataModel.js';
import { NimbleObjectData } from './ObjectDataModel.js';
import { NimbleAncestryData } from './AncestryDataModel.js';
import { NimbleSpellData } from './SpellDataModel.js';
import { NimbleSubclassData } from './SubclassDataModel.js';

const itemDataModels = {
	background: NimbleBackgroundData,
	boon: NimbleBoonData,
	class: NimbleClassData,
	feature: NimbleFeatureData,
	monsterFeature: NimbleMonsterFeatureData,
	object: NimbleObjectData,
	ancestry: NimbleAncestryData,
	spell: NimbleSpellData,
	subclass: NimbleSubclassData,
};

export default itemDataModels;

// Merge types into fvtt-types
declare global {
	interface DataModelConfig {
		Item: {
			background: NimbleBackgroundData;
			boon: NimbleBoonData;
			class: NimbleClassData;
			feature: NimbleFeatureData;
			monsterFeature: NimbleMonsterFeatureData;
			object: NimbleObjectData;
			ancestry: NimbleAncestryData;
			spell: NimbleSpellData;
			subclass: NimbleSubclassData;
		};
	}
}
