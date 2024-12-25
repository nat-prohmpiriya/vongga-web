'use client'

import Image from 'next/image'
import { FaStore } from 'react-icons/fa'

export default function InfoShop() {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
                {/* Shop Logo */}
                <div className="relative w-20 h-20">
                    <img
                        src="https://picsum.photos/200/200?random=1"
                        alt="Indigo Official Shop"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                        Mall
                    </div>
                </div>

                {/* Shop Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">
                            Indigo.Official.Shop
                        </h2>
                        <span className="text-gray-500 text-sm">
                            เข้าสู่ระบบล่าสุดเมื่อ 26 นาที ที่ผ่านมา
                        </span>
                    </div>
                    <div className="flex gap-8 mt-2">
                        <button className="flex items-center gap-2 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                            <FaStore />
                            แชทเลย
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 border text-gray-700 rounded-lg hover:bg-gray-50">
                            ดูร้านค้า
                        </button>
                    </div>
                </div>
            </div>

            {/* Shop Stats */}
            <div className="grid grid-cols-5 gap-4 mt-6 text-center">
                <div>
                    <div className="text-red-500 font-semibold">385.1พัน</div>
                    <div className="text-gray-500 text-sm">คะแนน</div>
                </div>
                <div>
                    <div className="text-green-500 font-semibold">100%</div>
                    <div className="text-gray-500 text-sm">อัตราการตอบกลับ</div>
                </div>
                <div>
                    <div className="font-semibold">ภายใน1นาที</div>
                    <div className="text-gray-500 text-sm">
                        เวลาในการตอบกลับ
                    </div>
                </div>
                <div>
                    <div className="font-semibold">4 ปี ที่ผ่านมา</div>
                    <div className="text-gray-500 text-sm">เข้าร่วมเมื่อ</div>
                </div>
                <div>
                    <div className="font-semibold">273.9พัน</div>
                    <div className="text-gray-500 text-sm">ผู้ติดตาม</div>
                </div>
            </div>

            {/* Shop Performance */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500">รายการสินค้า</span>
                    <span className="font-semibold">706</span>
                </div>
            </div>
        </div>
    )
}
