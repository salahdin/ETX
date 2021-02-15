<template>
  <v-app>
    <Gchart></Gchart>
    <Calculator></Calculator>
  </v-app>
</template>

<script>
import Calculator from '../components/Calculator'
import Gchart from '../components/Gchart'



export default {
  name: 'Home',
  components: {
    Calculator,
    Gchart,
  },
  metaInfo() {
  return {
    title:
      "Welcome to Exbirr",
    meta: [
      {
        vmid: "birr converter | blackmarket and official value",
        name: "exbirr",
        content:
        "birr exchange calculator with street value ( blackmarket ) and official price",

      },
    ],
  };
}
}
</script>
