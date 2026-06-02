import Status from './ViewingStatus'
import { FaRegClock } from 'react-icons/fa6'
import { IoLocationOutline } from "react-icons/io5";

export default function List() {
  return (
    <div className="relative w-full bg-white rounded-lg px-14">
      <Status />
      <div className="flex flex-row gap-6">
        <div className="aspect-[2/3] w-[150px] bg-gray-200 my-5" />

        <div className="flex flex-col gap-5 py-10">
          <div className="flex flex-row items-end gap-5">
            <p className="text-2xl font-bold">제목</p>
            <p>2026-05-20 (수)</p>
          </div>
          
          <p className="text-xl">★★★★★</p>

          <div className="flex flex-row gap-5">
            <div className="flex flex-row items-center gap-3">
              <FaRegClock />
              <p>129분</p>
            </div>

            <div className="flex flex-row items-center gap-3">
              <IoLocationOutline className="text-xl" />
              <p>영화관</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}