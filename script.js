
// Mobile menu
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// Guest request buttons + popup submit
document.addEventListener("DOMContentLoaded", () => {
  const requestButtons = document.querySelectorAll(".request-buttons button");
  const requestTypeInput = document.getElementById("requestTypeInput");
  const requestTypeVisible = document.getElementById("requestTypeVisible");
  const guestForm = document.getElementById("guestRequestForm");

  const requestSuccessModal = document.getElementById("requestSuccessModal");
  const modalCloseButton = document.querySelector(".request-modal-close");
  const modalOkButton = document.querySelector(".request-modal-ok");

  function openRequestModal() {
    if (!requestSuccessModal) return;
    requestSuccessModal.classList.add("open");
    requestSuccessModal.setAttribute("aria-hidden", "false");
  }

  function closeRequestModal() {
    if (!requestSuccessModal) return;
    requestSuccessModal.classList.remove("open");
    requestSuccessModal.setAttribute("aria-hidden", "true");
  }

  if (modalCloseButton) modalCloseButton.addEventListener("click", closeRequestModal);
  if (modalOkButton) modalOkButton.addEventListener("click", closeRequestModal);

  if (requestSuccessModal) {
    requestSuccessModal.addEventListener("click", (event) => {
      if (event.target === requestSuccessModal) closeRequestModal();
    });
  }

  requestButtons.forEach(button => {
    button.addEventListener("click", () => {
      const type = button.dataset.request || "general help";

      requestButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      if (requestTypeInput) requestTypeInput.value = type;
      if (requestTypeVisible) requestTypeVisible.value = type;

      if (guestForm) {
        guestForm.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          const roomInput = guestForm.querySelector('input[name="room_number"]');
          if (roomInput) roomInput.focus();
        }, 350);
      }
    });
  });

  if (guestForm) {
    guestForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formAction = guestForm.getAttribute("action");
      const formData = new FormData(guestForm);

      if (!formAction || formAction.includes("YOUR_FORM_ID") || formAction.includes("YOUR_SCRIPT_ID")) {
        alert("The request form is not connected yet. Please ask reception.");
        return;
      }

      try {
        guestForm.classList.add("is-sending");

        await fetch(formAction, {
          method: "POST",
          body: formData,
          mode: "no-cors"
        });

        guestForm.reset();

        if (requestTypeInput) requestTypeInput.value = "general help";
        if (requestTypeVisible) requestTypeVisible.value = "general help";
        requestButtons.forEach(btn => btn.classList.remove("active"));

        openRequestModal();
      } catch (error) {
        alert("Sorry, something went wrong. Please call or visit reception.");
      } finally {
        guestForm.classList.remove("is-sending");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const posterMenu = document.getElementById("menuButton");
  const posterLinks = document.getElementById("navLinks");
  if (posterMenu && posterLinks) {
    posterMenu.addEventListener("click", () => posterLinks.classList.toggle("open"));
  }
});
