import type { NimbleAncestryData } from '../../models/item/AncestryDataModel.js';

import { NimbleBaseItem } from './base.svelte.js';

export class NimbleAncestryItem extends NimbleBaseItem {
	declare system: NimbleAncestryData;

	override async prepareChatCardData() {
		console.log(this.type);
		return {
			author: game.user?.id,
			flavor: `${this.actor?.name}: ${this.name}`,
			type: 'feature',
			system: {
				description: this.system.description || 'No description available.',
				featureType: this.type,
				name: this.name,
			},
		};
	}

	/** ------------------------------------------------------ */
	//                 Document Update Hooks
	/** ------------------------------------------------------ */
	override async _preCreate(data, options, user) {
		if (this.isEmbedded) {
			const actor = this.parent;
			if (!actor.isType('character')) return false;

			const existingAncestry = actor.ancestry;
			if (existingAncestry) await existingAncestry.delete();
		}

		return super._preCreate(data, options, user);
	}
}
