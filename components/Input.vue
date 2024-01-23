<template>
    <div class="input">
        <label v-if="label" :for="name">{{ label }}</label>
        <span :class="{ 'p-input-icon-right': icon_right, 'p-input-icon-left': icon_left }">
            <slot></slot>
            <PrimePassword v-if="type === 'password'" :class="{'p-invalid': errorMessage}" :id="name" v-model="value" :placeholder="placeholder" :feedback="false" toggleMask style="width: 100%;" />
            <PrimeInputText v-else :class="{'p-invalid': errorMessage}" :type="type" :id="name" v-model="value" :placeholder="placeholder" :disabled="disabled" style="width: 100%;" />
        </span>
        <small v-if="errorMessage" class='p-error'>{{ errorMessage }}</small>
        <small v-else>{{ hint_text }}</small>
    </div>
</template>

<script setup>

const props = defineProps({
    icon_left: { type: Boolean },
    icon_right: { type: Boolean },
    icon_color: { type: String },
    placeholder: { type: String },
    label: { type: String },
    hint_text: { type: String },
    name: { type: String, required: true },
    type: { type: String, default: "text" },
    disabled: {type: Boolean, default: false},
    input_value: {type: String}
})

const emit = defineEmits(['update:modelValue'])
const { value, errorMessage } = useField(() => props.name);

value.value = props.input_value || "";

</script>

<style lang="scss">
.input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    .p-password-input {
        width: 100%;
    }
    span {
        width: 100%;
    }
    label {
        font-size: 13px;
        font-weight: 300;
    }
    small {
        font-size: 0.7rem;
    }
}
</style>