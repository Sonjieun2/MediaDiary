import { useState } from 'react'
import { MdMovie } from 'react-icons/md'
import { FaRegClock } from 'react-icons/fa6'
import { IoLocationOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from 'react-icons/bs'
import Status from './ViewingStatus'

import { Field } from '../components/forms/FieldConfigs'
import { useCommentary } from '../context/CommentaryContext'

export default function Card({ commentary }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [isFlipped, setIsFlipped] = useState(true)
  const { deleteCommentary } = useCommentary()

  return(
    <div className="flex flex-col items-center">
      {/* 카드 부분 */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="aspect-[2/3] w-[250px] [perspective:1000px]"
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
            {/* 포스터 */}
            <img
              src={commentary.image}
              alt={commentary.title}
              className="aspect-[2/3] w-full object-cover rounded-lg"
            />
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
                {/* 제목 */}
                <p className="text-2xl font-bold">{commentary.title}</p>
                {/* 날짜 */}
                <p>{new Date(commentary.date).toLocaleDateString('ko-KR')}</p>

                {/* 상세정보 */}
                <div className="flex flex-col gap-2">
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

              {/* 구분선 */}
              <div className="w-full border-[1px] border-beige-800 mt-auto mb-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 제목, 별점 부분 */}
      <div className="relative flex flex-col items-center w-full py-3 text-xl font-bold">
        <p>{commentary.title}</p>
        <p>{'★'.repeat(commentary.rating)}</p>
        
        <div className="absolute right-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenMenu(!openMenu)
            }}
          >
            <BsThreeDotsVertical />
          </button>

          {openMenu && (
            <div className="absolute top-8 right-0 bg-white border border-beige-400 rounded-lg shadow-sm">
              <button
                onClick={() => (
                  deleteCommentary(commentary.id),
                  setOpenMenu(!openMenu)
                )}
                className="px-6 py-2 text-lg w-full whitespace-nowrap hover:bg-beige-700 hover:text-white"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}