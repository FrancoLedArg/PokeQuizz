import Link from "next/link"

import styles from '../Wiki.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.WikiLayout}>
      <Link href={'/Wiki'}>⬅</Link>
      {children}
    </div>
  )
}
