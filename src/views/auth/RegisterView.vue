<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Crea una cuenta
  </h1>
  <p class="text-2xl text-white texte-center my-5">
    Crea una cuenta en AppSalon
  </p>

  <FormKit
    @submit="handleSubmit"
    type="form"
    id="registerForm"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto',
      }"
    />

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
      placeholder="Tu password - Minimo 8 caracteres"
      validation="required|length:3"
      :validation-messages="{
        required: 'El password es obligatorio',
        length: 'El password es muy corto',
      }"
    />

    <FormKit
      type="password"
      label="Repetir contrasena"
      name="password_confirm"
      placeholder="Repite tu password"
      validation="required|confirm"
      :validation-messages="{
        required: 'El password es obligatorio',
        confirm: 'Los password no son iguales',
      }"
    />
    <FormKit type="submit">Crear cuenta</FormKit>
  </FormKit>
</template>

<script setup>
    import AuthAPI from '@/api/AuthAPI';
    import { reset } from '@formkit/vue';
    import { inject } from 'vue';

    const toast = inject('toast')

    const handleSubmit = async ({password_confirm, ...formData}) => {
        try{
            const { data } = await AuthAPI.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm')
        }catch(error){
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

</script>
