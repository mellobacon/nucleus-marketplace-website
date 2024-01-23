<template>
    <form>
        <Input class="form-input" placeholder="Username" name="username" label="Username" :input_value="username"></Input>
        <Input class="form-input" name="email" label="Email" :input_value="user?.email" disabled></Input>
        <Button class="save-button" label="Save Changes" @click="saveChanges" />
    </form>
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

</script>

<style lang="scss" scoped>
@use "../assets/styles" as style;
form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px 40px;
    width: 100%;
    .form-input {
        width: 100%;
        margin: 3px 0;
    }
    .save-button {
        align-self: flex-end !important;
        margin: 20px 0 0 0;
        width: unset !important;
    }
}
</style>
