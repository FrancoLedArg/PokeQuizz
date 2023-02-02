// Utils
import { fetchItem } from "@/utils/functions"

// Components
import MedicineCategory from "./MedicineCategory"

// Css
import styles from './Medicine.module.css'

interface Data {
  name: string,
  url: string
}

export default async function Medicine() {
  const medicine = await fetchItem('https://pokeapi.co/api/v2/item-pocket/2/')
  //console.log(medicine)
  return (
    <div>
      <h1 className={styles.Medicine}>Medicines</h1>
      <div className={styles.MedicineContainer}>
        {medicine.categories.map(
          (e: Data, index: number) => (
            <MedicineCategory key={index} url={e.url}/>
          )
        )}
      </div>
    </div>
  )
}
