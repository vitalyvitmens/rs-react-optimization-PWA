import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function useFetchCategoryId(query, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [categoriesId, setCategoriesId] = useState({})
	const { category, id } = useParams()
	const [categorySlice, setCategorySlice] = useState(category?.slice(0, -1))

	useEffect(() => {
		setCategoriesId({})
		setCategorySlice(category?.slice(0, -1))
	}, [category, query])

	useLayoutEffect(() => {
		setLoading(true)
		setError(false)

		let cancel
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${categorySlice}/${id}`,
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setCategoriesId(res.data)

				setLoading(false)
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					return
				}
			})
		return () => cancel()
	}, [category, categorySlice, id, pageNumber, query])

	return {
		loading,
		error,
		categoriesId,
		category,
	}
}
