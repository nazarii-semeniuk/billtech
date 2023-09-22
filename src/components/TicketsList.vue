<template>
    <Loader class="loader" v-if="loading" />
    <div v-else class="tickets-list">
        <Ticket v-for="ticket in tickets.slice(0, ticketsToShow)" :ticket="ticket" />
        <div class="show-more" v-if="tickets.length > ticketsToShow" @click="showMore">Показати ще 5 квитків!</div>
        <div class="no-tickets" v-if="tickets.length === 0">На жаль, не змогти знайти білети, які б задовольняли вибрані фільтри 😞</div>
    </div>
</template>

<script setup>

import { ref } from 'vue';

import Ticket from '@/components/Ticket.vue';
import Loader from './Loader.vue';

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
    margin-top: 10px;
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
</style>