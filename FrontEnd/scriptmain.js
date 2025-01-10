// File upload and read input
const fileInput = document.getElementById("file-input");
const codeInput = document.getElementById("code-input");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            codeInput.value = reader.result;
        };
        reader.readAsText(file);
    } else {
        alert("No file selected!");
    }
});

// Code Conversion with Backend Integration
const convertButton = document.getElementById("convert-button");
const codeOutput = document.getElementById("code-output");

convertButton.addEventListener("click", async () => {
    const inputCode = codeInput.value.trim();
    const inputLang = document.getElementById("input-language").value;
    const outputLang = document.getElementById("output-language").value;

    if (!inputCode) {
        alert("Please provide input code!");
        return;
    }

    // Log the payload being sent
    const payload = {
        input_code: inputCode,
        input_language: inputLang,
        output_language: outputLang,
    };
    console.log("Payload sent to backend:", payload);

    try {
        const response = await fetch("http://127.0.0.1:5000/convert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to convert code. Please check the backend.");
        }

        const data = await response.json();
        if (data.converted_code) {
            codeOutput.value = data.converted_code;
        } else {
            alert(data.error || "An unknown error occurred during conversion.");
        }
    } catch (error) {
        console.error("Error converting code:", error);
        alert("Error converting code. Please try again later.");
    }
});

// Copy to Clipboard
document.getElementById("copy-button").addEventListener("click", () => {
    if (codeOutput.value.trim()) {
        navigator.clipboard.writeText(codeOutput.value).then(() => {
            alert("Converted code copied to clipboard!");
        }).catch((error) => {
            console.error("Failed to copy to clipboard:", error);
            alert("Failed to copy to clipboard. Try again.");
        });
    } else {
        alert("No code to copy!");
    }
});

// Download Code
document.getElementById("download-button").addEventListener("click", () => {
    const outputCode = codeOutput.value.trim();
    if (!outputCode) {
        alert("No code to download!");
        return;
    }

    const blob = new Blob([outputCode], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "converted_code.txt";
    a.click();
    URL.revokeObjectURL(a.href); // Clean up URL
});
