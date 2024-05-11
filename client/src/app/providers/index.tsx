import compose from 'compose-function'
import { ThemeProvider } from './theme-provider'

export const withProviders = compose(ThemeProvider)
