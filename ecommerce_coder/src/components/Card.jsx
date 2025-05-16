import React from "react";

export default function Card({ each }) {
  return (
    <article className="flex flex-col items-center justify-center bg-pink-200 m-3 py-4 w-60 rounded-2xl shadow-lg">
      <h3>{each.title}</h3>
      <p>Stock: {each.stock}</p>
      <p>Precio: {each.price}$</p>
      <button
        type="button"
        className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
      >
        Agregar al carrito
      </button>
    </article>
  );
}
