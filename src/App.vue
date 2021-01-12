<template>
  <v-app>
    <v-app-bar
      app
      color="#101820FF"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../src/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Chart></Chart>
      <Calculator></Calculator>
    </v-main>
  </v-app>
</template>

<script>
import Chart from './components/Chart'
import Calculator from './components/Calculator'

export default {
  name: 'App',

  components: {
    Chart,
    Calculator
  },

  data: () => ({
    //
  }),
};
</script>
