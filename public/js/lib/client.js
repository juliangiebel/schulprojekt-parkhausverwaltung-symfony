const api = "/api"

const Methodes = {
    getAll: async function (path) {
        return await axios.get(`${api}${path}`);
    },
    get: async function (path, id) {
        console.log(`${api}${path}/${id}`);
        return await axios.get(`${api}${path}/${id}`);
    },
    post: async function (path, data) {
        return await axios.post(`${api}${path}`, data);
    },
    delete: async function (path, id) {
        return await axios.get(`${api}${path}/${id}`);
    },
    patch: async function (path, id, data) {
        return await axios.get(`${api}${path}/${id}`, data);
    }

}

async function getTicketOccupancy(ticketID) {
    let response = await Methodes.get("/tickets", ticketID);
    if(response.status != 200) {
        console.error("Status Code: " + response.status);
        return Promise.reject(response); //TODO: Proper handling!
    }

    let ticket = response.data;

    response = await axios.get(ticket.occupancy);
    if(response.status != 200) {
        console.error("Status Code: " + response.status);
        return Promise.reject(response); //TODO: Proper handling!
    }

    let occupancy = response.data;

    return {occupancy: occupancy, ticket: ticket};
}


export { Methodes, getTicketOccupancy};
