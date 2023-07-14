<script setup>

import Container from './Container.vue';
import {useUserStore} from "../stores/users"
import { storeToRefs } from 'pinia';
import Cards from "./Cards.vue"
import LoginMessage from "./LoginMessage.vue"



const userStore = useUserStore()
const {user, loadingUser} = storeToRefs(userStore)




</script>


<template>
    <Container>
        <div v-if="!loadingUser">  
            <Cards v-if="user" />
            <LoginMessage v-else/>
        </div>
        <div v-else class="timeLinespinner">
            <ASpin/>
        </div>
    </Container>
        
    
</template>

<style>

    .timelineContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

    .timeLinespinner{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 85vh;
    }

</style>