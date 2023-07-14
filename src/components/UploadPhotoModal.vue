<script setup>

    import {ref, defineProps } from 'vue';
    import { supabase } from '../supabase';
    import { useUserStore } from '../stores/users';
    import { storeToRefs } from 'pinia';


    const userStore = useUserStore()

    const {user} = storeToRefs(userStore)

 
    const visible = ref(false);
    const errorMessage = ref("")
    const caption = ref("")
    const file = ref(null)
    const loading = ref(false)
    const props = defineProps(['addNewPost'])

    const showModal = () => {
        visible.value = true;
    }

    const handleOk = async (e) => {
        loading.value = true
        const fileName = Math.floor(Math.random() * 100000000000000)
        let filePath

       if(file.value){
           const {data, error} =  await supabase.storage.from("images").upload('public/' + fileName, file.value)

            if(error){
                loading.value = false
                return errorMessage.value = "Unable to upload image"
            }

            filePath = data.path
            const res = await supabase.from("posts").insert({
                url: filePath ,
                caption: caption.value,
                owner_id: user.value.id
            })
       }
       loading.value = false
       visible.value = false
       caption.value = ""

       props.addNewPost({
                url: filePath,
                caption: caption.value,
       })
    }

    function handleUploadChange(e){
        if(e.target.files[0]){
             file.value = e.target.files[0]
         }
    }
   

</script>


<template>
    <div>
      <AButton @click="showModal">Upload Photo</AButton>
      <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
            <div v-if="!loading">
                <input type="file" accept=".jpeg,.png,.jpg" @change="handleUploadChange" />
                <AInput v-model:value="caption" placeholder="Caption..." :maxLength="50" />
                <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
            </div>
            <div class="spiner" v-else>
                <ASpin />
            </div>
      </AModal>
    </div>
  </template>

<style scoped>
    input{
        margin-top: 10px;
    }

    .spiner{
        display: flex;
        align-items: center;
        justify-content: center;
    }


</style>