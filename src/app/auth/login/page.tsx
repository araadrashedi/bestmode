import { useMutation } from "@apollo/client"
import { CircleAlertIcon, LoaderIcon } from "lucide-react"

import { getAuthFormValidateEmailMutation } from "@/lib/api/api.mutations"
import { useAuth } from "@/lib/providers"
import { Button } from "@/lib/uikit/button"
import { Card } from "@/lib/uikit/card"
import { Input } from "@/lib/uikit/input"
import { Label } from "@/lib/uikit/label"
import { cancelEvent, isNil, toAttribute } from "@/lib/utils"

export function LoginPage() {
	const auth = useAuth()
	const [validateEmail, validateMutation] = useMutation(getAuthFormValidateEmailMutation(), {
		context: {
			uri: "/api.bestmode/global",
		},
	})

	const isInvalid =
		!validateMutation.loading &&
		(!isNil(validateMutation.error) || validateMutation.data?.validateEmail.valid === false)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		cancelEvent(event)

		const form = event.currentTarget as HTMLFormElement
		const data = new FormData(form)
		const email = data.get("email")?.toString()
		if (isNil(email)) {
			return
		}

		try {
			const validation = await validateEmail({ variables: { input: { email } } })
			if (!validation.data?.validateEmail.valid) {
				return
			}

			await auth.login(email)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4">
			<section className="w-full max-w-md">
				<header className="mx-auto mb-8 w-full text-center">
					<strong className="text-2xl captilize tracking-wider">Bestmode</strong>
				</header>

				<Card.Root className="w-full max-w-2xl">
					<Card.Header>
						<Card.Title>Sign in</Card.Title>
						<Card.Description>Welcome Back! Sign in to continue</Card.Description>
					</Card.Header>
					<Card.Content className="flex-grow">
						<form id="login-form" onSubmit={handleSubmit}>
							<Label htmlFor="email" className="sr-only">
								Email
							</Label>
							<Input
								className="aria-[invalid]:text-red-700 dark:aria-[invalid]:text-red-400 focus:aria-[invalid]:text-foreground dark:focus:aria-[invalid]:text-foreground"
								aria-invalid={toAttribute<"true">(isInvalid)}
								id="email"
								name="email"
								inputMode="email"
								type="email"
								placeholder="Email"
								autoFocus
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								required
								title="Please enter a valid email address in the format: your.email@example.com"
								aria-describedby="description form-error"
							/>
							<p className="text-xs text-tertiary-foreground mt-3" id="description">
								We’ll email you a magic code for a password-free sign in.
							</p>
						</form>
					</Card.Content>

					<Card.Footer className="flex flex-col gap-4">
						<Button className="w-full" size="lg" type="submit" form="login-form" disabled={validateMutation.loading}>
							{validateMutation.loading && <LoaderIcon className="me-2 size-4 motion-safe:animate-spin" />}
							{validateMutation.loading ? "Signing in" : "Sign in with email"}
						</Button>

						{isInvalid && (
							<p
								className="text-sm text-red-600 dark:text-red-500 text-balance w-full flex items-center gap-2"
								id="form-error"
							>
								<CircleAlertIcon className="size-4" />
								{validateMutation.data?.validateEmail.suggestion ?? "Your email is not valid"}
							</p>
						)}
					</Card.Footer>
				</Card.Root>

				<footer className="mt-4 flex w-full max-w-md flex-col gap-4 px-4">
					<p className="pt-4 text-center text-xs leading-5 text-tertiary-foreground">
						By signing in, you agree to Bestmode’s Terms &amp; Privacy Policy
					</p>
				</footer>
			</section>
		</main>
	)
}
