<template>
  <v-container id="app">
    <v-row justify="center" align="center">
      <v-col cols="12" md="12" sm="12">
        <GChart
          type="LineChart"
          :data="GchartData"
          :options="chartOptions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts"

export default {
  data: () => ({
    chartOptions: {
      chart: {
        title: "street value",
        subtitle: "street value increase",
      },
    },
  }),
  components: {
    GChart,
  },
  computed: {
    GchartData() {
      return this.$store.getters.getChartData.Gchart 
    }
    
  },
};
</script>

<style>
</style>