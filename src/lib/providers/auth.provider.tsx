import { useMutation } from "@apollo/client"
import React from "react"
import { Navigate, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { getAuthFormRequestGlobalTokenCodeMutation, getAuthSignInMutation } from "@/lib/api/api.mutations"
import { env } from "@/lib/configs"
import { attachEvent, isEmpty, isNil, noop } from "@/lib/utils"

export const ACCESS_TOKEN_CACHE_KEY = "access_token" as const

const AuthContext = React.createContext<{
	login: (email: string) => Promise<{ ok: boolean; message: string }>
	verify: (email: string, verificationCode: string) => Promise<{ ok: boolean; message: string }>
	logout: () => void
	isUserLoggedIn: boolean
}>({
	login: noop,
	verify: noop,
	logout: noop,
	isUserLoggedIn: false,
})

/**
 * Retrieves the authentication context.
 *
 */
export function useAuth() {
	return React.useContext(AuthContext)
}

/**
 * Provides authentication functionality to the application.
 *
 */
export function AuthProvider() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(() => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)
		return !isNil(accessToken) && !isEmpty(accessToken)
	})

	const [requestToken] = useMutation(getAuthFormRequestGlobalTokenCodeMutation(), {
		context: {
			uri: "/api.bestmode/global",
		},
	})
	const [signIn] = useMutation(getAuthSignInMutation())

	const login = async (email: string) => {
		const token = await requestToken({ variables: { input: { email } } })
		if (token.data?.requestGlobalTokenCode.status !== "succeeded") {
			return { ok: false, message: "Something went wrong" }
		}

		const searchParams = new URLSearchParams({ email: encodeURIComponent(email) })
		navigate(`/auth/verify?${searchParams}`)
		return { ok: true, message: "success" }
	}

	const verify = async (email: string, verificationCode: string) => {
		try {
			const { data, errors } = await signIn({ variables: { input: { email, verificationCode } } })
			if (isNil(errors) && data.authSignInMutation.message === "success") {
				localStorage.setItem(ACCESS_TOKEN_CACHE_KEY, env.ACCESS_TOKEN)
				setIsUserLoggedIn(true)
				navigate("/")
				return { ok: true, message: "success" }
			}

			return { ok: false, message: data.authSignInMutation.message }
		} catch (error) {
			console.log(error)
			return { ok: false, message: "Something went wrong! Please try again later." }
		}
	}

	const logout = () => {
		setIsUserLoggedIn(false)
		localStorage.removeItem(ACCESS_TOKEN_CACHE_KEY)
		navigate("/auth/login")
	}

	React.useEffect(
		() =>
			attachEvent(window, "storage", (event) => {
				const { key, newValue } = event as StorageEvent
				if (key !== ACCESS_TOKEN_CACHE_KEY) {
					return
				}
				if (newValue === env.ACCESS_TOKEN) {
					setIsUserLoggedIn(true)
					const backUrl = searchParams.get("back")
					if (backUrl) {
						navigate(decodeURIComponent(backUrl))
					}
					return
				}

				setIsUserLoggedIn(false)
				localStorage.removeItem(ACCESS_TOKEN_CACHE_KEY)
			}),
		[searchParams, navigate]
	)

	return (
		<AuthContext.Provider value={{ login, verify, logout, isUserLoggedIn }}>
			<Outlet />
		</AuthContext.Provider>
	)
}

/**
 * Renders the children conditionally based on the user's authentication state.
 *
 * @param {{ children: React.ReactNode }} props - The component props.
 */
export function ProtectedRoute(props: { children: React.ReactNode }) {
	const auth = useAuth()
	const location = useLocation()
	const searchParams = new URLSearchParams({
		back: `${location.pathname}${location.search && "?"}${location.search}`,
	})

	return auth.isUserLoggedIn ? props.children : <Navigate to={`/auth/login?${searchParams}`} />
}
