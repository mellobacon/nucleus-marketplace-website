<template>
    <PrimeButton class="button" :class="b_style, {'outlined': outlined}" :label="label" :iconPos="icon_pos" :loading="loading" :link="link" :style="{width: width + 'px', height: height + 'px'}">
        <slot></slot>
    </PrimeButton>
</template>

<script setup lang="ts">
    import type { PropType } from 'vue';
    type IconPos = "right" | "left";
    
    defineProps({
        label: {type: String, default: "Button"},
        icon_pos: { type: String as PropType<IconPos> },
        outlined: { type: Boolean },
        loading: { type: Boolean },
        link: { type: Boolean },
        b_style: {default: "primary"},
        width: {default: "80"},
        height: {default: "37"}
    })
</script>

<style lang="scss" scoped>
    @use "../assets/styles" as style;

    .button {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        border: none;
        &.primary {
            background-color: style.$primary;
            &:hover {
                background-color: #f26f6f;
            }
            &.outlined {
                background-color: #fff;
                border: 2px solid style.$primary;
                color: style.$primary;
            }
        }
        &.secondary {
            background-color: style.$secondary;
            color: black;
            &:hover {
                background-color: #f0f0f0;
            }
            &.outlined {
                background-color: transparent;
                border: 1px solid style.$secondary;
                color: black;
            }
        }
        &.accent {
            background-color: style.$accent;
            &.outlined {
                background-color: transparent;
                border: 1px solid style.$accent;
                color: black;
            }
        }
        margin: 5px;
    }
</style>