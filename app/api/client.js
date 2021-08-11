import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://digitdeveloper.online/netflix/welcome'
})

export default apiClient