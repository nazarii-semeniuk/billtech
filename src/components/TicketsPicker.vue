<template>
    <div class="tickets-picker">
        <div class="tickets-picker__filter">
            <Filter @filterChanged="filterChanged" />
        </div>
        <div class="tickets-picker__main">
            <Sort class="sort" @sortChanged="sortChanged" />
            <TicketsList :loading="loading" :tickets="preparedTickets" />
        </div>
    </div>
</template>

<script setup>

import { ref,  reactive, onMounted, computed } from 'vue';

import TicketsList from './TicketsList.vue';
import Filter from './Filter.vue';
import Sort from './Sort.vue';

import TicketsApi from '../api/TicketsApi';

const loading = ref(true);
const tickets = reactive([]);
const options = reactive({
    sort: 'cheapest',
    filter: []
});

// Maybe it's a good idea to move this logic to some kind of 'TicketsService' class
// or tickets store (vuex, pinia) to make it more testable and reusable
// But i decided to not to use any state management libraries for such a small app

const preparedTickets = computed(() => {

    const filteredTickets = tickets.filter((ticket) => {
        if(options.filter.length === 0) {
            return true;
        }

        return options.filter.some((filter) => {
            return ticket.segments.every((segment) => {
                return options.filter.includes(segment.stops.length);
            });
        });
    });

    if(options.sort === 'cheapest') {
        return filteredTickets.sort((a, b) => {
            return a.price - b.price;
        });
    }

    if(options.sort === 'fastest') {
        return filteredTickets.sort((a, b) => {
            return a.totalDuration - b.totalDuration;
        });
    }

    if(options.sort === 'optimal') {
        return filteredTickets.sort((a, b) => {
            return (a.price + a.totalDuration) - (b.price + b.totalDuration);
        });
    }
    
});

onMounted(async () => {
    const ticketsApi = new TicketsApi();
    const token = await ticketsApi.getToken();
    tickets.push(...await ticketsApi.getTickets(token));
    loading.value = false;
});

const filterChanged = (filter) => {
    options.filter = filter;
};

const sortChanged = (sort) => {
    options.sort = sort;
};

</script>

<style lang="scss" scoped>
.tickets-picker {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__filter {
        width: 30%;
    }

    &__main {
        width: 68%;

        .sort {
            margin-bottom: 20px;
        }
    }
}

@media screen and (max-width: 650px) {
    .tickets-picker {
        flex-direction: column;

        &__filter {
            width: 100%;
            margin-bottom: 20px;
        }

        &__main {
            width: 100%;
        }
    }
}
</style>