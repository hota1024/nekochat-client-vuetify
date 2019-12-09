<template>
  <v-card>
    <v-toolbar>Nekochat</v-toolbar>
    <div v-chat-scroll class="messages-wrap">
      <v-list two-line>
        <div v-for="(message, index) in messages" :key="index">
          <message :message="message" />
          <v-divider v-if="index < messages.length - 1"></v-divider>
        </div>
      </v-list>
    </div>
    <v-card-text>
      <v-text-field
        v-model="messageContent"
        label="メッセージ"
        outlined
        counter="100"
        @keyup.enter="sendContent"
        @keypress="canSend = true"
      ></v-text-field>
      <v-btn color="primary" block x-large @click="sendContent"
        >にゃーん！（送信）</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { createComponent, onMounted, ref } from '@vue/composition-api'
import SocketIO from 'socket.io-client'
import { Message as MessageType } from '../../types/message'
import { User } from '../../types/user'
import Message from '@/components/Message/Message.vue'

export default createComponent({
  components: {
    Message
  },
  setup(_, context) {
    const io = SocketIO(context.root.$store.state.socketURL)
    const me = ref(context.root.$store.state.me as User)
    const canSend = ref(false)
    const messages = ref([] as MessageType[])
    const messageContent = ref('')

    const send = (content: string) => {
      if (!content) return
      const message: MessageType = {
        user: me.value,
        content,
        createdTimestamp: Date.now()
      }
      io.emit('message', message)
    }

    const sendContent = () => {
      if (!canSend.value) return
      send(messageContent.value)
      messageContent.value = ''
      canSend.value = false
    }

    io.on('message', (message: MessageType) => {
      messages.value.push(message)
    })

    onMounted(() => {
      send(`入室しました`)
    })

    return {
      send,
      sendContent,
      me,
      messages,
      messageContent,
      canSend
    }
  }
})
</script>

<style lang="stylus">
.messages-wrap {
  height 400px
  overflow scroll
}
</style>
