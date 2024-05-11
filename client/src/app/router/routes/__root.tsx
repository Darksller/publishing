import { viewerStateType } from '@/entities/viewer'
import { Home } from '@/pages/home'
import { Root } from '@/pages/root'
import { createRootRouteWithContext } from '@tanstack/react-router'

type RouterContext = {
	auth: viewerStateType
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Root,
	notFoundComponent: Home,
})
