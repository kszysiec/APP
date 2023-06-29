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
  let successScore = getKey("successScore","0.85");
  let orangeScore = getKey("orangeScore","0.80");
  let blueScore = getKey("blueScore","0.70");
  let greyScore = getKey("greyScore","0.60");
  results.forEach(element => {
    let meta = element as VectorMetaData;
    let colorName = "success";
    this.visibleCards.push({id: counter.toString(), filename : meta.filename, page: meta.page, key : meta.key, score : element.score, color : colorName, pre2 : meta.pre2, pre1: meta.pre1, text : element.text, post1: meta.post1, post2 : meta.post2} as CardData);
    counter++;
    /*if (element.score < Number.parseFloat(successScore))
    {
      colorName = "orange-darken-1";
    }
    if (element.score < Number.parseFloat(orangeScore))
    {
      colorName = "blue";
    }
    if (element.score < Number.parseFloat(blueScore))
    {
      colorName = "grey";
    }
    if (element.score > Number.parseFloat(greyScore))
    {
        this.visibleCards.push({id: counter.toString(), filename : meta.filename, page: meta.page, key : meta.key, score : element.score, color : colorName, pre2 : meta.pre2, pre1: meta.pre1, text : element.text, post1: meta.post1, post2 : meta.post2} as CardData);
        counter++;
    }*/
  });
},
methods: {
  handleCardAccepted() {
  },
  handleCardRejected() {
  },
  handleCardSkipped() {
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
