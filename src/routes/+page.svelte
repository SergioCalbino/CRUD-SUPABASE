<script>
    import supabase from '$lib/index';
    import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import suscribeToken from '../+store';

    let email = '';
    let pass = '';
    let token = '';

    //Llamo a theme para poder firmar el token
    token = suscribeToken()

    onMount(() => {
        // Suscríbete al store y redirige si hay un token
        const onsubscribe = token.subscribe(value => {
            if (value) {
                goto('/home');
            }
        });
        return onsubscribe;
    });

    const registrar = async() => {
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: pass
        })
    }
    
    const login = async () => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: pass
        });
        if (user.role === 'authenticated') {
            localStorage.setItem('token', session.access_token);
            // Actualiza el valor del store
            token.set(session.access_token);
        }
    }
</script>
<div class="p-10 card bg-blue-200" >
    <div class="form-control">
        <label class="label" for="email">
            <span class="label-text" >Email</span>
        </label>
            <input type="email" id='email' placeholder="Email" bind:value={email} class="input input-bordered" />
        
        <label class="label" for="pass">
            <span class="label-text">Password</span>
        </label>
            <input type="password" id='pass' placeholder="password" bind:value={pass} class="input input-bordered" autocomplete="off" />
            <div class="flex flex-wrap gap-4" >
                <button class="btn mt-5 bg-slate-600 text-white" on:click={login}>Iniciar sesión</button>
                <button class="btn mt-5 bg-slate-600 text-white " on:click={registrar}>Registrar</button>
            </div>
    </div>

</div>

