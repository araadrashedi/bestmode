import { ApolloProvider } from "@apollo/client"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import "@/index.css"
import { routes } from "@/app/app.routes"
import { createApolloClient } from "@/lib/configs"
import { ScrollUpButton } from "@/lib/features/scroll_up_button"
import { ThemeModeToggle } from "@/lib/features/theme_mode_toggle"

// TODO:
// 01. Add defaults ✅
// 02. Add login ✅
// 02.1 Add logout ✅
// 02.3 unit tests
// 02.4 integration tests
// 03. JSDoc ✅
// 03.1 Biome ✅
// 04. env ✅
// 04.1 env validation ✅
// 04.2 virtual list ✅
// 04.3 add readme ✅
// 07. remove extra packages ✅

const client = createApolloClient()
const router = createBrowserRouter(routes)

// biome-ignore lint/style/noNonNullAssertion: the root element is always defined
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>

		<ScrollUpButton />
		<ThemeModeToggle />
	</React.StrictMode>
)
