const electron = require('electron');
//this is cts so that it compiles into the only cjs file and electron can find it
//idk man i got it from the internet

//@ts-ignore
electron.contextBridge.exposeInMainWorld('electron', {
	// Settings
	subscribeToHotkeys: (callback: any) => {
		return electron.ipcRenderer.on('Hotkeys', (event: any, args: any) => {
			callback(args);
		});
	},
	getIsClientWatcherActive: async () =>
		electron.ipcRenderer.invoke('getIsClientWatcherActive'),
	getClientPath: async () => electron.ipcRenderer.invoke('getClientPath'),
	saveClientPath: async (clientTxtPath: string) =>
		electron.ipcRenderer.invoke('saveClientPath', clientTxtPath),

	// Position Settings
	getFontScalingFactor: async () => electron.ipcRenderer.invoke('getFontScalingFactor'),
	getSettingsOverlayPositionSettings: async () =>
		electron.ipcRenderer.invoke('getSettingsOverlayPositionSettings'),
	saveSettingsOverlayPositionSettings: async (settingsOverlaySettings: string) =>
		electron.ipcRenderer.invoke(
			'saveSettingsOverlayPositionSettings',
			settingsOverlaySettings
		),

	getZoneOverlayPositionSettings: async () =>
		electron.ipcRenderer.invoke('getZoneOverlayPositionSettings'),
	saveZoneOverlayPositionSettings: async (zoneSettings: string) =>
		electron.ipcRenderer.invoke('saveZoneOverlayPositionSettings', zoneSettings),

	getLayoutImagesOverlayPositionSettings: async () =>
		electron.ipcRenderer.invoke('getLayoutImagesOverlayPositionSettings'),
	saveLayoutImagesOverlayPositionSettings: async (layoutImagesSettings: string) =>
		electron.ipcRenderer.invoke(
			'saveLayoutImagesOverlayPositionSettings',
			layoutImagesSettings
		),

	getLevelOverlayPositionSettings: async () =>
		electron.ipcRenderer.invoke('getLevelOverlayPositionSettings'),
	saveLevelOverlayPositionSettings: async (levelSettings: string) =>
		electron.ipcRenderer.invoke('saveLevelOverlayPositionSettings', levelSettings),

	getGemOverlayPositionSettings: async () =>
		electron.ipcRenderer.invoke('getGemOverlayPositionSettings'),
	saveGemOverlayPositionSettings: async (gemSettings: string) =>
		electron.ipcRenderer.invoke('saveGemOverlayPositionSettings', gemSettings),

	// Methods for the zone tracker
	subscribeToZoneNotesUpdates: (callback: any) => {
		return electron.ipcRenderer.on('zoneUpdatesFromLog', (event: any, args: any) => {
			callback(args);
		});
	},
	getZoneState: async () => electron.ipcRenderer.invoke('getZoneState'),
	postActSelected: async (actSelected: string) =>
		electron.ipcRenderer.invoke('postActSelected', actSelected),
	postZoneSelected: async (zoneSelected: string, actSelected: string) =>
		electron.ipcRenderer.invoke('postZoneSelected', zoneSelected, actSelected),

	subscribeToZoneLayoutImageUpdates: (callback: any) => {
		return electron.ipcRenderer.on(
			'zoneLayoutImageUpdates',
			(event: any, args: any) => {
				callback(args);
			}
		);
	},
	// Methods for the level tracker
	getLayoutImagePaths: async () => electron.ipcRenderer.invoke('getLayoutImagePaths'),
	subscribeToLevelUpdates: (callback: any) => {
		return electron.ipcRenderer.on(
			'subscribeToLevelUpdates',
			(event: any, args: any) => {
				callback(args);
			}
		);
	},
	getLevelState: async () => electron.ipcRenderer.invoke('getLevelState'),

	// Methods for the gem tracker
	subscribeToGemUpdates: (callback: any) => {
		return electron.ipcRenderer.on(
			'subscribeToGemUpdates',
			(event: any, args: any) => {
				callback(args);
			}
		);
	},
	getGemState: async () => electron.ipcRenderer.invoke('getGemState'),
	postGemLevelSelected: async (gemLevelSelected: number) =>
		electron.ipcRenderer.invoke('postGemLevelSelected', gemLevelSelected),
});
