// Components
import EachMedicineItem from './EachMedicineItem'

// Utils
import { fetchItem } from "@/utils/functions"

// Css
import styles from './Medicine.module.css'

interface Data {
  name: string,
  url: string
}

export default async function Medicine(
  { url }: { url: string }
) {
  const medicines = await fetchItem(url)

  return (
    <div className={styles.MedicineCategory}>
      <h1 className={styles.CategoryName}>{medicines.name}</h1>
      <div className={styles.MedicineCategoryContainer}>
        {medicines.items.map(
          (e: Data, index: number) => (<EachMedicineItem key={index} url={e.url} />)
        )}
      </div>
    </div>
  )
}
