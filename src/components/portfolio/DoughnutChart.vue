<script>
import { mapState } from 'vuex'
import { Doughnut } from 'vue-chartjs'
export default {
  name: 'DoughnutChart',
  extends: Doughnut,

  data: () => ({}),
  computed: {
    ...mapState({
      portfolioChart: (state) => state.portfolio.portfolioChart,
    }),

    chartData() {
      return {
        labels: this.portfolioChart.labels,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: this.portfolioChart.data,
          },
        ],
      }
    },
    options() {
      return { responsive: true, maintainAspectRatio: false }
    },
  },
  watch: {
    portfolioChart() {
      this.renderChart(this.chartData, this.options)
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
