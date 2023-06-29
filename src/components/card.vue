<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :style="{ transform: transformString }"
  >

   <v-card width="900" class="mx-2 rounded-lg">
    
   <v-toolbar flat :color="color" dark>

    <v-btn icon>
      <v-icon>mdi-account-star</v-icon>
      <v-tooltip location="bottom" activator="parent">
        <v-alert v-if="color=='success'"
          :color="color"
          icon="mdi-account-star"
          title="Super, pasuje, zgodność w 100%"
          text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku bardzo dobrego dopasowania do zapytania"
        ></v-alert>
        <v-alert v-if="color=='orange-darken-1'"
          :color="color"
          icon="mdi-account-star"
          title="Wygląda na bardzo pomocne, zgodność w 75%"
          text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku wystarczająco dobrego dopasowania do zapytania"
        ></v-alert>
        <v-alert v-if="color=='blue'"
          :color="color"
          icon="mdi-account-star"
          title="Na pewno się przyda, zgodność w 50%"
          text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku dość dobrego dopasowania do zapytania"
        ></v-alert>
        <v-alert v-if="color=='grey'"
          :color="color"
          icon="mdi-account-star"
          title="Nie wiadomo, zgodność tylko w 25%"
          text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku słabego dopasowania do zapytania, które jednak nie powinny być pominięte"
        ></v-alert>
      </v-tooltip>
    </v-btn>
    
    <v-toolbar-title v-if="color=='success'">Pasuje !</v-toolbar-title>
    <v-toolbar-title v-if="color=='orange-darken-1'">Pomocne !</v-toolbar-title>
    <v-toolbar-title v-if="color=='blue'">Przyda się !</v-toolbar-title>
    <v-toolbar-title v-if="color=='grey'">Szkoda aby umknęło !</v-toolbar-title>

    <v-btn icon>
      <v-icon>mdi-file-pdf-box</v-icon>
      <v-tooltip location="bottom" activator="parent">
        <v-alert
          icon="mdi-file-pdf-box"
          title="Zobacz cały źródłowy dokument"
        >Umożliwia otwarcie źródłowego dokumentu w przeglądarce ({{ filename }}) ({{ page }})</v-alert>
      </v-tooltip>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-information</v-icon>
      <v-tooltip location="bottom" activator="parent">
        <v-alert
          icon="mdi-information"
          title="Zobacz szczegóły"
        >Umożliwia podejrzenie szczegółów dopasowania, lokalizacji źródła, pełnej informacji dlaczego przyznana została dana kategoria oraz inne szczegóły ({{ score }})
        </v-alert>
      </v-tooltip>
    </v-btn>

  </v-toolbar>
    
    <v-card-text>
      <p class="text-h8 text-disabled text-left">{{pre2}}</p>
      <p class="text-h8 text-medium-emphasis text-left">{{pre1}}</p>
      <p class="text-body-2 font-weight-black text-left">{{text}}</p>
      <p class="text-h8 text-medium-emphasis text-left">{{post1}}</p>
      <p class="text-h8 text-disabled text-left">{{post2}}</p>
    </v-card-text>     

    <v-card-actions>
      <v-row>
        <v-col align="left">
          <v-item-group multiple selected-class="bg-green">
        <v-item
          :key="1"
          v-slot="{ selectedClass, toggle }">
          <v-chip
            :class="selectedClass"
            class="mx-1"
            @click="toggle"
            prepend-icon="mdi-alert-circle"
          >
          Pilne !
          </v-chip>
         </v-item>

         <v-item
          :key="2"
          v-slot="{ selectedClass, toggle }">
          <v-chip
            :class="selectedClass"
            class="mx-1"
            @click="toggle"
            prepend-icon="mdi-message-text"
          >
          Metodyka !
          </v-chip>
         </v-item>

         <v-item
          :key="3"
          v-slot="{ selectedClass, toggle }">
          <v-chip
            :class="selectedClass"
            class="mx-1"
            @click="toggle"
            prepend-icon="mdi-chart-line"
          >
          Wyniki badań !
          </v-chip>
         </v-item>

      </v-item-group>

        </v-col>
        <v-col align="right">
          <v-btn icon color="orange-darken-1">
          <v-icon>mdi-account-star</v-icon>
          <v-tooltip location="bottom" activator="parent">
            <v-alert
              color="orange-darken-1"
              icon="mdi-account-star"
              title="Możesz zmienić nasze wskazanie na : Pomocne ! Wygląda na bardzo pomocne, zgodność w 75%."
              text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku wystarczająco dobrego dopasowania do zapytania"
            ></v-alert>
          </v-tooltip>
          </v-btn>
          <v-btn icon color="blue">
            <v-icon>mdi-account-star</v-icon>
            <v-tooltip location="bottom" activator="parent">
              <v-alert
                color="blue"
                icon="mdi-account-star"
                title="Możesz zmienić nasze wskazanie na : Przyda się ! Na pewno się przyda, zgodność w 50%"
                text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku dość dobrego dopasowania do zapytania"
              ></v-alert>
            </v-tooltip>
          </v-btn>
          <v-btn icon color="grey">
            <v-icon>mdi-account-star</v-icon>
            <v-tooltip location="bottom" activator="parent">
              <v-alert
                color="grey"
                icon="mdi-account-star"
                title="Możesz zmienić nasze wskazanie na : Szkoda aby umknęło ! Wygląda na bardzo pomocne, zgodność w 75%."
                text="Taką kategorię dostają wzmianki, fragmenty tekstu w przypadku wystarczająco dobrego dopasowania do zapytania"
              ></v-alert>
            </v-tooltip>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

   </v-card>

    <v-snackbar
      v-model="snackbar1"
      variant="outlined"
      color="success"
    >
    <div class="text-h5">{{ label }}</div>
      <template v-slot:actions>
        <v-btn
          icon
          @click="snackbar1 = false"
        >
        <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbar2"
      variant="outlined"
      color="red"
    >
    <div class="text-h5">{{ label }}</div>
      <template v-slot:actions>
        <v-btn
          icon
          @click="snackbar2 = false"
        >
        <v-icon>mdi-heart-broken</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbar3"
      variant="outlined"
      color="info"
    >
    <div class="text-h5">{{ label }}</div>
      <template v-slot:actions>
        <v-btn
          icon
          @click="snackbar3 = false"
        >
        <v-icon>mdi-redo</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

</div>
</template>

<script lang="ts">

import interact from "interact.js";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },

  props: {
    isCurrent: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    pre2: {
      type: String,
      required: true
    },
    pre1: {
      type: String,
      required: true
    },
    post1: {
      type: String,
      required: true
    },
    post2: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      },
      label: `tutaj będą informacje kiedy coś się wykonało`,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false
    };
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    }
  },

  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: event => {
        const {
          interactMaxRotation,
          interactXThreshold
        } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      }
    });
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard");
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          });
          this.label = "Wybrałeś wyszukiwany fragment";
          this.snackbar1 = true;
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          });
          this.label = "Odrzuciłeś wyszukiwany fragment";
          this.snackbar2 = true;
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          });
          this.label = "Pominąłeś wyszukiwany fragment";
          this.snackbar3 = true;
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "/src/styles/index.scss";

$cardsTotal: 30;
$cardsWidth: 900px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 2.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.0);
  }

  display: flex;
  max-height: 480px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
