<script setup>

import { supabase } from '../supabase';
import Card from './Card.vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import Observer from "./Observer.vue"


const {user} = storeToRefs(useUserStore())
const lastCardIndex = ref(2)
const posts = ref([])
const ownerIds = ref([])
const reachedEnd = ref(false)

async function fetchData(){

    const {data: followings} = await supabase.from("followers_following").select("following_id").eq("follower_id", user.value.id)

    ownerIds.value = followings.map(f => f.following_id)

    const {data} = await supabase.from("posts").select().in('owner_id', ownerIds.value ).range(0,lastCardIndex.value).order("created_at", {ascending: false})


    posts.value = data

}


onMounted(function(){fetchData()})

async function fetchNextSet(){
    if(!reachedEnd.value){
    const {data} = await supabase.from("posts").select().in('owner_id', ownerIds.value ).range(lastCardIndex.value + 1,lastCardIndex.value + 3).order("created_at", {ascending: false})
    posts.value = [
        ...posts.value,
        ...data
    ]
    lastCardIndex.value = lastCardIndex.value + 3

    if(!data.length){
        reachedEnd.value = true
    }
    }
}

</script>


<template>
    <div class="timelineContainer" >
        <Card v-for="post in posts" :key="post.id" :post="post"/>
        <Observer v-if="posts.length" @intersect="fetchNextSet"/>
    </div>
</template>


<style scoped>
    .timelineContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }


</style>