import Status from './ViewingStatus'
import { FaRegClock } from 'react-icons/fa6'
import { IoLocationOutline } from "react-icons/io5";

import { Field } from '../components/forms/FieldConfigs'

export default function List({ commentary }) {
  return (
    <div className="relative w-full bg-white rounded-lg px-14">
      <Status />
      <div className="flex flex-row gap-6">
        {/* 포스터 */}
        <img
          src={commentary.image}
          alt={commentary.title}
          className="aspect-[2/3] w-[150px] my-5 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-5 py-10">
          <div className="flex flex-row items-end gap-5">
            {/* 제목 */}
            <p className="text-2xl font-bold">{commentary.title}</p>
            {/* 날짜 */}
            <p>{new Date(commentary.date).toLocaleDateString('ko-KR')}</p>
          </div>
          
          {/* 별점 */}
          <p className="text-xl">{'★'.repeat(commentary.rating)}</p>

          {/* 상세정보 */}
          <div className="flex flex-row gap-5">
            {Object.entries(commentary.details || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex jusitfy-between gap-2"
                >
                  <span className="font-semibold">
                    {Field[key]?.label}
                  </span>

                  <span>{value}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}