import { Suspense } from 'react'

// Components
import EachContest from './EachContest'

// Utils
import { fetchAllItems } from '@/utils/functions'

// Css
import styles from './Contests.module.css'

export default async function Contests() {
  const contests = await fetchAllItems('https://pokeapi.co/api/v2/contest-type/')
  return (
    <div>
      <h1>Contests</h1>
      <p>Contest types are categories judges used to weigh a pokémons condition in pokémon contests</p>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {contests.map((e, index) =>
            (<EachContest key={e.name} url={`https://pokeapi.co/api/v2/contest-type/${index + 1}/`} />)
          )}
        </Suspense>
      </div>
    </div>
  )
}

