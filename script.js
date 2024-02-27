const itemForm =  document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');    
const itemFilter = document.getElementById('filter')
let isEditMode = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // validate Input
    if(newItem.value === ''){
        alert('Please Insert An Item');
        return;
    }
    // Check for Edit Mode
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false
    }else{
        if(checkIfItemExists(newItem)){
            alert('That item alredy Exists')
            return;
        }
    }

    // Craete item Dom elemant
    addItemToDOM(newItem);
// Add item to local storage
addItemToStorage(newItem);

    // create list item
    

 checkUI();
 itemInput.value = '';

}

   

    function addItemToDOM(item){
        const li = document.createElement('li');
     li.appendChild(document.createTextNode(item));
    
     const button = createButton('remove-item btn-link text-red');
     li.appendChild(button);
     
     itemList.appendChild(li);
    }
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

}
function addItemToStorage(item){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    itemsFromStorage.push(item);


    // convert to JSON string Set to Local Storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
    function getItemsFromStorage(){
        let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage
    }
    function onClickItem(e){
        if(e.target.parentElement.classList.contains('remove-item')){
            removeItem(e.target.parentElement.parentElement);
        }else{
            setItemToEdit(e.target)
        }
    }
    function checkIfItemExists(item){
        const itemsFromStorage = getItemsFromStorage();
        // if(itemsFromStorage.includes(item)){
        //     return true;
        // }else{
        //     return false;
        // }
        return itemsFromStorage.includes(item);
    }

    function setItemToEdit(item){
        isEditMode = true;
        // item.style.color = '#ccc';
        itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
        item.classList.add('edit-mode');
        formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
        formBtn.style.backgroundColor = '#228B22';
        itemInput.value = item.textContent;

    }


function removeItem(item){
   if(confirm('Are you Sure?')){
    // Remove item From Dom
    item.remove();

    // Remove item from storage 
    removeItemFromStorage(item.textContent);

    checkUI();
   }
//     if(e.target.parentElement.classList.contains('remove-item')){
//         if (confirm('Are you Sure??')){
//             e.target.parentElement.parentElement.remove();
//             checkUI();
//         }

//     }
 }

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    // E set to local srorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function clearItems(){
    // simply and faster way 
    // itemList.innerHTML = '';
    // better and Longer way
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    // Clear from Local Storage
    localStorage.removeItem('items')
    
    checkUI();
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    
    const text = e.target.value.toLowerCase();
   items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
  ;
    if(itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
    }else{
        item.style.display = 'none';
    }
   });
}



function checkUI(){
    const items = itemList.querySelectorAll('li')
    if (items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    }else {

        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';

    }
    formBtn.innerHTML = '<i class= "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'

    isEditMode = false;
}

// Even listnner
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems)

checkUI();
