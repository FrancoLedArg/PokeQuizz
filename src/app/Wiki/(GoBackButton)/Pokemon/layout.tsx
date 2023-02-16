// Components
import Filter from './components/Filter'

export default function Layout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Pokémon</h1>
      <Filter />
      <div>
        {children}
      </div>
    </div>
  )
}
