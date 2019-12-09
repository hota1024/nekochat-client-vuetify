<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" md="4">
        <login-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import LoginForm from '@/components/Login/LoginForm.vue'

export default createComponent({
  components: {
    LoginForm
  }
})
</script>
