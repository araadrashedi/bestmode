import { Navigate, useLocation } from "react-router-dom"

import { useAuth } from "@/lib/providers"

type AuthLayoutProps = {
	children: React.ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
	const auth = useAuth()
	const location = useLocation()
	const lastPathname = location.pathname.split("/").pop()
	const searchParams = new URLSearchParams({
		back: `${location.pathname}${location.search && "?"}${location.search}`,
	})

	return !auth.isUserLoggedIn ? (
		props.children
	) : (
		<Navigate to={lastPathname === "auth" ? `/auth/login?${searchParams}` : "/"} />
	)
}
