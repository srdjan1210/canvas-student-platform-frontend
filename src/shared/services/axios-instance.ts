import { useApplicationStore } from "../../store/application.store";
import axios from "axios"

const defaultHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
}

export function getAxios() {
    console.log(process.env.REACT_APP_BACKEND_URL)
    const token = useApplicationStore.getState().token
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
        },
    })
}