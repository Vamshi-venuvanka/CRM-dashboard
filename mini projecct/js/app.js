document.addEventListener("DOMContentLoaded",function(){
// EMPLOYEES DATA//
const employeesData=[
    {id:101,name:"Sunil", status:"active",Performance:80},
    {id:102,name:"Sairam", status:"active",Performance:70},
    {id:103,name:"Roman", status:"inactive", Performance:60},
    {id:104,name:"Priya", status:"active",Performance:85},
    {id:105,name:"vamshi", status:"active",Performance:90}
];
if(!localStorage.getItem("employeesData")){
    localStorage.setItem("employeesData",JSON.stringify(employeesData));
}
const storedEmployees=JSON.parse(localStorage.getItem("employeesData"));
// EMPLOYEE STATISTICS//
const totalemployees=storedEmployees.length;
const activeemployees= storedEmployees.filter(emp=> emp.status==="active").length;
const inactiveemployees= storedEmployees.filter(emp=> emp.status==="inactive").length;

// UPDATE DASHBOARD NUMBERS//
    document.getElementById("totalEmployees").textContent=totalemployees;
    document.getElementById("activeEmployees").textContent=activeemployees;
    document.getElementById("inactiveEmployees").textContent=inactiveemployees;



// CLIENTS DATA//
const clients=[
    {name: "Infra Zone", status:"assigned"},
    {name:"Hexaware",status:"assigned"},
    {name:"SoftIn", status:"pending"},
    {name:"Global Zone",status:"assigned"},
    {name:"Skyline tech",status:"pending"},
    {name:"skyroot", status:"pending",},
    {name:"Nextgen", status:"assigned"},
    {name:"Bluewave", status:"assigned"},
    {name:"Futurehost", status:"assigned"},
    {name:"sysnet",status:"pending"},
    {name:"upgrad", status:"pending"}

];


// CLIENT STATISITCS//
const totalclients=clients.length;
const assignedclients=clients.filter(client=>client.status=="assigned").length;
const pendingclients=clients.filter(client=>client.status=="pending").length;

// UPDATE CLIENT NUMBERS//

    document.getElementById("totalClients").textContent=totalclients;
    document.getElementById("assignedClients").textContent=assignedclients;
    document.getElementById("pendingClients").textContent=pendingclients;

let scores = JSON.parse(localStorage.getItem("employeeScores")) || {};

    //GENERATE PERFORMANCE BARS//
const Performancecontainer= document.getElementById("performanceList");
Performancecontainer.innerHTML = ""
storedEmployees.forEach(emp => {
     const empScore = scores[emp.id] || emp.Performance;
    const row=document.createElement("div");
    row.classList.add("performance");
    row.innerHTML=`
    <span class="name"> ${emp.name}</span>
    <progress value="${empScore}" max="100"></progress>
    <span class="percent"> ${empScore}%</span>`;
           Performancecontainer.appendChild(row);    });



// RECENT ACTIVITIES//
const activities=[
"Rahul Sharma completed CRM assessment",
"Ananya Gupta assigned new client",
"Rohit Verma updated profile",
"Priya Singh completed performance review"];

const activitylist=document.getElementById("activityList");
activities.forEach(activity=>{
    const li=document.createElement("li");
    li.textContent=activity;
    activitylist.appendChild(li);
});


});




