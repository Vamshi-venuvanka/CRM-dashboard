
// const assessments =require('../js/assessment');

// const calculatePercentage= assessments.calculatePercentage;
// const getGrade=assessments.getGrade;
// const isPassed=assessments.isPassed;


const { calculatePercentage, getGrade, isPassed } = require('../js/assessment');

// Test1: Percentage
test("Percentage calculation",()=>{
    expect(calculatePercentage(4,5)).toBe(80);

});

// Test2: Grade
test("Grade Calculation",()=>{
    const result=getGrade(85);
    expect(result.Grade).toBe("A");
});

// Test3: Pass/Fail

test("pass fail loigic",()=>{
    expect(isPassed(50)).toBe(true);
    expect(isPassed(30)).toBe(false);
});