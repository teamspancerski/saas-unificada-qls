export function Button({ children, ...props }: any) {
  return (
    <button {...props} className="px-4 py-2 bg-emerald-600 text-white rounded">
      {children}
    </button>
  )
}
