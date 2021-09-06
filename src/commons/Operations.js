const getMaxPerformance = performance => {
    return performance > 100 ? 100 : performance
}


const roundNumber = number => {
    return Math.round(number * 100) / 100;
}

const getPerformance = (goles,meta) => {
    const perfomance = (goles/meta) * 100
    const maxPerformance = getMaxPerformance(perfomance)
    return roundNumber(maxPerformance)
}

module.exports = {
     getPerformance
  }