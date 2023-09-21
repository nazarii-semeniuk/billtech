<template>
    <div class="filter">
        <h2 class="filter__title">
            Кількість пересадок
        </h2>
        <label class="filter__item">
            <input type="checkbox" class="input" @click="resetFilters" :checked="filter.length === 0">
            <div class="checkbox">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>
            </div>
            Всі
        </label>
        <label class="filter__item">
            <input type="checkbox" class="input" v-model="filter" :value="0">
            <div class="checkbox">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>
            </div>
            Без пересадок
        </label>
        <label v-for="index in 3" class="filter__item">
            <input type="checkbox" class="input" v-model="filter" :value="index">
            <div class="checkbox">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>
            </div>
            {{ index }} {{ formatNounForNumber(index, ['пересадка', 'пересадки', 'пересадок']) }}
        </label>
    </div>
</template>

<script setup>

import { ref, defineEmits, watchEffect } from 'vue';

import formatNounForNumber from '../utils/formatNounForNumber';

const emit = defineEmits(['filterChanged']);

const filter = ref([]);

const resetFilters = ($event) => {
    if(!$event.target.checked) {
        $event.target.checked = true;
    }
    filter.value.splice(0, filter.value.length);
}

watchEffect(() => {
    emit('filterChanged', filter.value);
});

</script>

<style lang="scss" scoped>
.filter {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);

    &__title {
        font-size: 12px;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 10px;
    }

    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.2s all;
        padding: 10px 20px;
        margin: 0px -20px;
        font-weight: 400;
        font-size: 13px;

        &:hover {
            background: rgba($blue, 0.1);
            transition: 0.2s all;
        }

        &:last-child {
            margin-bottom: 0;
        }

        .input {
            appearance: none;
            width: 0;
            height: 0;
            position: absolute;

            &:checked {
                & + .checkbox {
                    border-color: $blue;

                    svg {
                        opacity: 1;
                    }
                }
            }
        }

        .checkbox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border: 1px solid #DFE5EC;
            border-radius: 2px;
            margin-right: 10px;
            transition: all .3s ease;
            opacity: .5;

            svg {
                width: 16px;
                height: 16px;
                fill: $blue;
                opacity: 0;
                transition: all .3s ease;
            }
        }
    }
}
</style>