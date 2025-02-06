<template>
    <div v-if="validToken">
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">
            Nuevo password
        </h1>
        <p class="text-2xl text-white texte-center my-5">
        Coloca tu nuevo password
        </p>

        <FormKit
        @submit="handleSubmit"
        type="form"
        id="forgotPassword"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        >

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

        <FormKit type="submit">Guardar password</FormKit>
        </FormKit>
    </div>
    <p class="text-center text-white text-2xl font-black">
        Token no valido
    </p>
</template>

<script setup>
    import { onMounted, inject, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()

    const { token } = route.params
    
    const validToken = ref(false)

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.verifyPasswordResetToken(token)
            validToken.value = true
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })

    const handleSubmit = async ({password}) => {
        try {
            const { data } = await AuthAPI.updatePassword(token, {password})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({name: 'login'})
            }, 3000)
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>