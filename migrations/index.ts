import * as migration_20251121_154422 from "./20251121_154422"

export const migrations = [
	{
		up: migration_20251121_154422.up,
		down: migration_20251121_154422.down,
		name: "20251121_154422",
	},
]
