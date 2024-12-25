import BaseProp from '@/types/baseProp'
import React from 'react'

interface VAvatarProps extends BaseProp {
    size?: 'sm' | 'md' | 'lg'
    shape?: 'circle' | 'square'
    src?: string
    status?: 'online' | 'offline'
    alt?: string
    imageUrl?: string
    name: string
    onClick?: () => void
}


const VAvatar = (props: VAvatarProps) => {
    const [isImageError, setIsImageError] = React.useState(false)
    if (props.imageUrl && !isImageError) {
        return (
            <img
                className={`rounded-full shadow-sm h-10 w-10`}
                src={props.imageUrl} alt={props.alt}
                onError={() => setIsImageError(true)}
                onClick={props.onClick}
            />
        )
    }
    return (
        <div
            className={`bg-gray-300 rounded-full shadow-sm h-10 w-10 flex items-center justify-center text-white `}
            onClick={props.onClick}
        >
            {props?.name?.[0]?.toUpperCase()}
        </div>)
}

export default VAvatar
