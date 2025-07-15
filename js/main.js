(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $(".navbar").addClass("sticky-top shadow-sm");
        } else {
            $(".navbar").removeClass("sticky-top shadow-sm");
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000,
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $(".btn-play").click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $("#videoModal").on("shown.bs.modal", function (e) {
            $("#video").attr(
                "src",
                $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
            );
        });

        $("#videoModal").on("hide.bs.modal", function (e) {
            $("#video").attr("src", $videoSrc);
        });
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });

    // Contact Form Validation
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();
        let valid = true;

        // Get form values
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        // Name validation
        if (!name) {
            $("#name").addClass("is-invalid");
            $("#name-error").text("Name is required.");
            valid = false;
        } else {
            $("#name").removeClass("is-invalid");
            $("#name-error").text("");
        }

        // Email validation
        if (!email) {
            $("#email").addClass("is-invalid");
            $("#email-error").text("Email is required.");
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            $("#email").addClass("is-invalid");
            $("#email-error").text("Please enter a valid email address.");
            valid = false;
        } else {
            $("#email").removeClass("is-invalid");
            $("#email-error").text("");
        }

        // Subject validation
        if (!subject) {
            $("#subject").addClass("is-invalid");
            $("#subject-error").text("Subject is required.");
            valid = false;
        } else {
            $("#subject").removeClass("is-invalid");
            $("#subject-error").text("");
        }

        // Message validation
        if (!message) {
            $("#message").addClass("is-invalid");
            $("#message-error").text("Message is required.");
            valid = false;
        } else {
            $("#message").removeClass("is-invalid");
            $("#message-error").text("");
        }

        if (valid) {
            // Optionally, you can send the form data via AJAX here
            // For now, just show the success message
            $("#contact-success").removeClass("d-none");
            // Optionally, reset the form
            $("#contactForm")[0].reset();
            // Hide success message after a few seconds
            setTimeout(function () {
                $("#contact-success").addClass("d-none");
            }, 4000);
        } else {
            $("#contact-success").addClass("d-none");
        }
    });

    // Booking page reservation form validation (same as index.html)
    if (
        $("#reservation-form").length &&
        window.location.pathname.includes("booking.html")
    ) {
        document
            .getElementById("reservation-form")
            .addEventListener("submit", function (e) {
                e.preventDefault();

                // Get form values
                const nameInput = document.getElementById("name");
                const emailInput = document.getElementById("email");
                const datetimeInput = document.getElementById("datetime");
                const peopleInput = document.getElementById("select1");
                const messageInput = document.getElementById("message");

                let valid = true;

                // Name validation
                if (!nameInput.value.trim()) {
                    nameInput.classList.add("is-invalid");
                    nameInput.nextElementSibling.nextElementSibling.textContent =
                        "Name is required.";
                    valid = false;
                } else {
                    nameInput.classList.remove("is-invalid");
                    nameInput.nextElementSibling.nextElementSibling.textContent =
                        "";
                }

                // Email validation
                if (
                    !emailInput.value.trim() ||
                    !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())
                ) {
                    emailInput.classList.add("is-invalid");
                    emailInput.nextElementSibling.nextElementSibling.textContent =
                        "Valid email is required.";
                    valid = false;
                } else {
                    emailInput.classList.remove("is-invalid");
                    emailInput.nextElementSibling.nextElementSibling.textContent =
                        "";
                }

                // Date & Time validation
                if (!datetimeInput.value.trim()) {
                    datetimeInput.classList.add("is-invalid");
                    datetimeInput.nextElementSibling.nextElementSibling.textContent =
                        "Date & Time is required.";
                    valid = false;
                } else {
                    datetimeInput.classList.remove("is-invalid");
                    datetimeInput.nextElementSibling.nextElementSibling.textContent =
                        "";
                }

                // People validation
                if (!peopleInput.value) {
                    peopleInput.classList.add("is-invalid");
                    peopleInput.nextElementSibling.nextElementSibling.textContent =
                        "Number of people is required.";
                    valid = false;
                } else {
                    peopleInput.classList.remove("is-invalid");
                    peopleInput.nextElementSibling.nextElementSibling.textContent =
                        "";
                }

                // Special Request (optional, but clear error if any)
                messageInput.classList.remove("is-invalid");
                messageInput.nextElementSibling.nextElementSibling.textContent =
                    "";

                if (!valid) {
                    return;
                }

                // Show submitted data in modal
                const modalBody = document.getElementById(
                    "reservationSuccessModalBody"
                );
                modalBody.innerHTML = `
                <p><strong>Name:</strong> ${nameInput.value.trim()}</p>
                <p><strong>Email:</strong> ${emailInput.value.trim()}</p>
                <p><strong>Date & Time:</strong> ${datetimeInput.value.trim()}</p>
                <p><strong>No Of People:</strong> ${peopleInput.value}</p>
                <p><strong>Special Request:</strong> ${
                    messageInput.value.trim()
                        ? messageInput.value.trim()
                        : "None"
                }</p>
            `;

                var myModal = new bootstrap.Modal(
                    document.getElementById("reservationSuccessModal")
                );
                myModal.show();

                // Reset the form after successful submission
                e.target.reset();
            });
    }
})(jQuery);
