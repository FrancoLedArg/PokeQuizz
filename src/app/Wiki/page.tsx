import Link from 'next/link'

// Css
import styles from './Wiki.module.css'

export default function Wiki() {
  const links = [{
    label: 'Berries',
    route: '/Wiki/Berries'
  }, {
    label: 'Contests',
    route: '/Wiki/Contests'
  }, {
    label: 'Encounters',
    route: '/Wiki/Encounters'
  }, {
    label: 'Evolution',
    route: '/Wiki/Evolution'
  }, {
    label: 'Games',
    route: '/Wiki/Games'
  }, {
    label: 'Items',
    route: '/Wiki/Items'
  }, {
    label: 'Locations',
    route: '/Wiki/Locations'
  }, {
    label: 'Machines',
    route: '/Wiki/Machines'
  }, {
    label: 'Moves',
    route: '/Wiki/Moves'
  }, {
    label: 'Pokemon',
    route: '/Wiki/Pokemon'
  }]

  return (
    <div className={styles.Wiki}>
      <h1>Esta es la Wiki!</h1>
      <ul className={styles.WikiContainer}>
      {links.map(({ label, route }) => (
        <li key={route}>
          <Link href={route}>
            {label}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  )
}
