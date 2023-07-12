<script setup>
    import {defineProps} from "vue"

    const props = defineProps(['post'])
</script>

<template>
    <ACard hoverable style="width: 240px" class="card">
      <template #cover>
        <img alt="example" :src="post.img" />
      </template>
      <ACardMeta :title="post.usermane">
        <template #description>{{post.capiton}}</template>
      </ACardMeta>
    </ACard>
  </template>

<style scoped>
    .card{
        margin-bottom: 20px;
    }    
</style>