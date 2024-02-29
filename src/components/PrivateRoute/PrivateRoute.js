import { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

export function PrivateRoute({ children }) {
	const auth = useAuth()
	const location = useLocation()

	if (auth.user === null) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />
	}

	return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
}
