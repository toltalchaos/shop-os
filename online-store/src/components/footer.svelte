<script>
  import { getContext } from 'svelte';
  const siteData = getContext('siteData');
</script>

<style>
    /* Add your component styles here */
    .footer-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
       
    }
    a{
        color: blue;
    }
</style>
<div class="footer-container" style= "color: {$siteData.textColor}; background-color: {$siteData.primaryColor};">
    <h3>Connect with us:</h3>
    <a href="mailto:{$siteData.contact.email}" >{$siteData.contact.email}</a><br/>
    <a href="/login"  style= "color: {$siteData.textColor};">
      {$siteData.title} manager login
    </a>
</div>

<div class="footer-container" style= "color: {$siteData.textColor}; background-color: {$siteData.primaryColor};">
    <h4>About Shop_os</h4>
    <p>Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 by Braydon Tol and contributors (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!</p>
    <a href="mailto:shop.os.contact@gmail.com">Contact Shop_os</a><br/>
    <a href="https://github.com/toltalchaos/shop-os">Start Your shop HERE</a>

    
</div>
