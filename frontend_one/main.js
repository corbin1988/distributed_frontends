// Open (or create) the database
let open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function () {
  let db = open.result;
  let store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
  let index = store.createIndex("EmailIndex", ["email"]);
};

open.onsuccess = function () {
  // Start a new transaction
  let db = open.result;
  let tx = db.transaction("MyObjectStore", "readwrite");
  let store = tx.objectStore("MyObjectStore");
  let index = store.index("EmailIndex");

  // Add event listener to the sign in button
  document.getElementById("signInButton").addEventListener("click", function () {
    // Start a new transaction
    let tx = db.transaction("MyObjectStore", "readwrite");
    let store = tx.objectStore("MyObjectStore");

    // Get the email and username input values
    let emailInput = document.getElementById("emailInput").value;
    let usernameInput = document.getElementById("usernameInput").value;

    // Add the email and username to the object store
    store.put({ id: 1, email: emailInput, username: usernameInput });

    window.location.href = "http://localhost:8080/frontend_two/";
  });
};
