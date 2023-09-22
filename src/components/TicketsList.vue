<template>
    <div v-if="loading" class="loader">
        <div class="loader__spinner">
            <img class="planet" src="/images/planet.svg" alt="Planet">
            <div class="plane">
                <img src="/images/plane.svg" alt="Plane">
            </div>
        </div>
    </div>
    <div v-else class="tickets-list">
        <Ticket v-for="ticket in tickets.slice(0, ticketsToShow)" :ticket="ticket" />
        <div class="show-more" v-if="tickets.length > ticketsToShow" @click="showMore">Показати ще 5 квитків!</div>
        <div class="no-tickets" v-if="tickets.length === 0">На жаль, не змогти знайти білети, які б задовольняли вибрані фільтри 😞</div>
    </div>
</template>

<script setup>

import { ref } from 'vue';

import Ticket from '@/components/Ticket.vue';

const props = defineProps({
    tickets: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
});

const ticketsToShow = ref(5);

const showMore = () => {
    ticketsToShow.value += 5;
};

</script>

<style lang="scss" scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;

    &__spinner {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 175px;
        height: 175px;

        .plane {
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            animation: spin 2s linear infinite;

            img {
                transform: rotate(-55deg);
            }
        }

        .planet {
            box-shadow: 0px 1px 11px rgba(55, 104, 142, 0.3);
            border-radius: 50%;
        }
    }
}

.show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    color: #fff;
    background: $blue;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 12px;
    text-transform: uppercase;
}

.no-tickets {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>