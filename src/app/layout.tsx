import Link from 'next/link'

// Css
import './globals.css'
import styles from './home.module.css'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Wiki',
  route: '/wiki'
},{
  label: 'Pokedex',
  route: '/pokedex'
}, {
  label: 'Leaderboard',
  route: '/leaderboard'
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
              <Link href='/profile' className={styles.Link}>Profile</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
