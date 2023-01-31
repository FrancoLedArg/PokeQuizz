import { Suspense } from 'react'

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
      <h1>Berries</h1>
      <p>Berries are small fruits that grow on Berry trees.</p>
      <p>They are held items and ingredients for foods like Pokéblocks and Poffins</p>
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
