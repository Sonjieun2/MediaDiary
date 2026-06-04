import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoGrid } from 'react-icons/io5'
import { TiThMenu} from 'react-icons/ti'
import Layout from '../components/common/Layout'
import Dropdown from '../components/common/Dropdown'
import CardMenu from '../components/CardMenu'
import ListMenu from '../components/ListMenu'

const cardMenu = [
  {title: '기록장', id: 0},
  {title: '캘린더', id: 1},
  {title: '통계', id: 2},
]

const styleMenu = [
  {title: '카드형', id: 'card'},
  {title: '리스트형', id: 'list'},
]

export default function Main() {
  const [clicked, setClicked] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState("card")
  const [chooseMenu, setChooseMenu] = useState(true)

  const options = [
    { label: '전체', value: 'all' },
    { label: '시청중', value: 'watching' },
    { label: '시청완료', value: 'completed' },
  ]

  return (
    <div className="relative bg-beige-500 h-screen">
      {/* 등록 버튼 */}
      <Link
        to="/upload"
        className="absolute top-[65px] right-[100px] px-16 py-3 bg-beige-700 text-xl text-white font-bold rounded-lg"
      >
        <p>등록하기</p>
      </Link>

      <Layout className="flex-col">
        {/* 상단 메뉴 */}
        <div className="flex flex-row">
          {cardMenu.map((menu) => (
            <div
              onClick={() => setClicked(menu.id)}
              className={`
                  flex items-center px-[30px] py-2 rounded-t-lg
                  ${clicked === menu.id ? 'bg-beige-400' : 'bg-beige-600 border border-beige-700'}
                `}
            >
              <span className="text-beige-800">{menu.title}</span>
            </div>
          ))}
        </div>

        {/* 메인 구역 */}
        <div className="flex flex-col w-full px-[50px] py-[40px] bg-beige-400 rounded-tr-lg rounded-b-lg">
          {/* 카테고리 선택 버튼 */}
          <div className="flex flex-row justify-between">
            <Dropdown
              options={options}
              placeholder="전체"
              onSelect={(option) => {
                setSelectedOption(option)
              }}
              className="w-[150px] bg-white"
              buttonClassName="py-2"
              liClassName="w-[150px]"
            />

            {/* 스타일 메뉴 */}
            <div className="relative flex w-[200px] border border-beige-800 rounded-lg overflow-hidden">
              {/* 움직이는 배경 */}
              <div
                className={`
                    absolute top-0 h-full w-1/2 bg-beige-700 rounded-lg
                    transition-transform duration-300 ease-in-out
                    ${selectedStyle === 'card' ? 'translate-x-0' : 'translate-x-full'}
                  `}
              />
              {styleMenu.map((style) => (
                <button
                  onClick={() => {
                    setSelectedStyle(style.id)
                    setChooseMenu(!chooseMenu)
                  }}
                  className={`
                      relative z-10 flex items-center justify-center text-2xl rounded-lg px-8 py-1 w-1/2
                      transition-colors duration-300
                      ${selectedStyle === style.id ? 'text-beige-400' : 'text-beige-700'}
                    `}
                >
                  {style.title === '카드형' ? <IoGrid className="shrink-0" /> : <TiThMenu className="shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="w-full my-9 border-[1px] border-beige-700" />

          {chooseMenu ? <CardMenu /> : <ListMenu />}
        </div>
      </Layout>
    </div>
  )
}