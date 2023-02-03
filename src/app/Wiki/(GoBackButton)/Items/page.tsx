import Link from 'next/link'

// Utils
import { fetchAllItems, firstLetterUppercase } from '@/utils/functions'

// Css
import styles from './Items.module.css'

export default async function Items() {
  const pockets = await fetchAllItems('https://pokeapi.co/api/v2/item-pocket/')

  return (
    <div className={styles.Items}>
      <h1>Items</h1>
      <p>
      An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
      </p>
      <div className={styles.ItemPocketsContainer}>
        {pockets.map((e, index) => {
          const name = firstLetterUppercase(e.name)
          return(
            <Link
              key={index}
              href={`/Wiki/Items/${e.name}`}
              className={styles.ItemPocketsLink}
            >
              {name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
