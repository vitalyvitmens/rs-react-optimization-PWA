import { Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Component } from '../../components/Component/Component'
import { AuthStatus } from '../../components/AuthStatus/AuthStatus'
import logo from '../../assets/logo.jpg'
import styles from './Navigation.module.css'

export const Navigation = () => {
	const { pathname } = useLocation()

	return (
		<div className={styles.Navigation}>
			<Link to="/">
				<img
					src={logo}
					alt="logo"
					width="70"
					height="70"
					className={pathname === '/' ? styles.imgAnimation : styles.img}
				/>
			</Link>
			<div className={styles.authCenter}>
				<Component component={AuthStatus} />
			</div>
			<div className={styles.center}>
				<Link to="/characters">Герои</Link>
				<Link to="/locations">Локации</Link>
				<Link to="/episodes">Эпизоды</Link>
			</div>

			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
		</div>
	)
}
