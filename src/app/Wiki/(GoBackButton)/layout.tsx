// Components
import Breadcrum from './Breadcrum'

// Css
import styles from '../wiki.module.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className={styles.container}>
      <Breadcrum />
      {children}
    </div>
  )
}
