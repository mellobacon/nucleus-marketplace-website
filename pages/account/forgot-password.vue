<template>
    <div class="forgot-password">
        <h2>Account</h2>
        <form>
            <Input class="form-input" name="email" label="Email" :input_value="user?.email" hint_text="Enter email to reset password"></Input>
            <Button class="save-button" label="Send Password Reset" @click="sendPassReset" />
        </form>
        <hr>
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
            email: z.string({required_error: "Email required"})
        })
    )
})

watchEffect(() => {
  if (user.value) {
    return navigateTo('/account/login');
  }
});

const sendPassReset = handleSubmit(async values => {
    const {error} = await client.auth.resetPasswordForEmail(values.email)
    if (error) {alert(error?.message); throw error;}
    alert("Password reset instructions sent to email");
})

</script>

<style scoped>
.forgot-password {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 50px 0;
}
form {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px 40px;
    width: 40%;
}
.form-input {
    width: 100%;
    margin: 3px 0;
}
.save-button {
    width: 100% !important;
    margin: 20px 0;
}
</style>