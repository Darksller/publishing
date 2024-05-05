import { store } from '@/app/store'
import { Provider } from 'react-redux'
export const StoreProvider = (component: () => React.ReactNode) => () => (
	<Provider store={store}>{component()}</Provider>
)
