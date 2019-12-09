<template>
  <v-card>
    <v-toolbar>Nekochatへログイン</v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="名前*"
          outlined
        ></v-text-field>
        <v-combobox
          v-model="serverURL"
          :rules="serverURLRules"
          :items="servers"
          item-text="name"
          item-value="url"
          label="サーバーURL"
          outlined
        ></v-combobox>
        <v-text-field
          v-model="email"
          label="Gravatar E-mail"
          hint="※必須ではありません"
          outlined
        ></v-text-field>
        <v-subheader>プレビュー</v-subheader>
        <v-card>
          <message :message="message" />
        </v-card>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onLogin">ログイン</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive } from '@vue/composition-api'
import md5 from 'md5'
import { Message as MessageType } from '../../types/message'
import Message from '@/components/Message/Message.vue'

export default createComponent({
  components: {
    Message
  },
  setup(_props, context) {
    const form = ref((null as unknown) as { validate: () => boolean })
    const name = ref('名無しのねこ')
    const nameRules = ref([(v: string) => !!v || '必須項目だにゃ！'])
    const servers = reactive([
      {
        name: 'Primary Nekochat Server',
        url: 'https://nekochat-server.herokuapp.com/'
      }
    ])
    const serverURL = ref(servers[0].url)
    const serverURLRules = ref([(v: string) => !!v || '必須項目だにゃ！'])
    const email = ref('example@example.com')
    const hash = computed(() => {
      return md5(email.value)
    })
    const message = computed(() => {
      return {
        user: {
          name: name.value,
          hash: hash.value
        },
        content: 'にゃーん',
        createdTimestamp: Date.now()
      } as MessageType
    })

    const onLogin = () => {
      if (!form.value!.validate()) return
      context.root.$store.dispatch('login', {
        name: name.value,
        hash: hash.value
      })
      context.root.$store.commit(
        'SET_SOCKET_URL',
        (() => {
          if (typeof serverURL.value === 'string') return serverURL.value
          return (serverURL.value as { url: string }).url
        })()
      )

      context.root.$router.push('/chat')
    }

    return {
      name,
      nameRules,
      email,
      hash,
      message,
      form,
      onLogin,
      serverURL,
      serverURLRules,
      servers
    }
  }
})
</script>
