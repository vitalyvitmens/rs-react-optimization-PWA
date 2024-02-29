import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function useFetchEpisodes() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [episodes, setEpisodes] = useState([])
	const { category } = useParams()

	useEffect(() => {
		setEpisodes([])
	}, [category])

	useLayoutEffect(() => {
		setLoading(true)
		setError(false)

		const fetchAllPages = async (url) => {
			try {
				const res = await axios.get(url)
				setEpisodes((prevState) => {
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

		fetchAllPages(`https://rickandmortyapi.com/api/episode`)
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
		episodes,
	}
}
