<script setup>
import {defineProps} from "vue"

const props = defineProps(['posts'])

</script>


<template>
    <div class="imageGallaryContainer">
        <img v-for="post in props.posts" :key="post.id" :src="post.img">
    </div>



</template> 


<style scoped>

    .imageGallaryContainer{
        display: flex;
        justify-content: left;
        flex-wrap: wrap; 
    }
    img{
        margin: 5px;
        width: 200px;
    }


</style>