import { useState } from 'react'

export default function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-200">
      <div className="flex flex-col justify-center items-center gap-10 bg-white border border-beige-800 rounded-lg shadow-lg w-1/4 p-10 text-xl">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-beige-700 text-white px-5 py-2 rounded-lg">
          닫기
        </button>
      </div>
    </div>
  )
}