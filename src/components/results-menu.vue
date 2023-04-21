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

        <v-app-bar-title>Opisane fragmenty</v-app-bar-title>

      </v-app-bar>

      <v-main>  
        <v-container fluid align="center">

         <v-expansion-panels>

          <list-block 
              title="Wszystkie wyszukane fragmenty" 
              text="Wszystkie wyniki wyszukiwania ze wszystkich kategorii i oznaczeń" 
              color="black" 
              icon-expanded="mdi-home" 
              icon="mdi-account-check"
            />

            <list-block 
              title="Tylko te wyszukane fragmenty, które wybrałem" 
              text="Wyniki wyszukiwania ze wszystkich kategorii i oznaczeń, które zostały wybrane" 
              color="success" 
              icon-expanded="mdi-home" 
              icon="mdi-account-heart-outline"
            />

            <list-block 
              title="Tylko te wyszukane fragmenty, które odrzuciłem" 
              text="Wyniki wyszukiwania ze wszystkich kategorii i oznaczeń, które zostały odrzucone" 
              color="red" 
              icon-expanded="mdi-home" 
              icon="mdi-account-remove-outline"
            />

            <list-block 
              title="Tylko te wyszukane fragmenty, które pominąłem" 
              text="Wyniki wyszukiwania ze wszystkich kategorii i oznaczeń, które zostały pominięte" 
              color="grey" 
              icon-expanded="mdi-home" 
              icon="mdi-redo"
            />

            <list-block 
              title="Pasuje !" 
              text="Super, pasuje, zgodność w 100%" 
              color="success" 
              icon-expanded="mdi-home" 
              icon="mdi-account-star"
            />

            <list-block 
              title="Pomocne !" 
              text="Wygląda na bardzo pomocne, zgodność w 75%" 
              color="orange-darken-1" 
              icon-expanded="mdi-home" 
              icon="mdi-account-star"
            />

            <list-block 
              title="Przyda się !" 
              text="Na pewno się przyda, zgodność w 50%" 
              color="blue" 
              icon-expanded="mdi-home" 
              icon="mdi-account-star"
            />

            <list-block 
              title="Szkoda aby umknęło !" 
              text="Nie wiadomo, zgodność tylko w 25%" 
              color="grey" 
              icon-expanded="mdi-home" 
              icon="mdi-account-star"
            />

            <list-block 
              title="Pilne !" 
              text="Trzeba przejrzeć w pierwszej kolejności" 
              color="red" 
              icon-expanded="mdi-home" 
              icon="mdi-alert-circle"
            />

            <list-block 
              title="Metodyka !" 
              text="Dotyczy zastosowanej metodyki" 
              color="success" 
              icon-expanded="mdi-home" 
              icon="mdi-message-text"
            />

            <list-block 
              title="Wyniki badań !" 
              text="Dotyczy wyników, zestawień, porównania" 
              color="blue" 
              icon-expanded="mdi-home" 
              icon="mdi-chart-line"
            />

        </v-expansion-panels>          

    </v-container>
      </v-main>
    </v-layout>
</v-card>

</template>