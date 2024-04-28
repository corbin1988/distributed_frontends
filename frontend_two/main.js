let open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function () {
  let db = open.result;
  let store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
  let index = store.createIndex("EmailIndex", ["email"]);
};

function displayValues(db) {
  // Start a new transaction
  let tx = db.transaction("MyObjectStore", "readonly");
  let store = tx.objectStore("MyObjectStore");

  // Get the values from the object store
  let getRequest = store.get(1);

  getRequest.onsuccess = function() {
      // Get the email and username values
      let email = this.result.email;
      let username = this.result.username;

      // Display the values on the page
      document.getElementById('emailDisplay').textContent = email;
      document.getElementById('usernameDisplay').textContent = username;
  };
}

open.onsuccess = function() {
  // When the database is opened successfully, display the values
  displayValues(open.result);
};