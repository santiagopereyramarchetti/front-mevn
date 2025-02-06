<template>
  <div
    @click="appointments.onServiceSelected(service)"
    :class="
      appointments.isServiceSelected(service._id)
        ? 'bg-blue-500 text-white'
        : 'bg-white'
    "
    class="p-5 space-y-5 rounded-lg cursor pointer"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p
      :class="
        appointments.isServiceSelected(service._id)
          ? 'bg-blue-500 text-white'
          : 'text-blue-600'
      "
      class="text-4xl font-black"
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>

<script setup>
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

const appointments = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
  },
});
</script>
