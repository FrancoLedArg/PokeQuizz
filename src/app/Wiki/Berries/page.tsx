import { Suspense, lazy } from 'react'

// Components
import EachBerrie from './EachBerrie'

// Utils
import { fetchAllItems } from '@/utils/functions'

// Css
import styles from './Berries.module.css'

export default async function Berries() {
  const berries = await fetchAllItems('https://pokeapi.co/api/v2/berry/')

  return (
    <div className={styles.Berries}>
      <h1>This is the Berries page!</h1>
      <p>
        Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out Bulbapedia for greater detail.
      </p>
      <div className={styles.BerriesContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          {berries.map((e, index) =>
            (<EachBerrie key={e.name} url={`https://pokeapi.co/api/v2/berry/${index + 1}/`} />)
          )}
        </Suspense>
      </div>
    </div>
  )
}
