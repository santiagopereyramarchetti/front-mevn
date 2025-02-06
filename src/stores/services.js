import { defineStore } from "pinia";
import { ref, onMounted } from 'vue'
import ServiesAPI from "@/api/ServiesAPI";

export const useServiceStore = defineStore('services', () => {

    const services = ref([])

    onMounted(async () => {
        try {
            const { data } = await ServiesAPI.all()
            services.value = data
        } catch (error) {
            console.log(error)
        }
    })

    return {
        services
    }
})