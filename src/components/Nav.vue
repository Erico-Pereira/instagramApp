<script setup>
    import {RouterLink, useRouter} from "vue-router"
    import Container from "./Container.vue"
    import { ref } from "vue";
    import AuthModal from "./AuthModal.vue"
    import { useUserStore } from "../stores/users";
    import { storeToRefs } from "pinia";
    
    const userStore = useUserStore()

    
    const {user, loadingUser} = storeToRefs(userStore)
    const searchUsermane = ref("")
    const isAuthenticated = ref(false)
    const router = useRouter()

    function onSearch() {
        if(searchUsermane.value){
            router.push(`/profile/${searchUsermane.value}`)
        }
    }

    async function handleLogout(){
        await userStore.handleLogout()
    }

    function goToUsersProfile(){
        router.push(`/profile/${user.value.username}`)
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
                <div class="content" v-if="!loadingUser">
                    <div class="leftContent" v-if="!user">
                        <AuthModal :isLogin="false"/>
                        <AuthModal :isLogin="true"/>
                    </div>
                    <div class="leftContent" v-else>
                        <AButton type="primary" @click="goToUsersProfile()">Profile</AButton>
                        <AButton type="primary" @click="handleLogout()">Logout</AButton>
                    </div>
                </div>         
            </div>
        </Container>
    </ALayoutHeader>
</template>

<style scoped>

    .content{
        display: flex;
        align-center: center;
    }
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