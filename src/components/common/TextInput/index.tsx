import React from 'react'
import styles from './styles.module.css'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={`${styles.input} ${error ? styles.error : ''} ${className}`}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}

export default TextInput
