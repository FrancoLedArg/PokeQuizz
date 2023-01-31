import Image from 'next/image'

// Css
import styles from './Berries.module.css'

// Type Berrie data structure
interface Berrie {
  id: number,
  name: string,
  flavors: {
    spicy: number,
    dry: number,
    sweet: number,
    bitter: number,
    sour: number
  },
  size: number,
  firmness: string,
  description: string,
  sprite: string
}

// The fetchBerrie function fetches data for a single berrie
async function fetchBerrie (url: string) {
  // Initialize an empty object with the Berrie type
  let berrie = {} as Berrie
  try {
    // Fetch the first piece of data
    const res = await fetch(url)
    const data1 = await res.json()

    // Fetch the second piece of data using the URL from the first fetch
    const res2 = await fetch(data1.item.url)
    const data2 = await res2.json()

    // Assign the data to the berrie object
    berrie = {
      id: data1.id,
      name: data1.name,
      flavors: {
        spicy: data1.flavors[0].potency,
        dry: data1.flavors[1].potency,
        sweet: data1.flavors[2].potency,
        bitter: data1.flavors[3].potency,
        sour: data1.flavors[4].potency
      },
      size: data1.size,
      firmness: data1.firmness.name,
      // This is tricky
      description: data2.effect_entries.map(
        // First destructure the effect_entries array to exctract short_effect
        // Then use join to turn the resultant array into a string
        ({ short_effect }: { short_effect: string }) => short_effect).join(''),
      sprite: data2.sprites.default
    }
  } catch (error) {
    // Log the error if there is one
    console.error(error)
  }
  // Return the berrie object
  return berrie
}

export default async function EachBerrie(
  { url }: { url: string }
) {
  // Fetch the berrie data
  const berrie = await fetchBerrie(url)

  // A helper function to uppercase the first letter of a word
  const firstLetterUppercase = (word: string) => {
    const firstLetter = word[0].toUpperCase()
    const restOfWord = word.slice(1)
    const uppercaseFirstLetter = firstLetter + restOfWord
    return uppercaseFirstLetter
  }

  // Uppercase the first letter of the berrie name and firmness
  const name = firstLetterUppercase(berrie.name)
  const firmness = firstLetterUppercase(berrie.firmness)

  return (
    <div className={styles.EachBerrie}>
      <div className={styles.Image}>
        <Image
          src={berrie.sprite}
          alt={berrie.name}
          width={30}
          height={30}
        />
      </div>
      <h3 className={styles.Name}>
        No. {berrie.id}
        <span>{name}</span>
      </h3>
      <div className={styles.SF}>
        <h3>SIZE</h3>
        <span>/</span>
        <h3 className={styles.SFN}>{berrie.size}</h3>
        <h3>FIRM</h3>
        <span>/</span>
        <h3 className={styles.SFN}>{firmness}</h3>
      </div>
      <div className={styles.Flavors}>
        <span className={`${styles.Spicy} ${berrie.flavors.spicy > 0 ? styles.isFlavor : ''}`}>SPICY</span>
        <span className={`${styles.Sour} ${berrie.flavors.sour > 0 ? styles.isFlavor : ''}`}>SOUR</span>
        <span className={`${styles.Dry} ${berrie.flavors.dry > 0 ? styles.isFlavor : ''}`}>DRY</span>
        <span className={`${styles.Bitter} ${berrie.flavors.bitter > 0 ? styles.isFlavor : ''}`}>BITTER</span>
        <span className={`${styles.Sweet} ${berrie.flavors.sweet > 0 ? styles.isFlavor : ''}`}>SWEET</span>
      </div>
      <div className={styles.Description}>{berrie.description}</div>
    </div>
  )
}
