import { forwardRef } from 'react'
import styles from './CustomInput.module.css'

export const CustomInput = forwardRef((props, ref) => {
	const asteriskStyle = {
		color: 'red',
		marginLeft: '2px',
	}

	return (
		<div className={styles.customInput}>
			<label
				className={styles.lable}
				htmlFor={props.id}
				style={{
					fontSize: props.size + 'px',
				}}
			>
				{props.label}
				{props.required && <span style={asteriskStyle}>*</span>}
			</label>
			<span className={styles.description}>{props.description}</span>
			<input
				className={props.error ? styles.inputFieldError : styles.inputField}
				{...props}
				ref={ref}
				style={{
					borderRadius: props.radius + 'px',
					fontSize: props.size + 'px',
					backgroundImage: props.sobaka ? `url(${props.sobaka})` : 'none',
					backgroundPosition: 'left center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: props.size + 'px',
					paddingLeft: props.sobaka && '30px',
					transform: props.sobaka && 'scaleX(0.95)',
					marginLeft: props.sobaka && '-10px',
					marginRight: props.sobaka && '-10px',
				}}
			/>
			<span className={styles.error}>{props.error}</span>
		</div>
	)
})
