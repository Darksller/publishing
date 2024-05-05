import compose from 'compose-function'
import { ThemeProvider } from './theme-provider'
import { StoreProvider } from './storeProvider'

export const withProviders = compose(ThemeProvider, StoreProvider)
