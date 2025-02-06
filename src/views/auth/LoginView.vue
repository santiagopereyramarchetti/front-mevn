<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Iniciar sesion
    </h1>
    <p class="text-2xl text-white texte-center my-5">
      Si tienes una cuenta, inicia sesion
    </p>
  
    <FormKit
      @submit="handleSubmit"
      type="form"
      id="loginForm"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
    >

      <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Tu email"
        validation="required|email"
        :validation-messages="{
          required: 'El email es obligatorio',
          email: 'Email no valido',
        }"
      />
  
      <FormKit
        type="password"
        label="Contrasena"
        name="password"
        placeholder="Tu password"
        validation="required"
        :validation-messages="{
          required: 'El password es obligatorio'
        }"
      />
  
      <FormKit type="submit">Iniciar sesion</FormKit>
    </FormKit>
  </template>
  
  <script setup>
      import AuthAPI from '@/api/AuthAPI';
      import { inject } from 'vue';
      import { useRouter } from 'vue-router';
  
      const toast = inject('toast')
      const router = useRouter()
  
      const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthAPI.login(formData)
            localStorage.setItem('AUTH_TOKEN', token)
            router.push({name: 'my-appointments'})
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
      }
  
  </script>
  