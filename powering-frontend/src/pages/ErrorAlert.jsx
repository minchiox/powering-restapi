import React from 'react';

export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Errore: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
