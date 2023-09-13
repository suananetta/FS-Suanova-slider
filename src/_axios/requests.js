import axios from 'axios';

const ACCESS_KEY = 'iyLGwBatZuSMasrcr0XOFh-NxRAYbp_HrEt7dNRXYyA';

const BASE_URL = `https://api.unsplash.com/photos`;

const picsApi = axios.create({
    baseURL: BASE_URL,
});

export const getPicsRequest = () => {
    return picsApi.get(`?client_id=${ACCESS_KEY}`);
}
