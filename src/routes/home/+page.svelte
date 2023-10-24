<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
	import ShowPost from '../../components/ShowPost.svelte';
    let token = ''
    if (browser) {
        token = localStorage.getItem('token')
        if (token == null) {
            goto('/')
        }
    }
</script>

<h1 class="text-7xl" >Bienvenido</h1>

<ShowPost/>
