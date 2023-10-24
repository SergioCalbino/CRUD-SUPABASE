import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const suscribeToken = () => {
	const defaultValue = '';
	const initialValue = browser ? window.localStorage.getItem('token') ?? defaultValue : defaultValue;
	 
	const token = writable(initialValue);
	return token

}
 
 
export default suscribeToken;