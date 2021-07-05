// fetch data from the website and run the appendData(data) function
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // run the function
        appendData(data);
    })
    .catch(function(err) {
        // if there is error while fetching the data
        console.log("error: " + err);
    });

// function that populates the page with posts
function appendData(data) {
    var mainContainer = document.getElementById("posts");
    // for each element in the data array
    for (var i = 0; i < data.length; i++) {
        // create a new div
        var div = document.createElement("div");
        // the element's title is the only content in that div
        div.innerHTML = data[i].title;
        // add class and id to the div
        div.classList.add("post");
        div.setAttribute("id", data[i].id);
        // if users clicks on the div, show the modal
        div.setAttribute("onClick", "showModal(this)");
        // append this div to the container div
        mainContainer.appendChild(div);
    }
}

// function that shows and updates the modal
function showModal(elem) {
    // get and show the modal
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    // update content in the modal
    $.getJSON("https://jsonplaceholder.typicode.com/posts", function(data) {
        //from the data array, get the element with the same id as that of the post that got clicked
        let post = data.filter((e) => e.id == elem.id);
        // update the title and body div with chossen element
        document.getElementById("title").innerHTML = post[0].title;
        document.getElementById("body").innerHTML = post[0].body;
        // access users data
        $.getJSON("https://jsonplaceholder.typicode.com/users", function(users) {
            // from the users array, get the element with the same id as the post's userId
            let user = users.filter((u) => u.id == post[0].userId);
            //   update author and catchPhrase div
            document.getElementById("author").innerHTML = user[0].name;
            document.getElementById("catchPhrase").innerHTML =
                user[0].company.catchPhrase;
        });
    });
}

// function to hide the modal
function hideModal() {
    let modal = document.getElementById("modal");
    // hide the modal
    modal.style.display = "none";
    // reset all content within the modal
    document.getElementById("author").innerHTML = "";
    document.getElementById("catchPhrase").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("body").innerHTML = "";
}

// if user clicks outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        // hide the modal
        hideModal();
    }
};