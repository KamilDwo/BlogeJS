export function CountRate(postid, type) {
  let countRates = 0,
    rates, i, countVariable = 0,
    percent = 0,
    dataReturn

  if (localStorage.getItem('rates')) {
    rates = JSON.parse(localStorage.getItem('rates')).rates

    for (i = 0; i < rates.length; i++) {
      if (rates[i].post === postid) {
        countVariable += rates[i].rate
        countRates++
      }
    }
    percent = countRates / countVariable * 10
  }

  if (type === 1) {
    dataReturn = (isNaN(Math.trunc(percent)) ? 0 : Math.trunc(percent))
  } else {
    dataReturn = countRates
  }
  return dataReturn
}

export default CountRate
