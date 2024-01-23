<template>
    <div class="confirm">
        Check email for confirmation message or whatever idk......man
    </div>
</template>

<script setup>

const user = useSupabaseUser();

watchEffect(() => {
    if (user.value) {
        navigateTo("/account/login"); 
    }
})

</script>