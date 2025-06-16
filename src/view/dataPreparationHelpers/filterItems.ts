import type { NimbleCharacter } from '../../documents/actor/character.js';
import type { NimbleBaseItem, SystemItemTypes } from '../../documents/item/base.svelte.js';

export default function filterItems(
	actor: NimbleCharacter,
	requiredItemTypes: string[],
	searchTerm: string,
): NimbleBaseItem<SystemItemTypes>[] {
	return actor.items.filter((item) => {
		if (!requiredItemTypes.includes(item.type)) return false;
		if (!searchTerm) return true;

		return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
	});
}
