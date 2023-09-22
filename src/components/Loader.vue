<template>
    <div class="loader">
        <div class="loader__spinner">
            <img class="planet" src="/images/planet.svg" alt="Planet">
            <div class="plane">
                <img src="/images/plane.svg" alt="Plane">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;

    &__spinner {
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

@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>