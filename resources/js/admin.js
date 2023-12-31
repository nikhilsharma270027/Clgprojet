import axios from 'axios';
import moment from 'moment';

export function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody');

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        const orders = res.data;
        const markup = generateMarkup(orders);
        orderTableBody.innerHTML = markup;

        // Add event listeners to the form elements
        addEventListeners();
    }).catch(err => {
        console.log(err);
    });

    function renderItems(items) {
        const itemKeys = Object.keys(items);
        return itemKeys.map((itemKey) => {
            return `
                <p>${itemKey}: ${items[itemKey]}</p>
            `;
        }).join('');
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                    <td class="border px-4 py-2 text-green-900">
                        <p>${order._id}</p>
                        <div>${renderItems(order.items)}</div>
                    </td>
                    <td class="border px-4 py-2">${order.customerId.name}</td>
                    <td class="border px-4 py-2">${order.address}</td>
                    <td class="border px-4 py-2">
                        <div class="inline-block relative w-64">
                            <form id="statusForm_${order._id}" action="/admin/order/status" method="POST">
                                <input type="hidden" name="orderId" value="${order._id}">
                                <select name="status" onchange="submitForm('statusForm_${order._id}')"
                                    class="block w-full bg-${getStatusColor(order.status)} border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>
                                        Order Placed</option>
                                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                        Confirmed</option>
                                    <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                        Prepared</option>
                                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                        Delivered</option>
                                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                        Completed</option>
                                </select>
                            </form>
                        </div>
                    </td>
                    <td class="border px-4 py-2">
                        ${moment(order.createdAt).format('hh:mm A')}
                    </td>
                    <td class="border px-4 py-2">
                        ${order.paymentStatus ? 'Paid' : 'Not Paid'}
                    </td>
                </tr>
            `;
        }).join('');
    }

    function getStatusColor(status) {
        switch (status) {
            case 'order_placed':
                return 'blue';
            case 'confirmed':
                return 'yellow';
            case 'prepared':
                return 'green';
            case 'delivered':
                return 'purple';
            case 'completed':
                return 'teal';
            default:
                return 'gray';
        }
    }

    function addEventListeners() {
        // Add event listeners to the forms
        const forms = document.querySelectorAll('[id^="statusForm_"]');
        forms.forEach(form => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                try {
                    const response = await axios.post('/admin/order/status', formData);
                    console.log(response.data);
                    // Optionally update the UI based on the response
                } catch (error) {
                    console.error(error);
                }
            });
        });
    }
// Inside the module
window.submitForm = function (formId) {
    document.getElementById(formId).submit();
};

    function submitForm(formId) {
        document.getElementById(formId).submit();
    }
}
