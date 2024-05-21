import { RouterProvider } from '@tanstack/react-router'
import './styles/global.css'
import { router } from './router'
import { withProviders } from './providers'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { useLazyFetchMeQuery } from '@/entities/viewer'

const App = () => {
	const { viewer } = useSelector((state: RootState) => state)
	const [fetchMe] = useLazyFetchMeQuery()
	const dispatch = useDispatch()
	return (
		<RouterProvider
			router={router}
			// @ts-expect-error unable to extract type
			context={{ auth: viewer, fetchMe, dispatch }}
		/>
	)
}

export const AppWithProviders = withProviders(App)
