document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Contact form submission handling
    const contactForm = document.querySelector('#contact form');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (contactForm && confirmationMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send form data to a server here.
            // For this example, we just show the confirmation message.

            contactForm.style.display = 'none'; // Hide the form
            confirmationMessage.style.display = 'block'; // Show the message

            // Optionally, hide the message after a few seconds
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
                contactForm.style.display = 'flex'; // Show form again for new submission
                contactForm.reset(); // Clear form fields
            }, 5000); // Hide after 5 seconds
        });
    }
});