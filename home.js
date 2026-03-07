// loading all card documents---
const loadAllIssues = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((issues) => displayAllIssues(issues.data));


// display all cards---
const displayAllIssues = (allData) => {
    // console.log(allData);
    const cardContainer = document.getElementById('card_container');

    

    allData.forEach(data => {
        // console.log(data);

        const card = document.createElement('div');
        card.className = "bg-white rounded-md shadow p-4 space-y-5";
        card.innerHTML = `
            <div class="flex justify-between">
                <img src="assets/Open-Status.png" alt="">
                <span class="badge badge-soft badge-warning">${data.priority}</span>
            </div>

            <div>
                <h3 class="font-bold text-xl">${data.title}</h3>
                <p class="text-[12px] text-[#64748B] line-clamp-2">${data.description}</p>
            </div>

            <div id="all_labels" class="">
                
            </div>

            <div class="border-t-2 border-gray-200 pt-2.5 space-y-2">
                <p># ${data.id} by ${data.author}</p>
                <p>${new Date(data.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}


