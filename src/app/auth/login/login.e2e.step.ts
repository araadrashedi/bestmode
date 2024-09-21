import { Given, Then, When } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import type Playwright from "playwright"

type Parameters = {
	emailInput: Playwright.Locator
	submitButton: Playwright.Locator
}

Given("I navigate to the login page", async function (this: Perspective<Parameters>) {
	await this.page.goto(`${this.baseURL}/auth/login`).catch(console.log)
})

Then(
	"I should see the login form, email input field, and submit button",
	async function (this: Perspective<Parameters>) {
		const loginForm = this.page.locator('form[id="login-form"]')
		const emailInput = this.page.locator('input[type="email"][name="email"]')
		const submitButton = this.page.locator('button[type="submit"][form="login-form"]')

		await expect(loginForm).toBeVisible()
		await expect(emailInput).toBeVisible()
		await expect(submitButton).toBeVisible()
	}
)

When("I enter {string} into the email field", async function (this: Perspective<Parameters>, email: string) {
	await this.page.fill('input[type="email"][name="email"]', email)
})

When("I submit the form", async function (this: Perspective<Parameters>) {
	await this.page.click('button[type="submit"][form="login-form"]')
})

Then("I should see a validation error message", async function (this: Perspective<Parameters>) {
	const errorMessage = this.page.locator('[id="form-error"]')
	await expect(errorMessage).toBeVisible()
})

Then("I should be redirected to the verification page", async function (this: Perspective<Parameters>) {
	await expect(this.page).toHaveURL(/.*auth\/verify\?.*/)
})
