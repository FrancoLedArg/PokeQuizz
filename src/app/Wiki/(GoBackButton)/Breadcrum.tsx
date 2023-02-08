'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Css
import styles from '../wiki.module.css'

export default function Breadcrum() {
  const pathname = usePathname()

  const newRoute = (str: string) => {
    const arr = str.split('/')
    arr.pop()
    return arr.join('/')
  }

  const route = newRoute(pathname)

  const newBreadcrum = (str: string) => {
    const arr = str.split('/')
    return arr.join(' > ')
  }

  const breadcrum = newBreadcrum(pathname)

  return (
    <nav className={styles.breadcrum}>
      <Link href={`.${route}`} className={styles.arrow}>
        {'<'}
      </Link>
      <span style={{
        fontSize: '1rem',
      }}>
        {breadcrum}
      </span>
    </nav>
  )
}
