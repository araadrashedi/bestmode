type Maybe<T> = T | null

type Reaction = {
	reacted: boolean
	reaction: string
	count: number
	__typename: "PostReactionDetail"
}

type Media = {
	dominantColorHex: Maybe<string>
	url: string
	urls: {
		full: string
		large: string
		medium: string
		small: string
		thumb: string
	}
}

type RelationEntity = {
	medias: Array<Media>
}

type Field = {
	key: string
	value: string
	relationEntities: Maybe<RelationEntity>
}

type Post = {
	id: string
	slug: string
	fields: Array<Field>
	title: string
	publishedAt: string
	description: string
	reactions: Array<Reaction>
	reactionsCount: number
	owner: { member: { name: string } }
}

type Perspective<Parameters extends Record<string, unknown> = unknown> =
	import("@cucumber/cucumber").World<Parameters> & {
		page: import("playwright").Page
		baseURL: string
		parameters: Parameters
		openNewTab(): Promise<void>
		setNetworkSlow(ms?: number): Promise<void>
		closeCurrentTab(): Promise<void>
	}
