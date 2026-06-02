export default function Layout({ children, className="" }) {
  return (
    <div className={`p-[100px] ${className}`}>
      {children}
    </div>
  )
}