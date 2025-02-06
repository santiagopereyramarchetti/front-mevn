<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment' ? 'text-white bg-blue-500' : 'bg-white text-blue-500'"
      :to="{ name: 'edit-appointment' }"
    >
      Servicios
    </RouterLink>
    <RouterLink
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment-details' ? 'text-white bg-blue-500' : 'bg-white text-blue-500'"
      :to="{ name: 'edit-appointment-details' }"
    >
      Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-8">
    <RouterView />
  </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted } from 'vue';
    import AppointmentsAPI from '@/api/AppointmentsAPI';
    import { useAppointmentsStore } from '@/stores/appointments';

    const route = useRoute()
    const router = useRouter()
    const appointments = useAppointmentsStore()

    const { id } = route.params

    onMounted(async () => {
      try {
        const { data } = await AppointmentsAPI.getById(id)
        appointments.setSelectedAppointment(data)
      } catch (error) {
        router.push({name: 'my-appointments'})
      }
    })
</script>
