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

        <v-app-bar-title>Konfiguracja</v-app-bar-title>

      </v-app-bar>

      <v-main>
        <v-container fluid align="center">

        <v-row>
          <v-col>
            <menu-block 
              title="Źródła informacji" 
              text="Tutaj znajdziemy wszystkie przeszukiwane źródła." 
              action="Zobacz źródła" 
              image="/src/assets/btn-logo.png" 
              actionTo="/files"
              color="indigo"
            />
          </v-col>
          <v-col>
            <menu-block 
              title="Treści do wyszukania" 
              text="Tutaj znajdziemy informacje których szukaliśmy." 
              action="Zobacz treści" 
              image="/src/assets/btn-logo.png" 
              actionTo="/queries"
              color="indigo"
            />
          </v-col>
        </v-row>  

        <v-row>
          <v-col>
            <menu-block 
              title="Kategorie wyników" 
              text="Lista kategorii do których przyporządkowywane są wyniki wyszukiwania. Można je porównać do teczek, segregatorów czy worków. Każdy wynik otrzymuje tylko jedną wybraną kategorię i tę kategorię nadaje automatycznie system podczas analizy źródeł a nie użytkownik." 
              action="Zobacz kategorie" 
              image="/src/assets/btn-logo.png" 
              actionTo="/categories"
              color="indigo"
            />
          </v-col>
          <v-col>
            <menu-block 
              title="Oznaczenia użytkownika" 
              text="Lista oznaczeń użytkownika do których można przyporządkować w trakcie przegladania wyniki wyszukiwania. Można je porównać do tagów, flag czy pinezek. Każdy wynik może być opatrzony wieloma oznaczeniami i te oznaczenia nadaje użytkownik a nie system." 
              action="Zobacz oznaczenia" 
              image="/src/assets/btn-logo.png" 
              actionTo="/tags"
              color="indigo"
            />
          </v-col>
        </v-row>  

      </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
