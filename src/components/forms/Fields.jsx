export function Fields({ label, placeholder='', value, onChange }) {
  return (
    <div className="flex flex-col items-center w-[230px] gap-3">
      <p className="text-xl">{label}</p>
      <input
        value={value}   // input에 있는 값
        onChange={onChange}   // 입력마다 실행되는 함수
        placeholder={placeholder}
        className="
          w-full py-4 text-center text-xl
          bg-beige-500 border border-beige-800 rounded-lg
        "
      />
    </div>
  )
}