import Api from './Api';

export default class TicketsApi extends Api {

    constructor() {
        // Hardcoded endpoint for simplicity
        // In real project we should use environment variables / config files
        super('https://avs-backend.vercel.app');
    }

    async getToken() {
        const data = await super.get('/search');
        return data.searchId;
    }

    async getTickets(token) {
        const tickets = [];

        let searchEnded = false;

        while (!searchEnded) {
            try {
                const data = await super.get(`/tickets?searchId=${token}`);
                tickets.push(...data.tickets);
                searchEnded = data.stop;
            } catch (e) {
                // Just commented console.log to avoid unnecessary noise in console
                // In real project we should log errors to some kind of error tracking service
                // console.log(e);
            }
        }

        // For optimization purposes, we calculate total duration of each ticket
        // It more efficient to do it here once, than to do it on each filter/sort change
        // On large amount of data it can be a significant performance boost
        const ticketsWithCalculatedTotalDuration = tickets.map(ticket => {
            const totalDuration = ticket.segments.reduce((acc, segment) => acc + segment.duration, 0);
            return {
                ...ticket,
                totalDuration
            }
        });

        return ticketsWithCalculatedTotalDuration;
    }

}