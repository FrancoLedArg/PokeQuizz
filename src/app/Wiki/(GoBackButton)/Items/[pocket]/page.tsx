import Link from "next/link"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from '@/utils/types'

// Css
import styles from './pocket.module.css'

interface params {
  pocket: string
}

export default async function Pocket(
  { params }: { params: params}
) {
  const { pocket } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/item-pocket/${pocket}/`)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pocket}</h1>
      <nav className={styles.navigation}>
        {data.categories.map(
          (e: Data, index: number) => (
            <Link
              key={index}
              href={`/Wiki/Items/medicine/${e.name}`}
              className={styles.link}
            >
              {e.name}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
