//import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IQUIZ {
    Id:number;
    Title:string;
    Question:string;  
    Answer:string;  
    OptA:string;  
    OptB:string;  
    OptC:string;  
    Points:number;  
    QQuestionType:string;  
    Hint:string;    
    QuestionOrder:number; 

}

export interface IQUIZMASTER {
    Id:number;
    QuizName:string;
    QuestionsCount:number;  
    PassCount:number;  
    QuizDurations:number;  
    Active:string;    

}

export interface IQUIZResponse {
    
    Title:string; 
    Question:string;
    Answer:string;
    Points:number;
    //QQuestionType:string;  
    Hint:string;  
    FName:string; 
    LName:string;  
    Email:string;  
    QuizDate:string;
    QuizDuration:string;
    Result:string;
    QuizAttempt:number;
    AcquiredTotal:string;
    AcquiredPercentage:number;
    Country:string;
    PhoneNum:string;
    
}

export interface IMyQuizRespOP{
    Que: string;
    Ans:string; 
    Select:string;
    Points:number;
  }
  