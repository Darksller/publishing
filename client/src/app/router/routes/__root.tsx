import { viewerStateType } from '@/entities/viewer'
import { ViewerPayload } from '@/entities/viewer/types/payload'
import { Plans } from '@/pages/plans'
import { Root } from '@/pages/root'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { createRootRouteWithContext } from '@tanstack/react-router'

type RouterContext = {
	auth: viewerStateType
	fetchMe: () => {
		data: { viewer: ViewerPayload; refreshToken: string; accessToken: string }
	}
	dispatch: Dispatch<UnknownAction>
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Root,
	notFoundComponent: Plans,
})
