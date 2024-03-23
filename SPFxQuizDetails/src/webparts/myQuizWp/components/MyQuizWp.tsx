import * as React from 'react';
import type { IMyQuizWpProps } from './IMyQuizWpProps';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../QuizConfig';
import { IMyQuizRespOP, IQUIZ, IQUIZMASTER } from '../../../QuizInterfaces';
import { IItemAddResult } from "@pnp/sp/presets/all";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as $ from "jquery";

export interface IListItem {
  Title: string;
  Id: number;
  // Add other fields as required
}

//import axios from 'axios';
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-users";
import "@pnp/sp/profiles";

const resetTimer = async (setFlag, timer) => {

  if (setFlag == false) {
    clearInterval(timer);

  }
  var countDownDate = new Date(Date.now() + (timer * 60 * 1000)).getTime();
  // Update the count down every 1 second
  var x = setInterval(function () {
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    //var vTimer=  days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";
    var vTimer = minutes + "m " + seconds + "s ";

    if ($('#lblTimeLeft').length) {
      $('#lblTimeLeft').text(vTimer);
    }

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      
      stopMessage(false, false);

    }
  }, 1000);

}

const stopMessage = async (setFlag, stpTime) => {
  if ((setFlag == false) && (stpTime == false)) {

    $('#lblTimeLeft').text("Your session expired.");

    $("#dvquizWP2").hide();
    $("#dvQuizAllItems").hide();
    $("#pExpired").show();
    $("#pResult").hide();
    $("#pName").hide();
  }

}

const handleStartQuiz = async (props: IMyQuizWpProps, quizMasterItems, quizItemsLoad) => {

  $("#dvquizWP2").hide();
  $("#dvQuizAllItems").show();
  $("#dvQuizResult").hide();

  var vQuizDuration = quizMasterItems[0].QuizDurations;

  resetTimer(false, vQuizDuration);

}
// to save data to SharePoint List
const handleSaveQuiz = async (props: IMyQuizWpProps, setSelectedValues: IMyQuizRespOP[], quizItems: IQUIZ[], quizMasterItems: IQUIZMASTER[]) => {


  const seen = new Set();
  const filteredArr = setSelectedValues.filter(el => {
    const duplicate = seen.has(el.Que);
    seen.add(el.Que);
    return !duplicate;
  });

  if (filteredArr.length == quizItems.length) {

    let ltQuizName = "";
    let ltQuizMasterName = "";
    let ltQuizPassScore = "";
    let ltQuizDuration = "";

    var vtxtItmeFlg;

    quizItems.forEach((quizItemsRES, index) => {

      ltQuizName = quizItemsRES.Title;
      if ((quizItemsRES.OptA == null) && (quizItemsRES.OptB == null) && (quizItemsRES.OptC == null)) {
        vtxtItmeFlg = "Question" + quizItemsRES.Id;
      }
    });

    quizMasterItems.forEach((quizMasterItemsRES, index) => {

      if (quizMasterItemsRES.QuizName.toString() == ltQuizName.toString()) {
        ltQuizMasterName = quizMasterItemsRES.QuizName.toString();
        ltQuizPassScore = quizMasterItemsRES.PassCount.toString();
        ltQuizDuration = quizMasterItemsRES.QuizDurations.toString();

      }
    });
    let finalScore = 0;
    let finalResult = "";



    var vRepeatFlg = false;
    var vFRst: any;
    var vQRst: any;
    setSelectedValues.forEach((quizRES, index) => {

      const filtered = setSelectedValues.filter(fltr => {
        return fltr.Que === quizRES.Que;
      });

      const filteredsort = filtered.sort((a, b) => (a.Select > b.Select) ? 1 : -1)

     if (filtered.length > 1) {
        if (vRepeatFlg == false) {
          // iterate duplicate values for check boxes

          //var vTxtInput;
          filteredsort.forEach((fltrRES, i) => {
            vFRst = fltrRES.Ans;
            if (fltrRES.Que == vtxtItmeFlg) {
              var vdyID = "#dv" + vtxtItmeFlg + "";
              var vdyID2 = "dv" + vtxtItmeFlg;


              //var vFnID = '$("'+vdyID+'")';
              var vTx = ($(vdyID));

              const vtxtSection = document.getElementById(vdyID2);
              if (vtxtSection) {

                var vc = vtxtSection.innerHTML;
                console.log(vc);

              }
              console.log(vTx);

            }
            else {
              vQRst = vQRst + ", " + fltrRES.Select;

            }

          });


          var vRemovevalue = vQRst.toString().split("undefined, ");
          if (vRemovevalue[1] == vFRst) {
            finalScore = parseInt(finalScore.toString()) + parseInt(quizRES.Points.toString());


          }
          else {
            finalScore = parseInt(finalScore.toString()) + 0;
          }

          vRepeatFlg = true;
        }


      }
      else {
        if (quizRES.Ans == quizRES.Select) {
          finalScore = parseInt(finalScore.toString()) + parseInt(quizRES.Points.toString());
        }
        else {

          if (quizRES.Select == quizRES.Ans) {
            finalScore = parseInt(finalScore.toString()) + parseInt(quizRES.Points.toString());
          }
          else {
            finalScore = parseInt(finalScore.toString()) + 0;
          }

        }

      }


    });

    if (parseInt(ltQuizPassScore) < parseInt(finalScore.toString())) {
      //pass
      const elementExists2 = document.getElementById("lblResult");
      if (elementExists2) {
        elementExists2.innerHTML = "PASS";
        finalResult = "PASS";
      }

    }
    else {
      //fail  lblResult
      const elementExists2 = document.getElementById("lblResult");
      if (elementExists2) {
        elementExists2.innerHTML = "FAIL";
        elementExists2.className = "text-danger";
        finalResult = "FAIL";
      }
    }

    const elementExists = document.getElementById("lblFinalScore");
    if (elementExists) {
      elementExists.innerHTML = finalScore.toString();
    }

    const elementExists2 = document.getElementById("lblQuizName");
    if (elementExists2) {
      elementExists2.innerHTML = ltQuizMasterName.toString();
    }

    const log_SOURCE = 'QuizWP';
    console.log(log_SOURCE);
    const lst_NAME = 'QuizResponseList';

    let _sp: SPFI = getSP(props.context);
    let user = await _sp.web.currentUser();

    let currentDate = new Date();

    const myPropertyWorkPhone = await _sp.profiles.getUserProfilePropertyFor(user.LoginName, "WorkPhone");
    const myPropertyWorkEmail = await _sp.profiles.getUserProfilePropertyFor(user.LoginName, "WorkEmail");
    const myPropertyWorkFName = await _sp.profiles.getUserProfilePropertyFor(user.LoginName, "FirstName");
    const myPropertyWorkLName = await _sp.profiles.getUserProfilePropertyFor(user.LoginName, "LastName");
    console.log(myPropertyWorkPhone);
    console.log(myPropertyWorkEmail);
    console.log(myPropertyWorkFName);
    console.log(myPropertyWorkLName);

    const iar: IItemAddResult = await _sp.web.lists.getByTitle(lst_NAME).items.add({

      Title: ltQuizName.toString(),
      Points: parseInt(ltQuizPassScore.toString()),
      FName: myPropertyWorkFName.toString(),
      LName: myPropertyWorkLName.toString(),
      Email: myPropertyWorkEmail.toString(),
      QuizDate: currentDate.toDateString(),
      QuizDuration: ltQuizDuration.toString(),
      Result: finalResult.toString(),
      QuizAttempt: 1,
      PhoneNum: myPropertyWorkPhone.toString(),
      AcquiredTotal: finalScore.toString()
    }).then(

      // if requied, we can send an notifications 

    ).catch(
      //response => {
      //console.log("Data not saved.. ");

      //}
    );
    console.log(iar);

    $("#dvquizWP2").hide();
    $("#dvQuizAllItems").hide();
    $("#dvQuizResult").show();
    $("#pExpired").hide();

    $("#lblTimeLeft").hide();
    // $('#lblTimeLeft').text("Your session expired.");
    //resetTimer(false,10000);
    stopMessage(true, false);
  }
  else {
    alert("All Quiz questions are mandatory!");
  }

};

// to load content on page
const Quiz = (props: IMyQuizWpProps) => {



  const [selectedValues, setSelectedValues] = React.useState<IMyQuizRespOP[]>([]);  //React.useState([{ Que: "", Ans: "", Select:"" }]);   //const [selectedValues, setSelectedValues] = React.useState<string[]>([]); 

  // Function to handle checkbox selection
  // const handleQATodoChange = (e, i) => { 
  const handleCheckboxChange = (event, i, q, ans, s, po) => {  // const handleCheckboxChange = (event) => {
    setSelectedValues(prevVals => [...prevVals, { Que: q, Ans: ans, Select: s, Points: po }]);
    console.log("handleCheckboxChange..........");

   

  };

  // This function will called only once 
  React.useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const loadDataOnlyOnce = () => {

    $("#dvQuizAllItems").hide();
    $("#dvQuizResult").hide();
  }

  // Function to handle radio button selection
  const handleRadioChange = (event, i, q, ans, s, po) => { //  const handleRadioChange = (event) => {
    setSelectedValues(prevVals => [...prevVals, { Que: q, Ans: ans, Select: s, Points: po }]);

  };

  // Function to handle other controls
  const handleOtherControlChange = (event, i, q, ans, s, po) => {  // const handleOtherControlChange = (event) => {
    //setSelectedValues([event.target.value]);

    setSelectedValues(prevVals => [...prevVals, { Que: q, Ans: ans, Select: event.target.value, Points: po }]);
  };
  console.log(handleOtherControlChange);

  let vPersInfoHTML = <div id={"dvPersInfo"} > <div style={{ float: "right" }}><button className="btn btn-primary" onClick={() => handleSaveQuiz(props, selectedValues, quizItems, quizMasterItems)}>SUBMIT RESPONSE</button></div></div>;  // onClick={console.log("Clicked... >>>>>")}

  const lst_NAME = 'QuizQAList';
  const lst_NAMEMaster = 'QuizMaster';

  let _sp: SPFI = getSP(props.context);

  const [quizMasterItems, setQuizMasterItems] = React.useState<IQUIZMASTER[]>([]);

  const [quizItems, setQuizItems] = React.useState<IQUIZ[]>([]);
  const [quizItemsLoad, setQuizItemsLoad] = React.useState({ flg: "block" });
  console.log(setQuizItemsLoad);
  const getCurUser = async () => {

    if (quizItemsLoad.flg == "none") {

      var element = document.getElementsByClassName('quizSection');

      console.log(element.length);

      setTimeout(function () {

        for (let i = 0; i < document.getElementsByClassName("quizSection").length; i++) {
          //ReactDOM.render(<Component />, document.getElementsByClassName("container")[i]);
          // console.log(document.getElementsByClassName("quizSection")[i]);
          // console.log(document.getElementsByClassName("quizSection")[i].attributes);
          var vYe: any = document.getElementsByClassName("quizSection")[i].id;
          //vYe.hide();
          console.log(vYe); //.attr("style", "display:none");
        }

      }, 2500);


    }
    else {

    }

    console.log(quizItemsLoad);

    let user = await _sp.web.currentUser();
    console.log(user.LoginName);
    const elementExists = document.getElementById("lblCurUSer");
    if (elementExists) {
      console.log(elementExists);

      elementExists.innerHTML = user.Title;
    }

    const myProperty = await _sp.profiles.getUserProfilePropertyFor(user.LoginName, "SPS-TimeZone");
    console.log(myProperty);
    var vTimeZone = "Asia/Calcutta";
    // Here we are taking timezone form user propeties
    // as of now this value is blank, taking "Asia/Calcutta" for testing purpose.
    // 
    //https://timeapi.io/api/Time/current/zone?timeZone=Asia/Calcutta

    const apiUrl = "https://timeapi.io/api/Time/current/zone?timeZone=" + vTimeZone;
    console.log(apiUrl);


  }

 const getQuizItems = async () => {
    const items = _sp.web.lists.getByTitle(lst_NAME).items.orderBy('QuestionOrder', true)();

    // get quiz items 
    setQuizItems((await items).map((item: any) => {
      return {
        Id: item.Id,
        Title: item.Title,
        Question: item.Question,
        Answer: item.Answer,
        OptA: item.OptA,
        OptB: item.OptB,
        OptC: item.OptC,
        Points: item.Points,
        QQuestionType: item.QQuestionType,
        Hint: item.Hint,
        QuestionOrder: item.QuestionOrder,
      }

    }));

    const itemsMaster = _sp.web.lists.getByTitle(lst_NAMEMaster).items.getAll();
    // get quiz master data
    setQuizMasterItems((await itemsMaster).map((item: any) => {
      return {

        Id: item.Id,
        QuizName: item.QuizName,
        QuestionsCount: item.QuestionsCount,
        PassCount: item.PassCount,
        QuizDurations: item.QuizDurations,
        Active: item.Active,
      }

    }));

  }

  React.useEffect(() => {
    getQuizItems();
    getCurUser();



  }, [])


  return (
    // to know react object we need to place our dynamic html in <> .. </>

    <>
      <div className="container-fluid" >
        <div className="row">
          <div className="col">
            <div id="dvquizWP" style={{ paddingTop: '40px' }} >
              <h3> Welcome <label className="text-success" id="lblCurUSer" ></label><label id="lblTimeLeft" style={{ float: "right" }}></label></h3>
              <div id="dvquizWP2" >
                <div>
                  <div id="dvQuizNote" >
                    <p><strong>ELIGIBILITY FOR PARTICIPATING IN THIS QUIZ:</strong> The Quiz is open to persons that have registered</p>
                    <p><strong>QUIZ COMPETITION:</strong> The Quiz will consist of 18 questions for the Participants to answer.</p>
                    <p><strong>DATA PRIVACY:</strong> Participants agree that personal data submitted with an entry, including name, mailing address, phone number, and email address may be collected, processed, stored, and otherwise used by FOR, its affiliates and the consultants for the purposes of conducting and administering the Quiz. By entering the Quiz, Participants agree to the transmission, processing, disclosing and storage of this personal data by FOR, its affiliates and the consultants.</p>
                    <p><strong>INTERNET AND DISCLAIMER:</strong> FOR and its consultant are not responsible for any malfunction of the entire Quiz Site or any late, lost, damaged, misdirected, incomplete, illegible, undeliverable, answers to system errors, failed, incomplete or garbled computer or other telecommunication transmission malfunctions, network connectivity problems, hardware, or software failures of any kind.</p>
                    <div style={{ float: "right" }}><button className="btn btn-primary" onClick={() => handleStartQuiz(props, quizMasterItems, quizItemsLoad)} >START QUIZ</button></div>
                  </div>
                </div>
              </div>
              <div id="dvQuizAllItems" >
                {
                  quizItems.map((o: IQUIZ, index: number) => {
                    var vQName = "Question " + (index + 1);
                    var vQNo = "Question" + (index + 1);
                    var vQdv = "Question" + (index + 1);
                   
                    let dyQuizTypes;
                    if (o.QQuestionType === 'Choice') {
                      dyQuizTypes = <div className={"itemContent"}><blockquote className="blockquote"><div >{o.Question}</div></blockquote> <div className={"itemIndex"}></div>
                        <div id={vQdv}>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value={o.OptA} name={vQName} onChange={(event) => handleCheckboxChange(event, index, vQNo, o.Answer, "OptA", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptA}</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value={o.OptB} name={vQName} onChange={(event) => handleCheckboxChange(event, index, vQNo, o.Answer, "OptB", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptB}</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value={o.OptC} name={vQName} onChange={(event) => handleCheckboxChange(event, index, vQNo, o.Answer, "OptC", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptC}</label>
                          </div>
                        </div>
                      </div>
                    }
                    else if (o.QQuestionType === 'Radio') {
                      dyQuizTypes = <div className={"itemContent"}><blockquote className="blockquote"><div >{o.Question}</div></blockquote> <div className={"itemIndex"}></div>
                        <div id={vQdv}>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value={o.OptA} name={vQName} onChange={(event) => handleRadioChange(event, index, vQNo, o.Answer, "OptA", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptA}</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value={o.OptB} name={vQName} onChange={(event) => handleRadioChange(event, index, vQNo, o.Answer, "OptB", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptB}</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" value={o.OptC} name={vQName} onChange={(event) => handleRadioChange(event, index, vQNo, o.Answer, "OptC", o.Points)} />
                            <label className="form-check-label" htmlFor="regular">{o.OptC}</label>
                          </div>
                        </div>

                      </div>
                    }
                    else if (o.QQuestionType === 'Blank') {
                     



                    }
                    else {

                    }
                    return (


                      <div id={vQNo} className="quizSection" >

                        <div id={"dvInnerTop"}>
                          <h4>{vQNo}</h4>
                          <p>{dyQuizTypes}</p>

                        </div>
                        <div className="border-top my-3"></div>

                      </div>

                    )



                  })
                }


                {vPersInfoHTML}
              </div>
            </div>

            <div id="dvQuizResult">
              <div>
                <p><strong>THANK YOU FOR YOUR PARTICIPATION.</strong></p>
                <p id="pName">Your <label className="text-success" id="lblQuizName" ></label> Score is <strong><label className="text-success" id="lblFinalScore" ></label></strong></p>
                <p id="pResult">Result :<label className="text-success" id="lblResult" ></label> </p>
                <p id="pExpired">Your Quiz session has been expired. Please try again.</p>

              </div>
              <div style={{ float: "right" }}><button className="btn btn-primary"  >CLOSE</button></div>
            </div>
          </div>
        </div>
      </div>
    </>


  )


}


export default Quiz;





