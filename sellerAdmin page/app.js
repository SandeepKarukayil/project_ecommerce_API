"use strict";

//creating element variables
let form = document.getElementById("my-form");
let buttonEl = document.getElementById("add-button");
let priceValue = document.getElementById("total");
let link =
  "https://crudcrud.com/api/1985df5d69634326ab395f829eb8458e/sellerPage";

form.addEventListener("submit", postCrud);
//get functionality

window.addEventListener("DOMContentLoaded", async () => {
  let sum = 0;
  try {
    let Response = await axios.get(link);

    for (let i = 0; i < Response.data.length; i++) {
      sum += parseInt(Response.data[i].priceEl);
    }
    for (let i = 0; i < Response.data.length; i++) {
      displayStats(Response.data[i], sum);
    }

    console.log(Response);
  } catch (error) {
    console.log(error);
  }
});

//post functionality

async function postCrud(event) {
  let nameEl = document.getElementById("name").value;
  let priceEl = document.getElementById("price").value;

  try {
    const objDetails = {
      nameEl,
      priceEl,
    };
    // objDetails.priceEl += objDetails.priceEl;

    let Response = await axios.post(link, objDetails);
    let sum = 0;
    for (let i = 0; i < Response.data.length; i++) {
      sum += parseInt(Response.data[i].priceEl);
    }

    displayStats(Response.data, sum);
  } catch (error) {
    console.log(error);
  }
}

function displayStats(objDetails, num) {
  //create a li element
  let userList = document.createElement("li");
  userList.className = "list-group-item";

  let listContainer = document.getElementById("listParent");
  // sum += parseInt(objDetails["price"]);

  priceValue.textContent = `Total value : Rupees ${num}`;

  userList.textContent = `${objDetails.nameEl} -  ${objDetails.priceEl}`;

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";

  //functionality for deletion

  deleteBtn.onclick = async () => {
    try {
      let Response = await axios.delete(`${link}/${objDetails._id}`);

      listContainer.removeChild(userList);
    } catch (error) {
      console.log(error);
    }
    priceValue.textContent = total;
    window.location.reload();
  };
  listContainer.appendChild(userList);
  userList.append(deleteBtn);
}
