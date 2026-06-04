import React, { useState, useRef, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

export default function Dropdown({
  options = [], placeholder, onSelect,
  className = '', buttonClassName = '', liClassName = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const dropdownRef = useRef(null)

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
              onClick={() => handleSelect(option)}
              className={`
                px-4 py-2 text-lg text-beige-800 hover:bg-beige-600 cursor-pointer rounded-lg
                ${liClassName}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}