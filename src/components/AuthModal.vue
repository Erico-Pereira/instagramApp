<script setup>
    import { ref , defineProps} from 'vue';
        const props = defineProps(['isLogin'])
        const visible = ref(false);

        const showModal = () => {
            visible.value = true;
        };

        const handleOk = (e) => {
            visible.value = false;
        };

        const title = props.isLogin ? 'Login' : 'Signup'
        
</script>

<template>
    <div>
      <AButton type="primary" @click="showModal" class="btn">{{title}}</AButton>
      <AModal v-model:visible="visible" :title="title" @ok="handleOk">
        <AInput class="input" v-if="!isLogin" v-model:value="value" placeholder="Usermane" />
        <AInput class="input" v-model:value="value" placeholder="Email" />
        <AInput class="input" v-model:value="value" placeholder="Password" />
      </AModal>
    </div>
</template>


<style scoped>

    .btn{
        margin-left: 10px;
    }

    .input{
        margin-top: 5px;
    }

</style>