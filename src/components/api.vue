<script lang="ts">

import { getKey, setKey } from '@/composables/db-repo'

export default {
    data: () => ({
      apiKey : getKey("apiKey")
    }),
    created() {
    },
    methods:
    {
      onClick(e) {
        if (!e) {
          return;
        }
        setKey("apiKey",this.apiKey);
      }
    }
    }

</script>

<template>
      <v-textarea
            v-model="apiKey"
            label="Wpisz API Key do wyszukiwania"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-btn
            color="indigo"
            variant="elevated"
            size="x-large"
            rounded="lg"
            class="text-none"
            @click="onClick"
           >
            Zapisz
       </v-btn>
</template>