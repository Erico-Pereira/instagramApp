<script setup>
import Card from './Card.vue';
import Container from './Container.vue';



const data = [
    {
        id: 1,
        usermane: "Lilith",
        img: "https://i.pinimg.com/originals/61/c1/3e/61c13e9e82dab48b81ac4c7835e3d37a.png",
        capiton: "Hey Killer"
    },
    {
        id: 2,
        usermane: "Maya",
        img: "https://i.pinimg.com/originals/d3/d1/c8/d3d1c87eb23133ad87870174c2eef3c0.png",
        capiton: "I`m Dead"
    }
]


</script>


<template>
    <Container>
        <div class="timelineContainer" >
            <Card v-for="post in data" :key="post.id" :post="post"/>
        </div>
    </Container>
        
    
</template>

<style scoped>

    .timelineContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }
</style>