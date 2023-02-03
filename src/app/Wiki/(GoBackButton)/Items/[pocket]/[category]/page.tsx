
// Components
import Item from "./Item"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

// Css
import styles from './category.module.css'

interface params {
  category: string
}

export default async function Pocket(
  { params }: { params: params}
) {
  const { category } = params

  const data = await fetchItem(`https://pokeapi.co/api/v2/item-category/${category}/`)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category}</h1>
      <div className={styles.itemsContainer}>
        {data.items.map(
          (e: Data, index: number) => (
            <Item
              key={index}
              data={e}
            />
          )
        )}
      </div>
    </div>
  )
}
