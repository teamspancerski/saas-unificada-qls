export function Card({ children }: any) {
  return <div className="border border-white/10 p-4 rounded-xl bg-black/40 backdrop-blur-md">{children}</div>
}

export function CardHeader({ children }: any) {
  return <div className="font-bold mb-2">{children}</div>
}

export function CardContent({ children }: any) {
  return <div>{children}</div>
}

export function CardTitle({ children }: any) {
  return <h2 className="text-xl font-semibold text-white">{children}</h2>
}
