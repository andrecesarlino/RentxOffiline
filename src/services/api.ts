import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.132:3333',
});

export {api};

//baseURL: 'http://192.168.0.109:3333',
//baseURL: 'https://unidavi.edu.br',