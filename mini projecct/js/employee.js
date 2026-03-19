const employees=[ 
 {id:101, name:"Sunil", department:"Sales", role:"Manager", clients:5,status:"active"},
 {id:102, name:"Sairam", department:"Marketing", role:"Executive", clients:3,status:"active"},
 {id:103, name:"Roman", department:"HR", role:"Officer", clients:2,status:"inactive"},
 {id:104, name:"Priya Singh", department:"IT", role:"Developer", clients:4,status:"active"},
 {id:105, name:"vamshi", department:"Business", role:"Data Analyst", clients:3,status:"active"}

];
let defaultClients = ["Infra Zone", "Global Zone", "Skyroot"];

employees.forEach(function(employee) {

    // ❗ if clients is a number
    if (typeof employee.clients === "number") {

        let count = employee.clients;

        // create array with that many clients
        employee.clients = defaultClients.slice(0, count);
    }

    // ❗ if no clients
    if (!employee.clients || employee.clients.length === 0) {
        employee.clients = [...defaultClients];
    }

});

document.addEventListener("DOMContentLoaded",function(){
    displayEmployees(employees);


  document.getElementById("saveEmployee").addEventListener("click", addEmployee);

  // ✅ Search by Name
  document.getElementById("searchName").addEventListener("input", filterEmployees);

  // ✅ Filter by Department
  document.getElementById("searchDept").addEventListener("change", filterEmployees);

});


function displayEmployees(data){
    const tableBody=document.getElementById("employeeTable");
    tableBody.innerHTML="";
    data.forEach((emp,index)=>{
        const statusColor=emp.status==="active"? "green": "red";
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>${emp.clients.length}</td>
        <td style="color:${statusColor};">${emp.status}</td>
        <td> 
        <button class="btn btn-info view-btn" data-index="${index}">
        view profile
        </button>
        <button class="btn btn-warning toggle-btn" data-index="${index}">
                Toggle
            </button>
            <button class="btn btn-danger delete-btn" data-index="${index}">Delete
            </button>
        </td>
        `;
          tableBody.appendChild(row);
    });
    addButtonEvents(data);
}


// Add Employee
function addEmployee(){

let name = document.getElementById("empName").value.trim();
  let dept = document.getElementById("empDept").value;
  let clients = document.getElementById("empClients").value;
   let modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
modal.hide();

  if (name===""|| dept===""|| clients===""){
    alert("please fill all fields");
    return;
  }

  let newEmployee = {
    id: employees.length + 101,
    name: name,
    department: dept,
    role: "Employee",
    clients: Number(clients),
    status: "active"
  };

  employees.push(newEmployee);

  displayEmployees(employees); 

document.getElementById("empName").value = "";
  document.getElementById("empDept").value = "";
  document.getElementById("empClients").value = "";

}



//Filter Employees

function filterEmployees(){
   


let searchText = document.getElementById("searchName").value.toLowerCase();
  let deptFilter = document.getElementById("searchDept").value;

  let filtered = employees.filter(emp => {
    let matchName = emp.name.toLowerCase().includes(searchText);
    let matchDept = deptFilter === "" || emp.department === deptFilter;

    return matchName && matchDept;
  });

  displayEmployees(filtered);
}


// Button Events

function addButtonEvents(data){

    document.querySelectorAll(".view-btn").forEach((button,i)=> {
        button.addEventListener("click", function(){
            let selectedEmployee=data[i];

            localStorage.setItem("selectedEmployee",JSON.stringify(selectedEmployee));
            
            window.location.href="Profile.html";
        });
    });

    // Toggle Status
  document.querySelectorAll(".toggle-btn").forEach((btn,i) => {
    btn.addEventListener("click", function () {

      let emp = data[i];

     emp.status =
        emp.status=emp.status === "active" ? "inactive" : "active";

      displayEmployees(employees);

    });
});


// Delete Employee
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", function () {

    let index = this.getAttribute("data-index");

    let confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (confirmDelete) {
      employees.splice(index, 1); // remove from array
      employees.forEach((emp, i) => {
    emp.id = 101 + i;
});
      displayEmployees(employees); // refresh table
    }
  });
});

    }



