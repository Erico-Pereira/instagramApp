<script setup>
import {defineProps} from "vue"
import UploadPhotoModal from "./UploadPhotoModal.vue"
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";

const route = useRoute()

const userStore = useUserStore()
const {username: profileUsername} = route.params
const {user} = storeToRefs(userStore)



const props = defineProps(['user', 'userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing'])

async function followUser(){
    props.updateIsFollowing(true)
    await supabase.from("followers_following").insert({
        follower_id: user.value.id,
        following_id: props.user.id
    })
}


async function unfollowUser(){
    props.updateIsFollowing(false)
    await supabase.from("followers_following").delete().eq("follower_id", user.value.id).eq("following_id",props.user.id)
    
}

</script>


<template>
    <div class="userbarContainer" v-if="props.user">
        <div class="topContent">

            <ATypographyTitle :level="2">{{ props.user.username }}</ATypographyTitle>
            <div v-if="user">
                <UploadPhotoModal v-if="profileUsername == user.username" :addNewPost="addNewPost"/>
                <div v-else>
                    <AButton v-if="!props.isFollowing" @click="followUser">Follow</AButton>
                    <AButton v-else @click="unfollowUser">Following</AButton>
                </div>
                
            </div>

        </div>
        <div class="bottonContent">
            <ATypographyTitle :level="5">{{ props.userInfo.post }} Post</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.followers }} Follower</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.following }} Following</ATypographyTitle>
        </div>
    </div>
    <div class="userbarContainer" v-else>
        <div class="topContent">

            <ATypographyTitle :level="2">User Not Found</ATypographyTitle>
           
</div>
    </div>
</template>

<style scoped>
    .userbarContainer{
    
        padding-bottom: 75px;
    }
    .bottonContent{
        display: flex;
        align-items: center;

    }

    .bottonContent h5{
        margin: 0 !important;
        padding: 0;
        margin-right: 30px !important;
        align-items: center;

    }
    .topContent{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>