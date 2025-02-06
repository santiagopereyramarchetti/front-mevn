<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'new-appointment' ? 'text-white bg-blue-500' : 'bg-white text-blue-500'"
      :to="{ name: 'new-appointment' }"
    >
      Servicios
    </RouterLink>
    <RouterLink
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'appointment-details' ? 'text-white bg-blue-500' : 'bg-white text-blue-500'"
      :to="{ name: 'appointment-details' }"
    >
      Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-8">
    <RouterView />
  </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { useAppointmentsStore } from '@/stores/appointments';
    import { onMounted } from 'vue';

    const route = useRoute()
    const appointments = useAppointmentsStore()

    onMounted(() => {
      appointments.clearAppointmentData()
    })
</script>
