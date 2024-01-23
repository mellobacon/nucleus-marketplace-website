<template>
    <div class="register">
        <div class="form">
            <h2>Register</h2>
            <div>Already have an account? <NuxtLink to="/account/login">Log In</NuxtLink></div>
            <form novalidate @submit.prevent="handleRegister">
                <Input type="email" class="form-input" placeholder="Email" name="email" label="Email"></Input>
                <span class="password form-input">
                    <Input type="password" placeholder="Password" name="password" label="Password"></Input>
                    <Input type="password" placeholder="Confirm Password" name="c_password" label="Confirm Password"></Input>
                </span>
                <Button type="submit" class="login-button" label="Sign Up" />
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

const client = useSupabaseClient();

const { handleSubmit, setFieldError } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            email: z.string({required_error: "Email required"}),
            password: z.string({required_error: "Password required"}),
            c_password: z.string({required_error: "Password required"})
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
    if (values.password !== values.c_password) {
        setFieldError("password", "These fields must match")
        setFieldError("c_password", "These fields must match")
        valid = false;
    }
    return valid;
}
const handleRegister = handleSubmit(async values => {
    try {
        let v_error = !validate(values);
        if (v_error) return;

        const { error } = await client.auth.signUp({
            email: values.email,
            password: values.password
        })
        if (error) {
            throw error;
        }
        else {
            navigateTo("/account/confirm-email")
        }
    } catch (error: any) {
        alert(error.error_description || error.message)
    }
});
</script>

<style lang="scss">
    .register {
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