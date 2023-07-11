<script setup>
    import {RouterLink} from "vue-router"
    import Container from "./Container.vue"
    import { ref } from "vue";

    const searchUsermane = ref("")

    function onSearch() {
        
    }
</script>

<template>
    <ALayoutHeader>
        <Container>
            <RouterLink to="/">Instagram</RouterLink>
            <AInputSearch
                v-model:value="searchUsermane"
                placeholder="Username..."
                style="width: 200px"
                @search="onSearch"
            />
        </Container>
        
    </ALayoutHeader>
</template>