<template>
  <h2 class="text-4xl font-extrabold text-white">Detalles cita y resumen</h2>
  <p class="text-white text-lg">
    A continuacion verifica la informacion y verifica tu cita
  </p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

  <p class="text-white text-2xl" v-if="appointments.noServiceSelected">
    No hay servicios seleccionados
  </p>

  <div v-else class="grid gap-5">
    <SelectedService
      v-for="service in appointments.services"
      :key="service._id"
      :service="service"
    />
    <p class="text-right text-white text-2xl">
      Total a pagar:
      <span class="font-black">
        {{ formatCurrency(appointments.totalAmount) }}
      </span>
    </p>
  </div>

  <div v-if="!appointments.noServiceSelected" class="space-y-8">
    <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker
          :disable-date="disableDate"
          i18n="es-mx"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointments.date"
        />
      </div>
      <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
        <button
          :disabled="appointments.disableTime(hour) ? true : false"
          @click="appointments.time = hour"
          v-for="hour in appointments.hours"
          :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
          class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
        >
          {{ hour }}
        </button>
      </div>
    </div>
    <div class="flex justify-end">
        <button @click="appointments.saveAppointment" v-if="appointments.isValidReservation" type="button" class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white">
            Confirmar reservacion
        </button>
    </div>
  </div>
</template>

<script setup>
    import SelectedService from "@/components/SelectedService.vue";
    import { formatCurrency } from "@/helpers";
    import { useAppointmentsStore } from "@/stores/appointments";
    import { ref } from "vue";

    import VueTailwindDatePicker from "vue-tailwind-datepicker";

    const appointments = useAppointmentsStore();

    const formatter = ref({
    date: "DD/MM/YYYY",
    month: "MMM",
    });

    const disableDate = (date) => {
        const today = new Date()
        return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
    }
</script>
