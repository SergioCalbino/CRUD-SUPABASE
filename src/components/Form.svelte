<script>
    import supabase from '$lib/index';
    import { browser } from '$app/environment';
	import Alert from './Alert.svelte';
    import { goto } from '$app/navigation';

    let email = '';
    export let titulo = '';
    export let texto = '';
    export let id = '';
    let user = null;
    let alert = false

    if (browser) {
        const authUser = supabase.auth.user();
        if (authUser) {
            email = authUser.email;
            user = authUser;
        }
    }
    
    const savePost = async () => {
        if (user && user.role === 'authenticated') {
            const newPost = await supabase.from('posts').insert({
                titulo: titulo,
                texto: texto,
                email: email
            });
            if (newPost.status == 201) {
                titulo = '';
                texto = '';
                alert = true
            }
            setTimeout(() => {
                alert = false
            }, 3000);
        } else {
            console.error("El usuario no está autenticado o no tiene el rol 'authenticated'.");
        }
    }

    const editPost = async () => {
        const edit = await supabase
        .from('posts')
        .update({
            titulo: titulo,
            texto: texto
        })
        .match({id: id})
        if (edit.status == 200) {
            goto('/home')
        }
    }
    
</script>

<div class="form-control">
    <label for="titulo" class="label">
        <span class="label-text">Titulo</span>
    </label>
    <input type="text" id="titulo" bind:value={titulo} placeholder="Titulo" autocomplete="off" class="input input-primary input-bordered"/>
    <label for="texto" class="label">
        <span class="label-text">Contenido</span>
    </label>
    <textarea name="texto" id="texto" cols="30" rows="10" bind:value={texto} class="textarea h-24 textarea-bordered textarea-primary" placeholder="Contenido"></textarea>
    <input type="hidden" bind:value={id} />
    {#if id == ''}
        <button class="btn btn-secondary mt-3" on:click={savePost}>Guardar Post</button>
    {:else}
        <button class="btn btn-secondary mt-3" on:click={editPost}>Editar Post</button>

    {/if}
    
    <div class="mt-2">
        {#if alert}
        <!-- content here -->
            <Alert />
            
        {/if}

    </div>
</div>