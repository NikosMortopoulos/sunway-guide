const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => navLinks.classList.toggle("open"));

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const requestButtons = document.querySelectorAll(".request-buttons button");
const requestTypeInput = document.getElementById("requestTypeInput");
const requestTypeVisible = document.getElementById("requestTypeVisible");
const guestForm = document.getElementById("guestRequestForm");

requestButtons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.request;
    requestButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    requestTypeInput.value = type;
    requestTypeVisible.value = type;
    guestForm.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => guestForm.querySelector('input[name="room_number"]').focus(), 350);
  });
});
