<template>
    <v-item-group mandatory>
      <v-container align="center">
        <v-card class="mx-auto">
        <v-row>
          <v-col
            v-for="n in 12"
            :key="n"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'deep-orange' : 'green'"
                class="d-flex align-center"
                dark
                height="300"
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div
                    class="text-h5 flex-grow-1 text-center"
                  >
                    {{ isSelected ? 'Wybrano ! Aktualnym tematem jest : treści wyszukiwane w temacie ' + n : 'Treści wyszukiwane w temacie ' + n }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
    </v-item-group>
  </template>