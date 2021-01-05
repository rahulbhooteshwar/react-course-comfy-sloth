export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number/ 100)
  return newNumber
}

export const getUniqueValues = (data, key, flatten=false) => {
  let values = data.map(obj => {
    return obj[key]
  })
  if (flatten) {
    values = values.flat()
  }
  values= new Set(values)
  return ['all', ...values]
}
