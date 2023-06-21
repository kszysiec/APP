<script lang="ts">

import { getKey, setKey } from '@/composables/db-repo'

export default {
    data: () => ({
      accessKey : getKey("accessKey",""),
      apiKey : getKey("apiKey",""),
      apiModel : getKey("apiModel","text-embedding-ada-002"),
      paramK : getKey("paramK","8"),
      successScore : getKey("successScore","0.85"),
      orangeScore : getKey("orangeScore","0.80"),
      blueScore : getKey("blueScore","0.70"),
      greyScore : getKey("greyScore","0.60"),
      apiTimeout : getKey("apiTimeout","20000"),
      apiPages : getKey("apiPages","1")
    }),
    methods:
    {
      onClick(e) {
        if (!e) {
          return;
        }
        setKey("apiKey",this.apiKey);
        setKey("accessKey",this.accessKey);
        setKey("apiModel",this.apiModel);
        setKey("paramK",this.paramK);
        setKey("successScore",this.successScore);
        setKey("orangeScore",this.orangeScore);
        setKey("blueScore",this.blueScore);
        setKey("greyScore",this.greyScore);
        setKey("apiTimeout",this.apiTimeout);
        setKey("apiPages",this.apiPages);
      }
    }
    }
</script>

<template>

<v-card class="mx-auto">
    <v-layout>

      <v-app-bar
        color="info"
        :elevation="2"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon class="text-h4" icon="mdi-close" to="/"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="text-h5">Konfiguracja</v-app-bar-title>

      </v-app-bar>

      <v-main>  
        <v-container fluid align="center">
          <v-textarea
            v-model="accessKey"
            label="Wpisz klucz dostępowy"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

          <v-textarea
            v-model="apiKey"
            label="Wpisz klucz API do wyszukiwania"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="apiModel"
            label="Wpisz model API do wyszukiwania"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="paramK"
            label="Wpisz sumaryczną ilość wyszukiwanych jednorazowo wyników"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="successScore"
            label="Wpisz próg dla kategorii Pasuje!"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="orangeScore"
            label="Wpisz próg dla kategorii Pomocne !"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="blueScore"
            label="Wpisz próg dla kategorii Przyda się !"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="greyScore"
            label="Wpisz próg dla kategorii Szkoda aby umknęło !"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="apiTimeout"
            label="Wpisz opóźnienie API między wywołaniami (ms)"
            auto-grow
            variant="outlined"
            rows="1"
            row-height="10"
            shaped
            class="text-h5"
       ></v-textarea>

       <v-textarea
            v-model="apiPages"
            label="Wpisz ilość analizowanych stron w każdym dokumencie"
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
    
       </v-container>
      </v-main>
    </v-layout>
</v-card>

</template>