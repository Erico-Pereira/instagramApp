<script setup>
import Container from "./Container.vue";
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./Userbar.vue";
import { ref , onMounted, watch} from "vue";
import {supabase} from "../supabase";
import {useRoute} from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { reactive } from "vue";


const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)
const route = useRoute()
const user = ref(null)
const {username} = route.params
const loading = ref(false)
const posts = ref([])
const isFollowing = ref(false)
const userInfo = reactive({
                post: null,
                followers: null,
                following: null
})

function addNewPost(post){
    posts.value.unshift(post)
}


function updateIsFollowing(follow){
    isFollowing.value = follow
}

async function fetchisFollowing(){
    if(loggedInUser.value && (loggedInUser.value.id !== user.value.id)){
        const {data} = await supabase.from("followers_following").select().eq("follower_id", loggedInUser.value.id).eq("following_id", user.value.id).single()

        if(data){
            isFollowing.value = true
        }
    }
    
}


async function fetchFollowerCount(){
    const {count} = await supabase.from("followers_following").select('*', { count: 'exact'}).eq("following_id", user.value.id)
    return count
}

async function fetchFollowingCount(){
    const {count} = await supabase.from("followers_following").select('*', { count: 'exact'}).eq("follower_id", user.value.id)
    return count
}

async function fetchData(){
    loading.value = true

    const {data: userData} = await supabase.from("users").select().eq('username', username ).single()

    if(!userData){
        loading.value = false
        return user.value=null
    }

    
    user.value = userData
    

    const {data: postsData} = await supabase.from("posts").select().eq("owner_id", user.value.id)

    posts.value = postsData

    await fetchisFollowing()

    const followerCount = await fetchFollowerCount()
    const followingCount = await fetchFollowingCount()

    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.post = posts.value.length

    loading.value = false
}

watch(loggedInUser, function(){
    fetchisFollowing()
})


onMounted(function(){
    fetchData()
})

</script>

<template>
    <Container>
        <div class="profileContainer" v-if="!loading">
            <UserBar 
            :key="$route.params.username"
            :user="user" 
            :userInfo="userInfo"
            :addNewPost="addNewPost"
            :isFollowing="isFollowing"
            :updateIsFollowing="updateIsFollowing"
             />

             <ImageGallary :posts="posts"/>
           
        </div>
        <div class="spinner" v-else>
            <ASpin/>
        </div>
    </Container>
</template>

<style scoped>

    .profileContainer{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }

    .spinner{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 85vh;
    }

</style>