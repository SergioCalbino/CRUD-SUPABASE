<script>
     import supabase from '$lib/index';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    let salir = '';
    let token = '';
    if (browser) {
        token = localStorage.getItem('token')
    }

    $: {
        if (token === null) {
            salir = false
            
        } else {
            salir = true
        }
    }

    const signOut = async() => {
        salir = false;
        localStorage.removeItem('token')
        await supabase.auth.signOut()
        goto('/')
    }

</script>

<div class="navbar bg-gray-600 text-white">
    <div class="navbar-start">
        <div class="dropdown">
            {#if salir}
                 <!-- content here -->
                 <button class="btn  lg:hidden" aria-label="Abrir menú">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                 </button>
                 <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-500 rounded-box w-52">
                     <li><a href="/home">Home</a></li>
                     <li><a href="/post">Post </a></li>
                     <li><a href="/" on:click={signOut} >Salir</a></li>
                 </ul>
            {/if}
        </div>
        <p class="btn btn-ghost normal-case text-xl">Crud Supabase</p>
    </div>
    <div class="navbar-center hidden lg:flex">
        {#if salir}
            <ul class="menu menu-horizontal px-1">
                <li><a href="/home">Home</a></li>
                <li><a href="/post">Post </a></li>
                <li><a href="/" on:click={signOut}>Salir</a></li>
            </ul>
        {/if}
    </div>
</div>

