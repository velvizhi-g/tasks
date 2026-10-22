var movies = ["Sita Raman", "Mollywood Times", "29"];
var prices = [200, 190, 180];

emailjs.init("YOUR_PUBLIC_KEY");

for (var i = 0; i < movies.length; i++) {
  document.getElementById("movieList").innerHTML += "<tr><td>" + movies[i] + "</td><td>₹" + prices[i] + "</td></tr>";
  document.getElementById("movieSelect").innerHTML += "<option>" + movies[i] + "</option>";
}

function showTotal() {
  var tickets = Number(document.getElementById("quantity").value);
  var index = document.getElementById("movieSelect").selectedIndex;
  var total = 0;
  if (tickets > 0) {
    total = prices[index] * tickets;
  }
  document.getElementById("total").textContent = total;
}

function resetForm() {
  document.getElementById("movieSelect").selectedIndex = 0;
  document.getElementById("showtimeSelect").selectedIndex = 0;
  document.getElementById("email").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("total").textContent = "0";
}

document.getElementById("bookBtn").addEventListener("click", function () {
  var movie = document.getElementById("movieSelect").value;
  var time = document.getElementById("showtimeSelect").value;
  var email = document.getElementById("email").value.trim();
  var tickets = Number(document.getElementById("quantity").value);
  var message = document.getElementById("message");

  if (time === "" || email.indexOf("@") === -1 || tickets < 1 || tickets % 1 !== 0) {
    message.textContent = "Please fill all details correctly.";
    return;
  }

  var total = prices[document.getElementById("movieSelect").selectedIndex] * tickets;
  message.textContent = "Sending email...";

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_email: email,
    movie: movie,
    showtime: time,
    quantity: tickets,
    total: total
  }).then(function () {
    message.textContent = "Booking done! Email sent to " + email;
    resetForm();
  }).catch(function () {
    message.textContent = "Email could not be sent. Check your EmailJS settings.";
  });
});

document.getElementById("resetBtn").addEventListener("click", resetForm);
document.getElementById("movieSelect").addEventListener("change", showTotal);
document.getElementById("quantity").addEventListener("input", showTotal);