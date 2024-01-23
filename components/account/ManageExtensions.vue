<template>
    <div class="manage-extensions">
        <div class="description">
            Manage your extensions here
            <NuxtLink to="/account/create-extension">
                <Button class="add-button" label="Add Extension" />
            </NuxtLink>
        </div>
        <div class="extensions-list">
            <div class="extension">
                <div class="left">
                    <div class="logo">
                        <img src="/favicon.ico" alt="icon">
                    </div>
                    <div class="extension-data">
                        <div class="top">
                            <div class="name">Plugin Name</div>
                            <div class="visibility">Private</div>
                            <div class="price">Free</div>
                        </div>
                        <div class="bottom">
                            <div class="version">v1.0.0</div>
                            <div class="downloads"><IconsDownloadIcon />5.3k</div>
                            <div class="rating"> <IconsRatingIcon/> 3.7</div>
                            <div class="updated">Last updated 2 weeks ago</div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <Button class="overflow" label="" @click="toggleOverflow">
                        <IconsEllipsisIcon />
                    </Button>
                    <PrimeMenu ref="overflow" :model="items" popup />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const overflow = ref();
    const items = ref([
        {"label": "Edit"},
        {"label": "View"},
        {"label": "Delete"}
    ])
    const toggleOverflow = (event) => {
        overflow.value.toggle(event);
    }
</script>

<style lang="scss" scoped>
@use "../assets/styles" as style;

.manage-extensions {
    display: flex;
    flex-direction: column;
    padding: 10px 0 25px 0;
    width: 100%;
    min-height: 300px;
    margin-left: 35px;
    .description {
        font-size: 0.9rem;
        font-weight: 300;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .add-button {
            width: unset !important;
        }
    }
    .extensions-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 5px 0;
        overflow-y: auto;
        .extension {
            width: 100%;
            display: flex;
            border-top: 1px solid;
            border-bottom: 1px solid;
            padding: 10px 7px;
            justify-content: space-between;
            .overflow {
                width: 40px !important;
                background-color: transparent;
                box-shadow: none;
                color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    background-color: #89898926;
                }
                svg {
                    min-width: 25px;
                    min-height: 25px;
                }
            }
            .left {
                display: flex;
                gap: 22px;
            }
            .right {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .logo {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 22px;
                    height: 22px;
                }
            }
            .extension-data {
                display: flex;
                flex-direction: column;
                gap: 5px;
                .top, .bottom {
                    display: flex;
                    font-size: 13px;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 16px;
                }
                .top {
                    font-weight: 500;
                    .name {
                        font-size: 15px;
                        color: style.$primary;
                        font-weight: 600;
                    }
                    .price {
                        color: #00910F;
                    }
                }
                .bottom {
                    font-weight: 300;
                    font-size: 12px;
                    color: style.$text-color;
                    .rating {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 2px;
                    }
                    .downloads {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 6px;
                        svg {
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }
        }
    }
}
</style>
