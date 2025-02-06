import AuthAPI from "@/api/AuthAPI";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import AppointmentsAPI from "@/api/AppointmentsAPI";

export const useUserStore = defineStore('user', () => {

    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])
    const loading = ref(true)

    onMounted(async () => {
        try{
            const { data } = await AuthAPI.auth()
            user.value = data
            await getUserAppointments()
        } catch(error){
            console.log(error)
        }finally{
            loading.value = false
        }
    })

    async function getUserAppointments(){
        const { data } = await AppointmentsAPI.getUserAppointments(user.value._id)
        userAppointments.value = data
    }

    const getUserName = computed(() => {
        return user.value?.name ? user.value?.name : ''
    })

    function logout(){
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const noAppointments = computed(() => {
        return userAppointments.value.length === 0
    })

    return {
        user,
        userAppointments,
        noAppointments,
        getUserName,
        logout,
        loading
    }

})