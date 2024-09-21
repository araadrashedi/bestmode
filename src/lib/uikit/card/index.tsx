import { CardContent } from "./card_content"
import { CardDescription } from "./card_description"
import { CardFooter } from "./card_footer"
import { CardHeader } from "./card_header"
import { CardRoot } from "./card_root"
import { CardTitle } from "./card_title"

export const Card = Object.freeze({
	/**
	 * @see https://www.radix-ui.com/docs/primitives/components/card
	 */
	Root: CardRoot,
	Header: CardHeader,
	Footer: CardFooter,
	Title: CardTitle,
	Description: CardDescription,
	Content: CardContent,
})
