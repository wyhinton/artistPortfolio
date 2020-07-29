    const aboutAssetSheetURL = 'https://spreadsheets.google.com/feeds/cells/17-59RkABiXT4-odN7PGxUOVX1CWOBQb3t-SzqBkG5q0/1/public/full?alt=json'
var cvLinkElem = document.getElementById('cvLink')

var aboutPage = generateObjectFromSpreadData(aboutAssetSheetURL).then(function(returnData){setCVLink(returnData)});

// function setCVLink(aboutProjectObjArray) {
//   let firstObj = aboutProjectObjArray[0]
//   let link = firstObj.CV_Link
//
//   setElemAttribute(cvLinkElem, 'href', link)
// }
