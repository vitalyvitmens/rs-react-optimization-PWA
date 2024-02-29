import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function useFetchCharacters() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [characters, setCharacters] = useState([])
	const { category } = useParams()

	useEffect(() => {
		setCharacters([])
	}, [category])

	useLayoutEffect(() => {
		setLoading(true)
		setError(false)

		const fetchAllPages = async (url) => {
			try {
				const res = await axios.get(url)
				setCharacters((prevState) => {
					return [...new Set([...prevState, ...res.data.results])]
				})
				if (res.data.info.next) {
					await fetchAllPages(res.data.info.next)
				}
			} catch (e) {
				setError(true)
				console.error(e)
			}
		}

		fetchAllPages(`https://rickandmortyapi.com/api/character`)
			.then(() => {
				setLoading(false)
			})
			.catch((e) => {
				setError(true)
				console.error(e)
			})
	}, [category])

	return {
		loading,
		error,
		characters,
	}
}
