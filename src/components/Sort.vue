<template>
    <div class="sort">
        <label class="sort__item">
            <input class="input" type="radio" name="sort" value="cheapest" v-model="sort">
            <span class="button">
                Найдешевший
            </span>
        </label>
        <label class="sort__item">
            <input class="input" type="radio" name="sort" value="fastest" v-model="sort">
            <span class="button">
                Найшвидший
            </span>
        </label>
        <label class="sort__item">
            <input class="input" type="radio" name="sort" value="optimal" v-model="sort">
            <span class="button">
                Оптимальний
            </span>
        </label>
    </div>
</template>

<script setup>

import { ref, watchEffect } from 'vue';

const emit = defineEmits(['sortChanged']);

const sort = ref('cheapest');

watchEffect(() => {
    emit('sortChanged', sort.value);
})

</script>

<style lang="scss" scoped>
.sort {
    display: flex;
    justify-content: center;
    align-items: center;

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;

        .input {
            appearance: none;
            width: 0;
            height: 0;
            position: absolute;

            &:checked {
                & + .button {
                    background-color: $blue;
                    color: #fff;
                }
            }
        }

        .button {
            display: block;
            padding: 15px 0;
            font-size: 12px;
            text-transform: uppercase;
            width: 100%;
            text-align: center;
            cursor: pointer;
            border: 1px solid #DFE5EC;
            background: #fff;
        }

        &:nth-child(1) {
            .button {
                border-radius: 10px 0 0 10px;
            }
        }

        &:nth-last-child(1) {
            .button {
                border-radius: 0 10px 10px 0;
            }
        }
    }
}

@media screen and (max-width: 400px) {
    .sort {
        &__item {
            .button {
                font-size: 10px;
            }
        }
    }
}
</style>