"use strictmode";

async function sellProduct(event) {
  event.preventDefault();
  const sellPrice = Number(document.querySelector("#sellPrice").value);
  const productName = document.querySelector("#productName").value;
  let price = Number(document.querySelector(".addDeletion").textContent);

  price += sellPrice;
  console.log(price);

  let storedPrice = (document.querySelector(".addDeletion").textContent =
    price);

  // console.log(Number(sellPrice));
  // console.log(price);
  // console.log();

  let productObj = {
    sellPrice,
    productName,
    storedPrice,
    price,
  };

  getDetails(productObj);

  try {
    let postData = await axios.post(
      "https://crudcrud.com/api/84a192dac4d94a078df4761dbc7715fd/ecomProject",
      productObj
    );
    console.log(postData);
    console.log(productObj.price);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const windowData = await axios.get(
      "https://crudcrud.com/api/84a192dac4d94a078df4761dbc7715fd/ecomProject"
    );

    for (let i = 0; i < windowData.data.length; i++) {
      getDetails(windowData.data[i]);
    }
    // storedPrice.textContent = productObj.storedPrice;
    console.log(windowData.data);
  } catch (error) {
    console.log(`get details error : ${error}`);
  }
});

async function getDetails(productObj) {
  let parentElement = document.querySelector("#listProduct");
  let ListProducts = document.createElement("li");

  ListProducts.textContent = ` Price - ${productObj.sellPrice},  product -  ${productObj.productName}  `;

  ListProducts.classList = "productList";
  parentElement.appendChild(ListProducts);

  let BtnDelete = document.createElement("input");
  BtnDelete.type = "button";
  BtnDelete.value = "delete";
  BtnDelete.classList = "delete button";

  ListProducts.appendChild(BtnDelete);

  BtnDelete.onclick = async () => {
    try {
      let deletedData = await axios.put(
        `https://crudcrud.com/api/84a192dac4d94a078df4761dbc7715fd/ecomProject/{ 
          sellPrice:${productObj.sellPrice},
    productName:${productObj.productName},
    storedPrice:${productObj.storedPrice}
        }`
      );

      parentElement.removeChild(ListProducts);
    } catch (error) {
      console.log(error);
    }
  };
}
