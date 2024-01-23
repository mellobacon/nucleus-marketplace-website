<template>
    <div class="login">
        <div class="form">
            <h2>Log In</h2>
            <div>Dont have an account? <NuxtLink to="/account/register">Register</NuxtLink></div>
            <form novalidate @submit.prevent="handleLogin">
                <Input type="email" class="form-input" placeholder="Email" name="email" label="Email"></Input>
                <span class="password form-input">
                    <Input type="password" placeholder="Password" name="password" label="Password"></Input>
                    <span class="password-options">
                        <Checkbox name="remember" label="Remember Me"></Checkbox>
                        <NuxtLink to="/account/forgot-password" class="forgot-password">Forgot password?</NuxtLink>
                    </span>
                </span>
                <Button type="submit" class="login-button" label="Log In" />
            </form>
            <div class="divider"></div>
            <div class="button-group">
                <Button width="200" label="Log In With Github" outlined></Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo('/account');
  }
});

const client = useSupabaseClient();

const { handleSubmit, setFieldError } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            email: z.string({required_error: "Email required"}),
            password: z.string({required_error: "Password required"})
        })
    )
})
function validate(values) {
    let valid = true;
    if (!z.string().email("Not valid email").safeParse(values.email).success) {
        setFieldError("email", "Email is not valid")
        valid = false;
    }
    if (!z.string().min(8, "Min length must be 8").safeParse(values.password).success) {
        setFieldError("password", "Min length must be 8")
        valid = false;
    }
    return valid;
}
const handleLogin = handleSubmit(async values => {
    try {
        let v_error = !validate(values);
        if (v_error) return;

        const { error } = await client.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })
        if (error) {
            throw error;
        }
    } catch (error: any) {
        alert(error.message)
    }
});
</script>

<style lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        margin: 50px 0;
        .form {
            padding: 25px 40px;
            width: 40%;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 15px;
            form {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                .password {
                    display: inherit;
                    flex-direction: column;
                    align-items: start;
                    justify-content: center;
                    width: 100%;
                }
                .password-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 20px;
                }
                .input {
                    width: 100%;
                    margin: 3px 0;
                }
            }
        }
        .button-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .divider {
            height: 0.8px;
            width: 100%;
            background-color: red;
            margin: 15px 0;
            overflow: hidden;
            display: block;
        }
        .forgot-password {
            font-size: 0.7rem;
        }
        .login-button {
            width: 100% !important;
        }
    }
</style>