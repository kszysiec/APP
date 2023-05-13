<script lang="ts">
    import { loki } from "lokijs";
    import { VectorStorage } from "vector-storage";

    export default {
    data: () => ({
      items: [
        {
          id : 1,
          title: 'temat 1'
        },
        {
          id : 2,
          title: 'temat 2'
        },
        {
          id : 3,
          title: 'temat 3'
        },
        {
          id : 4,
          title: 'temat 4'
        },
      ],
      selection: [1]
    }),
    methods: {
      ageView(obj){
        return obj.age > 30;
      },
      async change(toggle: () => void) {
            toggle();
			      alert(this.items[this.selection].title);
            var db = new loki('test.db', 
            { 
              autoload: true,
              autosave: true, 
              autosaveInterval: 4000            }
            );
            var users = db.addCollection('users', { indices: ['email'] });
            var odin = users.insert( { name : 'odin', email: 'odin.soap@lokijs.org', age: 38 } );
            var thor = users.insert( { name : 'thor', email : 'thor.soap@lokijs.org', age: 25 } );
            var stan = users.insert( { name : 'stan', email : 'stan.soap@lokijs.org', age: 29 } );
            var oliver = users.insert( { name : 'oliver', email : 'oliver.soap@lokijs.org', age: 31 } );
            var hector = users.insert( { name : 'hector', email : 'hector.soap@lokijs.org', age: 15} );
            var achilles = users.insert( { name : 'achilles', email : 'achilles.soap@lokijs.org', age: 31 } );
            var odin2 = users.findOne({name: "odin" });
            users.remove(odin2);
            var results = users.where(this.ageView);
            //alert(results[0].email);
            users.find().forEach(function(user)
            {
                //alert(user.email);
            });
            db.saveDatabase();
            alert('koniec'); 
            const vectorStore = new VectorStorage({ openAIApiKey: "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" });
            await vectorStore.addText("Anielka jeszcze nie śpi", {additionalInfo: "zdanie1"});
            await vectorStore.addText("Krzysiek jeszcze nie gotuje zup", {additionalInfo: "zdanie2"});
            await vectorStore.addText("Mały Staś bawi się klockami", {additionalInfo: "zdanie3"});
            const wynik = await vectorStore.similaritySearch({
              query: "Babcia przygotowuje obiad",
            });
            console.log(wynik);
      }
    }
  }
</script>

<template>
    <v-item-group mandatory v-model="selection">
      <v-container align="center">
        <v-card class="mx-auto">
        <v-row>
          <v-col
            v-for="n in items"
            :key="n.id"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'deep-orange' : 'green'"
                class="d-flex align-center"
                dark
                height="300"
                @click="change(toggle)"
              >
                <v-scroll-y-transition>
                  <div
                    class="text-h5 flex-grow-1 text-center"
                  >
                    {{ isSelected ? 'Wybrano ! Aktualnym tematem jest : treści wyszukiwane w temacie ' + n.title : 'Treści wyszukiwane w temacie ' + n.title }}
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