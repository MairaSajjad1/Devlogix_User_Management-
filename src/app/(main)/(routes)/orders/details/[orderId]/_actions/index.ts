import { getServerAuthSession } from "@/lib/auth"
import axios from "axios"



export const getSpecificOrder = async (orderId: number) => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

