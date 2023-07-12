import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleLogin(credentials){

    const {email, password} = credentials



    if(!validateEmail(email)){     
      return errorMessage.value = "Email is invalid"
    }

    if(password.length = 0){
      return errorMessage.value = "Password cannot be empty"
    }

    loading.value = true;

    await supabase.auth.signInWithPassword({email, password})
      
    

  }

  async function handleSignup (credentials){
    const {email, password, username} = credentials
    
    if(password.length < 6){
      return errorMessage.value = "Password length is too short"
    }
    if(username.length < 4){
      return errorMessage.value = "Username length is too short"
    }
    if(!validateEmail(email)){     
      return errorMessage.value = "Email is invalid"
    }

   

    const {error} = await supabase.auth.signUp({
      email, 
      password
    })

    if(error){
      return errorMessage.value = error.message
      loading.value = false
    }

    loading.value = true

    const {data: userWithUsername} = await supabase.from("users").select().eq('username', username).single()

    if(userWithUsername){
      return errorMessage.value = "User already registered"
      loading.value = false
    }

    errorMessage.value = ""
   

    await supabase.from("users").insert({
      username,
      email
    })

    const {data: newUser} = await supabase.from("users").select().eq('email', email).single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false
    
  }

  function handleLogout(){
    
  }

  function getUser(){

  }

  function clearErrorMessage(){
    errorMessage.value = " "
  }

  return { user,errorMessage, handleLogin, handleSignup, handleLogout, getUser,clearErrorMessage,loading }
})
