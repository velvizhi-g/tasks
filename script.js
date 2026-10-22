let input = document.getElementById("mission");
let list = document.getElementById("missionlist");

function addMission() {
  let text = input.value.trim();  

    if (text === "") {
    alert("Please enter a mission first.");
    return;
  }

  let item = document.createElement("li");
  item.textContent = text;


  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

 
  deleteBtn.onclick = function () {
    item.remove();
    updateTotal();
  };

  item.appendChild(deleteBtn);
  item.onclick = function () {
    item.classList.toggle("completed");
  };
  list.appendChild(item);
  input.value = "";
  updateTotal();
}
function updateTotal() {
  let total = list.children.length;
  document.getElementById("total").textContent = total;
}
function changeColour() {
  document.body.style.backgroundColor = "#fff3f3";
}
input.onkeydown = function (event) {
  if (event.key === "Enter") {
    addMission();
  }
};
updateTotal();