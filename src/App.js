import { AuthProvider } from './context/AuthProvider'
import { lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import styles from './app.module.css'

const Login = lazy(() =>
	import('./pages/Login/Login').then((module) => ({
		default: module.Login,
	}))
)
const Navigation = lazy(() =>
	import('./layout/Navigation/Navigation').then((module) => ({
		default: module.Navigation,
	}))
)
const Home = lazy(() =>
	import('./pages/Home/Home').then((module) => ({ default: module.Home }))
)
const Category = lazy(() =>
	import('./pages/Category/Category').then((module) => ({
		default: module.Category,
	}))
)
const Detail = lazy(() =>
	import('./pages/Detail/Detail').then((module) => ({
		default: module.Detail,
	}))
)
const NotFound = lazy(() =>
	import('./pages/NotFound/NotFound').then((module) => ({
		default: module.NotFound,
	}))
)

export const App = () => {
	return (
		<div className={styles.App}>
			<HashRouter>
				<AuthProvider>
					<Routes>
						<Route
							element={
								<ErrorBoundary>
									<Navigation />
								</ErrorBoundary>
							}
						>
							<Route path="/" element={<Home />} />
							<Route
								path="/:category"
								element={
									<PrivateRoute>
										<ErrorBoundary>
											<Category />
										</ErrorBoundary>
									</PrivateRoute>
								}
							/>
							<Route
								path="/:category/:id"
								element={
									<PrivateRoute>
										<ErrorBoundary>
											<Detail />
										</ErrorBoundary>
									</PrivateRoute>
								}
							/>
							<Route
								path="*"
								element={
									<ErrorBoundary>
										<NotFound />
									</ErrorBoundary>
								}
							/>
						</Route>
						<Route
							path="/login"
							element={
								<ErrorBoundary>
									<Login />
								</ErrorBoundary>
							}
						/>
					</Routes>
				</AuthProvider>
			</HashRouter>
		</div>
	)
}
