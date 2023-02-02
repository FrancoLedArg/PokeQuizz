interface Items {
  name: string
  url: string
}

async function fetchAllItems (url: string): Promise<Items[]> {
  let allItems : Items[]= []
  while(url) {
    const res = await fetch(url)
    const data = await res.json()
    allItems = allItems.concat(data.results)
    url = data.next
  }
  return allItems
}

async function fetchItem (url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

const firstLetterUppercase = (word: string) => {
  const firstLetter = word[0].toUpperCase()
  const restOfWord = word.slice(1)
  const uppercaseFirstLetter = firstLetter + restOfWord
  return uppercaseFirstLetter
}

export { fetchAllItems, fetchItem , firstLetterUppercase}
