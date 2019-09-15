var STARTDATE = new Date(2019, 8, 4, 9, 00, 0, 0);
var ENDDATE = new Date(2019, 11, 6, 23, 59, 0, 0);
  
class RecurringAssignment{
 
  constructor(courseName, assignmentName, dayOfWeek, dueTime, submissionMethod, checkOnChange){
   this.courseName = courseName;
   this.assignmentName = assignmentName;
   this.dayOfWeek = dayOfWeek;
   this.dueTime = dueTime;
   this.submissionMethod = submissionMethod;
   this.assignments = new Array();
   this.checkOnChange = checkOnChange;
   
   var currentdate = new Date(STARTDATE);
   
   while (!compareDay(currentdate, dayOfWeek)){
     currentdate.setDate(currentdate.getDate() + 1);
   }
    
   var StartingDate = currentdate;
   
   while (currentdate < ENDDATE){
     var temp = new Date(currentdate);
     var tempAssignment = new Assignment(courseName, assignmentName, dayOfWeek, temp, dueTime, submissionMethod, checkOnChange);
     this.assignments.push(tempAssignment);
     currentdate.setDate(currentdate.getDate() + 7);
   }
  }
  
  getNextAssignment(){
   var today = new Date();
   var i = 0;
   while(this.assignments[i].getDueDate()<today || this.assignments[i].isSubmitted()){
     i++;
   }
   return this.assignments[i];
  }
  
  getCompletedAssignments(){
   var completedAssignments = [];
   for(var i=0; i<this.assignments.length; i++){
    if(this.assignments[i].isSubmitted()){
     completedAssignments.push(this.assignments[i]);
    }
   }
    return completedAssignments;
  }
  
  getOverdueAssignments(){
    var overdueAssignments = []
    var today = new Date();
    var i = 0;
    while(this.assignments[i].getDueDate()<today){
     if(this.assignments[i].isSubmitted() == false){
       overdueAssignments.push(this.assignments[i]);
     }
      i++;
    }
    return overdueAssignments;
  }
  
}
  
function compareDay(date, weekdaycompare){
  var weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[date.getDay()] == weekdaycompare;
}
  
class Assignment{
  constructor(courseName, assignmentName, dayOfWeek, dueDate, dueTime, submissionMethod, checkOnChange){
    this.courseName = courseName;
    this.assignmentName = assignmentName;
    this.dayOfWeek = dayOfWeek;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.submissionMethod = submissionMethod;
    this.submitted = false;
    this.timeElapsed = 0;
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = false;
    checkbox.onclick = this.toggleCheckbox.bind(this); 
    this.checkbox = checkbox;
    this.checkOnChange = checkOnChange;
  }

  toggleCheckbox(){
    this.submitted = !this.submitted;
    this.checkOnChange();
  }

  getDueDate(){
    return this.dueDate;
  }
  
  isSubmitted(){
   return this.submitted; 
  }

  getDueTime(){
    return this.dueTime;
  }

  getCourse(){
    return this.courseName;
  }

  getAssignmentName(){
    return this.assignmentName;
  }

  getSubmissionMethod(){
    return this.submissionMethod;
  }

}

