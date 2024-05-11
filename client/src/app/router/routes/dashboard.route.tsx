import { Dashboard } from '@/pages/dashboard'
import { Roles } from '@/shared/lib/constantRoles'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
	component: Dashboard,
	beforeLoad: ({ context }) => {
		if (context.auth.user?.role.name !== Roles.ADMIN) {
			throw redirect({
				to: '/',
				search: {
					redirect: location.href,
				},
			})
		}
	},
})
