import { useState } from 'react'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import Layout from '../components/common/Layout'
import Dropdown from '../components/common/Dropdown'

export default function Registration() {
  const Cartegory = [
    { title: '영화', id: 'movie' },
    { title: '드라마', id: 'drama' },
    { title: '애니메이션', id: 'animation' },
  ]

  const labelClass = "w-24 text-right shrink-0"
  const [chooseCartegory, setChooseCartegory] = useState(null)
  const [rating, setRating] = useState(0)

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
          </div>
        </div>
      </div>
    </Layout>
  )
}