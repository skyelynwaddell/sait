fetch('./contact.html')
    .then(response => response.text())
    .then(() => {
        const agents = [
            { name : "John Doh",    email: "john.doh@email.com",    phone: "(123) 123-1234" },
            { name : "Alex Joe",    email: "alex.joe@email.com",    phone: "(123) 123-1234" },
            { name : "Mc Apple",    email: "mc.apple@email.com",    phone: "(123) 123-1234" },
            { name : "Hello World", email: "hello.world@email.com", phone: "(123) 123-1234" },
            { name : "Jenny Lenny", email: "jenny.lenny@email.com", phone: "(123) 123-1234" },
            { name : "Adam Color",  email: "adam.color@email.com",  phone: "(123) 123-1234" },
        ]

        for (let i in agents){
            document.getElementById('agents').innerHTML +=
            `
            <div class="agents">
            <th class="bubble agentBubble" id="agents">
            <p class="agentName">${agents[i].name}</p>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
            </svg>
            ${agents[i].email}
            
            <br>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
            ${agents[i].phone}

            </th>
            </div>
            `;
        }
    })
    .catch(error => console.error('Error fetching agents:', error));

// Fetch and insert the content of input types into input-types.html
fetch('./input-types.html')
    .then(response => response.text())
    .then(() => {

        const inputTypes = [
            { type: "button" },
            { type: "range" },
            { type: "email" },
            { type: "week" },
            { type: "url" },
            { type: "radio" },
            { type: "checkbox" },
            { type: "text" },
            { type: "password" },
            { type: "search" },
            { type: "date" },
            { type: "submit" },
            { type: "color" },
            { type: "file" },
            { type: "datetime-local" },
            { type: "email" },
            { type: "image" },
        ]

        for (let i in inputTypes) {
            var type = inputTypes[i].type;
            document.getElementById('inputTypes').innerHTML +=
                `
                <label for="${type}">${type}</label>
                <input 
                    class="inputBoxes" 
                    value = "${type}"
                    type  = "${type}"
                    name  = "${type}"
                > 
                </input>
                `;

        }
    })
    .catch(error => console.error('Error fetching input types:', error));

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