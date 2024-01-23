<template>
    <nav class="navbar">
        <NuxtLink to="/" class="navbar-logo">
            <img src="/favicon.ico" alt="icon">
            Nucleus Marketplace
        </NuxtLink>

        <div class="navbar-nav">
            <div class="link" @click="handleClick">
                <NuxtLink to="/">Extensions</NuxtLink>
            </div>
            <div class="link" @click="handleClick">
                <NuxtLink to="/">Themes</NuxtLink>
            </div>
            <div class="link" @click="handleClick">
                <NuxtLink to="/">Build Your Own</NuxtLink>
            </div>
            <div class="divider"></div>
            <div class="link" v-if="!is_loggedin">
                <NuxtLink to="/account/login">Login</NuxtLink>
            </div>
            <div class="link account-link" v-else>
                <NuxtLink to="/account/" class="account">
                    <IconsUserIcon/>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const is_loggedin = ref(false);
    const user = useSupabaseUser();
    watchEffect(() => {
        if (user.value) {
            is_loggedin.value = true;
        }
        else {
            is_loggedin.value = false;
        }
    })

    function handleClick(e: any) {
        let target = e.target.parentElement as HTMLElement;
        if (target.className.includes("active")) {
            return;
        }
        let active = document.querySelector(".link.active");
        active?.classList.remove("active");
        target.classList.add("active");
    }
</script>

<style lang="scss" scoped>
@use "../assets/styles" as style;

.navbar {
    background-color: style.$nav-background-color;
    min-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 18px;
    color: style.$nav-text-color;
    a {
        text-decoration: none;
        color: style.$nav-text-color;
    }
    .divider {
        width: 0.8px;
        height: 23px;
        background-color: style.$nav-text-color;
    }
    .navbar-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        color: style.$nav-text-color;
        img {
            width: 35px;
            height: 35px;
            margin-right: 5px;
        }
    }
    .navbar-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        .link {
            padding: 0 20px;
            a {
                &:hover {
                    color: style.$nav-text-hover;
                }
            }
            &.active a {
                color: style.$nav-text-active;
            }
        }
        .account-link {
            padding: 0 10px;
        }
    }
    .account {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
