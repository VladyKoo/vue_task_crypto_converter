<script>
import { mapState } from 'vuex'
import { Line } from 'vue-chartjs'
export default {
  name: 'LineChart',
  extends: Line,

  data: () => ({
    gradient: null,
    // coinsHistory: {
    //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    //   prices: [10, 200, 100, 400, 400, 5, 10, 5, 10, 200, 100, 200, 100, 400],
    // },
  }),
  computed: {
    ...mapState({
      coinsHistory: (state) => state.converter.coinsHistory,
    }),
    chartData() {
      return {
        labels: this.coinsHistory.labels,
        datasets: [
          {
            label: '...',
            borderColor: 'rgba(25, 118, 210, 0.8)',
            pointBackgroundColor: '#1976d2',
            borderWidth: 1,
            pointBorderColor: '#1976d2',
            backgroundColor: this.gradient,

            pointRadius: 1,
            data: this.coinsHistory.prices,
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `График криптовалюты ${1}-${1}`,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                callback: function(value, index) {
                  if (!(index % 12)) {
                    return value
                  }
                },
              },
            },
          ],
        },
      }
    },
  },
  watch: {
    coinsHistory() {
      this.renderChart(this.chartData, this.options)
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(25, 118, 210, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(25, 118, 210, 0.25)')
    this.gradient.addColorStop(1, 'rgba(25, 118, 210, 0)')

    this.renderChart(this.chartData, this.options)
  },
}
</script>
