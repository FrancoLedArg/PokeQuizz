async function fetchContest (url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default async function EachContest(
  { url }: { url: string }
) {
  // Fetch the contest data
  //const contest = await fetchContest(url)

  return (
    <div>EachContest</div>
  )
}
