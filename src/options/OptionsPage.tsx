import { useEffect, useState } from 'react'
import { RadioGroup, Radio, Card, CardHeader } from '@fluentui/react-components'

import { getExtensionVersion, reduceTheme } from '../utils'
import { getUserConfig, Theme, TriggerMode, updateUserConfig } from '../extensionConfigs'

import cx from 'classnames'
import style from './style.scss'
import logo from '../logo.png'

const TRIGGER_MODE_INFO = {
  [TriggerMode.Always]: { title: 'Always', desc: 'Trigger GPT on every search' },
  [TriggerMode.QuestionMark]: { title: 'Question Mark', desc: '' },
  [TriggerMode.Manually]: { title: 'Manually', desc: '' },
}

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

function OptionsPage({ theme, setTheme }: Props) {
  const [triggerMode, setTriggerMode] = useState(TriggerMode.Always)
  useEffect(() => {
    getUserConfig().then(({ theme, triggerMode }) => {
      setTheme(theme)
      setTriggerMode(triggerMode)
    })
  }, [])

  const handleThemeChange = (theme: Theme) => {
    updateUserConfig({ theme })
    setTheme(theme)
  }
  const handleTriggerModeChange = (triggerMode: TriggerMode) => {
    updateUserConfig({ triggerMode })
    setTriggerMode(triggerMode)
  }

  return (
    <>
      <header>
        <img src={logo} />
        {`Search GPT Copilot (v${getExtensionVersion()})`}
      </header>
      <main>
        <h1>Options</h1>
        <h2>Trigger Mode</h2>
        <RadioGroup
          value={triggerMode}
          onChange={(_, { value }) => {
            handleTriggerModeChange(value as TriggerMode)
          }}
        >
          {Object.entries(TRIGGER_MODE_INFO).map(([k, v]) => (
            <div key={k}>
              <Radio className={style.radioButton} label={v.title} value={k} />
              <div
                className={cx(
                  style.radioDesc,
                  reduceTheme(theme) === Theme.Dark ? style.radioDescDark : style.radioDescLight,
                )}
              >
                {v.desc}
              </div>
            </div>
          ))}
        </RadioGroup>
        <h2>Theme</h2>
        <RadioGroup
          layout="horizontal"
          value={theme}
          onChange={(_, { value }) => {
            handleThemeChange(value as Theme)
          }}
        >
          {Object.entries(Theme).map(([k, v]) => (
            <Radio className={style.radioButton} key={v} label={k} value={v} />
          ))}
        </RadioGroup>
        <h2>API Provider</h2>
        <Card>
          <CardHeader />
        </Card>
      </main>
    </>
  )
}

export default OptionsPage
