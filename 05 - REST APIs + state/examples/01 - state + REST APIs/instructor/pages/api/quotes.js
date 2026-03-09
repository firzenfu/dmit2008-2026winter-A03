const BASE_URL = 'https://dummyjson.com/quotes'

export const getRandomQuote = () => {
  /* Fortunately, I've found another API that has its stuff squared away, and we can just
     use that instead!
  */
  fetch(`${BASE_URL}/random`)
    .then((response) => {
      return response.json()
    }).then((data => {
      console.log(data);
      // We're good to go: response is e.g. :
      // {id: 540, quote: 'Success Depends Upon Previous Preparation, And Without Such Preparation There Is Sure To Be Failure.', author: 'Confucius'}
    }))
}