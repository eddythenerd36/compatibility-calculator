document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded. Fetching data...");
    
    fetch('data.txt')
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched:", data);
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
        })
        .catch(error => console.error('Error fetching data:', error));
});

function calculateCompatibility() {
    const inst1 = document.getElementById('instrument1').value;
    const inst2 = document.getElementById('instrument2').value;
    const key = inst1 < inst2
        ? `${inst1}:${inst2}`
        : `${inst2}:${inst1}`;

    console.log("Selected instruments:", inst1, inst2);
    console.log("Constructed key:", key);

    fetch('data.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Get response as text first
        })
        .then(text => {
            console.log("Response text for compatibility check:", text);
            const data = JSON.parse(text); // Parse the text as JSON
            console.log("Data for compatibility:", data);
            const result = data[key] || { percentage: 0, description: "No compatibility data available." };

            console.log("Result for key:", result);

            document.getElementById('result').innerHTML = `
                <p><strong>Compatibility:</strong> ${result.percentage}%</p>
                <p><strong>Description:</strong> ${result.description}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
}
