document.addEventListener("DOMContentLoaded", async function () {
    const userProfileSection = document.querySelector(".profile-info");
    const reviewsList = document.querySelector(".review-list");
    const favoritesList = document.querySelector(".favorite-list");

    // Controlling that user login or not
    const username = localStorage.getItem("loggedInUser");

    if (!username) {
        alert("Please log in first!");
        window.location.href = "../userfiles/user-login.html"; // Send to login page
        return;
    }

    try {
        // API URL - User İnformations
        const apiUrl = `http://192.168.1.15:5000/api/users/profile?username=${username}`;

        // Take informations
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const userData = await response.json();

        if (!response.ok) {
            throw new Error(userData.message || "Failed to fetch user data");
        }

        // Update User İnformations
        userProfileSection.innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>City:</strong> ${userData.city || "Not specified"}</p>
        `;

        // Take User Comments
        if (userData.reviews && userData.reviews.length > 0) {
            reviewsList.innerHTML = userData.reviews.map(review => `<li>${review.text} ⭐⭐⭐⭐</li>`).join('');
        } else {
            reviewsList.innerHTML = "<li>No reviews yet.</li>";
        }

        // Take User Favourites Restaurants
        if (userData.favorites && userData.favorites.length > 0) {
            favoritesList.innerHTML = userData.favorites.map(restaurant => `<li>${restaurant.name}</li>`).join('');
        } else {
            favoritesList.innerHTML = "<li>No favorite restaurants.</li>";
        }

    } catch (error) {
        console.error("Error fetching user profile:", error);
        userProfileSection.innerHTML = "<p>Failed to load profile data.</p>";
    }
});

// Delete Account
async function confirmDelete() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
            const username = localStorage.getItem("loggedInUser");
            const apiUrl = `http://192.168.1.15:5000/api/users/delete?username=${username}`;

            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete account");
            }

            alert("Your account has been deleted.");
            localStorage.removeItem("loggedInUser"); // Logout
            window.location.href = '../index.html'; // Send Main Page
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    }
}
