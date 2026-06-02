import { useState } from 'react'
import { DatePicker } from 'react-datepicker'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import "react-datepicker/dist/react-datepicker.css"   // 기본 스타일
import Layout from '../components/common/Layout'
import Dropdown from '../components/common/Dropdown'

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
  const [chooseDate, setChooseDate] = useState(null)

  return (
    <Layout>
      <p className="w-full text-left text-3xl">작품 추가</p>

      <div className="flex flex-col items-center jusitfy-center px-[100px] py-[50px] bg-beige-400 rounded-lg">
        <div className="flex flex-row w-full gap-5">
          {/* 포스터 등록 */}
          <div className="aspect-[2/3] w-[250px] bg-beige-600 rounded-lg" />

          {/* 내용 등록 */}
          <div className="flex flex-col gap-5 w-2/3">
            {/* 카테고리 선택 */}
            <div className="flex flex-row items-center gap-3 w-full">
              <p className={labelClass}>카테고리</p>
              <Dropdown
                options={Cartegory}
                placeholder="영화"
                onSelect={(option) => {
                  setChooseCartegory(option)
                }}
                className="w-[250px]"
              />
              <button className="aspect-square w-[45px] bg-beige-600 rounded-lg">+</button>
            </div>

            {/* 제목 */}
            <div className="flex flex-row items-center gap-3">
              <p className={labelClass}>제목</p>
              <input className="px-3 py-2 w-full bg-beige-600 border border-beige-700 rounded-lg"></input>
            </div>

            {/* 별점 */}
            <div className="flex flex-row items-center gap-3">
              <p className={labelClass}>별점</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => star <= rating ?
                  (
                    <PiStarFill
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl text-beige-800 cursor-pointer hover:text-beige-800"                  
                    />
                  ) : (
                    <PiStarLight
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl text-beige-800 cursor-pointer"
                    />
                  )
                )}
              </div>
            </div>

            {/* 상태 */}
            <div className="flex flex-row items-center gap-3">
              <p className={labelClass}>상태</p>  
              <div className="flex flex-row gap-2">
                {Status.map((menu) => (
                  <button
                    onClick={() => setChooseStatus(menu.id)}
                    className={`
                      w-[120px] py-2 border border-beige-700 rounded-lg
                      ${chooseStatus===menu.id ? 'bg-beige-600' : 'bg-beige-400'}  
                    `}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 날짜 */}
            <div className="flex flex-row items-center gap-3">
              <p className={labelClass}>날짜</p>
              <DatePicker
                selected={chooseDate}
                onChange={(date) => setChooseDate(date)}
                dateFormat="yyyy-MM-dd"
                disabled={chooseStatus !== 0}
                className="
                  w-[250px] px-5 py-2 bg-beige-600 border border-beige-700 rounded-lg
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}