document.addEventListener("DOMContentLoaded", () => {
    const pensContainer = document.querySelector(".pens-container");
    const nativeButton = document.querySelector(".native-button");
    const broilerButton = document.querySelector(".broiler-button");
    const detailsTableContainer = document.createElement("div"); // Container for the table
    detailsTableContainer.classList.add("details-table-container");
    pensContainer.parentElement.appendChild(detailsTableContainer); // Add the table below the pens container

    // Data storage for pens
    const penData = {
        native: [{}, {}, {}, {}], // Array of 4 objects for Native pens
        broiler: [{}, {}, {}, {}], // Array of 4 objects for Broiler pens
    };

    // Function to create a pen box with input fields and buttons
    const createPenBox = (penNumber, colorClass, type) => {
        const penBox = document.createElement("div");
        penBox.classList.add("pen-box", colorClass);

        // Retrieve saved data for this pen
        const data = penData[type][penNumber - 1];

        penBox.innerHTML = `
            <h3 class="pen-title">Pen ${penNumber}</h3>
            <div class="pen-inputs">
                <label for="starting-population-${penNumber}">Starting Population:</label>
                <input type="number" id="starting-population-${penNumber}" placeholder="Enter starting population" value="${data.startingPopulation || ''}">

                <label for="live-population-${penNumber}">Live Population:</label>
                <input type="number" id="live-population-${penNumber}" placeholder="Enter live population" value="${data.livePopulation || ''}">

                <label for="description-${penNumber}">Description:</label>
                <input type="text" id="description-${penNumber}" placeholder="Enter context" value="${data.penDescription || ''}">

                <label for="harvest-date-${penNumber}">Harvest Date:</label>
                <input type="date" id="harvest-date-${penNumber}" value="${data.harvestDate || ''}">
            </div>
            <button class="update-harvest-button" onclick="updateHarvestDate(${penNumber})">Update Harvest Date (30 Days)</button>
            <button class="save-button" onclick="savePenData(${penNumber}, '${type}')">Save</button>
        `;

        return penBox;
    };

    // Function to load pens based on the selected type
    const loadPens = (type) => {
        pensContainer.innerHTML = ""; // Clear previous pens
        const colorClass = type === "native" ? "green-box" : "blue-box";

        // Generate 4 pen boxes
        for (let i = 1; i <= 4; i++) {
            const pen = createPenBox(i, colorClass, type);
            pensContainer.appendChild(pen);
        }

        // Add general harvest date input and button
        addGeneralHarvestDate(type);

        // Update the table with the current type's data
        updateDetailsTable(type);
    };

    // Function to save pen data
    window.savePenData = (penNumber, type) => {
        const startingPopulation = document.getElementById(`starting-population-${penNumber}`).value;
        const livePopulation = document.getElementById(`live-population-${penNumber}`).value;
        const description = document.getElementById(`description-${penNumber}`).value; // Get the description input
        const harvestDate = document.getElementById(`harvest-date-${penNumber}`).value;

        // Save data to the penData object
        penData[type][penNumber - 1] = {
            startingPopulation,
            livePopulation,
            description,            
            harvestDate,
        };

        console.log(`Pen ${penNumber} (${type}) Data Saved:`);
        console.log(penData[type][penNumber - 1]);

        // Update the table with the current type's data
        updateDetailsTable(type);
    };

    // Function to update the harvest date by adding 30 days for a specific pen
    window.updateHarvestDate = (penNumber) => {
        const harvestDateInput = document.getElementById(`harvest-date-${penNumber}`);
        const currentDate = harvestDateInput.value ? new Date(harvestDateInput.value) : new Date();

        // Add 30 days to the current date
        currentDate.setDate(currentDate.getDate() + 30);

        // Update the input field with the new date
        harvestDateInput.value = currentDate.toISOString().split('T')[0];

    };

    // Function to add a general harvest date input and button inside a styled box
    const addGeneralHarvestDate = (type) => {
        const generalHarvestBox = document.createElement("div");
        const colorClass = type === "native" ? "green-box" : "blue-box"; // Match the color of the pen boxes
        generalHarvestBox.classList.add("pen-box", colorClass, "general-harvest-box");

        generalHarvestBox.innerHTML = `
            <h3 class="pen-title">General Harvest Date</h3>
            <div class="pen-inputs">
                <label for="general-harvest-date">Set Harvest Date for All Pens:</label>
                <input type="date" id="general-harvest-date">
            </div>
            <button class="apply-general-harvest-button" onclick="applyGeneralHarvestDate('${type}')">Apply to All Pens</button>
        `;

    pensContainer.appendChild(generalHarvestBox);
};

    // Function to apply the general harvest date to all pens
    window.applyGeneralHarvestDate = (type) => {
        const generalHarvestDate = document.getElementById("general-harvest-date").value;

        penData[type].forEach((pen, index) => {
            pen.harvestDate = generalHarvestDate; // Update the data
            const harvestDateInput = document.getElementById(`harvest-date-${index + 1}`);
            if (harvestDateInput) {
                harvestDateInput.value = generalHarvestDate; // Update the input field
            }
        });

        updateDetailsTable(type); // Update the table
    };

    // Function to update the details table
    const updateDetailsTable = (type) => {
        detailsTableContainer.innerHTML = ""; // Clear the table

        const table = document.createElement("table");
        table.classList.add("details-table");

        // Add table headers
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Pen</th>
                    <th>Starting Population</th>
                    <th>Live Population</th>
                    <th>Description</th>                    
                    <th>Harvest Date</th>
                </tr>
            </thead>
        `;

        const tbody = document.createElement("tbody");

        // Add rows for each pen
        penData[type].forEach((pen, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>Pen ${index + 1}</td>
                <td>${pen.startingPopulation || "N/A"}</td>
                <td>${pen.livePopulation || "N/A"}</td>
                <td>${pen.description || "N/A"}</td>
                <td>${pen.harvestDate || "N/A"}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        detailsTableContainer.appendChild(table);
    };

    // Event listeners for the buttons
    nativeButton.addEventListener("click", () => loadPens("native"));
    broilerButton.addEventListener("click", () => loadPens("broiler"));
});
