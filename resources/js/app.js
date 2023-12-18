import axios from "axios";
//import { error } from "laravel-mix/src/Log";
import Noty from "noty";
import { initAdmin } from './admin'
import moment from "moment";
let addToCart = document.querySelector('.add-to-cart');

//
//courier weight calculations



// Remove alert ,essage after x seconds
const alertMsg = document.getElementById('#success-alert')
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    },1000)
}

initAdmin();
    
// change order status / Updated status
// We need to render updated status from database
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)//convert string to object
//console.log(order)
let time = document.createElement('small')


function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        // status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time )
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
            
        }
    })
} 

updateStatus(order);
console.log(order);
console.log(moment(order.updatedAt).format('hh:mm A'));



// // Socket
let socket = io()

// Join
if(order){
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
//console.log(adminAreaPath)
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join' , 'adminRoom')
}

// order_fgadgagagagadg
socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false
        //layout: 'bottomLeft'
    }).show();
    //console.log(data)
})