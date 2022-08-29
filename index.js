function findAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/api/animal",
        success: function (data) {
            let result = display(data)
            document.getElementById("display").innerHTML = result
        }
    })
}

function display(data) {
    let result = ""
    result += "<table id='table'><tr>" +
        "<th>STT</th>" +
        "<th>Name</th>" +
        "<th>Age</th>" +
        "<th>Gender</th>" +
        "<th colspan='2'>Action</th>" +
        "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + data[i].name + "</td>" +
            "<td>" + data[i].age + "</td>" +
            "<td>" + data[i].gender + "</td>" +
            "<td><button onclick='findById(" + data[i].id + ")'>Update</button></td>" +
            // "<td><button onclick='deleteById(" + data[i].id + ")'>Delete</button></td>" +
            "<td><button onclick='testConfirm(" + data[i].id + ")'>DeleteConfirm</button></td>" +
            "</tr>"
    }
    result += "</table>"
    return result;
}

function testConfirm(id) {
    let result = confirm("Bạn có chắc chắn muốn xóa?")
    if (result) {
        deleteById(id)
    }
}

function create() {
    let name = $("#name").val()
    let age = $("#age").val()
    let gender = $("#gender").val()
    let animal = {
        name: name,
        age: age,
        gender: gender
    }

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        type: "POST",
        url: "http://localhost:8088/api/animal",
        data: JSON.stringify(animal),
        success: function (){
            findAll()
            alert("Tạo thành công!")
            document.getElementById("form-create").reset()
        }
    })
    event.preventDefault()
}

function findById(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8088/api/animal/" + id,
        success: function (data) {
            localStorage.setItem("updateId", id)
            document.getElementById("nameU").value = data.name
            document.getElementById("ageU").value = data.age
            document.getElementById("genderU").value = data.gender
        }
    })
}

function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8088/api/animal/" + id,
        success: function () {
            findAll()
            alert("Xóa thành công!")
        }
    })
}

function update() {
    let name = $("#nameU").val()
    let age = $("#ageU").val()
    let gender = $("#genderU").val()
    let animal = {
        name: name,
        age: age,
        gender: gender
    }

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        type: "PUT",
        url: "http://localhost:8088/api/animal/" + localStorage.getItem("updateId"),
        data: JSON.stringify(animal),
        success: function (data){
            findAll()
            alert("Sửa thành công!")
            localStorage.removeItem("updateId")
            document.getElementById("nameU").value = data.name
            document.getElementById("ageU").value = data.age
            document.getElementById("genderU").value = data.gender

        }
    })
    event.preventDefault()
}

findAll()
