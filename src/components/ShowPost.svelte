<script>
    import supabase from '$lib/index';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import Swal from 'sweetalert2';
    import 'sweetalert2/dist/sweetalert2.css'
    let email = '';
    let posts = [];
    if (browser) {
        email = supabase.auth.user().email
    }

    onMount( async () => {
        let { data } = await supabase
        .from('posts')
        .select('*')
        .order('id', {ascending: false})
        // .eq('email', email);
        posts = data
    })

    //Funciones para eliminar
    const alertDelete = (id) => {
        Swal.fire({
            title: '¿Estas Seguro que deseas elminar el post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
            }).then((result) => {
            if (result.isConfirmed) {
                deletePost(id)
            }
})
    }

    const deletePost = async (id) => {
        await supabase.from('posts').delete().match({id: id})
        location.reload();
    }
</script>

{#each posts as item}
    <div class="card card-side bg-base-100 shadow-xl mt-4">
            <figure><img src="https://picsum.photos/id/1005/400/250" alt="Sin imagen"/></figure>
                <div class="card-body">
                <h2 class="card-title">{item.titulo}</h2>
                <p>{item.texto}</p>
                <div class="card-actions justify-end">
                    {#if email == item.email}
                    <!-- content here -->
                        <a href={`/edit/${item.id}`} class="btn btn-secondary w-full">Editar</a>
                        <button class="btn btn-error w-full" on:click={alertDelete(item.id)}>Eliminar</button>
                    {/if}
            </div>
            </div>
    </div>
        {:else}
        <p>No hay posts...</p>
{/each}