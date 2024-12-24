import React from 'react'

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    fullWidth?: boolean
    children: React.ReactNode
    loading?: boolean
}

export default function Btn({
    variant = 'primary',
    fullWidth = false,
    children,
    className = '',
    loading = false,
    ...props
}: BtnProps) {
    const baseStyles = 'px-4 py-3 rounded-lg transition-colors h-10 '
    const variantStyles = {
        primary: `bg-black text-white hover:bg-gray-800 ${loading ? 'cursor-not-allowed opacity-65' : ''}`,
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    }
    const widthStyles = fullWidth ? 'w-full' : ''

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
            {...props}
            disabled={loading}
        >
            {loading && (
                <span className="mr-2">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </span>
            )}
            {children}
        </button>
    )
}
