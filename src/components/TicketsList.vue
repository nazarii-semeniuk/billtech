<template>
    <div v-if="loading" class="loader">
        <svg class="loader__spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z"/></svg>
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
        margin-top: 50px;
        animation: spin 1s linear infinite;
        width: 100px;
        height: 100px;

        path {
            fill: $blue;
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
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg)
    }
}
</style>