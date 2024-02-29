import { useNavigate, Link } from 'react-router-dom'
import { Component } from '../../components/Component/Component'
import { Button } from '../../components/Button/Button'
import { NotFound } from '../../pages/NotFound/NotFound'
import { useFetchEpisodes } from '../../hooks/useFetchEpisodes'
import { useFetchCharacters } from '../../hooks/useFetchCharacters'
import { useFetchCategoryId } from '../../hooks/useFetchCategoryId'
import styles from './Detail.module.css'

export const Detail = () => {
	const { loading, error, categoriesId, category } = useFetchCategoryId()
	const { episodes } = useFetchEpisodes()
	const { characters } = useFetchCharacters()
	const navigate = useNavigate()

	if (loading || !categoriesId) {
		return <h2>Loading...</h2>
	}

	if (!categoriesId && !loading) {
		return <NotFound />
	}

	const imgStyle = {
		width: '40px',
		height: '40px',
		margin: '1px 20px 1px 10px',
		transform: 'translateY(15px)',
		border: '1px solid #084949',
		borderRadius: '50%',
		boxShadow: '-4px -2px 10px black',
	}

	return (
		<div className={styles.Detail}>
			{!categoriesId || loading ? (
				<span>Загрузка...</span>
			) : (
				<div className={styles.row}>
					{categoriesId?.image && (
						<img src={categoriesId.image} alt={categoriesId.name} />
					)}
					<div className={styles.column}>
						<div className={styles.name}>{categoriesId.name || '🤷'}</div>
						<div className={styles.body}>
							{category === 'characters' && (
								<div key={categoriesId.id}>
									<p>
										<span>Пол: </span>
										{categoriesId.gender === 'unknown'
											? '🤷'
											: categoriesId.gender || '🤷'}
									</p>
									<p>
										<span>Вид: </span>
										{categoriesId.species === 'unknown'
											? '🤷'
											: categoriesId.species || '🤷'}
									</p>
									<p>
										<span>Статус: </span>
										{categoriesId.status === 'unknown'
											? '🤷'
											: categoriesId.status || '🤷'}
									</p>
									<p>
										<span>Тип: </span>
										{categoriesId.type === 'unknown'
											? '🤷'
											: categoriesId.type || '🤷'}
									</p>
									<p style={{ fontSize: '1.5rem' }}>
										<span className={styles.name}>Расположение: </span>
										{categoriesId?.location?.name === 'unknown'
											? '🤷'
											: (
													<Link
														to={`/locations${categoriesId?.location?.url.slice(
															40
														)}`}
													>
														{categoriesId?.location?.name}
													</Link>
											  ) || '🤷'}
									</p>
								</div>
							)}
							{category === 'locations' && (
								<div>
									<p>
										<span>Тип: </span>
										{categoriesId.type === 'unknown'
											? '🤷'
											: categoriesId.type || '🤷'}
									</p>
									<p>
										<span>Измерение: </span>
										{categoriesId.dimension === 'unknown'
											? '🤷'
											: categoriesId.dimension || '🤷'}
									</p>
									<span className={styles.name}>Список жителей: </span>
									<ol>
										{categoriesId?.residents?.length === 0 ? (
											<span style={{ color: 'red' }}>
												Список жителей отсутствует!
											</span>
										) : (
											Array.isArray(categoriesId?.residents) &&
											categoriesId?.residents?.map(
												(resident) =>
													resident &&
													characters?.map(
														(item, index) =>
															item.id === Number(resident.slice(42)) && (
																<li key={index}>
																	<Link
																		to={`/characters/${resident.slice(42)}`}
																	>
																		<img
																			style={imgStyle}
																			src={item.image}
																			alt={item.name}
																		/>
																		{item.name}
																	</Link>
																</li>
															)
													)
											)
										)}
									</ol>
								</div>
							)}
							{category === 'episodes' && (
								<div>
									<p>
										<span>Номер эпизода: </span>
										{categoriesId.episode === 'unknown'
											? '🤷'
											: categoriesId.episode || '🤷'}
									</p>
									<p>
										<span>Дата выхода: </span>
										{categoriesId.air_date === 'unknown'
											? '🤷'
											: categoriesId.air_date || '🤷'}
									</p>
									<span className={styles.name}>Список персонажей: </span>
									<ol>
										{categoriesId?.characters?.length === 0 ? (
											<span style={{ color: 'red' }}>
												Список персонажей отсутствует!
											</span>
										) : (
											Array.isArray(categoriesId?.characters) &&
											categoriesId?.characters?.map(
												(character) =>
													character &&
													characters?.map(
														(item, index) =>
															item.id === Number(character.slice(42)) && (
																<li key={index}>
																	<Link
																		to={`/characters/${character.slice(42)}`}
																	>
																		<img
																			style={imgStyle}
																			src={item.image}
																			alt={item.name}
																		/>
																		{item.name}
																	</Link>
																</li>
															)
													)
											)
										)}
									</ol>
								</div>
							)}
							{error && <div>Error</div>}
						</div>
					</div>
				</div>
			)}
			{category === 'characters' && (
				<div
					style={{
						color: '#161bb6',
						marginTop: '-2rem',
						marginLeft: '1.5rem',
						fontSize: '1.2rem',
						fontWeight: '600',
						textAlign: 'start',
						textShadow: '-1px 1px 1px black',
					}}
				>
					<span className={styles.name}>Список эпизодов: </span>
					<ol>
						{categoriesId?.episode?.length === 0 ? (
							<span style={{ color: 'red' }}>Список эпизодов отсутствует!</span>
						) : (
							Array.isArray(categoriesId?.episode) &&
							categoriesId?.episode.map(
								(episode) =>
									episode &&
									episodes?.map(
										(item, index) =>
											item.id === Number(episode.slice(40)) && (
												<li key={index}>
													<Link to={`/episodes/${episode.slice(40)}`}>
														{item.episode} {item.name}
													</Link>
												</li>
											)
									)
							)
						)}
					</ol>
				</div>
			)}
			<Component
				component={Button}
				title="Вернуться назад к списку"
				onClick={() => navigate(-1)}
			/>
		</div>
	)
}
