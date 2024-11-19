<script>
    // to use this component, pass in a boolean value to the open prop as well as slots for the head and details
    import { slide } from 'svelte/transition';
    export let open = false
      const handleClick = () => open = !open
  </script>
  
  <div class="accordion-item">
      <div class="header">
          <button on:click={handleClick} >
            <div class="text">
                <slot name="head"></slot>	
            </div>
              <!-- {open ? 'close' : 'open'} -->
          </button>
      </div>
      
      {#if open}
      <div class="details" transition:slide>
          <slot name="details">
          </slot>
      </div>
      {/if}
  </div>
  
  <style>
      div.accordion-item {
          margin: 1rem 0;
      }
      
      div.header, button {
          display:flex;
          justify-content: space-evenly;
            align-items: center;
          width:100%;
          min-height: 3rem;
      }
      
      div.header .text {
          flex: 1;
          margin-right: 5px;
      }
      
      div.details {
          background-color: #cecece;
          padding:1rem;
      }
  </style>
  