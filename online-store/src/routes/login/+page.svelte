<script>
    import { authenticate_user } from '../../server/firebaseClient';
	import { goto } from '$app/navigation';
    let username = '';
    let password = '';


    function validateLogin() {
        // Perform login logic here
        let authenticated= authenticate_user({username, password}).then((response) => {
            if (response) {
                return true;
            }
            else {
                return false;
            }
        });
        return authenticated;
    }

    async function handleLogin() {
        // Perform login logic here
        // authenticate and save data to local storage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);//this is insecure and needs to be removed in production
        
        const isValid = await validateLogin();
        if (isValid) {
            //redirect to siteManagement page if login is valid
            goto('/siteManagement');
        }
        else {
            // show an alert if login is invalid
            alert('Invalid login credentials');
            username = '';
            password = '';
        }
        
    }
</script>

<div class="login-window">

    <h1>Login</h1>
    <form on:submit|preventDefault={handleLogin}>
        <label>
            Username:
            <input type="text" bind:value={username} />
        </label>
        <label>
            Password:
            <input type="password" bind:value={password} />
        </label>
        <button type="submit">Login</button>
    </form>

</div>


<style>
    .login-window{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem auto;
        padding: 1rem;
        width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    h1 {
        margin-bottom: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>