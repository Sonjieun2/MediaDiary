export default function Layout({ children, className="" }) {
  return (
    <div className={`p-[80px] ${className}`}>
      {children}
    </div>
  )
}