import Link from 'next/link'

// Utils
import { Data } from '@/utils/types'
import { fetchItem, firstLetterUppercase } from '@/utils/functions'

export default async function Items() {
  const pockets = await fetchItem('https://pokeapi.co/api/v2/item-pocket/')

  return (
    <div className='container'>
      <h1>Items</h1>
      <p>
      An item is an object in the Pokémon games which the player can pick up, keep in their Bag, and use in some manner. They have various uses, including healing, powering up, helping one to catch Pokémon, or accessing new areas.
      </p>
      <nav className='navigation'>
        {pockets.results.map((e: Data, index: number) => {
          if(e.name == 'berries') {
            return null
          } else {
            const name = firstLetterUppercase(e.name)
            return(
              <Link
                key={index}
                href={`/wiki/items/${e.name}`}
                className='link'
              >
                {name === 'Pokeballs' ? 'Pokéballs' : name}
              </Link>
            )
          }
        })}
        <Link href='/wiki/items/berries' className='link'>
          Berries
        </Link>
      </nav>
    </div>
  )
}
