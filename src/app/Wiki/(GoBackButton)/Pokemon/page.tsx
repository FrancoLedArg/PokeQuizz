import Link from 'next/link'

// Utils
import { Data } from '@/utils/types'
import { fetchItem } from '@/utils/functions'

// Css
import styles from './pokemon.module.css'

// Components
import Pokemon from './components/Pokemon'

interface SearchParams {
  offset: string,
  name: string,
  type: string | string[],
}

interface TypePokemon {
  pokemon: Data,
  slot: number
}

function chunkData (arr: Array<Data>, offset: number) {
  const chunk = []
  for(let i = offset; i < arr.length; i++) {
    chunk.push(arr[i])
    if(chunk.length === 20) {
      break
    }
  }
  return chunk
}

async function fetchPokemonArray (url: string, searchParams: SearchParams) {
  const { offset, name, type } = searchParams
  let data

  if(offset !== undefined) {
    data = await fetchItem(`${url}/pokemon/?offset=${offset}&limit=20`)
  }

  if(name !== undefined) {
    data = [
      {
        'name':`${name.toLowerCase()}`,
        'url':`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`
      }
    ]
  }
  if (type !== undefined) {
      if (Array.isArray(type)) {
        let array: TypePokemon[] = []
        let foundResults = false

        for (let i = 0; i < type.length; i++) {
          const e = type[i]

          let { pokemon } = await fetchItem(`${url}/type/${e}`)

          if (i === 0) {
            array = pokemon
          } else {
            let newArray = pokemon.filter(
              (item1: TypePokemon) => array.some(
                item2 => item1.pokemon.name === item2.pokemon.name
              )
            )
            array = newArray
          }

          if (array.length === 0) {
            foundResults = false
            break
          } else {
            foundResults = true
          }
        }

        if (foundResults) {
          data = array.map(({ pokemon }) => pokemon)
        } else {
          data = 'No pokemon found for the specified type(s).'
        }
    } else if (typeof type === 'string') {
      let { pokemon } = await fetchItem(`${url}/type/${type}/`)
      data = pokemon.map(({ pokemon } : { pokemon: Data }) => pokemon)
    }
  }

  if( data.next || data.previous || typeof data === 'string') {
    return data
  } else{
    let array = chunkData(data, parseInt(offset))
    data = {
      count: data.length,
      results: array
    }
    return data
  }
}

export default async function Page(
  { searchParams }: { searchParams: SearchParams }
) {
  const { offset, type } = searchParams
  const pokemon = await fetchPokemonArray('https://pokeapi.co/api/v2/', searchParams)

  return (
    <div className='container'>
      <div className='container'>
        {pokemon.results.map((e: Data, index: number) => <Pokemon key={index} url={e.url}/>)}
      </div>
      {
        pokemon.next || pokemon.previous ?
        <nav>
          {pokemon.previous ? <Link href={`/wiki/pokemon?offset=${parseInt(offset) - 20}`}>{'<'}</Link> : null}
          {Array.from({length: Math.ceil(pokemon.count / 20)}, (_, index) => (
          <Link key={index} href={`/wiki/pokemon?offset=${(index + 1) * 20}`} className={styles.link}>
            {index + 1}
          </Link>
          ))
          }
          {pokemon.next ? <Link href={`/wiki/pokemon?offset=${parseInt(offset) + 20}`}>{'>'}</Link> : null}
        </nav>
        :
        <nav className={styles.navigation}>
          {parseInt(offset) > 0 ?
            <Link
              href={
                `/wiki/pokemon?offset=${parseInt(offset) - 20}&${Array.isArray(type) ?
                    type
                      .map((e: string) => `type=?${e}`)
                      .join('&')
                : `type=${type}`}`
              }
              className={styles.link}
            >
              {'<'}
            </Link>
          : null}
          {Array.from({length: Math.ceil(pokemon.count / 20)}, (_, index) => (
          <Link key={index} href={`/wiki/pokemon?offset=${(index + 1) * 20}`} className={styles.link}>
            {index + 1}
          </Link>
          ))
          }
          {offset + 20 <= pokemon.count ?
            <Link
            href={
              `/wiki/pokemon?offset=${parseInt(offset) + 20}&${Array.isArray(type) ?
                  type
                    .map((e: string) => `type=${e}`)
                    .join('&')
              : `type=${type}`}`
            }
              className={styles.link}
            >
              {'>'}
            </Link>
          : null}
        </nav>

      }
    </div>
  )
}

