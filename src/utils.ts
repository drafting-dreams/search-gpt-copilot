import Browser from 'webextension-polyfill'
import { Theme } from './extensionConfigs'

export function reduceTheme(theme: Theme) {
  return theme === Theme.Auto
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.Dark
      : Theme.Light
    : theme
}

export function getExtensionVersion() {
  return Browser.runtime.getManifest().version
}
