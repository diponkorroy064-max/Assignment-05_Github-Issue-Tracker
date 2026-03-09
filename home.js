const cardContainer = document.getElementById('card_container');

const allBtn = document.getElementById('all_btn');
const openBtn = document.getElementById('open_btn');
const closedBtn = document.getElementById('closed_btn');

const spinerSection = document.getElementById('spiner-section');

// managing spiner loading---
const manageSpiner = (status) => {
    if (status == true) {
        spinerSection.classList.remove('hidden');
        spinerSection.classList.add('flex');

        cardContainer.classList.add('hidden');
        cardContainer.classList.remove('grid');
    }
    else {
        spinerSection.classList.remove('flex');
        spinerSection.classList.add('hidden');

        cardContainer.classList.remove('hidden');
        cardContainer.classList.add('grid');
    }
};
manageSpiner(true);



// loading all card documents---
const loadAllIssues = () => fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((issues) => {
        manageSpiner(true);
        displayAllIssues(issues.data)
    });


// display all cards---
const displayAllIssues = (allData) => {
    // console.log(allData);

    cardContainer.innerHTML = "";

    // display labels array---
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
        if (data.status == "open") {
            // console.log("dipjol");
            card.className = "bg-white rounded-md shadow p-4 space-y-5 border-t-3 border-t-green-500";
        }
        else {
            card.className = "bg-white rounded-md shadow p-4 space-y-5 border-t-3 border-t-blue-500";
        }

        // showing the modal---
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
                <p class="text-[14px]"># ${data.id} by ${data.author}</p>
                <p class="text-[14px]">${new Date(data.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
    tabCounting();
    manageSpiner(false);
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
    // console.log(issue);

    // display labels array---
    const createElement = (arr) => {
        const htmlElements = arr.map((el) => `<span class="badge badge-outline badge-warning">${el}</span>`);
        // console.log(htmlElements);

        return htmlElements.join("");
    };

    const modalContainer = document.getElementById('modal_container');
    modalContainer.innerHTML = `
        <h2 class="font-bold text-[20px]">${issue.title}</h2>
        <div class="flex gap-6">
            <span class="badge badge-success text-white">${issue.status}</span>
            <span>Opened by ${issue.author}</span>
            <span>${new Date(issue.updatedAt).toLocaleDateString("en-US")}</span>
        </div>
            
        <div class="flex gap-2">${createElement(issue.labels)}</div>
            
        <p class="text-[14px]">${issue.description}</p>

        <div class="flex justify-start gap-12 bg-[#F8FAFC] rounded-md p-2.5 shadow">
            <div>
                <h3 class="font-semibold">Assignee :</h3>
                <p>${issue.author}</p>
            </div>
                
            <div>
                <h3 class="font-semibold">Priority :</h3>
                <p class="badge badge-outline badge-secondary">${issue.priority}</p>
            </div>
        </div>
    `;
};



document.getElementById('all_btns').addEventListener('click', (event) => {

    if (event.target.classList.contains('all-btns')) {
        allBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-outline');

        openBtn.classList.remove('btn-primary');
        openBtn.classList.add('btn-outline');

        closedBtn.classList.remove('btn-primary');
        closedBtn.classList.add('btn-outline');

        manageSpiner(true);

        loadAllIssues();
        return;
    }
    else if (event.target.classList.contains('open-btns')) {
        openBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-outline');

        allBtn.classList.remove('btn-primary');
        allBtn.classList.add('btn-outline');

        closedBtn.classList.remove('btn-primary');
        closedBtn.classList.add('btn-outline');

        manageSpiner(true);

        loadOpenStatus();
        return;
    }
    else if (event.target.classList.contains('closed-btns')) {
        closedBtn.classList.add('btn-primary');
        closedBtn.classList.remove('btn-outline');

        allBtn.classList.remove('btn-primary');
        allBtn.classList.add('btn-outline');

        openBtn.classList.remove('btn-primary');
        openBtn.classList.add('btn-outline');

        manageSpiner(true);

        loadClosedStatus();
        return;
    }
})


function tabCounting() {
    const count = document.getElementById('count_cards');
    const len = cardContainer.children.length;
    // console.log(len);
    count.innerText = len;
    return len;
}
// console.log(tabCounting());


const loadClosedStatus = () => fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((issues) => closedStatus(issues.data));


const closedStatus = (allData) => {
    // console.log(allData);
    const closedStatus = allData.filter((obj) => {
        // console.log(obj);
        // console.log(obj.status);
        return obj.status === "closed";
    })
    // console.log(closedStatus);

    displayAllIssues(closedStatus);;
};


const loadOpenStatus = () => fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((issues) => openStatus(issues.data));


const openStatus = (allData) => {
    // console.log(allData);
    const openStatus = allData.filter((obj) => {
        // console.log(obj);
        // console.log(obj.status);
        return obj.status === "open";
    })
    // console.log(closedStatus);

    displayAllIssues(openStatus);
}

loadAllIssues();


document.getElementById('header_btn').addEventListener('click', () => {
    const input = document.getElementById('header_input');
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue);

    allBtn.classList.remove('btn-primary');
    allBtn.classList.add('btn-outline');

    openBtn.classList.remove('btn-primary');
    openBtn.classList.add('btn-outline');

    closedBtn.classList.remove('btn-primary');
    closedBtn.classList.add('btn-outline');

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((searchDetails) => {
            manageSpiner(true);

            const allSearch = searchDetails.data;
            // console.log(allSearch);

            const filterWord = allSearch.filter((obj) => obj.description.toLowerCase().includes(searchValue));
            // console.log(filterWord);

            displayAllIssues(filterWord);
        });
});




