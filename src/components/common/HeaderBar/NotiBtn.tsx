import { IoNotificationsOutline } from 'react-icons/io5'
import { Popover } from 'antd'

const NotiBtn = () => {
    const content = (
        <div className="p-4 w-[400px] bg-gray-100">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="flex gap-4 my-3">
                <h3>All</h3>
                <h3>Unread</h3>
            </div>
        </div>
    )

    return (
        <Popover trigger="click" content={content} arrow={false}>
            <button className="p-2 bg-gray-100 rounded-lg">
                <IoNotificationsOutline className="text-xl text-gray-600" />
            </button>
        </Popover>
    )
}

export default NotiBtn
