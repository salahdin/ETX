<template>
  <v-container>
      <v-row justify="center" align="center">
          <v-col cols="12" md="12" sm="12">
            <v-sparkline
            :value="newtable"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
            >
            <template v-slot:label="item">
                ${{ item.value }}
            </template>
            </v-sparkline>
          </v-col>
          <v-btn @click="update">update</v-btn>
      </v-row>
  </v-container>
</template>

<script>
import axios from "axios"

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
    ['#F2AA4CFF', '#101820FF']
  ]

  export default {
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[6],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: true,
      newtable: []
    }),
    mounted(){
      this.loadGraphData(this.currency)
    },
    computed:{
      currency(){
        return this.$store.state.select.currency
      }
    },
    watch:{
      newtable(){
       
      }

    },
    methods: {
      update(){
        this.newtable = []
        this.loadGraphData(this.currency)
      },

      loadGraphData(currency) {
      axios
        .get(
          `https://api.airtable.com/v0/appvYAnCUYCKYP19s/Table%201?view=Grid%20view`,
          {
            headers: { Authorization: "Bearer " + "key0zJKmkBjf6qi2J" },
          }
        )
        .then((response) => {
          var i;
          for (i of response.data.records) {
            if(i.fields.currency == currency){
              
              this.newtable.push(i.fields.ETBprice)
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    }
  }
</script>

<style>

</style>