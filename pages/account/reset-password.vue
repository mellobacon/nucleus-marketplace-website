<template>
    <div class="forgot-password">
        <h2>Account</h2>
        <form>
            <Input type="password" placeholder="Password" name="password" label="Password"></Input>
            <Input type="password" placeholder="Confirm Password" name="c_password" label="Confirm Password"></Input>
            <Button class="save-button" label="Reset Password" @click="resetPassword" />
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

const { handleSubmit, setFieldError } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            password: z.string({required_error: "Password required"}),
            c_password: z.string({required_error: "Password required"})
        })
    )
})

watchEffect(() => {
  if (!user.value) {
    //return navigateTo('/account/login');
  }
});

function validate(values) {
    let valid = true;
    if (!z.string().min(8, "Min length must be 8").safeParse(values.password).success) {
        setFieldError("password", "Min length must be 8")
        valid = false;
    }
    if (values.password !== values.c_password) {
        setFieldError("password", "These fields must match")
        setFieldError("c_password", "These fields must match")
        valid = false;
    }
    return valid;
}

const resetPassword = handleSubmit(async values => {
    let v_error = !validate(values);
    if (v_error) return;

    const { error } = await client.auth.updateUser({
        password: values.password
    })
    if (error) throw error;
    alert("Password reset. Redirecting...");
    user.value = null;
    navigateTo("/account/login")
})
</script>

<style scoped lang="scss">
.forgot-password {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 50px 0;
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
}
</style>