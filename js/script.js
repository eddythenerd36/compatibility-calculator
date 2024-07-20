document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded. Fetching data...");

    fetch('data.txt')
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Get response as text
        })
        .then(text => {
            console.log("Response text:", text); // Log raw text
            try {
                const data = JSON.parse(text); // Parse the text as JSON
                console.log("Data fetched:", data); // Log parsed data
                populateDropdowns(data); // Populate dropdowns with data
            } catch (error) {
                console.error("JSON parsing error:", error);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateDropdowns(data) {
    const instruments = new Set();
    for (const key in data) {
        const [inst1, inst2] = key.split(':');
        instruments.add(inst1);
        instruments.add(inst2);
    }

    const select1 = document.getElementById('instrument1');
    const select2 = document.getElementById('instrument2');
    Array.from(instruments).forEach(inst => {
        const option1 = document.createElement('option');
        option1.value = inst;
        option1.text = inst;
        select1.add(option1);

        const option2 = document.createElement('option');
        option2.value = inst;
        option2.text = inst;
        select2.add(option2);
    });
}

function calculateCompatibility() {
    const inst1 = document.getElementById('instrument1').value;
    const inst2 = document.getElementById('instrument2').value;

    // Construct both possible keys
    const key1 = `${inst1}:${inst2}`;
    const key2 = `${inst2}:${inst1}`;

    console.log("Selected instruments:", inst1, inst2);
    console.log("Constructed keys:", key1, key2);

    fetch('data.txt')
        .then(response => {
            console.log("Response received for compatibility check:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Get response as text
        })
        .then(text => {
            console.log("Response text for compatibility check:", text); // Log raw text
            try {
                const data = JSON.parse(text); // Parse the text as JSON
                console.log("Data for compatibility:", data); // Log parsed data
                // Check both possible keys
                const result = data[key1] || data[key2] || { percentage: 0, description: "No compatibility data available." };

                console.log("Result for key:", result); // Log result

                const resultElement = document.getElementById('result');
                if (resultElement) {
                console.log("Result element:", resultElement);
                console.log("Before toggling classes:", resultElement.classList);
                resultElement.innerHTML = `
                    <p><strong>Compatibility:</strong> ${result.percentage}%</p>
                    <p><strong>Description:</strong> ${result.description}</p>
                `;
                resultElement.classList.remove('hidden');
                resultElement.classList.add('show');
                console.log("After toggling classes:", resultElement.classList);
                } else {
                    console.error("Result element not found");
                }            
            } catch (error) {
                console.error("JSON parsing error:", error);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const resultElement = document.getElementById('result');
    resultElement.classList.add('hidden'); // Ensure hidden on load
});
