document.addEventListener("DOMContentLoaded", function () {
    function toggleChatbot() {
        document.getElementById("chatbot").classList.toggle("active");
    }

    function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        const chatBody = document.getElementById("chatbot-body");
        const userMessage = `<p><b>You:</b> ${userInput}</p>`;
        chatBody.innerHTML += userMessage;

        // AI-Logic for Responses (Only StudyHub Related)
        const responses = {
            "hello": "Hello! How can I assist you with StudyHub?",
            "hi": "Hi there! Ask me anything about StudyHub.",
            "what is studyhub": "StudyHub is a group study platform where students can collaborate, discuss, and share knowledge.",
            "how to join a study group": "To join a study group, go to the 'Features' section and click on 'Join Group'.",
            "how to create a study group": "Click on 'Create Group' under the 'Features' tab and invite your friends.",
            "features": "StudyHub offers group discussions, video calls, resource sharing, and more!",
            "contact": "You can contact us via the 'Contact' page or email us at support@studyhub.com.",
            "bye": "Goodbye! Have a great study session. 😊",
            "how to reset my password": "Go to the 'Settings' page and click on 'Reset Password' to update your credentials.",
            "is studyhub free to use": "Yes! StudyHub is completely free for students to collaborate and study.",
            "how to share notes": "You can upload and share notes in your study group under the 'Resources' tab.",
            "can i schedule a study session": "Yes! You can schedule a study session using the 'Calendar' feature.",
            "how to invite friends to studyhub": "Go to 'Invite Friends' in your profile settings and share the invite link.",
            "how do i report inappropriate content": "You can report any inappropriate content by clicking on the 'Report' button next to the post.",
        };
        
        // Function to provide suggestions
        function getSuggestions(input) {
            input = input.toLowerCase();
            return Object.keys(responses).filter(question => question.includes(input));
        }
        
        // Example usage:
        const userInput1 = "how";
        console.log(getSuggestions(userInput1)); 
        

        // Find response or default
        const botReply = responses[userInput.toLowerCase()] || "Sorry, I can only answer questions related to StudyHub. Try asking about features, study groups, or contact info.";

        setTimeout(() => {
            chatBody.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);

        document.getElementById("user-input").value = "";
    }

    // Attach event listeners
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    window.toggleChatbot = toggleChatbot;
    window.sendMessage = sendMessage;
});
const textArray = [
    "Your ultimate platform for collaborative learning.",
    "Empowering minds through seamless collaboration.",
    "Where knowledge meets innovation and grows together.",
    "Learn, share, and evolve—together as a community.",
    "Building a smarter world through connected learning."
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 100; // Typing Speed

function typeEffect() {
    const displayText = document.getElementById("changing-text");

    if (!isDeleting && charIndex <= textArray[textIndex].length) {
        currentText = textArray[textIndex].slice(0, charIndex++);
        displayText.innerHTML = currentText;
    } else if (isDeleting && charIndex >= 0) {
        currentText = textArray[textIndex].slice(0, charIndex--);
        displayText.innerHTML = currentText;
    }

    if (!isDeleting && charIndex === textArray[textIndex].length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, 500); // Small delay before typing new text
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : speed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = "0"; // Initialize with 0

        const updateCounter = () => {
            const target = +counter.getAttribute("data-target"); // Get final value
            const count = +counter.innerText;
            const speed = target / 100; // Control speed

            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(updateCounter, 20); // Recursive call every 20ms
            } else {
                counter.innerText = target; // Ensure exact final value
            }
        };

        updateCounter();
    });
});
