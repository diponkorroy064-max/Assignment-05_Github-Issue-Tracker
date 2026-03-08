// get the id  of modal---
// const modal = document.getElementById('my_modal');

// loading all card documents---
const loadAllIssues = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((issues) => displayAllIssues(issues.data));



// display all cards---
const displayAllIssues = (allData) => {
    // console.log(allData);
    const cardContainer = document.getElementById('card_container');


    // display labels array--
    const createElement = (arr) => {
        const htmlElements = arr.map((el) => `<span class="badge badge-outline badge-warning">${el}</span>`);
        // console.log(htmlElements);
        
        return htmlElements.join("");
    };
    

    allData.forEach(data => {
        // console.log(data);
        // console.log(data.status);

        const card = document.createElement('div');
        // display border top color---
        if (data.status=="open") {
            // console.log("dipjol");
            card.className = "bg-white rounded-md shadow p-4 space-y-5 border-t-3 border-t-green-500";
        }
        else {
            card.className = "bg-white rounded-md shadow p-4 space-y-5 border-t-3 border-t-blue-500";
        }

        // showing the modal ---
        card.onclick = () => loadModal(data.id);
        // console.log(data.id);

        card.innerHTML = `
            <div class="flex justify-between">
                <img src="assets/Open-Status.png" alt="">
                <span class="badge badge-outline badge-secondary">${data.priority}</span>
            </div>

            <div>
                <h3 class="font-bold text-xl">${data.title}</h3>
                <p class="text-[12px] text-[#64748B] line-clamp-2">${data.description}</p>
            </div>

            <div id="all_labels" class="flex gap-5 flex-wrap">
                ${createElement(data.labels)}
            </div>

            <div class="border-t-2 border-gray-200 pt-2.5 space-y-2">
                <p># ${data.id} by ${data.author}</p>
                <p>${new Date(data.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        cardContainer.appendChild(card);

    });

}


// load all modal issues----
const loadModal = async (issueId) => {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);

    const singleIssue = await res.json();
    // console.log(singleIssue);
    
    displayModal(singleIssue.data);

    my_modal.showModal(issueId);
};


// display all modal issues---
const displayModal = (issue) => {
    console.log(issue);

    // display labels array---
    const createElement = (arr) => {
        const htmlElements = arr.map((el) => `<span class="badge badge-outline badge-warning">${el}</span>`);
        // console.log(htmlElements);

        return htmlElements.join("");
    };

    const modalContainer = document.getElementById('modal_container');
    modalContainer.innerHTML = `
        <h2 class="font-bold text-2xl">${issue.title}</h2>
        <div>
            <span class="badge badge-success">${issue.status}</span>
            <span>${issue.author}</span>
            <span>${issue.updatedAt}</span>
        </div>
            
        <div class="flex gap-2">${createElement(issue.labels)}</div>
            
        <p class="text-[14px]">${issue.description}</p>

        <div class="flex justify-start gap-12 bg-[#F8FAFC] rounded-md p-2.5 shadow">
            <div>
                <h3 class="font-semibold">Assignee:</h3>
                <p>${issue.author}</p>
            </div>
                
            <div>
                <h3 class="font-semibold">Priority:</h3>
                <p>${issue.priority}</p>
            </div>
        </div>
    `;
};












