import { getTicketOccupancy, Methodes } from './lib/client.js';
import * as Elements from './lib/elements.js';

// Variables:

const rate = 2;

const paidTimeout = moment.duration(1, 'minutes');

const sections = {
    input: null,
    payment: null,
    end: null
}

const events = {
    "ticket-code-input": {name: "change", handler: ticketEntered},
    "ticket-payment-cancel": {name: "click", handler: paymentCanceled},
    "ticket-payment-pay": {name: "click", handler: paymentPaid},
    "ticket-payment-cancel": {name: "click", handler: paymentCanceled}
}

var bindings = {};

var ticketID = null;

//Events:

function ticketEntered(event) {
    ticketID = event.target.value;
    bindings.loadingModal.attribute("open", true);

    let request  = getTicketOccupancy(ticketID);
    request.then(response => {

        if (checkTicket(response.ticket)) {
            let entryDate = moment(response.occupancy.entryDate);
            entryDate.locale('de-relative-grammar');

            sections.input.classList.add("hidden");
            sections.payment.classList.remove("hidden");

            bindings.licensePlate(response.occupancy.licensePlate);
            bindings.price(calculatePrice(response.occupancy, rate));
            bindings.entryDate(entryDate.format("MMMM Do YYYY, h:mm:ss"));
            bindings.timeParked(entryDate.from(moment(), true));
        }

        bindings.loadingModal.attribute("open", null);

    }).catch(e => console.log(e));
}

function paymentCanceled(event) {
    sections.input.classList.remove("hidden");
    sections.payment.classList.add("hidden");
}

function paymentPaid(event) {
    bindings.instructionsModal.element.setAttribute("open", true);

    delay(2000)
        .then(() => bindings.instructionsModal.attribute("open", null))
        .then(() => bindings.loadingModal.attribute("open", true))
        .then(() => Methodes.patch("/tickets", ticketID, {paid: moment().toISOString()}))
        .then(response => {

            if(response.status != 200) {
                return Promise.reject(response);
            }

        })
        .then(() => {

            bindings.loadingModal.attribute("open", null)
            paymentFinished();

        })
        .catch( reason => console.log(reason));
}

// Functions:

function paymentFinished() {
    sections.end.classList.remove("hidden");
    sections.payment.classList.add("hidden");

    setTimeout(() => {
        sections.input.classList.remove("hidden");
        sections.end.classList.add("hidden");
    }, 5000)
}

function calculatePrice(occupancy, rate) {
    //TODO: Implement price calculation
    return "10";
}

function checkTicket(ticket) {
    let paidDate = moment(ticket.paid);

    if(!!ticket.paid && moment.duration(moment().diff(paidDate)).asMilliseconds() < paidTimeout.asMilliseconds()) {
        showError("Ticket ist schon Bezahlt")
        return false;
    }

    return true;
}

function showError(message) {
    bindings.errorModalContent(message);
    bindings.errorModal.attribute("open", true);

    setTimeout(() => {
        bindings.errorModal.attribute("open", null);
    }, 4000);
}

function delay(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

// Entry Point:

window.onload = function () {

    for (const id in events) {
        if (events.hasOwnProperty(id)) {
            event = events[id];
            document.getElementById(id).addEventListener(event.name, event.handler);
        }
    }

    bindings = {
        licensePlate: Elements.bindElement('#license-plate-display'),
        price: Elements.bindElement('#price-display'),
        entryDate: Elements.bindElement('#entry-date-display'),
        timeParked: Elements.bindElement('#time-parked-display'),
        loadingModal: Elements.bindElement('#ticket-loading-modal'),
        instructionsModal: Elements.bindElement('#ticket-instructions-modal'),
        errorModal: Elements.bindElement('#error-modal'),
        errorModalContent: Elements.bindElement('#error-modal-content')
    };

    bindings.loadingModal.show =

    sections.input = document.getElementById("ticket-input-section");
    sections.payment = document.getElementById("ticket-payment-section");
    sections.end = document.getElementById("ticket-end-section");

    window.bindings = bindings;
};