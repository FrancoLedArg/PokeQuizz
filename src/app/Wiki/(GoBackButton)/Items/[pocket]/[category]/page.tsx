import Link from "next/link"

// Components
import Item from "./Item"

// Utils
import { Data } from "@/utils/types"
import { fetchItem, firstLetterUppercase } from "@/utils/functions"

// Css
import styles from './category.module.css'

// Define the necesary interfaces
interface Params {
  category: string
}

interface SearhcParams {
  limit: number,
  offset: number
}

// The main component that returns the UI
export default async function Pocket(
  { params, searchParams }: { params: Params, searchParams: SearhcParams}
) {
  // Destructure the category from the params object
  const { category } = params

  // Destructure the offset from the searchParams object
  const { offset } = searchParams

  // Fetch the item data using the `fetchItem` function
  const data = await fetchItem(`https://pokeapi.co/api/v2/item-category/${category}/`)

  // Function to chunk the data array into smaller arrays of 10 elements each
  function chunkData (arr: Array<Data>) {
    // Array to hold the chunks of data
    const chunks = []
    // Array to hold each chunk
    let chunk = []

    // Loop through the input array
    for(let i = 0; i < arr.length; i++) {
      // Add the current element to the chunk
      chunk.push(arr[i])
      // Check if the chunk has 10 elements or if it's the last element of the input array
      if(chunk.length === 10 || i === arr.length - 1) {
        // Add the chunk to the chunks array
        chunks.push(chunk)
        // Reset the chunk array for the next iteration
        chunk = []
      }
    }

    // Return the chunks array
    return chunks
  }

  // Call the chunkData function to get the chunks of data
  const chunks = chunkData(data.items)

  // Return the UI
  return (
    <div className='container'>
      <h1>{firstLetterUppercase(category.replace('-', ' '))}</h1>
      <div className={styles.items}>
        {chunks[offset] ?
          chunks[offset].map(
            (e: Data, index: number) => (
              <Item
                key={index}
                data={e}
              />
            )
          ) : 'Nothing'
        }
      </div>
      <nav className={styles.navigation}>
        {/* If offset - 1 equals -1, then don't render the Link component */}
        {offset - 1 === -1 ? '' : <Link href={`/Wiki/Items/${data.pocket.name}/${data.name}?offset=${offset - 1}`} className={styles.link}>{'<'}</Link>}
        {/* Map through the chunks and render the Link component with the corresponding index + 1 */}
        {chunks.map((chunk, index) => (
            <Link key={index} href={`/Wiki/Items/${data.pocket.name}/${data.name}?offset=${index}`} className={styles.link}>{index + 1}</Link>
        ))}
        {/* If offset + 1 is greater than the length of the chunks, then don't render the Link component */}
        {offset + 1 >= chunks.length ? '' : <Link href={`/Wiki/Items/${data.pocket.name}/${data.name}?offset=${offset + 1}`} className={styles.link}>{'>'}</Link>}
      </nav>
    </div>
  )
}
