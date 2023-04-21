<template>
    <v-app-bar
      color="info"
      :elevation="2"
      class="w-100 align-center"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Przeglądaj kolejne wyszukane fragmenty, na prawo - wybierasz, na lewo - odrzucasz, na dół - pomijasz</v-app-bar-title>
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

<script lang="ts">

export default {
  data() {
    return {
      visibleCards: ["1", "2", "3", "4", "5", "6", "7", "8"]
    };
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
