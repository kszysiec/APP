<script lang="ts">

  import { PDFLoader } from "langchain/document_loaders/fs/pdf";
  import { Buffer } from "buffer";
  import { PDFJS } from "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";

  export default {
    data: () => ({
      step: 1,
      progress : 0,
      searchText : "",
      pdfFiles : null
    }),
    created() {
      PDFJS.workerSrc = "pdf.worker.js";
      globalThis.Buffer = Buffer;
      this.step = 1
    },
    methods:
    {
      onFileChange(e) {
        if (!e) {
          return;
        }
        this.pdfFiles = e.target.files;
      }
    },
    watch: {
    step: async function(val) { 
        if (val == 3)
        {
          if (this.pdfFiles)
          {
            for (const file of this.pdfFiles) {
              const loader = new PDFLoader(file);
              var doc = await loader.load();
                doc.forEach(element => {
                  //alert(element.pageContent.toString()); 
                });
              //alert(file.name);   
            }
          }
        }
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
          <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Zacznij szukać nowego tematu</v-app-bar-title>

      </v-app-bar>

      <v-main>
        <v-container fluid align="center">

          <v-window v-model="step">

            <v-window-item :value="1">
              <v-card-text>
                <v-file-input
                  multiple
                  label="Kliknij aby wskazać pliki"
                  show-size
                  counter
                  chips
                  class="mb-2 text-h5"
                  @change="onFileChange"
                ></v-file-input>
                <span class="text-grey-darken-1 text-h5">
                  Wskaż pliki, które chcesz przeszukiwać
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-textarea
                    v-model="searchText"
                    label="Wpisz treść do wyszukiwania"
                    auto-grow
                    variant="outlined"
                    rows="3"
                    row-height="25"
                    shaped
                    class="text-h5"
                  ></v-textarea>
                <span class="text-grey-darken-1 text-h5">
                  Napisz czego mamy szukać we wskazanych plikach
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center text-h5">
                <v-row
                  class="fill-height"
                  align-content="center"
                  justify="center"
                >
                  <v-col
                    class="text-subtitle-1 text-center text-h5"
                    cols="12"
                  >
                    Trwa przygotowanie podanych źródeł oraz samego wyszukiwania...
                  </v-col>
                  <v-col cols="6">
                    <v-progress-linear
                      v-model="progress"
                      color="blue-grey"
                      rounded
                      indeterminate
                      height="25"
                    ><strong>34%</strong></v-progress-linear>
                  </v-col>
                </v-row>
                <span class="text-caption text-grey text-h5">Kiedy zakończy się przetwarzanie możesz przejść do przeglądania tego co udało się już znaleźć</span>
              </div>
            </v-window-item>

            <v-window-item :value="0">
              <div class="pa-4 text-center">
                <v-row
                  class="fill-height"
                  align-content="center"
                  justify="center"
                >
                  <v-col
                    class="text-subtitle-1 text-center text-h5"
                    cols="12"
                  >
                   Nowy temat został wprowadzony. Możesz przejść do przeglądania tego co udało się już znaleźć.
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

          </v-window>
    
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            size="x-large" color="red-lighten-2" variant="elevated"
            @click="step--"
          >
            Poprzedni krok
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="step > 0  && step < 3"
            size="x-large" color="green-lighten-1" variant="elevated"
            @click="step++"
          >
            Kolejny krok
          </v-btn>
          <v-btn
            v-if="step >= 3"
            size="x-large" color="green-lighten-1" variant="elevated"
            @click="step=0"
          >
            Zacznij przeglądanie
          </v-btn>
        </v-card-actions>

        </v-container>
      </v-main>

    </v-layout>
  </v-card>
</template>
