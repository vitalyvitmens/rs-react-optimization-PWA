import { Suspense } from 'react'

export function Component({ component: Component, ...otherProps }) {
	return (
		<Suspense fallback="Загрузка...">
			<Component {...otherProps} />
		</Suspense>
	)
}
