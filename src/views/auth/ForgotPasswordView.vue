<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
        Olvide mi password
    </h1>
    <p class="text-2xl text-white texte-center my-5">
      Recupera el acceso a tu cuenta
    </p>

    <FormKit
      @submit="handleSubmit"
      type="form"
      id="forgotPassword"
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

    <FormKit type="submit">Enviar</FormKit>
    </FormKit>
</template>

<script setup>
    import AuthAPI from '@/api/AuthAPI';
    import { inject } from 'vue';
    import { reset } from '@formkit/core'

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const { data } = await AuthAPI.forgotPassword({email})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('forgotPassword')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>