document.addEventListener("DOMContentLoaded", function() {
    // Load Username
    let username = localStorage.getItem("loggedInUser");
    document.getElementById("welcomeUser").textContent = username ? username : "Guest";

    // Menu Open And Close
    const menuToggleButton = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    menuToggleButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });
});

// Logout
function logout() {
    localStorage.removeItem("loggedInUser"); // Username Deleting
    window.location.href = "../index.html"; // Send İndex
}

// Restaurant Listing
async function findRestaurants() {
    const city = document.getElementById('city').value;
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = ''; // Cleaning old list

    if (!city) {
        alert('Please select a city');
        return;
    }

    try {
        // Restaurant List
        const apiUrl = `http://192.168.1.15:5000/api/restaurants?city=${city}`; 

        // Send Ger Rekuest to Api
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Take İnformations From Api
        const restaurants = await response.json();

        // İf Api is not succesfull
        if (!response.ok) {
            throw new Error(restaurants.message || "Failed to fetch restaurants");
        }

        // İf there is no restaurant
        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p>No restaurants found in this city.</p>';
            return;
        }

        // List restaurants
        const listHTML = restaurants.map(restaurant => `
            <div class="restaurant-item">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.address}</p>
                <p><strong>Phone:</strong> ${restaurant.phone}</p>
            </div>
        `).join('');

        restaurantList.innerHTML = listHTML;

    } catch (error) {
        console.error("Error fetching restaurants:", error);
        restaurantList.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
    }
}
