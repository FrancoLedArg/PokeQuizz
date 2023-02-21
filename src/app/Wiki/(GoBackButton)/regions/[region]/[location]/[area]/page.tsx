import Link from "next/link"

// Utils
import { Data } from "@/utils/types"
import { fetchItem } from "@/utils/functions"

interface Params {
  area: string
}

export default async function page(
  { params } : { params: Params }
) {
  const { area } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/location-area/${area}/`)

  return (
    <div>
      <h1>Area: {data.name}</h1>
      <div>
        <h3>Encounter method rates:</h3>
        {data.encounter_method_rates.map(
          ({ encounter_method, version_details }: { encounter_method: Data, version_details: any } , index: number) =>
          <div key={index}>
            <h1>{encounter_method.name}</h1>
            {version_details.map(
              ({ rate, version } : { rate: number, version: Data }, index: number) =>
               <div key={index}>
                <h5>{version.name}</h5>
                rate: {rate}
               </div>
            )}
          </div>
        )}
      </div>
      <div>
        <h3>Pokemon encounters:</h3>
        {data.pokemon_encounters.map(
          ({ pokemon, version_details }: { pokemon: Data, version_details: any }, index: number) =>
          <div key={index}>
            <h3>{pokemon.name}</h3>
            {version_details.map(
              ({ encounter_details, max_chance, version } : { encounter_details: any, max_chance: number, version: Data }, index: number) =>
              <div key={index}>
                <h5>{version.name}</h5>
                Max-chance: {max_chance}
                {encounter_details.map(
                ({ chance, condition_values, max_level, method, min_level } : { chance: number, condition_values: any, max_level: number, method: Data, min_level: number }, index: number) =>
                <div key={index}>
                  Method: {method.name}
                  Chance: {chance}
                  Min lvl: {min_level}
                  Max lvl: {max_level}
                  Condition values:
                </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
