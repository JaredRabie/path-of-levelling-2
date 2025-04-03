import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import { LogWatcher } from '../LogWatcher.js';
import { getDefaultSettingsPath } from '../pathResolver.js';

export class Settings {
	store: Store;

	constructor() {
		this.store = new Store();

		// Ensure that the settings store doesn't return undefined everywhere by
		// copying from a default settings.
		// !Keep the default settings updated!
		var defaultSettingsBuffer = fs.readFileSync(getDefaultSettingsPath());
		var defaultSettings = JSON.parse(defaultSettingsBuffer.toString());

		// TODO Yes yes this is terrible I'll do it recursively later
		var test = this.store.get('clientTxtPath');
		if (!this.store.get('clientTxtPath')) {
			this.store.set('clientTxtPath', defaultSettings.clientTxtPath);
		}
		if (!this.store.get('buildFolder')) {
			this.store.set('buildFolder', defaultSettings.buildFolder);
		}
		if (!this.store.get('uiSettings.settingsOverlayPosition')) {
			this.store.set(
				'uiSettings.settingsOverlayPosition',
				defaultSettings.uiSettings.settingsOverlayPosition
			);
		}
		if (!this.store.get('uiSettings.zoneTrackerPosition')) {
			this.store.set(
				'uiSettings.zoneTrackerPosition',
				defaultSettings.uiSettings.zoneTrackerPosition
			);
		}
		if (!this.store.get('uiSettings.layoutImagesTrackerPosition')) {
			this.store.set(
				'uiSettings.layoutImagesTrackerPosition',
				defaultSettings.uiSettings.layoutImagesTrackerPosition
			);
		}
		if (!this.store.get('uiSettings.levelTrackerPosition')) {
			this.store.set(
				'uiSettings.levelTrackerPosition',
				defaultSettings.uiSettings.levelTrackerPosition
			);
		}
		if (!this.store.get('uiSettings.gemTrackerPosition')) {
			this.store.set(
				'uiSettings.gemTrackerPosition',
				defaultSettings.uiSettings.gemTrackerPosition
			);
		}
	}

	getClientTxtPath(): string {
		return this.store.get('clientTxtPath') as string;
	}

	saveClientTxtPath(
		newPath: string,
		mainWindow: BrowserWindow,
		logWatcher: LogWatcher
	): boolean {
		this.store.set('clientTxtPath', newPath);

		// Attempt to subscribe to the log watcher again.
		//TODO there is a case here when someone has a valid path, changes it, then their
		//TODO app still works until they log in next time. IDK what to do about that
		if (!mainState.logWatcherActive) {
			logWatcher.watchClientTxt(mainWindow);
		}

		//Return the result
		return mainState.logWatcherActive;
	}

	getBuildFolder(): string {
		return path.join(this.store.get('buildFolder') as string);
	}

	saveBuildFolder(buildFolder: string) {
		this.store.set('buildFolder', buildFolder);
	}

	getSettingsOverlayPositionSettings(): any {
		return this.store.get('uiSettings.settingsOverlayPosition');
	}

	saveSettingsOverlayPositionSettings(newSettings: any) {
		this.store.set('uiSettings.settingsOverlayPosition.x', newSettings.x);
		this.store.set('uiSettings.settingsOverlayPosition.y', newSettings.y);
		this.store.set('uiSettings.settingsOverlayPosition.height', newSettings.height);
		this.store.set('uiSettings.settingsOverlayPosition.width', newSettings.width);
	}

	getZoneOverlayPositionSettings(): any {
		return this.store.get('uiSettings.zoneTrackerPosition');
	}

	saveZoneOverlayPositionSettings(newSettings: any) {
		this.store.set('uiSettings.zoneTrackerPosition.x', newSettings.x);
		this.store.set('uiSettings.zoneTrackerPosition.y', newSettings.y);
		this.store.set('uiSettings.zoneTrackerPosition.height', newSettings.height);
		this.store.set('uiSettings.zoneTrackerPosition.width', newSettings.width);
	}

	getLayoutImagesOverlayPositionSettings(): any {
		return this.store.get('uiSettings.layoutImagesTrackerPosition');
	}

	saveLayoutImagesOverlayPositionSettings(newSettings: any) {
		this.store.set('uiSettings.layoutImagesTrackerPosition.x', newSettings.x);
		this.store.set('uiSettings.layoutImagesTrackerPosition.y', newSettings.y);
		this.store.set(
			'uiSettings.layoutImagesTrackerPosition.height',
			newSettings.height
		);
		this.store.set('uiSettings.layoutImagesTrackerPosition.width', newSettings.width);
	}

	getLevelOverlayPositionSettings(): any {
		return this.store.get('uiSettings.levelTrackerPosition');
	}

	saveLevelOverlayPositionSettings(newSettings: any) {
		this.store.set('uiSettings.levelTrackerPosition.x', newSettings.x);
		this.store.set('uiSettings.levelTrackerPosition.y', newSettings.y);
		this.store.set('uiSettings.levelTrackerPosition.height', newSettings.height);
		this.store.set('uiSettings.levelTrackerPosition.width', newSettings.width);
	}

	getGemOverlayPositionSettings(): any {
		return this.store.get('uiSettings.gemTrackerPosition');
	}

	saveGemOverlayPositionSettings(newSettings: any) {
		this.store.set('uiSettings.gemTrackerPosition.x', newSettings.x);
		this.store.set('uiSettings.gemTrackerPosition.y', newSettings.y);
		this.store.set('uiSettings.gemTrackerPosition.height', newSettings.height);
		this.store.set('uiSettings.gemTrackerPosition.width', newSettings.width);
	}
}
