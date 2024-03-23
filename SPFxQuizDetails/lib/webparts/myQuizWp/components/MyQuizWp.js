var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { getSP } from '../../../QuizConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as $ from "jquery";
//import axios from 'axios';
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-users";
import "@pnp/sp/profiles";
var resetTimer = function (setFlag, timer) { return __awaiter(void 0, void 0, void 0, function () {
    var countDownDate, x;
    return __generator(this, function (_a) {
        if (setFlag == false) {
            clearInterval(timer);
        }
        countDownDate = new Date(Date.now() + (timer * 60 * 1000)).getTime();
        x = setInterval(function () {
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
        return [2 /*return*/];
    });
}); };
var stopMessage = function (setFlag, stpTime) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if ((setFlag == false) && (stpTime == false)) {
            $('#lblTimeLeft').text("Your session expired.");
            $("#dvquizWP2").hide();
            $("#dvQuizAllItems").hide();
            $("#pExpired").show();
            $("#pResult").hide();
            $("#pName").hide();
        }
        return [2 /*return*/];
    });
}); };
var handleStartQuiz = function (props, quizMasterItems, quizItemsLoad) { return __awaiter(void 0, void 0, void 0, function () {
    var vQuizDuration;
    return __generator(this, function (_a) {
        $("#dvquizWP2").hide();
        $("#dvQuizAllItems").show();
        $("#dvQuizResult").hide();
        vQuizDuration = quizMasterItems[0].QuizDurations;
        resetTimer(false, vQuizDuration);
        return [2 /*return*/];
    });
}); };
// to save data to SharePoint List
var handleSaveQuiz = function (props, setSelectedValues, quizItems, quizMasterItems) { return __awaiter(void 0, void 0, void 0, function () {
    var seen, filteredArr, ltQuizName_1, ltQuizMasterName_1, ltQuizPassScore_1, ltQuizDuration_1, vtxtItmeFlg, finalScore_1, finalResult, vRepeatFlg, vFRst, vQRst, elementExists2_1, elementExists2_2, elementExists, elementExists2, log_SOURCE, lst_NAME, _sp, user, currentDate, myPropertyWorkPhone, myPropertyWorkEmail, myPropertyWorkFName, myPropertyWorkLName, iar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                seen = new Set();
                filteredArr = setSelectedValues.filter(function (el) {
                    var duplicate = seen.has(el.Que);
                    seen.add(el.Que);
                    return !duplicate;
                });
                if (!(filteredArr.length == quizItems.length)) return [3 /*break*/, 7];
                ltQuizName_1 = "";
                ltQuizMasterName_1 = "";
                ltQuizPassScore_1 = "";
                ltQuizDuration_1 = "";
                quizItems.forEach(function (quizItemsRES, index) {
                    ltQuizName_1 = quizItemsRES.Title;
                    if ((quizItemsRES.OptA == null) && (quizItemsRES.OptB == null) && (quizItemsRES.OptC == null)) {
                        vtxtItmeFlg = "Question" + quizItemsRES.Id;
                    }
                });
                quizMasterItems.forEach(function (quizMasterItemsRES, index) {
                    if (quizMasterItemsRES.QuizName.toString() == ltQuizName_1.toString()) {
                        ltQuizMasterName_1 = quizMasterItemsRES.QuizName.toString();
                        ltQuizPassScore_1 = quizMasterItemsRES.PassCount.toString();
                        ltQuizDuration_1 = quizMasterItemsRES.QuizDurations.toString();
                    }
                });
                finalScore_1 = 0;
                finalResult = "";
                vRepeatFlg = false;
                setSelectedValues.forEach(function (quizRES, index) {
                    var filtered = setSelectedValues.filter(function (fltr) {
                        return fltr.Que === quizRES.Que;
                    });
                    var filteredsort = filtered.sort(function (a, b) { return (a.Select > b.Select) ? 1 : -1; });
                    if (filtered.length > 1) {
                        if (vRepeatFlg == false) {
                            // iterate duplicate values for check boxes
                            //var vTxtInput;
                            filteredsort.forEach(function (fltrRES, i) {
                                vFRst = fltrRES.Ans;
                                if (fltrRES.Que == vtxtItmeFlg) {
                                    var vdyID = "#dv" + vtxtItmeFlg + "";
                                    var vdyID2 = "dv" + vtxtItmeFlg;
                                    //var vFnID = '$("'+vdyID+'")';
                                    var vTx = ($(vdyID));
                                    var vtxtSection = document.getElementById(vdyID2);
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
                                finalScore_1 = parseInt(finalScore_1.toString()) + parseInt(quizRES.Points.toString());
                            }
                            else {
                                finalScore_1 = parseInt(finalScore_1.toString()) + 0;
                            }
                            vRepeatFlg = true;
                        }
                    }
                    else {
                        if (quizRES.Ans == quizRES.Select) {
                            finalScore_1 = parseInt(finalScore_1.toString()) + parseInt(quizRES.Points.toString());
                        }
                        else {
                            if (quizRES.Select == quizRES.Ans) {
                                finalScore_1 = parseInt(finalScore_1.toString()) + parseInt(quizRES.Points.toString());
                            }
                            else {
                                finalScore_1 = parseInt(finalScore_1.toString()) + 0;
                            }
                        }
                    }
                });
                if (parseInt(ltQuizPassScore_1) < parseInt(finalScore_1.toString())) {
                    elementExists2_1 = document.getElementById("lblResult");
                    if (elementExists2_1) {
                        elementExists2_1.innerHTML = "PASS";
                        finalResult = "PASS";
                    }
                }
                else {
                    elementExists2_2 = document.getElementById("lblResult");
                    if (elementExists2_2) {
                        elementExists2_2.innerHTML = "FAIL";
                        elementExists2_2.className = "text-danger";
                        finalResult = "FAIL";
                    }
                }
                elementExists = document.getElementById("lblFinalScore");
                if (elementExists) {
                    elementExists.innerHTML = finalScore_1.toString();
                }
                elementExists2 = document.getElementById("lblQuizName");
                if (elementExists2) {
                    elementExists2.innerHTML = ltQuizMasterName_1.toString();
                }
                log_SOURCE = 'QuizWP';
                console.log(log_SOURCE);
                lst_NAME = 'QuizResponseList';
                _sp = getSP(props.context);
                return [4 /*yield*/, _sp.web.currentUser()];
            case 1:
                user = _a.sent();
                currentDate = new Date();
                return [4 /*yield*/, _sp.profiles.getUserProfilePropertyFor(user.LoginName, "WorkPhone")];
            case 2:
                myPropertyWorkPhone = _a.sent();
                return [4 /*yield*/, _sp.profiles.getUserProfilePropertyFor(user.LoginName, "WorkEmail")];
            case 3:
                myPropertyWorkEmail = _a.sent();
                return [4 /*yield*/, _sp.profiles.getUserProfilePropertyFor(user.LoginName, "FirstName")];
            case 4:
                myPropertyWorkFName = _a.sent();
                return [4 /*yield*/, _sp.profiles.getUserProfilePropertyFor(user.LoginName, "LastName")];
            case 5:
                myPropertyWorkLName = _a.sent();
                console.log(myPropertyWorkPhone);
                console.log(myPropertyWorkEmail);
                console.log(myPropertyWorkFName);
                console.log(myPropertyWorkLName);
                return [4 /*yield*/, _sp.web.lists.getByTitle(lst_NAME).items.add({
                        Title: ltQuizName_1.toString(),
                        Points: parseInt(ltQuizPassScore_1.toString()),
                        FName: myPropertyWorkFName.toString(),
                        LName: myPropertyWorkLName.toString(),
                        Email: myPropertyWorkEmail.toString(),
                        QuizDate: currentDate.toDateString(),
                        QuizDuration: ltQuizDuration_1.toString(),
                        Result: finalResult.toString(),
                        QuizAttempt: 1,
                        PhoneNum: myPropertyWorkPhone.toString(),
                        AcquiredTotal: finalScore_1.toString()
                    }).then(
                    // if requied, we can send an notifications 
                    ).catch(
                    //response => {
                    //console.log("Data not saved.. ");
                    //}
                    )];
            case 6:
                iar = _a.sent();
                console.log(iar);
                $("#dvquizWP2").hide();
                $("#dvQuizAllItems").hide();
                $("#dvQuizResult").show();
                $("#pExpired").hide();
                $("#lblTimeLeft").hide();
                // $('#lblTimeLeft').text("Your session expired.");
                //resetTimer(false,10000);
                stopMessage(true, false);
                return [3 /*break*/, 8];
            case 7:
                alert("All Quiz questions are mandatory!");
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
// to load content on page
var Quiz = function (props) {
    var _a = React.useState([]), selectedValues = _a[0], setSelectedValues = _a[1]; //React.useState([{ Que: "", Ans: "", Select:"" }]);   //const [selectedValues, setSelectedValues] = React.useState<string[]>([]); 
    // Function to handle checkbox selection
    // const handleQATodoChange = (e, i) => { 
    var handleCheckboxChange = function (event, i, q, ans, s, po) {
        setSelectedValues(function (prevVals) { return __spreadArray(__spreadArray([], prevVals, true), [{ Que: q, Ans: ans, Select: s, Points: po }], false); });
        console.log("handleCheckboxChange..........");
    };
    // This function will called only once 
    React.useEffect(function () {
        loadDataOnlyOnce();
    }, []);
    var loadDataOnlyOnce = function () {
        $("#dvQuizAllItems").hide();
        $("#dvQuizResult").hide();
    };
    // Function to handle radio button selection
    var handleRadioChange = function (event, i, q, ans, s, po) {
        setSelectedValues(function (prevVals) { return __spreadArray(__spreadArray([], prevVals, true), [{ Que: q, Ans: ans, Select: s, Points: po }], false); });
    };
    // Function to handle other controls
    var handleOtherControlChange = function (event, i, q, ans, s, po) {
        //setSelectedValues([event.target.value]);
        setSelectedValues(function (prevVals) { return __spreadArray(__spreadArray([], prevVals, true), [{ Que: q, Ans: ans, Select: event.target.value, Points: po }], false); });
    };
    console.log(handleOtherControlChange);
    var vPersInfoHTML = React.createElement("div", { id: "dvPersInfo" },
        " ",
        React.createElement("div", { style: { float: "right" } },
            React.createElement("button", { className: "btn btn-primary", onClick: function () { return handleSaveQuiz(props, selectedValues, quizItems, quizMasterItems); } }, "SUBMIT RESPONSE"))); // onClick={console.log("Clicked... >>>>>")}
    var lst_NAME = 'QuizQAList';
    var lst_NAMEMaster = 'QuizMaster';
    var _sp = getSP(props.context);
    var _b = React.useState([]), quizMasterItems = _b[0], setQuizMasterItems = _b[1];
    var _c = React.useState([]), quizItems = _c[0], setQuizItems = _c[1];
    var _d = React.useState({ flg: "block" }), quizItemsLoad = _d[0], setQuizItemsLoad = _d[1];
    console.log(setQuizItemsLoad);
    var getCurUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var element, user, elementExists, myProperty, vTimeZone, apiUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (quizItemsLoad.flg == "none") {
                        element = document.getElementsByClassName('quizSection');
                        console.log(element.length);
                        setTimeout(function () {
                            for (var i = 0; i < document.getElementsByClassName("quizSection").length; i++) {
                                //ReactDOM.render(<Component />, document.getElementsByClassName("container")[i]);
                                // console.log(document.getElementsByClassName("quizSection")[i]);
                                // console.log(document.getElementsByClassName("quizSection")[i].attributes);
                                var vYe = document.getElementsByClassName("quizSection")[i].id;
                                //vYe.hide();
                                console.log(vYe); //.attr("style", "display:none");
                            }
                        }, 2500);
                    }
                    else {
                    }
                    console.log(quizItemsLoad);
                    return [4 /*yield*/, _sp.web.currentUser()];
                case 1:
                    user = _a.sent();
                    console.log(user.LoginName);
                    elementExists = document.getElementById("lblCurUSer");
                    if (elementExists) {
                        console.log(elementExists);
                        elementExists.innerHTML = user.Title;
                    }
                    return [4 /*yield*/, _sp.profiles.getUserProfilePropertyFor(user.LoginName, "SPS-TimeZone")];
                case 2:
                    myProperty = _a.sent();
                    console.log(myProperty);
                    vTimeZone = "Asia/Calcutta";
                    apiUrl = "https://timeapi.io/api/Time/current/zone?timeZone=" + vTimeZone;
                    console.log(apiUrl);
                    return [2 /*return*/];
            }
        });
    }); };
    var getQuizItems = function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, _a, itemsMaster, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    items = _sp.web.lists.getByTitle(lst_NAME).items.orderBy('QuestionOrder', true)();
                    // get quiz items 
                    _a = setQuizItems;
                    return [4 /*yield*/, items];
                case 1:
                    // get quiz items 
                    _a.apply(void 0, [(_c.sent()).map(function (item) {
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
                            };
                        })]);
                    itemsMaster = _sp.web.lists.getByTitle(lst_NAMEMaster).items.getAll();
                    // get quiz master data
                    _b = setQuizMasterItems;
                    return [4 /*yield*/, itemsMaster];
                case 2:
                    // get quiz master data
                    _b.apply(void 0, [(_c.sent()).map(function (item) {
                            return {
                                Id: item.Id,
                                QuizName: item.QuizName,
                                QuestionsCount: item.QuestionsCount,
                                PassCount: item.PassCount,
                                QuizDurations: item.QuizDurations,
                                Active: item.Active,
                            };
                        })]);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        getQuizItems();
        getCurUser();
    }, []);
    return (
    // to know react object we need to place our dynamic html in <> .. </>
    React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col" },
                    React.createElement("div", { id: "dvquizWP", style: { paddingTop: '40px' } },
                        React.createElement("h3", null,
                            " Welcome ",
                            React.createElement("label", { className: "text-success", id: "lblCurUSer" }),
                            React.createElement("label", { id: "lblTimeLeft", style: { float: "right" } })),
                        React.createElement("div", { id: "dvquizWP2" },
                            React.createElement("div", null,
                                React.createElement("div", { id: "dvQuizNote" },
                                    React.createElement("p", null,
                                        React.createElement("strong", null, "ELIGIBILITY FOR PARTICIPATING IN THIS QUIZ:"),
                                        " The Quiz is open to persons that have registered"),
                                    React.createElement("p", null,
                                        React.createElement("strong", null, "QUIZ COMPETITION:"),
                                        " The Quiz will consist of 18 questions for the Participants to answer."),
                                    React.createElement("p", null,
                                        React.createElement("strong", null, "DATA PRIVACY:"),
                                        " Participants agree that personal data submitted with an entry, including name, mailing address, phone number, and email address may be collected, processed, stored, and otherwise used by FOR, its affiliates and the consultants for the purposes of conducting and administering the Quiz. By entering the Quiz, Participants agree to the transmission, processing, disclosing and storage of this personal data by FOR, its affiliates and the consultants."),
                                    React.createElement("p", null,
                                        React.createElement("strong", null, "INTERNET AND DISCLAIMER:"),
                                        " FOR and its consultant are not responsible for any malfunction of the entire Quiz Site or any late, lost, damaged, misdirected, incomplete, illegible, undeliverable, answers to system errors, failed, incomplete or garbled computer or other telecommunication transmission malfunctions, network connectivity problems, hardware, or software failures of any kind."),
                                    React.createElement("div", { style: { float: "right" } },
                                        React.createElement("button", { className: "btn btn-primary", onClick: function () { return handleStartQuiz(props, quizMasterItems, quizItemsLoad); } }, "START QUIZ"))))),
                        React.createElement("div", { id: "dvQuizAllItems" },
                            quizItems.map(function (o, index) {
                                var vQName = "Question " + (index + 1);
                                var vQNo = "Question" + (index + 1);
                                var vQdv = "Question" + (index + 1);
                                var dyQuizTypes;
                                if (o.QQuestionType === 'Choice') {
                                    dyQuizTypes = React.createElement("div", { className: "itemContent" },
                                        React.createElement("blockquote", { className: "blockquote" },
                                            React.createElement("div", null, o.Question)),
                                        " ",
                                        React.createElement("div", { className: "itemIndex" }),
                                        React.createElement("div", { id: vQdv },
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "checkbox", value: o.OptA, name: vQName, onChange: function (event) { return handleCheckboxChange(event, index, vQNo, o.Answer, "OptA", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptA)),
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "checkbox", value: o.OptB, name: vQName, onChange: function (event) { return handleCheckboxChange(event, index, vQNo, o.Answer, "OptB", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptB)),
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "checkbox", value: o.OptC, name: vQName, onChange: function (event) { return handleCheckboxChange(event, index, vQNo, o.Answer, "OptC", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptC))));
                                }
                                else if (o.QQuestionType === 'Radio') {
                                    dyQuizTypes = React.createElement("div", { className: "itemContent" },
                                        React.createElement("blockquote", { className: "blockquote" },
                                            React.createElement("div", null, o.Question)),
                                        " ",
                                        React.createElement("div", { className: "itemIndex" }),
                                        React.createElement("div", { id: vQdv },
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "radio", value: o.OptA, name: vQName, onChange: function (event) { return handleRadioChange(event, index, vQNo, o.Answer, "OptA", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptA)),
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "radio", value: o.OptB, name: vQName, onChange: function (event) { return handleRadioChange(event, index, vQNo, o.Answer, "OptB", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptB)),
                                            React.createElement("div", { className: "form-check form-check-inline" },
                                                React.createElement("input", { className: "form-check-input", type: "radio", value: o.OptC, name: vQName, onChange: function (event) { return handleRadioChange(event, index, vQNo, o.Answer, "OptC", o.Points); } }),
                                                React.createElement("label", { className: "form-check-label", htmlFor: "regular" }, o.OptC))));
                                }
                                else if (o.QQuestionType === 'Blank') {
                                }
                                else {
                                }
                                return (React.createElement("div", { id: vQNo, className: "quizSection" },
                                    React.createElement("div", { id: "dvInnerTop" },
                                        React.createElement("h4", null, vQNo),
                                        React.createElement("p", null, dyQuizTypes)),
                                    React.createElement("div", { className: "border-top my-3" })));
                            }),
                            vPersInfoHTML)),
                    React.createElement("div", { id: "dvQuizResult" },
                        React.createElement("div", null,
                            React.createElement("p", null,
                                React.createElement("strong", null, "THANK YOU FOR YOUR PARTICIPATION.")),
                            React.createElement("p", { id: "pName" },
                                "Your ",
                                React.createElement("label", { className: "text-success", id: "lblQuizName" }),
                                " Score is ",
                                React.createElement("strong", null,
                                    React.createElement("label", { className: "text-success", id: "lblFinalScore" }))),
                            React.createElement("p", { id: "pResult" },
                                "Result :",
                                React.createElement("label", { className: "text-success", id: "lblResult" }),
                                " "),
                            React.createElement("p", { id: "pExpired" }, "Your Quiz session has been expired. Please try again.")),
                        React.createElement("div", { style: { float: "right" } },
                            React.createElement("button", { className: "btn btn-primary" }, "CLOSE"))))))));
};
export default Quiz;
//# sourceMappingURL=MyQuizWp.js.map