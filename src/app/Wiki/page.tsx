import Link from 'next/link'

// Css
import styles from './wiki.module.css'

export default function Wiki() {
  const links = [{
    label: 'Contests',
    route: '/wiki/contests'
  }, {
    label: 'Encounters',
    route: '/wiki/encounters'
  }, {
    label: 'Evolution',
    route: '/wiki/evolution'
  }, {
    label: 'Games',
    route: '/wiki/games'
  }, {
    label: 'Items',
    route: '/wiki/items'
  }, {
    label: 'Regions',
    route: '/wiki/regions'
  }, {
    label: 'Moves',
    route: '/wiki/moves'
  }, {
    label: 'Pokemon',
    route: '/wiki/pokemon?offset=0'
  }]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wiki</h1>
      <div className={styles.description}>
        <p className={styles.paragraph}>Welcome to the PokeQuizz wiki! This is the go-to source for all of our questions.</p>
        <p className={styles.paragraph}>The goal of this project was not to create a competitive game, but rather to provide a fun experience. If you enjoy the concept and enough people use it, we will work to improve it and address any issues to enhance the player experience.</p>
      </div>
      <div className={styles.warning}>
        <p className={styles.paragraph}>Please note that the information provided here may not always be 100% accurate, and we apologize for any inaccuracies. Additionally, there is no anime-related information available.</p>
        <p className={styles.paragraph}>For more and precise information, please chech <Link href='https://bulbapedia.bulbagarden.net/wiki/Main_Page' className={styles.warningLink}>Bulbapedia</Link> or <Link href='https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Wiki' className={styles.warningLink}>Pokémon Wiki</Link></p>
      </div>
      <nav className={styles.navigation}>
        {links.map(({ label, route }) => (
            <Link key={route} href={route} className={styles.link}>
              {label}
            </Link>
        ))}
      </nav>
    </div>
  )
}
