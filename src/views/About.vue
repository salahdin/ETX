<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col class="spacing-playground pa-12" cols="12" sm="12" md="12">
          <h1>What is exbirr</h1>
        </v-col>
        <v-col cols="6" sm="12" md="6" class="spacing-playground pa-12">
          <h3>
            We provide reliable exchange rates both for the official and street
            exchange markets.
          </h3>

          <p>
            Use our online currency converter to calculate how much ETB is worth
            Vs other popular currencies.
          </p>

          <p>
            In addition to that the platform provides a real time data chart for
            users
          </p>
        </v-col>

        <v-col cols="6" sm="12" md="6">
          <v-img src="../assets/undraw_Finance_re_gnv2.svg"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
export default {
  data() {
    return {
      paragraph: "exbirr is a an online ",
    };
  },
  metaInfo() {
    return {
      title: "Welcome to Exbirr",
      meta: [
        {
          vmid: "birr converter | blackmarket and official value",
          name: "about exbirr",
          content:
            "birr exchange calculator with street value ( blackmarket ) and official price",
        },
      ],
    };
  },
};
</script>
