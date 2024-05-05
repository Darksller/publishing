import { RouterProvider } from '@tanstack/react-router'
import './styles/global.css'
import { router } from './router'
import { withProviders } from './providers'

const App = () => {
	return <RouterProvider router={router} />
}

export const AppWithProviders = withProviders(App)
