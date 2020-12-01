//gets all books from inventory and puts them in a table format
function getBooks(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover make it formatted*/
        let html = "<font size=\"5\" face=\"Georgia\" ><table id = \"myTable\" class = \"table-bordered table-hover box\" style= \"margin:0 auto;\"> ";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick = \"sortTable(1)\">ISBN</th><th onclick = \"sortTable(2)\">Title</th><th onclick = \"sortTable(3)\">Author</th><th onclick = \"sortTable(4)\">Genre</th><th onclick = \"sortTable(5)\">Price</th></tr>"
        json.forEach((book) => {
            html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>" + book.genre + "</td>" + "<td>" + "$" + Math.round(book.price * 100)/100 + "</td>";
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("books").innerHTML = html;
    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//gets all books from inventory and puts them in a table format
function getTransactions(){
    //const allSalesApiUrl = "https://localhost:5001/api/books/sales";
    const allSalesApiUrl = "https://thebookbinapi.herokuapp.com/api/books/sales";
    fetch(allSalesApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover make it formatted*/
        let html = "<font size=\"5\" face=\"Georgia\" > <table style= \"margin:0 auto;\"id = \"myTable\" class = \"table-bordered table-hover\" >";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick = \"sortTable(1)\">ISBN</th><th onclick = \"sortTable(2)\">Title</th><th onclick = \"sortTable(3)\">Author</th><th onclick = \"sortTable(4)\">Genre</th><th onclick = \"sortTable(5)\">Price</th><th onclick = \"sortTable(5)\">Name</th><th onclick = \"sortTable(5)\">Date</th></tr>"
        json.forEach((book) => {
            html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>" + book.genre + "</td>" + "<td>" + "$" + Math.round(book.price * 100)/100 + "</td>" + "<td>" + book.name + "</td>" + "<td>" +  book.date + "</td>";
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("reports").innerHTML = html;
        document.getElementById("sum").innerHTML = " ";
    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//gets all books from inventory and prints them out, along with a corresponding delete button
function getBooksToDelete(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";

    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" > <table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick =\"sortTable(1)\">ISBN</th><th onclick =\"sortTable(2)\">Title</th><th onclick =\"sortTable(3)\">Author</th><th onclick =\"sortTable(4)\">Genre</th><th onclick =\"sortTable(5)\">Price</th><th>Delete</th></tr>"
        //add each book to the table, including a delete button that links to the delete book method
        json.forEach((book) => {
            html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>"+ book.genre + "</td><td>"+  "$" + Math.round(book.price * 100)/100 + "</td>" + 
            "<td><button onclick = \"deleteBook("+book.id+")\">Delete</button></td></tr>";
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("delete").innerHTML = html;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//adds a book to the books table
function postBook(){
    //const postBookApiUrl = "https://localhost:5001/api/books";
    const postBookApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    //getting the readlines from the website when a user adds a book
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookIsbn = document.getElementById("isbn").value;
    const bookGenre = document.getElementById("genre").value;
    const bookPrice = document.getElementById("price").value;
    let html = "";
    //ERROR handling for if every field wasnt entered
if(bookTitle == "" || bookAuthor == "" ||bookIsbn == ""||bookGenre == "" ||bookPrice == ""){
    html = "Sorry! Not all fields were entered and the book did not add. Please try again.";
    console.log(html);
    document.getElementById("error").innerHTML = html;
}
else{ //add book to inventory
    html = "Success! Your book was added to inventory.";
    //make call to the backend, pass it the data, and make post the book
    fetch(postBookApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }, //sending our data
        body:JSON.stringify({
            isbn: bookIsbn,
            title: bookTitle,
            author: bookAuthor,
            genre: bookGenre,
            price: parseFloat(bookPrice)
        })
    })
    .then((response)=>{
        console.log(response);
        getBooks(); //show all books
    })
    document.getElementById("error").innerHTML = html; //return success method
}
}

//deletes book from the inventory database
deleteBook = function(id){
    console.log(id);
    //it needs to get an id so the controller knows which to delete
    //const deleteBookApiUrl = "https://localhost:5001/api/books/" + id;
    const deleteBookApiUrl = "https://thebookbinapi.herokuapp.com/api/books/" + id;
    //getting the readlines from the website when a user adds a book

    //make call to the backend, pass it the data, and make it run the delete
    fetch(deleteBookApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    })
    .then((response)=>{
        console.log(response);
        getBooksToDelete(); //refresh page
    })
}

//used to search all available books and put matching results in a table format
function search(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" ><table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick =\"sortTable(1)\">ISBN</th><th onclick =\"sortTable(2)\">Title</th><th onclick =\"sortTable(3)\">Author</th><th onclick =\"sortTable(4)\">Genre</th><th onclick =\"sortTable(5)\">Price</th>";
        json.forEach((book) => {
            if (book.title.toLowerCase() == search || book.isbn == search)(
                html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>" + book.genre + "</td>" + "<td>" + "$" + Math.round(book.price * 100)/100 + "</td>"
            )
            
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("books").innerHTML = html;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//used to search all available books and put matching results in a table format along with a delete button
function searchDelete(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" ><table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick =\"sortTable(1)\">ISBN</th><th onclick =\"sortTable(2)\">Title</th><th onclick =\"sortTable(3)\">Author</th><th onclick =\"sortTable(4)\">Genre</th><th onclick =\"sortTable(5)\">Price</th><th>Delete</th></tr>"
        //add each book to the table, including a delete button that links to the delete book method
        json.forEach((book) => {
            if (book.title.toLowerCase() == search || book.isbn == search)(
                html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>"+ book.genre + "</td><td>"+ "$" + Math.round(book.price * 100)/100 + "</td>" + 
                "<td><button onclick = \"deleteBook("+book.id+")\">Delete</button></td></tr>"
            )
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("delete").innerHTML = html;
    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//sort headers when you click them
function sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("tr");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}

//finds the total of the inputted book and presents it to the screen
function getTotal(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    let html = 0.0;
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        json.forEach((book) => {
            //if we found a matching book, increase the total
            if (book.title.toLowerCase() == search || book.isbn == search){
                 html = "$" + Math.round(book.price * 100)/100
                 console.log("price" + book.price);
            }
        
        });
        //error handing if no matching book was found
        if(html == 0.0){
            html = "Sorry! That was not a valid ISBN/Title. Please try again.";
        }
        document.getElementById("total").innerHTML = html;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//calculate change that should be given to a customer
function getChange(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    const change = document.getElementById("getChange").value;
    let html = 0.0;
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        json.forEach((book) => {
            //if we found a match, calculate change to two decimal places
            if (book.title.toLowerCase() == search || book.isbn == search){
                 html = "$" + Math.round((change - book.price) * 100 + Number.EPSILON) / 100;
            }
            document.getElementById("change").innerHTML = html;
        });
    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//sell a book- remove it from inventory and add it to transaction
function bookTotal(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    //const allTransactionsApiUrl = "https://localhost:5001/api/books/sales";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const allTransactionsApiUrl = "https://thebookbinapi.herokuapp.com/api/books/sales";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        json.forEach((book) => {
            //if  you found a match, delete from inventory and add it to transaction
            if (book.title.toLowerCase() == search || book.isbn == search){
                 const price = book.price;
                 const id = book.id;
                 const isbn = book.isbn;
                 const title = book.title;
                 const author = book.author;
                 const genre = book.genre;
                 const name = document.getElementById("custName").value;
                 deleteBook(id);

                 fetch(allTransactionsApiUrl, {
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json',
                    },
                    body:JSON.stringify({
                        
                        price: parseFloat(price),
                        id: id,
                        isbn: isbn,
                        title: title,
                        author: author,
                        genre: genre,
                        name: name
                    })
                })
                .then((response)=>{
                    window.location.href= "./index.html";
                    console.log(response);
                })
            }
        
        });

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//gets all books and prints to screen, along with a corresponding edit button for each
function getBooksToEdit(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";

    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" > <table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick =\"sortTable(1)\">ISBN</th><th onclick =\"sortTable(2)\">Title</th><th onclick =\"sortTable(3)\">Author</th><th onclick =\"sortTable(4)\">Genre</th><th onclick =\"sortTable(5)\">Price</th><th>Edit</th></tr>"
        //add each book to the table, including a delete button that links to the delete book method
        json.forEach((book) => {
            html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>"+ book.genre + "</td><td>"+ "$" + Math.round(book.price * 100)/100 + "</td>" + 
            "<td><button onclick = \"editBook("+book.id+", \'"+book.isbn+"\', \'"+book.title+"\', \'"+book.author+"\', \'"+book.genre+"\', \'"+book.price+"\')\">Edit</button></td></tr>";
            //, "+book.title+", "+book.genre+", "+book.price+"
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("edit").innerHTML = html;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}


//searches all books and puts every matching result in a table along with a corresponding edit button
function searchEdit(){
    //const allBooksApiUrl = "https://localhost:5001/api/books";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" > <table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick =\"sortTable(1)\">ISBN</th><th onclick =\"sortTable(2)\">Title</th><th onclick =\"sortTable(3)\">Author</th><th onclick =\"sortTable(4)\">Genre</th><th onclick =\"sortTable(5)\">Price</th><th>Edit</th></tr>"
        //add each book to the table, including a delete button that links to the delete book method
        json.forEach((book) => {
            if (book.title.toLowerCase() == search || book.isbn == search)(
                html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>"+ book.genre + "</td><td>"+ "$" + Math.round(book.price * 100)/100 + "</td>" + 
                "<td><button onclick = \"editBook("+book.id+", \'"+book.isbn+"\', \'"+book.title+"\', \'"+book.author+"\', \'"+book.genre+"\', \'"+book.price+"\')\">Edit</button></td></tr>"
            )
        });
        html += "</table>";
        //target that html element and set it equal to html
        document.getElementById("edit").innerHTML = html;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

function breakdown(){
    //const allBooksApiUrl = "https://localhost:5001/api/books/sales";
    const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books/sales";
    const search = document.getElementById("search").value.toLowerCase(); //to lower makes it not case sensitive
    //whatever comes back from allbookspaiurl will go back as the response for the then
    fetch(allBooksApiUrl).then(function(response){
        console.log(response);
        //turn response into a json object we can deal with 
        return response.json();
    }).then(function(json){
        /*border and hover are built into bootstrap and make it prettier*/
        let html = "<font size=\"5\" face=\"Georgia\" > <table style= \"margin:0 auto;\" id = \"myTable\" class = \"table-bordered table-hover center\">";
        /*adding the table row and table headers*/
        html +="<tr style=\"background-color:#aac8c8;\"><th onclick = \"sortTable(0)\">ID</th><th onclick = \"sortTable(1)\">ISBN</th><th onclick = \"sortTable(2)\">Title</th><th onclick = \"sortTable(3)\">Author</th><th onclick = \"sortTable(4)\">Genre</th><th onclick = \"sortTable(5)\">Price</th><th onclick = \"sortTable(5)\">Name</th><th onclick = \"sortTable(5)\">Date</th></tr>";       
        var total = "Your total revenue for "+search+" was: ";
        var revenue = 0.0;
        json.forEach((book) => {
            //break data into different vars we can compare with the search 
             var dateString = book.date;
             var yearMonth = dateString.substring(0,7);
             var year = dateString.substring(0,4);
             var month = dateString.substring(5,7);
             console.log("month" + month);
            if (book.genre.toLowerCase() == search || year == search || month == search|| yearMonth == search){ // || year == search
                html += "<tr><td>" + book.id + "</td><td>" + book.isbn + "</td><td>" + book.title + "</td><td>"+ book.author + "</td><td>" + book.genre + "</td>" + "<td>" + "$" + Math.round(book.price * 100)/100 + "</td>" + "<td>" + book.name + "</td>" + "<td>" +  book.date + "</td>";
                revenue += book.price; 
            }
        });
        console.log(sum);
        html += "</table>";
        if(revenue == 0){ //error handling
            total = "There were no reports matching your search. Please try again.";
            revenue = " ";
            html = " ";
        }
        else{
            total = total + " $" + Math.round((revenue) * 100 + Number.EPSILON) / 100;;
        }
        //target that html element and set it equal to html
        document.getElementById("reports").innerHTML = html;
        document.getElementById("sum").innerHTML = total;

    }).catch(function(error){ //catch any errors
        console.log(error);
    })
}

//edits a book in inventory
function editBook(id, isbn, title, author, genre, price){
    //pass id in with url
    const editBookApiUrl = "https://thebookbinapi.herokuapp.com/api/books/" + id;
    //const allBooksApiUrl = "https://thebookbinapi.herokuapp.com/api/books";
    //set all text boxes to variables
    var bookIsbn = document.getElementById("isbnEdit").value;
    var bookTitle = document.getElementById("titleEdit").value;
    var bookAuthor = document.getElementById("authorEdit").value;
    var bookGenre = document.getElementById("genreEdit").value;
    var bookPrice = document.getElementById("priceEdit").value;

    //if any of the textboxed are empty, set it to the original data for that field
    if(bookIsbn == ""){
        console.log("its empty")
        bookIsbn = isbn;
        console.log("isbn " + bookIsbn);
    }
    if(bookTitle == ""){
        console.log("its empty")
        bookTitle = title;
        console.log("title " + bookTitle);
    }
    if(bookAuthor == ""){
        console.log("its empty")
        bookAuthor = author;
        console.log("author " + bookAuthor);
    }
    if(bookGenre == ""){
        console.log("its empty")
        bookGenre = genre;
        console.log("genre " + bookGenre);
    }
    if(bookPrice == ""){
        console.log("its empty")
        bookPrice = price;
        console.log("price " + bookPrice);
    }

    //edit
    fetch(editBookApiUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }, //sending our data
        body:JSON.stringify({
            isbn: bookIsbn,
            title: bookTitle,
            author: bookAuthor,
            genre: bookGenre,
            price: parseFloat(bookPrice)
        })
    })
    .then((response)=>{
        console.log(response);
        getBooksToEdit(); //refresh page
    })
}