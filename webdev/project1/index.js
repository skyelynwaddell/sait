// Fetch and insert the content of navbar.html
fetch('./utils/navbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbarContainer').innerHTML = html;
    })
    .catch(error => console.error('Error fetching navbar:', error));

// Fetch and insert the content of banner.html
fetch('./utils/banner.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('banner').innerHTML = html;
    })
    .catch(error => console.error('Error fetching banner:', error));

// Fetch and insert the content of footer.html
fetch('./utils/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    })
    .catch(error => console.error('Error fetching footer:', error));
