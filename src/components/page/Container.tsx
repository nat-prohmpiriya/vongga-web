
import BaseProp from '@/types/baseProp'

const Container = (props: BaseProp) => {
    return (
        <div className='p-4'>{props.children}</div>
    )
}

export default Container