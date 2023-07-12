<script setup>
import {defineProps} from "vue"

const props = defineProps(['username', 'userInfo'])

</script>


<template>
    <div class="userbarContainer">
        <div class="topContent">
            <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
        </div>
        <div class="bottonContent">
            <ATypographyTitle :level="5">{{ props.userInfo.post }} Post</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.followers }} Follower</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.following }} Following</ATypographyTitle>
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

    }
</style>