<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12" xs="12">
        <v-text-field
          v-model="user_input"
          :label="select.currency"
        ></v-text-field>
      </v-col>
      <v-col md="8" sm="12" xs="12">
        <v-select
          v-model="select"
          :hint="`${select.currency},${select.name}, ${select.price_min} - ${select.price_max}`"
          :items="newtable"
          item-text="currency"
          item-value="ETBprice"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>

      <v-col cols="12" md="12" sm="12" xs="12">
      <div class="text-center">
        <v-dialog v-model="dialog" width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getOfficialData(select.currency)" color="#101820FF" dark v-bind="attrs" v-on="on">
              calculate
            </v-btn>
          </template>


          <v-card>
            <v-card-title class="headline grey lighten-2">
              {{ user_input }} {{ select.currency }}
            </v-card-title>

            <v-card-title class="headline grey lighten-2">
              <h1>=</h1>
            </v-card-title>

            <v-card-title class="headline grey lighten-2">
              <p>black market : 
              {{ multiply(select.price_min, user_input) }} ETB -
              {{ multiply(select.price_max, user_input) }} ETB</p>
              <v-spacer></v-spacer>
              <p v-for="(value, key) in officialData" :key="key">official : {{ multiply(value.toFixed(2),user_input) }} ETB</p>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = !dialog">
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      newtable: [],
      select: {currency:"select a currency",name:"click"},
      user_input: 0,
      airresponse: null,
      dialog: false,
      officialData: null,
      officialETB: {},
    };
  },
  mounted() {
    this.loadItems()
    this.select = this.newtable[0]
  },
  computed:{
    round(value){
      return value.toFixed(2)
    }

  },
  methods: {
    loadItems() {
      axios
        .get(
          `https://api.airtable.com/v0/appvYAnCUYCKYP19s/Table%202?maxRecords=3&view=Grid%20view`,
          {
            headers: { Authorization: "Bearer " + "key0zJKmkBjf6qi2J" },
          }
        )
        .then((response) => {
          this.airresponse = response.data.records
          for (var i of response.data.records) {
            let x = {
              price_max: i.fields.price_max,
              currency: i.fields.currency,
              price_min: i.fields.price_min,
              name: i.fields.name,
            }
            this.newtable.push(x)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOfficialData(currency) {
      axios
        .get(
          "https://free.currconv.com/api/v7/convert?q=" +
            currency +
            "_ETB&compact=ultra&apiKey=f4f228b29bb098fe82e8"
        )
        .then((response) => {
          this.officialData = response.data
          this.$store.commit('setSelect', this.select)
        })
        .catch((error) => {
          console.log(error);
        });
        
    },
    multiply(a, b) {
      return Math.round(a * b,1);
    },
  },
};
</script>
<style>
</style>