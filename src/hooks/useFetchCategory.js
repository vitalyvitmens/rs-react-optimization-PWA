import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function useFetchCategory(query, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [categories, setCategories] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const { category, id } = useParams()
	const [categorySlice, setCategorySlice] = useState(category?.slice(0, -1))

	useEffect(() => {
		setCategories([])
		setCategorySlice(category?.slice(0, -1))
	}, [category, query])

	useLayoutEffect(() => {
		setLoading(true)
		setError(false)

		let cancel
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${categorySlice}`,
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setCategories((prevState) => {
					return [...new Set([...prevState, ...res.data.results])]
				})

				setHasMore(res.data.results.length > 0 && res.data.info.next !== null)
				setLoading(false)
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					return
				}

				setError(false)
				console.error(e)
			})

		return () => cancel()
	}, [category, categorySlice, pageNumber, query])

	return {
		loading,
		error,
		categories,
		hasMore,
		category,
		id,
	}
}
