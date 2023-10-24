<script>
    import { page } from '$app/stores';
    import supabase from '$lib/index';
    import { onMount } from 'svelte';
	import Form from '../../../components/Form.svelte';

    let id = $page.params.id
    let titulo = '';
    let texto = '';

    onMount(async () => {
        let { data } = await supabase.from('posts').select('*').eq('id', id);
        titulo = data[0].titulo;
        texto = data[0].texto;
    })
</script>

<h1 class="text-7xl" >Editar post</h1>

<Form {titulo} {texto} {id} />