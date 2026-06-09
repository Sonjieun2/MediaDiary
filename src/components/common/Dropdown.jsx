import React, { useState, useRef, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function Dropdown({
  options = [], placeholder, onSelect, onDelete,
  className = '', buttonClassName = '', liClassName = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const dropdownRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(null)

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
    onSelect?.(option)
  }

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex flex-row items-center justify-between w-full px-4 rounded-lg
          border border-beige-800 text-md font-medium text-beige-800
          ${buttonClassName}
        `}
      >
        <p>{selected?.label || placeholder}</p>
        <RiArrowDropDownLine className="text-3xl text-beige-800" />
      </button>

      {isOpen && (
        <ul className="absolute w-full z-10 mt-1 bg-white shadow-md rounded-lg">
          {options.map((option) => (
            <li
              key={option.id}
              className={`
                px-4 py-2 text-lg text-beige-800 hover:bg-beige-600 cursor-pointer rounded-lg
                ${liClassName}
              `}
            >
              <div className="flex flex-row justify-between">
                <span
                  onClick={() => handleSelect(option)}
                  className="flex-1 cursor-pointer"
                >
                  {option.label}
                </span>

                {option.custom && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen(
                          menuOpen === option.label ? null : option.label
                        )
                      }}
                    >
                      <BsThreeDotsVertical />
                    </button>

                    {menuOpen === option.label && (
                      <div className="absolute w-[90px] z-50 left-3 top-3 mt-1 bg-white border border-beige-800 rounded-md shadow-md">
                        <button
                          onClick={(e) => {
                            e.stopPropagation
                            onDelete?.(option)
                            setMenuOpen(null)
                          }}
                          className="px-4 py-2 w-full hover:bg-gray-100"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}