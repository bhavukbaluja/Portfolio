import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_AUTH from './API_AUTH'; // Adjust the import path as needed
import { URL_CONFIG } from '../../_constants/Config/URL_CONFIG';
import { createBrowserHistory } from "history";

// Create a new instance of the axios mock adapter
const mock = new MockAdapter(axios);
const history = createBrowserHistory();

describe('API_AUTH Interceptors', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        // Reset history location to '/'
        history.push('/');
    });

    it('should add Authorization header with token if authToken exists in localStorage', () => {
        const authToken = 'yourAuthToken';
        localStorage.setItem('authToken', authToken);
        console.log('authToken', authToken)
        
        // Mock a GET request to test the interceptor
        mock.onGet(`${URL_CONFIG.API_URL}automation.json`).reply(200, {});

        return API_AUTH.get('/automation.json').then((response) => {
            // Check if the Authorization header is set correctly
            expect(response.config.headers.Authorization).toBe(`Bearer ${authToken}`);
        });
    });

    it('should remove authToken and auth_user from localStorage and redirect to /auth/login on 401 response', () => {
        localStorage.setItem('authToken', 'yourAuthToken');
        localStorage.setItem('auth_user', 'yourAuthUser');

        // Mock a 401 response to test the interceptor
        mock.onGet(`${URL_CONFIG.API_URL}/some-endpoint`).reply(401);

        return API_AUTH.get('/some-endpoint').catch(() => {
            // Check if the items were removed from localStorage
            expect(localStorage.getItem('authToken')).toBeNull();
            expect(localStorage.getItem('auth_user')).toBeNull();
            // Check if the history location was updated to /auth/login
            expect(history.location.pathname).toBe('/auth/login');
        });
    });

    it('should remove authToken and auth_user from localStorage on a 401 response error', () => {
        localStorage.setItem('authToken', 'yourAuthToken');
        localStorage.setItem('auth_user', 'yourAuthUser');

        // Mock a 401 response error to test the interceptor
        mock.onGet(`${URL_CONFIG.API_URL}/some-endpoint`).networkError();

        return API_AUTH.get('/some-endpoint').catch(() => {
            // Check if the items were removed from localStorage
            expect(localStorage.getItem('authToken')).toBeNull();
            expect(localStorage.getItem('auth_user')).toBeNull();
        });
    });

    it('should not modify the request if authToken does not exist in localStorage', () => {
        localStorage.removeItem('authToken');

        // Mock a GET request to test the interceptor
        mock.onGet(`${URL_CONFIG.API_URL}/some-endpoint`).reply(200, {});

        return API_AUTH.get('/some-endpoint').then((response) => {
            // Check if the Authorization header is not set
            expect(response.config.headers.Authorization).toBeUndefined();
        });
    });
});
