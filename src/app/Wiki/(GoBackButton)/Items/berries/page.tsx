import Link from "next/link"

// Utils
import { Data } from "@/utils/types"
import { fetchItem } from "@/utils/functions"

// Components
import Berrie from './Berrie'

// Css
import styles from './berries.module.css'

interface SearchParams {
  offset: number
}

export default async function Berries(
  { searchParams }: { searchParams: SearchParams }
) {
  const { offset } = searchParams
  const berries = await fetchItem(`https://pokeapi.co/api/v2/berry/?offset=${offset * 10}&limit=10`)

  const navNumbers = Math.ceil(berries.count / 10)

  return (
    <div className='container'>
      <h1>Berries</h1>
      <div className={styles.items}>
        {berries.results.map(
          (e: Data, index: number) => (
            <Berrie key={index} url={e.url}/>
          )
        )}
      </div>
      <nav className={styles.navigation}>
        {berries.previous === null ? '' : <Link href={`/Wiki/Items/berries?offset=${offset - 1}`} className={styles.link}>{'<'}</Link>}
        {Array.from({length: navNumbers}, (_, index) => (
          <Link key={index} href={`/Wiki/Items/berries?offset=${index}`} className={styles.link}>
            {index + 1}
          </Link>
        ))}
        {berries.next === null ? '' : <Link href={`/Wiki/Items/berries?offset=${offset + 1 }`} className={styles.link}>{'>'}</Link>}
      </nav>
    </div>
  )
}
