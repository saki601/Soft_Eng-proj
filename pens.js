document.addEventListener("DOMContentLoaded", () => {
    const pensContainer = document.querySelector(".pens-container");
    const nativeButton = document.querySelector(".native-button");
    const broilerButton = document.querySelector(".broiler-button");

    // Data storage for pens
    const penData = {
        native: [{}, {}, {}, {}], // Array of 4 objects for Native pens
        broiler: [{}, {}, {}, {}], // Array of 4 objects for Broiler pens
    };

    // Function to create a pen box with input fields and a save button
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

                <label for="harvest-date-${penNumber}">Harvest Date:</label>
                <input type="date" id="harvest-date-${penNumber}" value="${data.harvestDate || ''}">
            </div>
            <button class="update-harvest-button" onclick="updateHarvestDate(${penNumber})">Medicated</button>            
            <button class="save-button" onclick="savePenData(${penNumber}, '${type}')">Update</button>
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
    };

    // Function to save pen data
    window.savePenData = (penNumber, type) => {
        const startingPopulation = document.getElementById(`starting-population-${penNumber}`).value;
        const livePopulation = document.getElementById(`live-population-${penNumber}`).value;
        const harvestDate = document.getElementById(`harvest-date-${penNumber}`).value;

        // Save data to the penData object
        penData[type][penNumber - 1] = {
            startingPopulation,
            livePopulation,
            harvestDate,
        };

        console.log(`Pen ${penNumber} (${type}) Data Saved:`);
        console.log(penData[type][penNumber - 1]);

    };

    // Function to update the harvest date by adding 30 days
    window.updateHarvestDate = (penNumber) => {
        const harvestDateInput = document.getElementById(`harvest-date-${penNumber}`);
        const currentDate = harvestDateInput.value ? new Date(harvestDateInput.value) : new Date();

        // Add 30 days to the current date
        currentDate.setDate(currentDate.getDate() + 30);

        // Update the input field with the new date
        harvestDateInput.value = currentDate.toISOString().split('T')[0];

    };    

    // Event listeners for the buttons
    nativeButton.addEventListener("click", () => loadPens("native"));
    broilerButton.addEventListener("click", () => loadPens("broiler"));
});