<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" md="8">
        <chat />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Chat from '@/components/Chat/Chat.vue'

export default createComponent({
  components: {
    Chat
  }
})
</script>
