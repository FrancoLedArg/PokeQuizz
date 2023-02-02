import Link from "next/link"

// Css
import styles from '@/styles/Header.module.css'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Wiki',
  route: '/Wiki'
},{
  label: 'Pokedex',
  route: '/Pokedex'
}, {
  label: 'Leaderboard',
  route: '/Leaderboard'
}]

function Header() {
  return (
    <ul className={styles.Header}>
      {links.map(({ label, route }) => (
        <li key={route}>
          <Link href={route}>
            {label}
          </Link>
        </li>
      ))}
      <li>
        <Link href='/Profile'>Profile</Link>
      </li>
    </ul>
  )
}

export default Header
