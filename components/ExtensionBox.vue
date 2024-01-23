<template>
    <NuxtLink class="extension-box" :to="url">
        <div class="icon">
            <img :src="icon" alt="icon">
        </div>
        <div class="name">{{ name }}</div>
        <div class="author">{{ author }}</div>
        <!--stars-->
        <div class="desc">
            {{ desc }}
        </div>
        <div class="meta">
            <div class="downloads">
                <IconsDownloadIcon></IconsDownloadIcon>
                {{ downloads }}
            </div>
            <div class="price">{{ price }}</div>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>

    defineProps({
        url: {
            default: "/"
        },
        icon: {
            default: "/favicon.ico"
        },
        name: {
            default: "Plugin Name"
        },
        author: {
            default: "Author Name"
        },
        desc: {
            default: "Plugin desc here"
        },
        downloads: {
            default: "000"
        },
        price: {
            default: "Free"
        }
    })
</script>

<style lang="scss" scoped>
    @use "../assets/styles" as style;
    .extension-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0px 2px 5px 1px #959595;
        min-width: 230px;
        height: 265px;
        padding: 20px 0 10px 0;
        gap: 5px;
        text-decoration: none;
        color: style.$text-color;
        &:hover {
            outline: 3px solid style.$primary;
        }
        .icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fafafa;
            img {
                max-width: 42px;
                height: 42px;
                object-fit: scale-down;
            }
        }
        .name {
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            padding: 0 15px;
        }
        .author {
            color: style.$text-color;
            font-size: 14px;
        }
        .desc {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            height: auto;
            max-height: 8rem;
            font-size: 14px;
            margin-top: 10px;
            padding: 0 10px;
            color: style.$text-color;
        }
        .meta {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
            margin-top: auto;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 14px;
            .downloads {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
            }
            .price {
                color: #00910F;
                font-weight: 500;
            }
        }
    }
</style>