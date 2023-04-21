<template>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5">
              {{ title }}
              <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? color : ''" :icon="expanded ? iconExpanded : icon"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-h6">
              {{ text }}
              <v-container fluid align="center">
                <v-btn variant="elevated" color="success" to="/items" class="text-h6 ma-2">Przeglądaj</v-btn>
                <v-btn variant="elevated" color="warning" to="/results" class="text-h6 ma-2">Wyczyść</v-btn>
                <v-btn prepend-icon="mdi-file-pdf-box" variant="elevated" color="indigo" to="/results" class="text-h6 ma-2">PDF</v-btn>
                <v-btn prepend-icon="mdi-download" variant="elevated" color="brown-darken-2" to="/results" class="text-h6 ma-2">Zestawienie</v-btn>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconExpanded: {
      type: String,
      required: true
    }
  }
}
</script>