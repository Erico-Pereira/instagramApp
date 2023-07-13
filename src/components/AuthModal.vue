<script setup>
    import { ref , defineProps, reactive} from 'vue';
    import {useUserStore} from "../stores/users"
    import {storeToRefs} from "pinia"

        const userStore = useUserStore()

        const {errorMessage, loading, user} = storeToRefs(userStore)
        const props = defineProps(['isLogin'])
        const visible = ref(false);

        const userCredential = reactive({
            email: "",
            password: "",
            username: ""
        })

        const showModal = () => {
            visible.value = true;
           // userStore.getUser()
        };

        function clearCredential(){

            userCredential.email = ""
            userCredential.password = ""
            userCredential.username = ""
            userStore.clearErrorMessage()

        }

        const handleOk = async (e) => {
            if(props.isLogin){
                await userStore.handleLogin({
                    password: userCredential.password,
                    email: userCredential.email
                })
            }else{
                await userStore.handleSignup(userCredential);
            }

           if(user.value){
                clearCredential()
                visible.value = false
           }
        };

        function handleCancel(){
            userStore.clearErrorMessage()
            visible.value = false
        }

        const title = props.isLogin ? 'Login' : 'Signup'
        
</script>

<template>
    <div>
      <AButton type="primary" @click="showModal" class="btn">{{title}}</AButton>
      <AModal v-model:visible="visible" :title="title" @ok="handleOk">
        <template #footer>
            <AButton key="back" @click="handleCancel">Cancel</AButton>
            <AButton :disable="loading" key="submit" type="primary" :loading="loading" @click="handleOk">Submit</AButton>
        </template>
        <div v-if="!loading" class="inputContainer">
            <AInput class="input" v-if="!isLogin" v-model:value="userCredential.username" placeholder="Usermane" />
            <AInput class="input" v-model:value="userCredential.email" placeholder="Email" />
            <AInput class="input" v-model:value="userCredential.password" placeholder="Password" type='password' />
        </div>
        <div v-else class="spinner">
            <ASpin />
        </div>
        <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
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

    .inputContainer{
        height: 120px;
    }

    .spinner{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;

    }

</style>