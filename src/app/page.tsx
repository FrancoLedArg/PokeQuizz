
// Css
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.Home}>
      <h1>How much you know about pokemon?</h1>
      <h3>Take a quizz and test your knowledge</h3>
      <h3>
        For every 3 correct answers in a row you will win
        a pokeball containing a random pokemon
      </h3>
      <h3>You allready know the drill, Catch them all!</h3>
      <button>Take a quizz!</button>
    </div>
  )
}
