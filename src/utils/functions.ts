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
  let data
  let retries = 5
  while (retries) {
    try {
      const res = await fetch(url)
      if(!res.ok) {
        console.log(res.status)
      }
      data = await res.json()
      break
    } catch (error) {
      console.error()
      retries--
    }
  }
  if(!data) {
    throw new Error(`Could not fetch the data`)
  }
  return data
}

const firstLetterUppercase = (word: string) => {
  const firstLetter = word[0].toUpperCase()
  const restOfWord = word.slice(1)
  const uppercaseFirstLetter = firstLetter + restOfWord
  return uppercaseFirstLetter
}

export { fetchAllItems, fetchItem , firstLetterUppercase}
