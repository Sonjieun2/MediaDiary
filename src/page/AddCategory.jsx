import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/common/Layout'
import { Field } from '../components/forms/FieldConfigs'

export default function AddCategory() {
  const [checked, setChecked] = useState([])
  const labels = Object.values(Field).map(field => field.label)

  return (
    <Layout className="relative px-[350px]">
      <p className="w-full text-left text-3xl font-bold mb-[50px]">카테고리 추가</p>

      <div className="flex flex-col items-center jusitfy-center px-[100px] py-[50px] bg-beige-400 rounded-lg">
        {/* 카테고리명 작성 */}
        <input 
          className="flex-1 text-center items-center px-3 py-5 w-[380px] bg-beige-600 border border-beige-700 rounded-lg"
          placeholder="카테고리명"
        />

        <div className="w-full border border-[1px] border-beige-800 my-14" />

        <div className="grid grid-cols-3 gap-5 w-full px-[20px] pb-8">
          {/* 정보 입력란 선택 */}
          {labels.map((items) => (
            <label
              key={items}
              className="flex flex-row gap-8 px-[30px] py-5 w-full border border-beige-700 rounded-md"
            >
              <input
                type="checkbox"
                checked={checked.includes(items)}
                disabled={
                  checked.length == 4 &&
                  !checked.includes(items)
                }
                onChange={() => {
                  if (checked.includes(items)) {
                    setChecked(checked.filter(item => item !== items))
                  }
                  else {
                    setChecked([...checked, items])
                  }
                }}
                className="
                  aspect-square w-7 bg-white border border-beige-800 rounded-md
                  accent-beige-700 checked:border-transparent focus:outline-none cursor-pointer
                "
              />
              <p className="text-2xl">{items}</p>
            </label>
          ))}
        </div>
        <p className={`text-sm text-burgundy ${checked.length == 4 ? 'flex' : 'hidden'}`}>
          4개까지만 선택 가능합니다.
        </p>
      </div>

      {/* 저장, 취소 버튼 */}
      <div className="flex flex-row items-center justify-center gap-5 pt-10 w-full">
        <Link
          to='/upload'
          className="w-1/4 px-10 py-3 bg-beige-700 text-white rounded-lg text-2xl"
        >
          <p className="text-center">취소</p>
        </Link>
        <Link
          to='/upload'
          className="w-1/4 items px-10 py-3 bg-beige-500 border border-beige-700 rounded-lg text-2xl"
        >
          <p className="text-center">추가</p>
        </Link>
      </div>
    </Layout>
  )
}