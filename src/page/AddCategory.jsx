import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/common/Layout'
import { Field } from '../components/forms/FieldConfigs'
import { useCategory } from '../context/CategoryContext'
import Modal from '../components/common/Modal'

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState('')
  const [checked, setChecked] = useState([])
  const navigate = useNavigate()
  const fields = Object.entries(Field)
  const [modalMessage, setModalMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const { category, setCategory } = useCategory()

  const inputHandler = (e) => {
    setCategoryName(e.target.value)
  }

  const addCategory = () => {
    if (categoryName === '') {
      setModalMessage('카테고리 이름을 입력하세요.')
      setOpenModal(true)
      return
    }

    if (checked.length === 0) {
      setModalMessage('최소 1개 이상의 항목을 선택해주세요.')
      setOpenModal(true)
      return
    }

    const newCategory = { label: categoryName, fields: checked }

    setCategory([ ...category, newCategory ])
    
    navigate('/upload')
  }

  return (
    <Layout className="relative px-[350px]">
      <p className="w-full text-left text-3xl font-bold mb-[50px]">카테고리 추가</p>

      <div className="flex flex-col items-center jusitfy-center px-[100px] py-[50px] bg-beige-400 rounded-lg">
        {/* 카테고리명 작성 */}
        <input
          value={categoryName}
          onChange={inputHandler}
          className="flex-1 text-center text-xl items-center px-3 py-5 w-[380px] bg-beige-600 border border-beige-700 rounded-lg"
          placeholder="카테고리명"
        />

        <div className="w-full border border-[1px] border-beige-800 my-14" />

        <div className="grid grid-cols-3 gap-5 w-full px-[20px] pb-8">
          {/* 정보 입력란 선택 */}
          {fields.map(([key, items]) => (
            <label
              key={key}
              className="flex flex-row gap-8 px-[30px] py-5 w-full border border-beige-700 rounded-md"
            >
              <input
                type="checkbox"
                checked={checked.includes(key)}
                disabled={
                  checked.length == 4 &&
                  !checked.includes(key)
                }
                onChange={() => {
                  if (checked.includes(key)) {
                    setChecked(checked.filter(item => item !== key))
                  }
                  else {
                    setChecked([...checked, key])
                  }
                }}
                className="
                  aspect-square w-7 bg-white border border-beige-800 rounded-md
                  accent-beige-700 checked:border-transparent focus:outline-none cursor-pointer
                "
              />
              <p className="text-2xl">{items.label}</p>
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
        <button
          onClick={addCategory}
          className="w-1/4 items px-10 py-3 bg-beige-500 border border-beige-700 rounded-lg text-2xl"
        >
          <p className="text-center">추가</p>
          {console.log(categoryName)}
        </button>
      </div>

      {openModal && (
        <Modal
          message={modalMessage}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Layout>
  )
}