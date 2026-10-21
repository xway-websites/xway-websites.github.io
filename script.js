/* Settings: change before hosting */
var CONTACT_EMAIL = "contact@yourdomain.in";
var FORM_ENDPOINT = ""; /* optional: Formspree or similar URL */

var menu = document.querySelector(".menu"), nav = document.getElementById("nav");
if (menu) {
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
}
document.querySelectorAll("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

var form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = document.getElementById("status");
    if (!form.name.value.trim() || !/\S+@\S+\.\S+/.test(form.email.value)) {
      s.style.color = "#C0392B";
      s.textContent = "Enter your name and a valid email address.";
      return;
    }
    s.style.color = "";
    var d = { name: form.name.value, email: form.email.value, topic: form.topic.value, message: form.message.value };
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; s.textContent = "Message sent. We will reply within two working days."; form.reset(); })
        .catch(function () { s.style.color = "#C0392B"; s.textContent = "Could not send. Email us at " + CONTACT_EMAIL + "."; });
    } else {
      location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Enquiry: " + d.topic) +
        "&body=" + encodeURIComponent("Name: " + d.name + "\nEmail: " + d.email + "\n\n" + d.message);
      s.textContent = "Opening your email app to send the message.";
    }
  });
}
