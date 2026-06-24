import { useState, useEffect, useRef } from 'react'
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

export default function WriteEditor({ onStoryChange, onReviewChange }) {
  const imageRef = useRef(null)
  const [activeEditor, setActiveEditor] = useState(null)
  const [, forceUpdate] = useState({})

  const storyEditor = useEditor({
    extensions: [
      StarterKit, TextStyle, Color, Image,
      TextAlign.configure({types: ['heading', 'paragraph']})
    ],
    content: '<p>줄거리를 입력하세요.</p>'
  })

  const reviewEditor = useEditor({
    extensions: [
      StarterKit, TextStyle, Color, Image,
      TextAlign.configure({types: ['heading', 'paragraph']})
    ],
    content: '<p>감상문을 입력하세요.</p>'
  })

  if (!storyEditor || !reviewEditor) return null

  // 이미지 추가
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const url = URL.createObjectURL(file)
    activeEditor?.chain().focus().setImage({src:url}).run()
  }

  // 툴바 상태 관리
  useEffect(() => {
    if (!activeEditor) return

    const update = () => {
      forceUpdate({})
    }

    activeEditor.on('selectionUpdate', update)
    activeEditor.on('transaction', update)

    return () => {
      activeEditor.off('selectionUpdate', update)
      activeEditor.off('transaction', update)
    }
  }, [activeEditor])

  // 줄거리 저장
  useEffect(() => {
    if (!storyEditor) return
    
    const update = ({ editor }) => {
      onStoryChange?.(editor.getHTML())
    }

    storyEditor.on('update', update)

    return () => {
      storyEditor.off('update', update)
    }
  }, [storyEditor, onStoryChange])

  // 감상문 저장
  useEffect(() => {
    if (!reviewEditor) return

    const update = ({ editor }) => {
      onReviewChange?.(editor.getHTML())
    }

    reviewEditor.on('update', update)

    return () => {
      reviewEditor.off('update', update)
    }
  }, [reviewEditor, onReviewChange])

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 툴바 */}
      <div className="
        flex gap-2 p-4 bg-beige-500 border border-beige-700 rounded-lg
        sticky top-[60px] z-50
      ">
        {/* 굵게 */}
        <button
          onClick={() => activeEditor?.chain().focus().toggleBold().run()}
          className={`p-3 rounded ${activeEditor?.isActive('bold') ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaBold />
        </button>

        {/* 기울임 */}
        <button
          onClick={() => activeEditor?.chain().focus().toggleItalic().run()}
          className={`p-3 rounded ${activeEditor?.isActive('italic') ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaItalic />
        </button>

        {/* 제목 */}
        <button
          onClick={() => activeEditor?.chain().focus().toggleHeading({level:1}).run()}
          className={`p-3 rounded ${activeEditor?.isActive('heading', {level:1}) ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaHeading />
        </button>

        {/* 왼쪽 정렬 */}
        <button
          onClick={() => activeEditor?.chain().focus().setTextAlign('left').run()}
          className={`p-3 border rounded ${activeEditor?.isActive({textAlign: 'left'}) ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaAlignLeft />
        </button>

        {/* 가운데 정렬 */}
        <button
          onClick={() => activeEditor?.chain().focus().setTextAlign('center').run()}
          className={`p-3 border rounded ${activeEditor?.isActive({textAlign: 'center'}) ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaAlignCenter />
        </button>

        {/* 오른쪽 정렬 */}
        <button
          onClick={() => activeEditor?.chain().focus().setTextAlign('right').run()}
          className={`p-3 border rounded ${activeEditor?.isActive({textAlign: 'right'}) ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaAlignRight />
        </button>

        {/* 인용문 */}
        <button
          onClick={() => activeEditor?.chain().focus().toggleBlockquote().run()}
          className={`p-3 border rounded ${activeEditor?.isActive('blockquote') ? 'bg-beige-700 text-white' : 'bg-white'}`}
        >
          <FaQuoteLeft />
        </button>

        {/* 이미지 추가 */}
        <button
          onClick={() => imageRef.current.click()}
          className="p-3 border bg-white rounded hover:bg-beige-700 hover:text-white transition-colors"
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
        editor={storyEditor}
        onClick={() => setActiveEditor(storyEditor)}
        className="
          min-h-[250px] border border-beige-700 rounded-lg p-5 bg-beige-500 outline-none
          [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none
          [&_h1]:text-3xl [&_h1]:font-bold
          [&_strong]:font-bold
          [&_em]:italic
          [&_blockquote]:border-l-4 [&_blockquote]:border-beige-700 [&_blockquote]:pl-4 [&_blockquote]:text-gray-700
        "
      />

      <EditorContent
        editor={reviewEditor}
        onClick={() => setActiveEditor(reviewEditor)}
        className="
          min-h-[250px] border border-beige-700 rounded-lg p-5 bg-beige-500 outline-none
          [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none
          [&_h1]:text-3xl [&_h1]:font-bold
          [&_strong]:font-bold
          [&_em]:italic
          [&_blockquote]:border-l-4 [&_blockquote]:border-beige-700 [&_blockquote]:pl-4 [&_blockquote]:text-gray-700
        "
      />
    </div>
  )
}