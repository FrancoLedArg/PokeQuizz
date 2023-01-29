interface Berry {
  name: string
  url: string
}

async function fetchAllItems (url: string): Promise<Berry[]> {
  let allItems : Berry[]= []
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

export { fetchAllItems, fetchItem }
