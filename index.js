// id='input-task'
// id='button-task'
// id='content-task'

let allTask = [];
let input = null;
let buttonAddTask = null;
let buttonDelTask = null;
let inputValue = '';
let tempIndex = -1;
let tempValueTextarea = '';

const updateInputValue = (event) => {
  inputValue = event.target.value;
}
const onClickButtonAdd = () => {
  allTask.push({
    text: inputValue,
    id: `id-${inputValue}`,
    isChecked: false,
    isCheckedEditor: false,
  })
  input.value = ''
  render()
}

const onClickButtonDelete = () => {
  allTask.splice(0)
  render()
}
const changeCheckboxValue = (index) => {
  allTask[index].isChecked = !allTask[index].isChecked
  render()
}
const clickCheckboxEditorValue = (index) => {
  tempIndex = index;
  render()
}
const clickImgDelete = (index) => {
  allTask.splice(index, 1)
  render()
}
const clickCheckboxDoneValue = (index) => {
  allTask[index].text = tempValueTextarea
  tempIndex = -1;
  render()
}
const clickImgCancel = () => {
  tempIndex = -1;
  render()
}
const changeTextarea = (event) => {
  tempValueTextarea = event.target.value
}

window.onload = function() {
  input = document.getElementById('input-task')
  input.addEventListener('change', updateInputValue)
  buttonAddTask = document.getElementById('button-task')
  buttonAddTask.addEventListener('click', onClickButtonAdd)
  buttonDelTask = document.getElementById('button-taskDelete')
  buttonDelTask.addEventListener('click', onClickButtonDelete)
}
const render = () => {
  let content = document.getElementById('content-task')
  while(content.firstChild) {
    content.removeChild(content.firstChild)
  }

  allTask.sort((a, b) => a.isChecked - b.isChecked)

  allTask.map((item, index) => {
    let cart = document.createElement('div')
    cart.id = `id-${index}`

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    // checkbox.className = 'chebox'
    checkbox.checked = item.isChecked
    checkbox.onchange = () => changeCheckboxValue(index)
    cart.appendChild(checkbox)

    if (tempIndex === index) {

    checkbox.disabled = true

    let textareaEdit = document.createElement('input')
    textareaEdit.type = 'textarea'
    textareaEdit.value = item.text
    textareaEdit.onchange = (event) => changeTextarea(event)
    cart.appendChild(textareaEdit)

    let imgDoneCancel = document.createElement('div')
    imgDoneCancel.className = 'imgIcon'
    cart.appendChild(imgDoneCancel)

    let imgDoneTask = document.createElement('img')
    imgDoneTask.src = './img/done.jpeg'
    imgDoneTask.alt = '#'
    imgDoneTask.isCheckedEditor = item.isCheckedEditor
    imgDoneTask.onclick = () => clickCheckboxDoneValue(index)
    imgDoneCancel.appendChild(imgDoneTask)

    let imgCancelTask = document.createElement('img')
    imgCancelTask.src = './img/cancel.jpeg'
    imgCancelTask.alt = '#'
    imgCancelTask.onclick = () => clickImgCancel(index)
    imgDoneCancel.appendChild(imgCancelTask)

    } else {
    
    let paragraf = document.createElement('p')
    paragraf.innerText = item.text
    paragraf.className = item.isChecked ? 'checked' : 'noChecked'
    cart.appendChild(paragraf)

    let imgEditDelete = document.createElement('div')
    imgEditDelete.className = 'imgIcon'
    cart.appendChild(imgEditDelete)

    let imgEditTask = document.createElement('img')
    imgEditTask.src = './img/edit.svg'
    imgEditTask.alt = '#'
    imgEditTask.className = item.isChecked ? 'isCheckedEditor' : ''
    imgEditTask.onclick = () => clickCheckboxEditorValue(index)
    imgEditDelete.appendChild(imgEditTask)

    let imgDeleteTask = document.createElement('img')
    imgDeleteTask.src = './img/delete.svg'
    imgDeleteTask.alt = '#'
    imgDeleteTask.onclick = () => clickImgDelete(index)
    imgEditDelete.appendChild(imgDeleteTask)
    }
    
    cart.className = 'cart-task'
    content.appendChild(cart)
  })
}
