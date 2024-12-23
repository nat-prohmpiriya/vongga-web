import React from 'react'
import HeroBanner from "../components/HeroBanner";
import { getUsers } from "@/data/users";

const layout = ({params}: {params: {slug: string}}) => {
  const userData = getUsers(1);
  return (
    <div className="p-4 bg-gray-100 grid grid-cols-4 gap-4">
    <div className="col-span-3  rounded-xl">
        <HeroBanner {...userData} />

        {/* Section */}
        <div className="p-4 rounded-xl mt-4 ">

        </div>
    </div>
    <div className="col-span-1 bg-white rounded-xl">
    </div>
</div>
  )
}

export default layout