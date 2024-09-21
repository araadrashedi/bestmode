import { CircleAlertIcon, LoaderIcon } from "lucide-react"
import React from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"

import { useAuth } from "@/lib/providers"
import { Button, buttonVariants } from "@/lib/uikit/button"
import { Card } from "@/lib/uikit/card"
import { Input } from "@/lib/uikit/input"
import { Label } from "@/lib/uikit/label"
import { cancelEvent, isEmpty, isNil, toAttribute } from "@/lib/utils"

export function VerifyPage() {
	const auth = useAuth()
	const [searchParams] = useSearchParams({ email: "" })
	// biome-ignore lint/style/noNonNullAssertion: searchParams has a default value
	const email = decodeURIComponent(searchParams.get("email")!)

	const [isResending, setIsResending] = React.useState(false)
	const [isVerifying, setIsVerifying] = React.useState(false)
	const [verifyError, setVerifyError] = React.useState("")

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		cancelEvent(event)

		const form = event.currentTarget as HTMLFormElement
		const data = new FormData(form)
		const code = data.get("code")?.toString()
		if (isNil(code)) {
			return
		}

		setIsVerifying(true)
		const verification = await auth.verify(email, code)
		setVerifyError(verification.ok ? "" : verification.message)
		setIsVerifying(false)
	}

	const handleResend = async (event: React.PointerEvent<HTMLButtonElement>) => {
		cancelEvent(event)

		setIsResending(true)
		await auth.login(email)
		setIsResending(false)
	}

	if (isEmpty(email)) {
		return <Navigate to="/auth/login" replace />
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4">
			<section className="w-full max-w-md">
				<header className="mx-auto mb-8 w-full text-center">
					<strong className="text-2xl captilize tracking-wider">Bestmode</strong>
				</header>

				<Card.Root className="w-full max-w-2xl">
					<Card.Header>
						<Card.Title>Check your email for a code</Card.Title>
						<Card.Description className="text-balance space-x-1">
							<span>Enter the 6-digit verification code we have sent you at</span>
							<span className="font-semibold text-secondary-foreground/80">{email}</span>
							<Link
								to="/auth/login"
								className={buttonVariants({ variant: "link", size: "sm", class: "!text-secondary-foreground" })}
							>
								change email
							</Link>
						</Card.Description>
					</Card.Header>
					<Card.Content className="flex-grow">
						<form id="verify-form" onSubmit={handleSubmit}>
							<Label htmlFor="code" className="sr-only">
								Code
							</Label>
							<Input
								className="aria-[invalid]:text-red-700 dark:aria-[invalid]:text-red-400 focus:aria-[invalid]:text-foreground dark:focus:aria-[invalid]:text-foreground"
								aria-invalid={toAttribute<"true">(!isEmpty(verifyError))}
								id="code"
								name="code"
								type="text"
								inputMode="numeric"
								pattern="[0-9]{6}"
								maxLength={6}
								minLength={6}
								placeholder="6-digit code"
								autoFocus
								autoComplete="off"
								autoCorrect="off"
								required
								title="Please enter 6-digit code"
								aria-label="Please enter 6-digit code"
								aria-describedby="description form-error"
							/>
							<Button
								variant="link"
								className="text-xs text-secondary-foreground mt-3"
								type="button"
								disabled={isResending || isVerifying}
								onClick={handleResend}
							>
								Resend code
							</Button>
						</form>
					</Card.Content>

					<Card.Footer className="flex flex-col gap-4">
						<Button
							className="w-full "
							variant="default"
							size="lg"
							type="submit"
							form="verify-form"
							aria-describedby="magic"
							disabled={isVerifying || isResending}
						>
							{isResending && <LoaderIcon className="me-2 size-4 motion-safe:animate-spin" />}
							{isVerifying && <LoaderIcon className="me-2 size-4 motion-safe:animate-spin" />}
							{isResending ? "Resending..." : isVerifying ? "Verifying..." : "Verify"}
						</Button>

						{!isEmpty(verifyError) && (
							<p
								className="text-sm text-red-600 dark:text-red-500 text-balance w-full flex items-center gap-2"
								id="form-error"
							>
								<CircleAlertIcon className="size-4" />
								{verifyError ?? "Something went wrong. Please try again later."}
							</p>
						)}
					</Card.Footer>
				</Card.Root>

				<footer className="mt-4 flex w-full max-w-md flex-col gap-4 px-4">
					<p className="pt-4 text-center text-xs leading-5 text-tertiary-foreground" id="description">
						Can’t find your code? Check your spam folder!
					</p>
				</footer>
			</section>
		</main>
	)
}
