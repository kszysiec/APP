<template>
  <v-app-bar
    color="info"
    :elevation="2"
    class="w-100 align-center"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon class="text-h4" icon="mdi-close" to="/"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title class="text-h5">Przeglądaj kolejne wyszukane fragmenty, na prawo - wybierasz, na lewo - odrzucasz, na dół - pomijasz</v-app-bar-title>
  </v-app-bar>

<div>
    <cards-stack
      :cards="visibleCards"
      @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected"
      @cardSkipped="handleCardSkipped"
      @hideCard="removeCardFromDeck"
  />
</div>

</template>

<script setup lang="ts">
  import { CardData, prepareResults, VectorMetaData } from '@/composables/db-repo'
</script>

<script lang="ts">

export default {
data() {
  return {
    visibleCards: [] as CardData[]
  };
},
async mounted() {
  var results = await prepareResults();
  var counter = 1;
  results.forEach(element => {
    let meta = element.metadata as VectorMetaData;
    let successScore = getKey("successScore");
    if (!successScore)
    {
      successScore = "0.85";
    }
    let colorName = "success";
    if (element.score < Number.parseFloat(successScore))
    {
      colorName = "orange-darken-1";
    }
    this.visibleCards.push({id: counter.toString(), filename : meta.filename, key : meta.key, score : element.score, color : colorName, pre2 : meta.pre2, pre1: meta.pre1, text : element.text, post1: meta.post1, post2 : meta.post2} as CardData);
    counter++;
  });
},
methods: {
  handleCardAccepted() {
    console.log("handleCardAccepted");
  },
  handleCardRejected() {
    console.log("handleCardRejected");
  },
  handleCardSkipped() {
    console.log("handleCardSkipped");
  },
  removeCardFromDeck() {
    this.visibleCards.shift();
  }
}
};
</script>

<style lang="scss">
@import "/src/styles/mixins.scss";

#app {
font-family: "Avenir", Helvetica, Arial, sans-serif;
text-align: center;
}
</style>
