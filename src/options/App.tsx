import { useMemo, useState } from 'react'
import OptionsPage from './OptionsPage'
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components'

import { reduceTheme } from '../utils'
import { Theme } from '../extensionConfigs'

function App() {
  const [theme, setTheme] = useState(Theme.Auto)
  const fluentTheme = useMemo(
    () => (reduceTheme(theme) === Theme.Dark ? webDarkTheme : webLightTheme),
    [theme],
  )

  return (
    <FluentProvider targetDocument={document} theme={fluentTheme}>
      <OptionsPage theme={theme} setTheme={setTheme} />
    </FluentProvider>
  )
}

export default App
