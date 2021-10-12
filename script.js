class Order {
    constructor(customer, size, location) {
        this.customer = customer; 
        this.size = size; 
        this.location = location; 
    } 
}  

// Methods 
class UI {
    addOrder(order) {
        const list = document.getElementById('order-list'); 
        
        // Create tr element 
        const row = document.createElement('tr'); 

        // Add colums  
        row.innerHTML = `
            <td>${order.customer}</td>
            <td>${order.size}</td>
            <td>${order.location}</td>
            <td><a href="#" id="delete" style="color: red; text-decoration: none;">x</a></td>
        `; 

        list.appendChild(row); 

    } 

    showAlert(message, className) { 
        const div = document.createElement('div'); 

        div.className = `alert ${className}`; 

        div.appendChild(document.createTextNode(message)); 
        
        const container = document.querySelector('.container'); 

        const form = document.querySelector('#order-form'); 

        container.insertBefore(div, form); 

        setTimeout(function() {
            document.querySelector('.alert').remove(); 
        }, 2000); 

    } 

    clearFields() {
        document.getElementById('customer-no').value = ''; 
        document.getElementById('shoe-size').value = ''; 
        document.getElementById('location').value = ''; 
    } 
    
    deleteOrder(target) {
        if (confirm('Are you sure you want to delete') | target.className === 'delete') {
           target.parentElement.remove(); 
        }
    }
} 

// Local storage class 
class Store {  
    // Method for fetching orders from local storage 
    static getOrder() {
        let orders; 
        if(localStorage.getItem('orders') === null) {
            orders = []; 
        } else {
            books = JSON.parse(localStorage.getItem('orders')); 
        } 

        return orders; 
    } 
    
    // Method for displaying orders in the UI 
    static displayOrder() {
        const order = Store.getOrder(); 

        order.forEach(function(order){
            const ui = new UI; 

            ui.addOrder(order); 
        })
    }

/*     // Method for adding orders to local storage 
    static addOrder(order) {
        const book = Store.getBooks(); 


    } */
} 

// DOM load events 
document.addEventListener('DOMcontentLoaded', Store.displayOrder()); 


// Adding event listeners 

// Event listener for submit button
document.getElementById('order-form').addEventListener('submit', function(e) { 
    
    // Getting the form values  
    const customer = document.getElementById('customer-no').value; 
    const size = document.getElementById('shoe-size').value; 
    const location = document.querySelector('#location').value;

    // Instantiate an order 
    const order = new Order(customer, size, location);  

    const ui = new UI(); 

    // Validate 
    if (customer === '' | size === '' | location === '') {
        ui.showAlert('Please fill in all the fields', 'error'); 
    } else {
        ui.showAlert('Order added succesfully', 'success');  

        ui.addOrder(order);  

        ui.clearFields(); 
    }

    e.preventDefault(); 
});  

// Event listener for delete button 
document.getElementById('delete').addEventListener('click', function(e) {
    const ui = new UI(); 

    ui.deleteOrder(e.target); 

    // Show alert message 
    ui.showAlert('Book deleted!', 'success'); 

    e.preventDefault(); 
})
