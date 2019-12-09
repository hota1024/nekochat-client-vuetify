<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="avatarUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle v-text="user.name"></v-list-item-subtitle>
        <v-list-item-title v-text="content"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text
          v-text="formatedDate"
        ></v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import { Message } from '@/types/message'

export default createComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      require: true
    }
  },
  setup(props) {
    const user = computed(() => props.message!.user)
    const content = computed(() => props.message!.content)
    const avatarUrl = computed(
      () => `https://www.gravatar.com/avatar/${props.message!.user.hash}`
    )
    const formatedDate = computed(() =>
      dayjs(props.message!.createdTimestamp).format('YYYY/MM/DD HH:mm:ss')
    )

    return {
      user,
      content,
      avatarUrl,
      formatedDate
    }
  }
})
</script>
