// "use strict";

// import _quill from "quill";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });

// var _this = this;

// var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// var _react = require("react");

// var _react2 = _interopRequireDefault(_react);

// var _reactRouterDom = require("react-router-dom");

// var _ProfileContext = require("./ProfileContext");



// var _quill2 = _interopRequireDefault(_quill);

// require("quill/dist/quill.snow.css");

// var _axios = require("axios");

// var _axios2 = _interopRequireDefault(_axios);

// var Delta = _quill2["default"]["import"]("delta");

// // Category colors mapping
// var categoryColors = {
//   Programming: "#e8f5e9",
//   Mathematics: "#e3f2fd",
//   Physics: "#fff3e0",
//   Management: "#f3e5f5",
//   Other: "#f5f5f5"
// };

// var categories = ["Programming", "Mathematics", "Physics", "Management", "Other"];

// var Summary = function Summary(_ref) {
//   var displaySummary = _ref.displaySummary;

//   if (displaySummary) {
//     return _react2["default"].createElement(
//       "div",
//       { className: "summary" },
//       "Connecting to AI summarizer..."
//     );
//   }
//   return null;
// };

// var NewNote = function NewNote() {
//   var _useState = (0, _react.useState)(false);

//   var _useState2 = _slicedToArray(_useState, 2);

//   var displaySummary = _useState2[0];
//   var setDisplaySummary = _useState2[1];

//   var _useState3 = (0, _react.useState)("");

//   var _useState32 = _slicedToArray(_useState3, 2);

//   var title = _useState32[0];
//   var setTitle = _useState32[1];

//   var _useState4 = (0, _react.useState)("");

//   var _useState42 = _slicedToArray(_useState4, 2);

//   var category = _useState42[0];
//   var setCategory = _useState42[1];

//   var _useState5 = (0, _react.useState)("");

//   var _useState52 = _slicedToArray(_useState5, 2);

//   var tags = _useState52[0];
//   var setTags = _useState52[1];

//   var _useProfile = (0, _ProfileContext.useProfile)();

//   var user = _useProfile.user;

//   var quillRef = (0, _react.useRef)(null);
//   var editorRef = (0, _react.useRef)(null);
//   var navigate = (0, _reactRouterDom.useNavigate)();

//   var _useState6 = (0, _react.useState)(new Delta());

//   var _useState62 = _slicedToArray(_useState6, 2);

//   var change = _useState62[0];
//   var setChange = _useState62[1];

//   var _useState7 = (0, _react.useState)(false);

//   var _useState72 = _slicedToArray(_useState7, 2);

//   var isTyping = _useState72[0];
//   var setIsTyping = _useState72[1];

//   var typingTimeoutRef = (0, _react.useRef)(null);
//   var changeRef = (0, _react.useRef)(new Delta());

//   var triggerAPI = (0, _react.useCallback)(function callee$1$0(notes) {
//     var token, res;
//     return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
//       while (1) switch (context$2$0.prev = context$2$0.next) {
//         case 0:
//           context$2$0.prev = 0;
//           token = localStorage.getItem('token');

//           if (token) {
//             context$2$0.next = 5;
//             break;
//           }

//           alert('Please log in again');
//           return context$2$0.abrupt("return");

//         case 5:
//           context$2$0.next = 7;
//           return regeneratorRuntime.awrap(_axios2["default"].post("http://localhost:" + (process.env.EXPRESS_SERVER_PORT || 5000) + "/api/notes/", notes, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token
//             }
//           }));

//         case 7:
//           res = context$2$0.sent;

//           console.log("Success", res);
//           context$2$0.next = 15;
//           break;

//         case 11:
//           context$2$0.prev = 11;
//           context$2$0.t0 = context$2$0["catch"](0);

//           alert("Failed to save note: " + (context$2$0.t0.response && context$2$0.t0.response.data ? context$2$0.t0.response.data.message : context$2$0.t0.response ? context$2$0.t0.response.message : "Unknown error"));
//           console.error("Error occurred:", context$2$0.t0);

//         case 15:
//         case "end":
//           return context$2$0.stop();
//       }
//     }, null, _this, [[0, 11]]);
//   }, []);

//   (0, _react.useEffect)(function () {
//     if (!quillRef.current && editorRef.current) {
//       // Remove any existing Quill instances
//       var existingEditor = editorRef.current.querySelector(".ql-container");
//       if (existingEditor) {
//         existingEditor.remove();
//       }

//       // Create new Quill instance
//       quillRef.current = new _quill2["default"](editorRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]]
//         },
//         placeholder: "Write something..."
//       });

//       quillRef.current.on('text-change', function (delta, oldDelta, source) {
//         console.log("Delta (change made):", delta);
//         console.log("Old Delta:", oldDelta);
//         console.log("Source of change:", source);
//         setChange(function (prevChange) {
//           return prevChange.compose(delta);
//         });

//         if (typingTimeoutRef.current) {
//           clearTimeout(typingTimeoutRef.current);
//         }

//         setIsTyping(true);

//         typingTimeoutRef.current = setTimeout(function () {
//           setIsTyping(false);
//         }, 500);
//       });
//     }

//     var saveInterval = setInterval(function () {
//       if (change.length() > 0) {
//         console.log('Saving changes', change);

//         var content = { content: quillRef.current.root.innerHTML };

//         triggerAPI(content);

//         changeRef.current = new Delta();
//         console.log('Changes reset after save');
//       }
//     }, 5000);

//     return function () {
//       if (quillRef.current) {
//         var toolbar = document.querySelector(".ql-toolbar");
//         if (toolbar) {
//           toolbar.remove();
//         }
//         quillRef.current = null;
//       }
//       clearInterval(saveInterval);
//       window.onbeforeunload = null;
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current); // Clear typing timeout
//       }
//     };
//   }, []);

//   // function that will call triggerAPI
//   // function will be called when user clicks on saveButton
//   var handleSubmit = (0, _react.useCallback)(function (e, notes) {
//     e.preventDefault();
//     triggerAPI(notes);
//   }, [triggerAPI]);

//   var handleSave = function handleSave(e) {
//     if (!title || !category || !quillRef.current) {
//       alert("Please fill in all required fields (title, category, and content)");
//       return;
//     }

//     var content = quillRef.current.root.innerHTML;
//     var preview = quillRef.current.getText().slice(0, 150) + "...";

//     var newNote = {
//       id: Date.now(), // In production, this would come from the backend
//       user: user,
//       title: title,
//       preview: preview,
//       category: category,
//       updatedAt: new Date().toISOString(),
//       tags: tags.split(",").map(function (tag) {
//         return tag.trim();
//       }).filter(function (tag) {
//         return tag;
//       }),
//       author: user && user._id,
//       // author: user?._id,
//       // author: user?.email,
//       content: content
//     };

//     console.log("NewNote:", newNote);
//     handleSubmit(e, newNote);

//     // In production, this would be an API call
//     console.log("Saving note:", newNote);
//     navigate("/existing-notes");
//   };

//   var handleBackClick = function handleBackClick() {
//     if (quillRef.current) {
//       var toolbar = document.querySelector(".ql-toolbar");
//       if (toolbar) {
//         toolbar.remove();
//       }
//       quillRef.current = null;
//     }
//     navigate("/");
//   };

//   return _react2["default"].createElement(
//     "section",
//     { className: "new-note-view" },
//     _react2["default"].createElement(
//       "div",
//       { className: "main" },
//       _react2["default"].createElement(
//         "div",
//         { className: "controls" },
//         _react2["default"].createElement(
//           "button",
//           {
//             className: "back-button",
//             type: "button",
//             onClick: handleBackClick
//           },
//           "← Back"
//         ),
//         _react2["default"].createElement("input", {
//           className: "title",
//           value: title,
//           placeholder: "Title",
//           onChange: function (e) {
//             return setTitle(e.target.value);
//           }
//         }),
//         _react2["default"].createElement(
//           "select",
//           {
//             className: "category-select",
//             value: category,
//             onChange: function (e) {
//               return setCategory(e.target.value);
//             },
//             style: {
//               backgroundColor: category ? categoryColors[category] : "#fff"
//             }
//           },
//           _react2["default"].createElement(
//             "option",
//             { value: "" },
//             "Select Category"
//           ),
//           categories.map(function (cat) {
//             return _react2["default"].createElement(
//               "option",
//               { key: cat, value: cat },
//               cat
//             );
//           })
//         ),
//         _react2["default"].createElement(
//           "button",
//           {
//             className: "controls-right",
//             type: "button",
//             onClick: function () {
//               return setDisplaySummary(true);
//             }
//           },
//           "Summarize"
//         )
//       ),
//       _react2["default"].createElement(
//         "div",
//         { className: "tags-input-container" },
//         _react2["default"].createElement("input", {
//           type: "text",
//           className: "tags-input",
//           placeholder: "Add tags (comma-separated)",
//           value: tags,
//           onChange: function (e) {
//             return setTags(e.target.value);
//           }
//         })
//       ),
//       _react2["default"].createElement("div", { ref: editorRef, className: "editor-container" }),
//       _react2["default"].createElement(Summary, { displaySummary: displaySummary }),
//       _react2["default"].createElement(
//         "div",
//         { className: "note-actions" },
//         _react2["default"].createElement(
//           "button",
//           { className: "save-button", onClick: handleSave },
//           "Save Note"
//         )
//       )
//     )
//   );
// };

// // exports["default"] = NewNote;
// // module.exports = exports["default"];
// export default NewNote;

// // export {triggerAPI};

// // module.exports = {
// //   NewNote,
// //   triggerAPI,
// // };



// // const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxMjMiLCJpYXQiOjE3MzE1MTAxNjV9.L4OTK2ffTbq0AkL8ulSr4iDytu58puNtnI_9LxUXV5s";
// // localStorage.setItem("token", fakeToken); generate fake token
// // for database setup: sprint 3
