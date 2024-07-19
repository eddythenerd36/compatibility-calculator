document.addEventListener("DOMContentLoaded", function() {
    // Load instruments and populate dropdowns
    fetch('data.txt')
        .then(response => response.json())
        .then(data => {
            const instruments = new Set();
            const compatibilityMatrix = data;

            for (const key in compatibilityMatrix) {
                const [inst1, inst2] = key.split(':');
                instruments.add(inst1);
                instruments.add(inst2);
            }

            // Populate dropdowns
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
        });
});

function calculateCompatibility() {
    const inst1 = document.getElementById('instrument1').value;
    const inst2 = document.getElementById('instrument2').value;
    const key = inst1 < inst2
        ? `${inst1}:${inst2}`
        : `${inst2}:${inst1}`;

    fetch('data.txt')
        .then(response => response.json())
        .then(data => {
            const result = data[key] || { percentage: 0, description: "No compatibility data available." };

            // Display result
            document.getElementById('result').innerHTML = `
                <p><strong>Compatibility:</strong> ${result.percentage}%</p>
                <p><strong>Description:</strong> ${result.description}</p>
            `;
        });
}

