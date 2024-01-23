<template>
    <div class="search-container">
        <Input type="text" name="search" :placeholder=placeholder icon_right>
            <IconsSearchIcon class="search-button"></IconsSearchIcon>
        </Input>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        placeholder: {type: String, default: "Search..."}
    })
</script>

<style lang="scss" scoped>
    @use "../assets/styles" as style;
    .search-container {
        width: 100%;
        .search-box {
            font-size: 16px;
        }
        .search-button {
            color: style.$text-color;
            width: 20px;
            height: 21px;
        }
    }
</style>