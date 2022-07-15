//inorder to fetch the input values of the document
function getInputVal(id) {
    return document.getElementById(id).value;
}


function submitForm(e) {
    e.preventDefault();
    // console.log("hello world");
    var link = getInputVal("linkAddition");
    var category = getInputVal("addingCategory");

    // Add a new document in collection "cities"
    db.collection("Thread-Manager").doc("users").set({
        category:category,
        link: link
    }).then(() => {
            console.log("Document successfully written!");
    }).catch((error) => {
            console.error("Error writing document:", error);
    });

}

document.getElementById("add-thread").addEventListener('submit', submitForm);