export default {
  state: {
    portfolioData: {
      coin: [{ name: 'bitcoin', price: 10, amount: 110 }],
    },
    portfolioChart: {
      labels: ['bitcoin', 'ethereum', 'us dollar'],
      data: [111, 200, 333],
    },
  },
  mutations: {},
  actions: {
    // chart() {
    //   const chartValue = {
    //     labels: [],
    //     data: [],
    //   }
    //   this.portfolio.forEach((elem) => {
    //     chartValue.labels.push(elem.name)
    //     chartValue.data.push(elem.amount)
    //   })
    // },
  },
}
