import { Outlet, type RouteObject } from "react-router-dom"

import { AuthLayout } from "@/app/auth/layout"
import { LoginPage } from "@/app/auth/login/page"
import { VerifyPage } from "@/app/auth/verify/page"
import { HomeLayout } from "@/app/home/layout"
import { HomePage } from "@/app/home/page"
import { NotFoundPage } from "@/app/not_found/page"
import { PostPage } from "@/app/post/page"
import { AuthProvider, ProtectedRoute } from "@/lib/providers"
import { PostLayout } from "./post/layout"
import { UnknownErrorPage } from "./unknown_error/page"

export const routes: Array<RouteObject> = [
	{
		path: "/",
		element: <AuthProvider />,
		errorElement: <UnknownErrorPage />,
		children: [
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<HomeLayout>
							<HomePage />
						</HomeLayout>
					</ProtectedRoute>
				),
				errorElement: <NotFoundPage />,
			},
			{
				path: ":id/:slug",
				element: (
					<ProtectedRoute>
						<PostLayout>
							<PostPage />
						</PostLayout>
					</ProtectedRoute>
				),
			},
			{
				path: "auth",
				element: (
					<AuthLayout>
						<Outlet />
					</AuthLayout>
				),
				children: [
					{
						path: "login",
						element: <LoginPage />,
					},
					{
						path: "verify",
						element: <VerifyPage />,
					},
				],
			},
		],
	},
	{
		path: "not-found",
		element: <NotFoundPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]
