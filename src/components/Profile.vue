<script setup>
import Container from "./Container.vue"
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./Userbar.vue"

</script>

<template>
    <Container>
        <div class="profileContainer">
            <UserBar 
            :key="$route.params.username"
            username="Erico Pereira" 
            :userInfo="{
                post: 4,
                followers: 10,
                following: 40
            }"
             />

             <ImageGallary :posts="[
                {
                id: 1,
                img: 'https://i.pinimg.com/originals/61/c1/3e/61c13e9e82dab48b81ac4c7835e3d37a.png' 
                },
                {
                id: 2,
                img: 'https://i.pinimg.com/originals/61/c1/3e/61c13e9e82dab48b81ac4c7835e3d37a.png' 
                },
                {
                id: 3,
                img: 'https://i.pinimg.com/originals/61/c1/3e/61c13e9e82dab48b81ac4c7835e3d37a.png' 
                }
             ]"/>
           
        </div>
    </Container>
</template>

<style scoped>

    .profileContainer{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }

</style>