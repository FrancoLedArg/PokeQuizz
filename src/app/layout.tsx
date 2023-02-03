import Link from 'next/link'

// Css
import './globals.css'
import styles from './Home.module.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <header className={styles.Header}>
          <div className={styles.Logo}>Logo</div>
          <nav className={styles.Navigation}>
            {links.map((e, index) => (
              <Link key={index} href={e.route} className={styles.Link}>
                {e.label}
              </Link>
            ))}
              <Link href='/Profile' className={styles.Link}>Profile</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
