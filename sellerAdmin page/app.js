"use strict";

//creating element variables
let form = document.getElementById("my-form");
let listContainer = document.getElementById("listParent");
let buttonEl = document.getElementById("add-button");
var priceValue = document.getElementById("total");

//get functionality

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await axios.get(
      "https://crudcrud.com/api/e2863f1174be4f49917f4de091077888/sellerPage"
    );

    let sum = 0;
    for (let i = 0; i < res.data.length; i++) {
      sum += parseInt(res.data[i].priceEl);
    }
    for (let i = 0; i < res.data.length; i++) {
      displayStats(res.data[i], sum);
    }

    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

//post functionality
async function postCrud(event) {
  event.preventDefault;
  try {
    let nameEl = document.getElementById("name").value;
    let priceEl = document.getElementById("price").value;

    const objDetails = {
      nameEl,
      priceEl,
    };
    // objDetails.priceEl += objDetails.priceEl;

    let res = await axios.post(
      "https://crudcrud.com/api/e2863f1174be4f49917f4de091077888/sellerPage",
      objDetails
    );
    let sum = 0;
    for (let i = 0; i < res.data.length; i++) {
      sum += parseInt(res.data[i].priceEl);
    }

    displayStats(res.data, sum);
  } catch (error) {
    console.log(error);
  }
}

function displayStats(objDetails, num) {
  //create a li element
  let userList = document.createElement("li");
  userList.className = "list-group-item";

  // sum += parseInt(objDetails["price"]);

  priceValue.textContent = `Total value : Rupees ${num}`;

  userList.textContent = `${objDetails.nameEl} -  ${objDetails.priceEl}`;

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";

  //functionality for deletion

  deleteBtn.onclick = async () => {
    try {
      let res = await axios.delete(
        `https://crudcrud.com/api/e2863f1174be4f49917f4de091077888/sellerPage/${objDetails._id}`
      );

      listContainer.removeChild(userList);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // priceValue.textContent = total;
  };
  userList.append(deleteBtn);
  listContainer.appendChild(userList);
}
