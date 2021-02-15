<template>
  <v-container id="app">
    <v-row>
      <v-col cols="12" md="4" sm="12" xs="12">
        <v-text-field v-model="user_input" label="input value"></v-text-field>
      </v-col>
      <v-col cols="12" md="8" sm="12" xs="12">
        <v-select
          v-model="select"
          hint="select a currency you want to convert to"
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
              <v-btn
                @click="getOfficialData()"
                color="#101820FF"
                dark
                v-bind="attrs"
                v-on="on"
              >
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
                <div>
                  <p>
                    street value :
                    {{ multiply(select.price_min, user_input) }} -
                    {{ multiply(select.price_max, user_input) }} ETB
                  </p>
                </div>
              </v-card-title>

              <v-card-title class="headline grey lighten-2"> 
                <div>
                  official : {{ divide(user_input,official[select.currency]) }} ETB
                </div>
              </v-card-title>

              <v-card-text> </v-card-text>
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
import axios from "axios";

export default {
  data() {
    return {
      newtable: [],
      select: {currency:'ETB'},
      user_input: 0,
      airresponse: null,
      dialog: false,
      officialData: null,
      officialETB: {},
    };
  },
  mounted() {
    this.loadItems()
  },
  watch: {
    select() {
      this.$store.commit("setSelect", this.select)
      this.$store.dispatch('loadGraphData',this.select.currency)
    },
  },
  computed: {
    round(value) {
      return value.toFixed(2);
    },
    official(){
      return this.$store.getters.getTableData
    }
  },
  metaInfo() {
    return {
      title:
        "EXbirr | birr exchange calculator with street value and official price",
      meta: [
        {
          vmid: "birr converter",
          name: "calculator",
          content:
            "birr exchange calculator with black market and official price",
        },
      ],
    };
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
          this.airresponse = response.data.records;
          for (var i of response.data.records) {
            let x = {
              price_max: i.fields.price_max,
              currency: i.fields.currency,
              price_min: i.fields.price_min,
              name: i.fields.name,
            };
            this.newtable.push(x);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOfficialData() {
      this.$store.commit("setSelect", this.select)
    },
    multiply(a, b) {
      return Math.round(a * b, 1)
    },
    divide(a, b) {
      return Math.round(a/b, 2)
    }
  },
};
</script>
<style>
</style>