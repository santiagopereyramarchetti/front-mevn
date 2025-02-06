import { defineStore } from "pinia";
import { ref, computed, onMounted, inject, watch } from "vue";
import AppointmentsAPI from "@/api/AppointmentsAPI.js";
import { convertToISO, convertToDDMMYYY } from "@/helpers/dates.js";
import { useRouter } from "vue-router";

export const useAppointmentsStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter()

    onMounted(() => {
      const startHour = 10
      const endHour = 19
      for(let hour = startHour; hour <= endHour; hour++){
        hours.value.push(hour + ':00')
      }  
    })

    function setSelectedAppointment(appointment){
        services.value = appointment.services
        date.value = convertToDDMMYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
    }

    function onServiceSelected(service){
        if(services.value.some((selectedService) => {
            return selectedService._id === service._id
        })){
            services.value = services.value.filter( (selectedService) => {
                return selectedService._id !== service._id
            })
        }else{
            if(services.value.length === 2){
                alert('Maximo 2 servicios por cita')
                return
            }
            services.value.push(service)
        }

    }

    async function saveAppointment(){
        const appointment = {
            services: services.value.map((service) => { return service._id }),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        if(appointmentId.value){
            try {  
                const { data } = await AppointmentsAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                clearAppointmentData()
                router.push({name: 'my-appointments'})
            } catch (error) {
                console.log(error)
            }
        }else{
            try {  
                const { data } = await AppointmentsAPI.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                clearAppointmentData()
                router.push({name: 'my-appointments'})
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function cancelAppointment(id){
        try {
            const { data } = await AppointmentsAPI.delete(id)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            user.userAppointments = user.userAppointment.filter( (appointment) => {
                return  appointment._id !== id
            })
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    function clearAppointmentData(){
        services.value = []
        date.value = ''
        time.value = ''
        appointmentId.value = ''
    }

    const isServiceSelected = computed(() => {
        return (id) => {
            return services.value.some( (service) => {
                return service._id === id
            })
        }
    })

    const noServiceSelected = computed(() => {
        return services.value.length === 0
    })

    const totalAmount = computed(() => {
        return services.value.reduce((total,service) => {
            return total + service.price
        }, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find((appointment) => {
                return appointment.time === hour
            })
        }
    })

    watch(date, async () => {
        time.value = ''
        if(date === ''){
            return
        }
        const { data } = await AppointmentsAPI.getByDate(date.value)
        if(appointmentId.value){
            appointmentsByDate.value = data.filter((appointment) => {
                return appointment._id !== appointmentId.value
            })
            time.value = data.filter((appointment) => {
                return appointment._id === appointmentId.value
            })[0].time
        }else{
            appointmentsByDate.value = data
        }
    })

    return {
        services,
        date,
        hours,
        time,
        totalAmount,
        noServiceSelected,
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        cancelAppointment,
        clearAppointmentData,
        isServiceSelected,
        isValidReservation,
        isDateSelected,
        disableTime
    }
})