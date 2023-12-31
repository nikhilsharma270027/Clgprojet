import axios from "axios";
import Noty from "noty";
import { initAdmin } from './admin';
import moment from "moment";

//courier weight calculations

// Remove alert message after x seconds
const alertMsg = document.getElementById('success-alert');
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 1000);
}

// change order status / Updated status
// We need to render updated status from the database
let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? JSON.parse(hiddenInput.value) : null;
let time = document.createElement('small');

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current');
    });

    let stepCompleted = true;

    statuses.forEach((status) => {
        let dataProp = status.dataset.status;

        if (stepCompleted) {
            status.classList.add('step-completed');
        }

        if (dataProp === order.status) {
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            status.appendChild(time);

            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }
        }
    });
}

updateStatus(order);

// Socket
let socket = io();

// Join
if (order) {
    socket.emit('join', `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;

if (adminAreaPath.includes('admin')) {
    initAdmin(socket);
    socket.emit('join', 'adminRoom');
}

// order_fgadgagagagadg
socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order };
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
});
