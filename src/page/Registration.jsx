import { useState } from 'react'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import Layout from '../components/common/Layout'
import Dropdown from '../components/common/Dropdown'
import Calendar from '../components/Calendar'

export default function Registration() {
  const Cartegory = [
    { title: '영화', id: 'movie' },
    { title: '드라마', id: 'drama' },
    { title: '애니메이션', id: 'animation' },
  ]

  const Status = [
    { label: '시청완료', id: 0 },
    { label: '시청중', id: 1 },
    { label: '보고싶음', id:2 },
  ]

  const labelClass = "w-24 text-right shrink-0"
  const [chooseCartegory, setChooseCartegory] = useState(null)
  const [rating, setRating] = useState(0)
  const [chooseStatus, setChooseStatus] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <p className="w-full text-left text-3xl font-bold mb-[50px]">작품 추가</p>

      <div className="flex flex-col items-center jusitfy-center px-[100px] py-[50px] bg-beige-400 rounded-lg">
        <div className="flex flex-row w-full gap-5">
          {/* 포스터 등록 */}
          <div className="aspect-[2/3] w-[250px] bg-beige-600 rounded-lg" />

          {/* 내용 등록 */}
          <div className="flex flex-col gap-8 w-2/3 text-xl">
            {/* 카테고리 선택 */}
            <div className="flex flex-row items-center gap-8 w-full">
              <p className={labelClass}>카테고리</p>
              <Dropdown
                options={Cartegory}
                placeholder="영화"
                onSelect={(option) => {
                  setChooseCartegory(option)
                }}
                className="w-[250px] py-3"
              />
              <button className="aspect-square w-[55px] bg-beige-600 border border-beige-700 rounded-lg">
                <p className="font-bold text-2xl">+</p>
              </button>
            </div>

            {/* 제목 */}
            <div className="flex flex-row items-center gap-8">
              <p className={labelClass}>제목</p>
              <input className="px-3 py-3 w-full bg-beige-600 border border-beige-700 rounded-lg"></input>
            </div>

            {/* 별점 */}
            <div className="flex flex-row items-center gap-8">
              <p className={labelClass}>별점</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => star <= rating ?
                  (
                    <PiStarFill
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl text-beige-800 cursor-pointer hover:text-beige-800"                  
                    />
                  ) : (
                    <PiStarLight
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl text-beige-800 cursor-pointer"
                    />
                  )
                )}
              </div>
            </div>

            {/* 상태 */}
            <div className="flex flex-row items-center gap-8">
              <p className={labelClass}>상태</p>  
              <div className="flex flex-row gap-2">
                {Status.map((menu) => (
                  <button
                    onClick={() => setChooseStatus(menu.id)}
                    className={`
                      w-[120px] py-3 border border-beige-700 rounded-lg
                      ${chooseStatus===menu.id ? 'bg-beige-600' : 'bg-beige-400'}  
                    `}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 날짜 */}
            <div className="relative flex flex-row items-center gap-8">
              <p className={labelClass}>날짜</p>
              <button
                onClick={() => setOpen(!open)}
                className={`
                  flex flex-row justify-between items-center w-[250px] px-5 py-3 bg-beige-600 border border-beige-700 rounded-lg
                  ${chooseStatus !== 0 ? 'opacity-50 cursor-not-allowd' : ''}
                `}
              >
                <p>{selectedDate.toLocaleDateString("ko-KR")}</p>
                <FaCalendarAlt />
              </button>
              {open && (
                <div className="absolute top-[45px] left-[70px] z-50">
                  <Calendar
                    date={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setOpen(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}