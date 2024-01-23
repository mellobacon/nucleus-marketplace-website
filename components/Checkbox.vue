<template>
    <div class="checkbox">
        <PrimeCheckbox v-model="value" :inputId="name" :name="name" :value="value" :binary="true" />
        <label v-if="label" :for="name">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {default: "label"},
    name: {type: String, required: true},
    value: {type: String, default: ""}
})

const emit = defineEmits(['update:modelValue'])
const { value, errorMessage } = useField(() => props.name);
</script>

<style lang="scss">
.checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    .p-checkbox, .p-checkbox-box {
        width: 16px;
        height: 16px;
    }
    .p-checkbox-icon.p-icon {
        width: 10px;
        height: 11px;
    }
    label {
        font-size: 13px;
        font-weight: 300;
    }
}
</style>