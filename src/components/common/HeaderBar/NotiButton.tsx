import { IoNotificationsOutline } from 'react-icons/io5'
import { Popover } from 'antd'

const NotiBtn = () => {
    const content = (
        <div className="w-[500px] p-1">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <div className="col-span-3 bg-white rounded-xl">
                <div className="flex flex-col bg-white rounded-xl p-3">
                    <div className="flex gap-4 my-3">
                        <h3>All</h3>
                        <h3>Unread</h3>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Popover trigger="hover" content={content} overlayInnerStyle={{ backgroundColor: '#F3F4F6' }}>
            <button className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300">
                <IoNotificationsOutline className="text-xl text-gray-600" />
            </button>
        </Popover>
    )
}

export default NotiBtn
