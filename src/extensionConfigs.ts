import Browser from 'webextension-polyfill'

export enum Theme {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light',
}

export enum TriggerMode {
  Always = 'always',
  QuestionMark = 'questionMark',
  Manually = 'manually',
}

type UserConfig = {
  theme: Theme
  triggerMode: TriggerMode
}

const userConfigWithDefaultValue: UserConfig = {
  theme: Theme.Auto,
  triggerMode: TriggerMode.Always,
}

export async function getUserConfig() {
  return Browser.storage.local.get(userConfigWithDefaultValue) as Promise<UserConfig>
}

export async function updateUserConfig(updates: Partial<UserConfig>) {
  return Browser.storage.local.set(updates)
}
