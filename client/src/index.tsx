import ReactDOM from 'react-dom/client'
import { AppWithProviders } from './app'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AppWithProviders />
	</Provider>
)
