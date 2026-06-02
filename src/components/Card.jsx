import { useState } from 'react'
import { MdMovie } from 'react-icons/md'
import { FaRegClock } from 'react-icons/fa6'
import { IoLocationOutline } from "react-icons/io5";
import Status from './ViewingStatus'

export default function Card() {
  const [isFlipped, setIsFlipped] = useState(true)

  return(
    <div className="flex flex-col items-center">
      {/* 카드 부분 */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="aspect-[2/3] w-[300px] [perspective:1000px]"
      >
        <div
          className={`
              relative w-full h-full cursor-pointer
              transition-transform duration-300
              [transform-style:preserve-3d]
              ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
            `}
        >

          {/* 앞면 */}
          <div 
            className=" 
              absolute inset-0 rounded-lg overflow-hidden bg-white px-5 py-7
              [transform:rotateY(180deg)] [backface-visibility:hidden]
            "
          >
            <Status />
            <div className="aspect-[2/3] w-full bg-gray-200"></div>
          </div>

          {/* 뒷면 */}
          <div  
            className="
              absolute inset-0 rounded-lg overflow-hidden bg-white px-5 py-4
              [backface-visibility:hidden]
            "
          >
            <Status />
            <div className="flex flex-col h-full gap-3">
              {/* 영화, 드라마 아이콘 */}
              <div className="flex justify-end">
                <MdMovie className="text-4xl" />
              </div>

              {/* 구분선 */}
              <div className="w-full border-[1px] border-beige-800 my-5" />

              {/* 정보 */}
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold">제목</p>
                <p>2026-05-20 (수)</p>

                <div className="flex flex-row gap-3 items-center">
                  <FaRegClock />
                  <p>129분</p>
                </div>

                <div className="flex flex-row gap-3">
                  <IoLocationOutline className="mt-1 text-xl" />
                  <div className="flex flex-col">
                    <p>영화관</p>
                    <p>6관 G10</p>
                  </div>
                </div>
              </div>

              {/* 구분선 */}
              <div className="w-full border-[1px] border-beige-800 mt-auto mb-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 제목, 별점 부분 */}
      <div className="flex flex-col items-center py-3 text-xl font-bold">
        <p>제목</p>
        <p>★★★★★</p>
      </div>
    </div>
  )
}