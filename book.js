
// button apply start=============================================================================================================
const searchButton=()=>{
// Clean book area
document.getElementById(`allBookRow`).innerHTML=``;
// spinner 
    document.getElementById(`spinner`).classList.remove(`d-none`)
    document.getElementById(`BookAreaContainer`).style.display=`none`
    // input filed
  var input=document.getElementById(`input`)
  var inputValue=input.value;
  input.value=``;
  // input error Handled
if(inputValue===''){
    document.getElementById(`inputError`).classList.remove(`d-none`)
    document.getElementById(`searchError`).classList.add(`d-none`)
    document.getElementById(`spinner`).classList.add(`d-none`)

}else{
    document.getElementById(`inputError`).classList.add(`d-none`)
    fetchStart(inputValue)
}
}

// fetch funtion start================================================================================================================

const fetchStart=(inputValue)=>{
//   fecth start
fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
.then(response=>response.json())
.then(data=>{
    // error Handled
    if(data.numFound===0){
        document.getElementById(`searchError`).classList.remove(`d-none`)
       document.getElementById(`spinner`).classList.add(`d-none`)
    }else{
       document.getElementById(`searchError`).classList.add(`d-none`)
       displayBook(data)
  }

});
}


// get data start====================================================================================================================
const displayBook=(data)=>{
var DataArray=data.docs
DataArray.forEach(book => {
// total results hear
document.getElementById(`totalResult`).innerHTML=`tatal search result : ${data.numFound}`
// The books are on display here!
var allBookRow=document.getElementById(`allBookRow`)
var singleBook=document.createElement(`div`)
singleBook.classList.add(`col`)
singleBook.innerHTML=`
<div class="card h-100">
<img id="card-img" src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i :` `}-M.jpg" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${book.title}</h5>
  <p class="card-text">Author: ${book.author_name?book.author_name : `____________`}</p>
  <p class="card-text">publisher: ${book.publisher?book.publisher : `_____________`}</p>
  <p class="card-text">first publish year: ${book.first_publish_year?book.first_publish_year : `_____________`}</p>
</div>
<div class="card-footer">
 <button class="btn btn-outline-primary">order now <img src="https://img.icons8.com/fluency/22/000000/fast-cart.png"/></button>
</div>
</div>
`
document.getElementById(`BookAreaContainer`).style.display=`block`
allBookRow.appendChild(singleBook)
});
document.getElementById(`spinner`).classList.add(`d-none`)

}

