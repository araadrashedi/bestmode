/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BETTERMODE_ACCESS_TOKEN: string
	readonly VITE_BETTERMODE_SPACE_ID: string
	readonly VITE_E2E_TEST_HEADLESS: boolean
	readonly VITE_E2E_TEST_SLOWMO: number
}
