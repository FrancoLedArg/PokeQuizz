import Link from "next/link"

// Utils
import { Data } from '@/utils/types'
import { fetchItem } from "@/utils/functions"
import { firstLetterUppercase } from "@/utils/functions"

const descriptions = [
  {
    name: 'misc',
    description: `
    This category is for miscellaneous items, the ones
    that don't fit in any other category.
    `
  },
  {
    name: 'medicine',
    description: `
    Medical items are used to restore HP / PP and cure various status conditions of a Pokémon.
    `
  },
  {
    name: 'machines',
    description: `
    A Technical Machine, or TM for short,
    is an item that can be used to teach a
    Pokémon a move.
    `
  },
  {
    name: 'pokeballs',
    description: `
    A Poké Ball is a round device used in the Pokémon
    series to catch and contain Pokémon.
    The Poké Ball also serves as a symbol for the series.
    `
  },
  {
    name: 'mail',
    description: `
    Mail in terms of the Pokémon world, is a held item given
    to a Pokémon that contains a message written by the Trainer.
    This message can then be given to other Trainers
    by trading Pokémon.
    `
  },
  {
    name: 'battle',
    description: `
    A battle item is an item given to a Pokémon
    during battle to enhance its stats. Like the stat-raising effects
    of moves like Howl and Agility, the stat rise is only temporary. These items cannot be used on a Pokémon
    if the specific stat is already raised by six levels.
    `
  },
  {
    name: 'key',
    description: `
    Key Items are special items that players can
    only obtain once, and tend to either aid the
    progression of the story or a specific task,
    allow access to new areas, give the player
    access to a certain mechanic, or affect the
    form changes of the player's Pokémon.
    They are mostly specific to the different
    games.
    `
  }
]

interface Params {
  pocket: string
}

export default async function Pocket(
  { params }: { params: Params}
) {
  const { pocket } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/item-pocket/${pocket.toLowerCase()}/`)

  return (
    <div className='container'>
      <h1>
        {pocket === 'Pokeballs' ? 'Pokéballs' : firstLetterUppercase(pocket)}
      </h1>
      <p>
        {descriptions.map(
         (e: {name: string, description: string}) => {
          if(e.name == pocket) {
            return e.description
          }
         }
        )}
      </p>
      <nav className='navigation'>
        {data.categories.map(
          (e: Data, index: number) => (
            <Link
              key={index}
              href={`/wiki/items/${pocket}/${e.name}?offset=0`}
              className='link'
            >
              {firstLetterUppercase(e.name.replace('-', ' '))}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
