import { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { TextAlign } from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'

import { 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaQuoteLeft, FaImage,
  FaBold, FaItalic, FaHeading
} from 'react-icons/fa'

export default function WriteEditor() {
  const imageRef = useRef(null)
  const editor = useEditor({
    extensions: [
      StarterKit, TextStyle, Color, Image,
      TextAlign.configure({types: ['heading', 'paragraph']})
    ],
    content: '<p>줄거리를 입력하세요.</p>',
  })

  if (!editor) return null

  // 이미지 추가
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const url = URL.createObjectURL(file)
    editor.chain().focus().setImage({src:url}).run()
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 툴바 */}
      <div className="flex gap-2 p-2 bg-beige-500 border border-beige-700 rounded-lg">
        {/* 굵게 */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaBold />
        </button>

        {/* 기울임 */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaItalic />
        </button>

        {/* 제목 */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({level:1}).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', {level:1}) ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaHeading />
        </button>

        {/* 왼쪽 정렬 */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="px-3 py-1 border rounded"
        >
          <FaAlignLeft />
        </button>

        {/* 가운데 정렬 */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="px-3 py-1 border rounded"
        >
          <FaAlignCenter />
        </button>

        {/* 오른쪽 정렬 */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="px-3 py-1 border rounded"
        >
          <FaAlignRight />
        </button>

        {/* 인용문 */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-3 py-1 border rounded"
        >
          <FaQuoteLeft />
        </button>

        {/* 이미지 추가 */}
        <button
          onClick={() => imageRef.current.click()}
          className="px-3 py-1 border rounded"
        >
          <FaImage />
        </button>
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImage}
        />
      </div>

      {/* 에디터 */}
      <EditorContent
        editor={editor}
        className="
          min-h-[250px] border border-beige-700 rounded-lg p-5 bg-beige-600 outline-none
          [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none
          [&_h1]:text-3xl [&_h1]:font-bold
          [&_strong]:font-bold
          [&_em]:italic
        "
      />

      {/* 저장 확인용 
      <button
        onClick={() => {
          const html = editor.getHTML()
          console.log(html)
        }}
        className="self-end px-5 py-2 bg-beige-700 text-white rounded-lg"
      >
        저장
      </button>
      */}
    </div>
  )
}