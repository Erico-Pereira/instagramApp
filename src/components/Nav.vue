<script setup>
    import {RouterLink} from "vue-router"
    import Container from "./Container.vue"
    import { ref } from "vue";
    import AuthModal from "./AuthModal.vue"

    const searchUsermane = ref("")
    const isAuthenticated = ref(true)

    function onSearch() {
        
    }
</script>

<template>
    <ALayoutHeader>
        <Container>
         <div class="navContainer">
            <div class="rightContent">
            <RouterLink to="/">Instagram</RouterLink>
            <AInputSearch
                v-model:value="searchUsermane"
                placeholder="Username..."
                style="width: 200px"
                @search="onSearch"
            />
            </div>
            <div class="leftContent" v-if="!isAuthenticated">
                <AuthModal :isLogin="false"/>
                <AuthModal :isLogin="true"/>
            </div>
            <div class="leftContent" v-else>
               <AButton type="primary">Profile</AButton>
               <AButton type="primary">Logout</AButton>
            </div>
            
         </div>
        </Container>
    </ALayoutHeader>
</template>

<style scoped>
    .navContainer{
        display: flex;
        justify-content: space-between;
    }

    .rightContent{
        display: flex;
        align-items: center;
    }

    .rightContent a {
        margin-right: 10px;
    }

    .leftContent {
        display: flex;
        align-items: center;
    }

    .leftContent button{
        margin-left: 10px;
    }
    


</style>