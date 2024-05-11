import { RouterProvider } from '@tanstack/react-router'
import './styles/global.css'
import { router } from './router'
import { withProviders } from './providers'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const App = () => {
	const { viewer } = useSelector((state: RootState) => state)
	return <RouterProvider router={router} context={{ auth: viewer }} />
}

export const AppWithProviders = withProviders(App)
