<template>
    <div class="ticket">
        <div class="ticket__head">
            <div class="price">
                {{ ticket.price.toLocaleString('en').replaceAll(',', ' ') }} P
            </div>
            <div class="logo">
                <img :src="'https://pics.avs.io/99/36/' + ticket.carrier + '.png'" alt="logo">
            </div>
        </div>
        <div class="ticket__body">
            <div v-for="segment in ticket.segments" class="segment">
                <div class="segment__column">
                    <div class="label">
                        {{ segment.origin }} – {{ segment.destination }}
                    </div>
                    <div class="value">
                        {{ formatTime(segment.date) }} – {{ calculateArivalTime(segment.date, segment.duration) }}
                    </div>
                </div>
                <div class="segment__column">
                    <div class="label">
                        В дорозі
                    </div>
                    <div class="value">
                        {{ formatDuration(segment.duration) }}
                    </div>
                </div>
                <div class="segment__column">
                    <div class="label">
                        {{ segment.stops.length }} {{ formatNounForNumber(segment.stops.length, ['пересадка', 'пересадки', 'пересадок']) }}
                    </div>
                    <div class="value">
                        {{ segment.stops.join(', ') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import formatNounForNumber from '../utils/formatNounForNumber';

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
});

const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}г ${minutes}хв`;
};

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const calculateArivalTime = (date, duration) => {
    const durationInMs = duration * 60 * 1000;
    const dateInMs = new Date(date).getTime();

    return formatTime(dateInMs + durationInMs);
};

</script>

<style lang="scss" scoped>
.ticket {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .price {
            font-size: 24px;
            color: $blue;
        }
    }

    &__body {
        .segment {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            &__column {
                width: 33%;
                line-height: 150%;

                .label {
                    font-size: 12px;
                    color: #A0B0B9;
                    text-transform: uppercase;
                    line-height: 150%;
                }

                .value {
                    font-size: 14px;
                    line-height: 150%;
                }
            }
        }
    }
}

@media screen and (max-width: 400px) {
    .ticket {
        &__head {
            .price {
                font-size: 20px;
            }
        }
        &__body {
            .segment {
                &__column {
                    .value {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>