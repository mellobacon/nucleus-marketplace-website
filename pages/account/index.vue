<template>
    <div class="user-account">
        <div class="menu">
            <PrimeTabMenu v-model:activeIndex="active" :model="items" />
            <Button class="save-button" label="Sign Out" @click="signOut" />
        </div>
        <div class="menu-view">
            <h3>{{ items.at(active)?.label }}</h3>
            <div class="divider"></div>
            <AccountGeneral v-if="active === 0" />
            <AccountManageExtensions v-else-if="active === 1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const user = useSupabaseUser();
const client = useSupabaseClient();

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            username: z.string({required_error: "Username required"})
        })
    )
})

const username = ref("");

if (user.value) {
    const { data } = await client
        .from('profiles')
        .select(`username`)
        .eq('id', user.value.id)
        .single()

    if (data) username.value = data.username;
}

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/account/login');
  }
});

const saveChanges = handleSubmit(async values => {
    const info = {
        "username": values.username,
        "updated_at": new Date()
    }

    const {error} = await client.from("profiles").update(info, {returning: "minimal"}).eq("id", user.value!.id);
    if (error) throw error;
    alert("profile updated");
})

async function signOut() {
    const {error} = await client.auth.signOut();
    if (error) throw error;
    user.value = null;
}

const active = ref(0);
const items = ref([
    { label: 'General' },
    { label: 'Manage Extensions' }
]);
</script>

<style lang="scss">
@use "../assets/styles" as style;
.user-account {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 50px 0;
    gap: 20px;
    .menu {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
    }
    .menu-view {
        border-left: solid 1px gray;
        width: 40%;
        h3, .divider {
            margin-left: 35px;
        }
        .divider {
            display: block;
            width: 100%;
            height: 1px;
            background-color: gray;
        }
    }
    .form-input {
        width: 100%;
        margin: 3px 0;
    }
    .save-button {
        width: 100% !important;
        margin: 50px 0;
    }
    .p-menuitem-link {
        border: none;
        border-left: solid #eaeaea 2px;
        border-radius: 0px;
    }
    .p-tabmenuitem.p-highlight .p-menuitem-link {
        border-color: style.$primary;
        color: style.$primary;
    }
    .p-tabmenu-nav {
        flex-direction: column;
        border: none;
        overflow: hidden;
    }
}
</style>