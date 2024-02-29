import { Component } from 'react'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasError: false,
		}
	}

	static getDerivedStateFromError(error) {
		console.log('####: error from getDerivedStateFromError', error.message)
		return {
			hasError: true,
		}
	}

	componentDidCatch(error, errorInfo) {
		console.log('####: error from componentDidCatch', error.message)
		console.log('####: erorInfo from componentDidCatch', errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						display: 'flex',
						margin: 'auto',
						color: 'red',
						fontSize: '3rem',
						fontWeight: 'bold',
					}}
				>
					Что-то пошло не так!
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
