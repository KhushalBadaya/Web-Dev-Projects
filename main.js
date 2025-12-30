const bookmarknameInput=document.querySelector(".name");
const bookmarkUrlInput=document.querySelector(".Url");
const addBookmarkBtn=document.querySelector(".add");
const bookmarkList=document.querySelector(".bookmarkList");

document.addEventListener("DOMContentLoaded", loadBookmarks);

// const bookmarks =JSON.parse(localStorage.getItem("bookmarks")) || [];
addBookmarkBtn.addEventListener("click",()=>{
    const name=bookmarknameInput.value.trim();
    const url=bookmarkUrlInput.value.trim();
    if(!url.startsWith("http://")&&!url.startsWith("https://")){
        alert("Please enter the correct Url");
    }else{
    addBookmark(name,url);
  
    saveBookmark(name,url);
        bookmarknameInput.value="";
        bookmarkUrlInput.value="";
}
});



function addBookmark(name,url){
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href= url;
    link.text=name;
    link.target="_blank";//opens in new tab else it would be open in this current tab 
    

    const removeBtn=document.createElement("button");
    removeBtn.innerText="REMOVE";
    removeBtn.addEventListener("click",()=>{
        bookmarkList.removeChild(li);
        removeBookmarkFromLocalStorage(name,url)
    });
    li.appendChild(link);
    li.appendChild(removeBtn);
    bookmarkList.appendChild(li);
} 
function getBookmarksFromStorage(){
     const bookmarks = localStorage.getItem("bookmarks");
     return bookmarks?JSON.parse(bookmarks):[];
}

function saveBookmark(name,url){
    const bookmarks=getBookmarksFromStorage();
    bookmarks.push({ name,url});   
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromLocalStorage(name, url) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}