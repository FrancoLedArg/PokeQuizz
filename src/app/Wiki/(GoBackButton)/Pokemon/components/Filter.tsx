'use client'
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Utils
import { Data } from "@/utils/types"

// Css
import styles from './filter.module.css'

interface FormData {
  name: string,
  type: string[]
}

export default function Filter() {
  const router = useRouter()
  const pathname = usePathname()
  const [types, setTypes] = useState([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: []
  })

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type/')
      .then(res => res.json())
      .then(data => setTypes(data.results))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: event.target.value,
      type: event.target.value !== '' ? [] : formData.type
    })
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setFormData(prevFormData => {
      if (checked) {
        return {
          ...prevFormData,
          type: [...prevFormData.type, value]
        }
      } else {
        return {
          ...prevFormData,
          type: prevFormData.type.filter(type => type !== value)
        }
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let params = []
    params.push(`offset=0`)
    if (formData.name !== '') {
      params.push(`name=${formData.name}`)
    }
    if (formData.type.length > 0) {
      params.push(formData.type.map((e: string) => `type=${e}`).join("&"))
    }

    router.replace(`${pathname}?${params.join("&")}`)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.name}>
        <input
          type="text"
          placeholder=" "
          autoComplete="off"
          className={styles.nameInput}
          onChange={handleChange}
        />
        <label className={styles.nameLabel}>Name</label>
      </div>

      <div className={styles.types}>
        {types.map((e: Data, index: number) => (
          <label key={index} className={styles.checkbox}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              value={e.name}
              onChange={handleCheck}
              disabled={formData.name !== ''}
              checked={formData.name === '' && formData.type.includes(e.name) ? true : false}
            />
            <span className={styles.checkboxSpan} >{e.name.toUpperCase()}</span>
          </label>
        ))}
      </div>

      <input type="submit" />
    </form>
  )
}
