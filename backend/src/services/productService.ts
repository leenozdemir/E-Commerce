import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Acer HELIOS PH16-72-9467 Gaming Laptop",
        image:
          "/assets/images/Acer-HELIOS-PH16-72-9467-Gaming-Laptop.jpg",
        price: 3300,
        stock: 10,
      },
      {
        title: "Acer Nitro ANV16-41-R2YV Laptop",
        image:
          "/assets/images/Acer-Nitro-ANV16-41-R2YV-Laptop.jpg",
        price: 1280,
        stock: 20,
      },
      {
        title: "Acer Predator Helios 16 Gaming Laptop",
        image:
          "/assets/images/Acer-Predator-Helios-16-Gaming-Laptop.jpg",
        price: 3449,
        stock: 8,
      },
      {
        title: "Acer Predator Helios Neo 16 Gaming Laptop",
        image:
          "/assets/images/Acer-Predator-Helios-Neo-16-Gaming-Laptop.jpg",
        price: 1899,
        stock: 8,
      },
      {
        title: "Acer Aspire 3 A315-59-566E Laptop",
        image:
          "/assets/images/Acer-Aspire-3-A315-59-566E-Laptop.jpg",
        price: 699,
        stock: 10,
      },
      {
        title: "Acer Aspire Lite AL14-31P Laptop",
        image:
          "/assets/images/Acer-Aspire-Lite-AL14-31P-Laptop.jpg",
        price: 480,
        stock: 20,
      },
      {
        title: "Acer Swift SF14-11-X41L Laptop",
        image:
          "/assets/images/Acer-Swift-SF14-11-X41L-Laptop.jpg",
        price: 1520,
        stock: 8,
      },
      {
        title: "Acer Swift SF314-43-R9GG Laptop",
        image:
          "/assets/images/Acer-Swift-SF314-43-R9GG-Laptop.jpg",
        price: 800,
        stock: 8,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};