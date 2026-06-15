import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'
import { IoCaretBackCircle } from 'react-icons/io5'

import Layout from '../components/common/Layout'
import Dropdown from '../components/common/Dropdown'
import Calendar from '../components/Calendar'

import { Fields } from '../components/forms/Fields'
import { Field, FieldConfig } from '../components/forms/FieldConfigs'
import { useCategory } from '../context/CategoryContext'

export default function Registration() {
  const Status = [
    { label: '시청완료', id: 0 },
    { label: '시청중', id: 1 },
    { label: '보고싶음', id:2 },
  ]

  const { category, setCategory } = useCategory()

  const labelClass = "w-24 text-right shrink-0"
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)
  const [chooseCategory, setChooseCategory] = useState(category[0])
  const [rating, setRating] = useState(0)
  const [chooseStatus, setChooseStatus] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const currentFields = chooseCategory?.fields || []   // 카테고리별 아래 입력칸 출력


  // 이미지 추가
  const handleImage = (e) => {
    const file = e.target.files[0]
    
    if (!file) return

    setImage(URL.createObjectURL(file))
  }

  // 카테고리 삭제
  const deleteCategory = (target) => {
    setCategory(
      category.filter(item => item.label !== target.label)
    )
  }

  return (
    <Layout className="relative px-[350px]">
      {/* 뒤로가기 버튼 */}
      <Link
        to='/'
        className="absolute top-[60px] left-20"
      >
        <IoCaretBackCircle className="text-beige-800 text-6xl" />
      </Link>
      
      <p className="w-full text-left text-3xl font-bold mb-[50px]">작품 추가</p>

      <div className="flex flex-col items-center jusitfy-center px-[100px] py-[50px] bg-beige-400 rounded-lg">
        {/* 상단 */}
        <div className="flex flex-row w-full gap-[80px]">
          {/* 포스터 등록 */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="aspect-[2/3] w-[250px] bg-beige-600 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {image ? (
              <img
                src={image}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaPlus className="text-4xl text-beige-800" />
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/"
              onChange={handleImage}
              className="hidden"
            />
          </div>

          {/* 내용 등록 */}
          <div className="flex flex-col gap-8 flex-1 text-xl">
            {/* 카테고리 선택 */}
            <div className="flex flex-row items-center gap-8 w-full">
              <p className={labelClass}>카테고리</p>
              <div className="flex-1 flex flex-row gap-5">
                <Dropdown
                  options={category}
                  placeholder="영화"
                  onSelect={setChooseCategory}
                  onDelete={deleteCategory}
                  className="flex-1"
                  buttonClassName="py-3"
                />
                <Link
                  to='/addCategory'
                  className="aspect-square flex items-center justify-center w-[55px] bg-beige-600 border border-beige-700 rounded-lg"
                >
                  <p className="font-bold text-2xl">+</p>
                </Link>
              </div>
            </div>

            {/* 제목 */}
            <div className="flex flex-row items-center gap-8">
              <p className={labelClass}>제목</p>
              <input className="flex-1 px-3 py-3 w-[380px] bg-beige-600 border border-beige-700 rounded-lg" />
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
                    key={menu.id}
                    onClick={() => {
                      setChooseStatus(menu.id)
                      if (menu.id !== 0) setOpen(false)
                    }}
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
                disabled={chooseStatus !== 0}
                onClick={() => setOpen(!open)}
                className={`
                  flex-1 flex flex-row justify-between items-center w-[250px] px-5 py-3 bg-beige-600 border border-beige-700 rounded-lg
                  ${chooseStatus !== 0 ? 'opacity-50 cursor-not-allowed' : ''}
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

        <div className="w-full border border-[1px] border-beige-700 mt-[70px] mb-[30px]"></div>

        {/* 중간 */}
        <div className="flex flex-row w-full justify-between">
          {currentFields.map((field) => (
            <Fields
              key={field}
              label={Field[field].label}
              placeholder={Field[field].placeholder}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}