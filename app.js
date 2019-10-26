let add = document.querySelector('.adddata');
function showForm() {
    add.style.opacity = 1;
}
let close = document.querySelector('.closes');
close.addEventListener('click', function () {
    add.style.opacity = 0;
});
//OOP 
class info {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class UI {
    static displayInfo() {
        const infos = store.getInfos();
        infos.forEach((info) => {
            UI.addInfo(info);
        })
    }
    static addInfo(info) {
        let list = document.querySelector('#infoList');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${info.name}</td>
            <td>${info.age}</td>
            <td><a href="#" class="btn btn-danger delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static remove(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static clearInput() {
        document.querySelector('#name').value = "";
        document.querySelector('.sel').value = "";
    }

}
class store {
    static getInfos() {
        let info;
        if (localStorage.getItem('info') === null) {
            info = [];
        } else {
            info = JSON.parse(localStorage.getItem('info'));
        }
        return info;
    }
    static addInfo(info) {
        const infos = store.getInfos();
        infos.push(info);
        localStorage.setItem('info', JSON.stringify(infos));
    }
    static deleteInfo(name) {
        const infos = store.getInfos();
        infos.forEach((element, index) => {
            if (element.name === name) {
                infos.splice(index, 1);
            }
        });
        localStorage.setItem('info', JSON.stringify(infos));
    }
    static asc() {
        let infos = store.getInfos();
        infos.sort((a, b) => a.age - b.age);
        localStorage.setItem('info', JSON.stringify(infos));
    }
    static desc() {
        let infos = store.getInfos();
        infos.sort((a, b) => b.age - a.age);
        localStorage.setItem('info', JSON.stringify(infos));
    }
}
UI.displayInfo();
document.querySelector('.add').addEventListener('click', function () {
    const name = document.querySelector('#name').value;
    const age = document.querySelector('.sel').value;
    if (name === "" || age === "") {
        alert('Empty...')
    } else {
        const i = new info(name, age);
        UI.addInfo(i);
        store.addInfo(i);
        UI.clearInput();
    }
});
document.querySelector('#infoList').addEventListener('click', function (event) {
    UI.remove(event.target);
    store.deleteInfo(event.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    const rowNode = event.target.parentElement;
    const name = rowNode.cells[0].innerHTML;
    const age = rowNode.cells[1].innerHTML;
    document.querySelector('#name').value = name;
    document.querySelector('.sel').value = age;
});
document.querySelector('.btnasc').addEventListener('click', store.asc)
document.querySelector('.btndesc').addEventListener('click', store.desc);