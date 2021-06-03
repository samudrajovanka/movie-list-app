exports.createUrlApi = (url, querys = null) => {
  let queryStr = '';
  if (querys !== null) {
    queryStr = querys.map(query => {
      return `&${query}`
    })
  }
  return `${process.env.BASE_URL}${url}?api_key=${process.env.API_KEY}${queryStr}`;
}