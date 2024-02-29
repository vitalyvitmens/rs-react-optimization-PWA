import styles from './button.module.css'

export const Button = ({ title, onClick, disabled, children }) => {
	return (
		<button onClick={onClick} disabled={disabled} className={styles.btn}>
			{title || children}
		</button>
	)
}
