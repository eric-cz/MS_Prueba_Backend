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

const getBonus = (bonusAmount, performance) => {
    const bonus = (bonusAmount * performance)/100
    return roundNumber(bonus)
}

const getSalary = (salary, bonus) => {
    return salary + bonus
}

const getAveragePerformance = (playerPerformance, teamPerformance) => {
    const performance = (playerPerformance + teamPerformance)/2
    return roundNumber(performance)
}

module.exports = {
     getPerformance, getBonus, getSalary, getAveragePerformance
  }
