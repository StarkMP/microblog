export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <nav>navigation</nav>
  
      {children}
    </main>
  )
}