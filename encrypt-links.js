import CryptoJS from 'crypto-js';

const rawLinksData = [
  {
    id: 1,
    name: 'AyurCentral Admin',
    url: 'https://admin.ayurcentral.in',
    loginUrl: 'https://admin.ayurcentral.in/login',
    username: 'admin@ayurcentral.in',
    password: 'P@ssw0rd123',
  },
  {
    id: 2,
    name: 'Grafana Dashboard',
    url: 'https://grafana.example.com',
    loginUrl: 'https://grafana.example.com/login',
    username: 'viewer',
    password: 'viewer-pass',
  },
  {
    id: 3,
    name: 'Grafana Dashboard link',
    url: 'https://grafana.example.com',
    loginUrl: 'https://grafana.example.com/login',
    username: 'viewer',
    password: 'viewer-pass',
  },
];

const ACCESS_KEY = 'AyurDashb0ard2o25@';

const encryptedPayload = CryptoJS.AES.encrypt(
  JSON.stringify(rawLinksData),
  ACCESS_KEY,
).toString();

console.log(encryptedPayload);

