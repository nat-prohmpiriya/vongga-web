import BaseProp from '@/types/baseProp'

const ContainerPage = (props: BaseProp) => {
    return (
        <div
            className={'pt-16 bg-gray-100 min-h-screen' + ' ' + props.className}
            {...props}
        >
            {props.children}
        </div>
    )
}

export default ContainerPage
