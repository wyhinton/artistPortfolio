import {
  generateSection,
  generateProjectStructure
} from './htmlObjGeneration.js'
const projectAssetSheetURL = 'https://spreadsheets.google.com/feeds/cells/1ctMIVgrlfw0s9tYHcwuLuGjnrzI1YCaESEF18C4sIxM/1/public/full?alt=json'
const aboutAssetSheetURL = 'https://spreadsheets.google.com/feeds/cells/17-59RkABiXT4-odN7PGxUOVX1CWOBQb3t-SzqBkG5q0/1/public/full?alt=json'

var projectNames = []
var allProjObjs = [];
var curSubProjects = []
var projHTMLObjSections = [];
var parentObjCol = [];

//NAV ELEMENTS
var projectNav = document.getElementById('projectHolder');
var cvLinkElem = document.getElementById('cvLink')
let sectionContainer = document.getElementById('sectionContainer');
var projectSection = document.getElementById('mainContentSection');

//WHOLE PAGE ELEMENTS
var landingArea = document.getElementById('landingArea');
var transformOffset = window.innerHeight * .04 * -1;

var galleryCloseButton = document.getElementById('galleryCloseButton');
var newCloseButton = document.getElementById('newCloseButton');

//GALLERY DIMENSION SETTING VARS
var numPicsToLoad;
var completedImgLoads;
var totalWidth;
var totalHeight;
let mainWrapperElem = document.getElementsByClassName('main-wrapper')[0]
let firstMainWrapperChild = mainWrapperElem.firstChild

var curActiveSectionWidth = 0;
var bottomVisible = false;
var overlayVisible = false;
var introVisble = false;
var mobileNavVisible = false;
var galleryActive = false;
var activeProjectNavText;


var scrollCount = 1;
var lastScrollTop = 0;
var h = window.innerHeight;
var w;
var activeBrowser;

var newOffsetAmount;
$(document).ready(function() {

  generateBlankGallerySections(5)
  projectsNavCloseFunctionality()
  loopIntroVideo()

  activeBrowser = checkBrowser()
  h = $(window).height(); // height
  w = $(window).width() // width

  $('#landingArea').css('opacity', 1)

  $('#landingArea').mouseup(showProjectsNav)
  $('#landingArea').mouseup(revealProjectSection)
  $('#activePageSection').mouseup(showProjectsNav)
  $('#activePageSection').mouseup(revealProjectSection)
  $('#innerNavButtonCircle').mouseup(closeProject)
  $('#galleryCloseButton').mouseup(closeProject)
  $('.heroImage').each(function() {
    $(this).on("load", onProjectImageLoad);
  })

  $(firstMainWrapperChild).css('padding-right', '0px')
  $('#landingVideo').width($(window).width());
});

function generateBlankGallerySections(numSections) {
  for (var i = 0; i < numSections; i++) {
    let newSect = generateSection(sectionContainer, i)

    projHTMLObjSections.push(newSect)
  }
}

function loopIntroVideo() {
  document.querySelector('#landingVideo').addEventListener('ended', function(e) {
    e.target.currentTime = 0;
    e.target.play();
  }, false);
}

function mobileDesktop(ifMobile, ifDesktop) {
  if (w < mobileWidth) {
    ifMobile
  } else {
    ifDesktop
  }
}

var realProjObjs = generateObjectFromSpreadData(projectAssetSheetURL).then(function(returnData) {

  projectNames = generateNavBarContents(returnData)

  for (var i = 0; i < parentObjCol.length; i++) {
    let curParentObj = parentObjCol[i]
    let projObj = generateProjectStructure(curParentObj.id, i, realProjObjs[i])
    allProjObjs.push(projObj);
  }
  mobileDesktop(enableLightBoxes(false), enableLightBoxes(true))

  if (w < mobileWidth) {
    $('#landingArea').css('display', 'none')
    showProjectsNav()
    setTimeout(function() {revealProjectSection()}, 2000)
    $('#navContainer').animate({opacity: 1}, 'easeOutSine')
    $('#projectTextNames').animate({top: 0}, 1000)
    $('#projectTextNames').fadeIn()
    $('body').css('background-color', 'rgb(208, 208, 208)')
  }
  // addListenerToClass('.projectNameText', handleProjNavClick)
  addListenerToClass('.projectNameContainer', handleProjNavClick)

});

var aboutPage = generateObjectFromSpreadData(aboutAssetSheetURL).then(function(returnData) {
  setCVLink(returnData)
});

function showProjectsNav() {
  managePageLinkHovers();
  projectPageEntryAnimation();
}

function addListenerToClass(classSelector, functionName) {
  $(classSelector).each(function() {
    $(this).mouseup(functionName)
  })
}

function projectPageEntryAnimation() {
  $('#landingArea').css('opacity', 0)
  $('#landingArea').css('zIndex', -1)
  $('body').css('background-color', 'rgb(208, 208, 208)')
  document.getElementById('activePageSection').click()
  $('#projectTextNames').animate({
    top: 50
  }, 1000)
}

function projectsNavCloseFunctionality() {

}

$(window).resize(function(e) {
  if ($(window).width() < w) {
    let curTop = parseInt($('#projectTextNames').css('top'), 10)
    curTop = curTop - 2;
    $('#projectTextNames').css('top', curTop)
    w = $(window).width()
    enableLightBoxes(false)

  }
  if ($(window).width() > w) {
    $('#landingArea').width
    enableLightBoxes(true)
    let curTop = parseInt($('#projectTextNames').css('top'), 10)
    curTop = curTop + 2;
    $('#projectTextNames').css('top', curTop)
    w = $(window).width()
  }

  let windowWidth = $(window).width()
  $('#landingVideo').width($(window).width());


})

function managePageLinkHovers() {
  $('.pageLink').each(function() {
    $(this).removeClass('pageLink')
    // if (this.id !== 'activePageSection') {
    $(this).hover(
      function() {
        $(this).css('text-decoration', 'underline');
      },
      function() {
        $(this).css('text-decoration', 'none')
      }
    );
    // }
  })
}

var navButton = document.getElementById('navButton');
navButton.addEventListener('mouseup', showHamburgerNavSection)

var mobileNavVisible = false;

function showHamburgerNavSection() {
  console.log('hamburger clicked');

  if (w < mobileWidth && mobileNavVisible == false) {
    $('#navBarListContainer').animate({'right': '0%'}, 500, 'easeOutCirc')
    $('#innerNavButtonCircle').animate({height: 13,width: 13}, 500, 'easeOutQuad')
  }

  if (w < mobileWidth && mobileNavVisible == true) {
    $('#navBarListContainer').animate({
      'right': '-100%'
    })
    $('#innerNavButtonCircle').animate({
      height: 9,
      width: 9
    }, 500, 'easeOutSine')
  }
  mobileNavVisible = !mobileNavVisible
}

function closeMobileNav() {
  $('#navBarListContainer').animate({
    'right': '-100%'
  })
  $('#innerNavButtonCircle').animate({
    height: 9,
    width: 9
  }, 500, 'easeOutCirc')
  newCloseButton.removeEventListener('click', closeProject)
  $(newCloseButton).toggleClass('activeCloseButton')
  navButton.addEventListener('mouseup', showHamburgerNavSection)
  $(newCloseButton).animate({
    opacity: 0
  })
}

function desktopGalleryCloseAnimation() {
  if (activeBrowser == 'Firefox') {
    $('.projectNameContainer').each(function(index, obj) {
        $(obj).css('opacity', 1)
    })
  }


  filterBlurNonSelected('empty', false)
  document.querySelector('#mainContentSection').style.opacity = 0;

  $(projectSection).stop().animate({
  }, 500, 'easeOutCirc', function() {
    let closeOffset = 'translateY('+0 +'px)'
    document.querySelector('#projectTextNames').style.transform = closeOffset;
    if (document.getElementById('tempVideo') !== null) {
      $('#tempVideo').remove()
    }

  });
  $(projectSection).css('pointer-events', 'none')

  $('.heroImage').each(function() {$(this).animate({opacity: 0})})
  setTimeout(()=>{$(mainWrapperElem).animate({scrollLeft: $(mainWrapperElem).offset().left}, 0)}, 2000)
  enableLightBoxes(false)
}

function mobileGalleryCloseAnimation() {
  $('#navBarListContainer').animate({
    'right': '-100%'
  })
  $('#innerNavButtonCircle').animate({
    height: 9,
    width: 9
  }, 500, 'easeOutCirc')
  newCloseButton.removeEventListener('click', closeProject)
  $(newCloseButton).toggleClass('activeCloseButton')
  navButton.addEventListener('mouseup', showHamburgerNavSection)
  $(newCloseButton).animate({
    opacity: 0
  })
  $(mainWrapperElem).animate({
    opacity: 0
  }, 300, 'easeInQuad', function() {
    $('#tempVideo').remove()
    $('#projectTextNames').animate({
      'top': '0'
    }, 500, 'easeOutSine')
  })
  $(projectSection).css('pointer-events', 'none')
  $(galleryCloseButton).animate({
    opacity: 0
  })
  setTimeout(function() {
    $('#mainContentSection').scrollTop(0);
  }, 500);


}

function closeProject() {
  galleryActive = false;
  // $(projectSection).css('height', '0%')
  $(projectSection).css('pointer-events', 'none')
  $('#mainContentSection').css('pointer-events', 'none')
  if (w < mobileWidth && mobileNavVisible == true) {
    closeMobileNav()

    mobileGalleryCloseAnimation()
  } else if (w > mobileWidth) {
    $(projectSection).css('pointer-events', 'none')
    desktopGalleryCloseAnimation()
    enableLightBoxes(false)
  } else if (w < mobileWidth) {
    $(projectSection).css('pointer-events', 'none')
    enableLightBoxes(false)
    mobileGalleryCloseAnimation()
  }
}

//OBJ CREATION
function generateDescriptionObj(parentElem, index) {
  let descriptionDiv = createClassIdAppend(parentElem, 'div', 'descriptionDiv', 'descriptionDiv_' + index)
  let sectionTitle = createClassIdAppend(descriptionDiv, 'H2', 'project__title', 'title_' + index)
  let projInfo = createClassIdAppend(descriptionDiv, 'P', 'projInfo', 'projInfo_' + index)
  let descriptionParagraph = createClassIdAppend(descriptionDiv, 'P', 'descriptionParagraph', 'descriptionParagraph_' + index)

  let descriptionObj = {
    'descriptionDiv': descriptionDiv,
    'descriptionParagraph': descriptionParagraph,
    'sectionTitle': sectionTitle,
    'projInfo': projInfo
  }

  return descriptionObj;
}

function onProjectImageLoad(e) {
  let loadedImage = e.target;
  let parentContainer = loadedImage.parentNode.parentNode;

  let imgWidth = $(e.target).width()
  let paddingContainer = loadedImage.parentNode.parentNode.parentNode;
  let currentTotalWidth = $(sectionContainer).width()
}

function generateImageObj(parentElem, index, propName) {
  let imagesContainer = createClassIdAppend(parentElem, 'div', 'singleImageContainer', 'singleImageContainer_' + index)
  let lightBoxLink = createClassIdAppend(imagesContainer, 'a', 'lightBoxLink', 'lightBoxLink_' + index)
  let dispImage = createClassIdAppend(lightBoxLink, 'img', 'heroImage', 'lightBoxImage_' + index)

  dispImage.setAttribute('data-lightbox', "data/FishKill_2.jpg")
  dispImage.setAttribute('data-title', 'myCaption')
  dispImage.setAttribute('alt', 'Ayla Gizlice Art')
  dispImage.addEventListener("load", onProjectImageLoad);

  lightBoxLink.setAttribute('data-lightbox', 'roadtrip')
  lightBoxLink.setAttribute('href', 'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

  let imgObj = {
    'singleImageContainer': imagesContainer,
    'lightBoxLink': lightBoxLink,
    'dispImage': dispImage,
  }

  return imgObj;

}

function generateNavBarContents(allObjs) {
  let allNames = [];
  let uniqueNames = [];

  for (var i = 0; i < allObjs.length; i++) {
    let curObj = allObjs[i]
    if (curObj.category !== 'Main') {
      allNames.push(curObj.category)
    } else {
      allNames.push(curObj.project_name)
    }
  }

  uniqueNames = remove_duplicates(allNames)

  for (var i = 0; i < uniqueNames.length; i++) {
    let curUnique = uniqueNames[i]
    let set = []
    let parentHolderObj = {}
    parentHolderObj.id = curUnique;
    for (var j = 0; j < allObjs.length; j++) {
      let curProjObj = allObjs[j]

      getImageCountForSubProject(curProjObj)
      if (curProjObj.category === curUnique) {

        set.push(curProjObj)
      }
    }
    parentHolderObj.group = set;
    parentObjCol.push(parentHolderObj)
  }

  return uniqueNames
}

function getImageCountForSubProject(subProject) {
  let imgCount = 0;

  if (subProject.Picture_Link_1_Small !== 'empty') {
    imgCount += 1;
  }
  if (subProject.Picture_Link_2_Small !== 'empty') {
    imgCount += 1;
  }
  if (subProject.Picture_Link_3_Small !== 'empty') {
    imgCount += 1;
  } else {}
  subProject.imgCount = imgCount
}

function setDescriptionContent(htmlObjdescriptionObj, subProjectDataObj) {
  setElemAttribute(htmlObjdescriptionObj.sectionTitle, 'innerHTML', subProjectDataObj.project_name)
  setElemAttribute(htmlObjdescriptionObj.descriptionParagraph, 'innerHTML', subProjectDataObj.project_description)
  generateDescriptString(htmlObjdescriptionObj.projInfo, subProjectDataObj)
}

function generateDescriptString(infoParagraph, subProjectDataObj) {
  let collaboratorLink = ''
  if (subProjectDataObj.Collaborator === 'empty') {

    subProjectDataObj.Collaborator = ''
    let letInfoString = [subProjectDataObj.Mediums, subProjectDataObj.Year].join('<br>')
    infoParagraph.innerHTML = letInfoString
    return

  } else {
    collaboratorLink = document.createElement('a')
    collaboratorLink.href = subProjectDataObj.Collaborator_Link
    collaboratorLink.innerHTML = subProjectDataObj.Collaborator
    collaboratorLink.target = '_blank'
    let textNode = 'Made in collaboration with '

    let letInfoString = [subProjectDataObj.Mediums, subProjectDataObj.Year].join('<br>') + '<br>' + textNode
    infoParagraph.innerHTML = letInfoString
    infoParagraph.appendChild(collaboratorLink)
  }


}

function setImgObjContent(imgObj, linkProp, linkPropLarge, subProjectDataObj) {

  let displayImage = imgObj.dispImage
  let lightBoxLink = imgObj.lightBoxLink
  let paddingContainer = displayImage.parentNode.parentNode.parentNode
  if (subProjectDataObj[linkProp] == 'empty') {
    $(paddingContainer).width(0);
    $(paddingContainer).height(0);
  }
  if (subProjectDataObj[linkProp] !== 'empty') {
    setElemAttribute(displayImage, 'src', subProjectDataObj[linkProp])
    setElemAttribute(lightBoxLink, 'href', subProjectDataObj[linkPropLarge])
    $(paddingContainer).css('height', 'fit-content')
  }
}

function setSubProjectContent(htmlObj, subProjectDataObj) {

  if (subProjectDataObj.Picture_Link_1_Small !== 'empty') {
    setElemAttribute(htmlObj.imgObj1.dispImage, 'src', subProjectDataObj.Picture_Link_1_Small)

  }
  if (subProjectDataObj.Picture_Link_2_Small !== 'empty') {
    setElemAttribute(htmlObj.imgObj2.dispImage, 'src', subProjectDataObj.Picture_Link_2_Small)
  }
  if (subProjectDataObj.Picture_Link_3_Small !== 'empty') {
    setElemAttribute(htmlObj.imgObj3.dispImage, 'src', subProjectDataObj.Picture_Link_3_Small)
    setElemAttribute(htmlObj.imgObj3.dispImage, 'src', subProjectDataObj.Picture_Link_3_Small)
  } else {
    // $(htmlObj.imgObj3.paddingContainer).height(0)
  }

  htmlObj.imgCount = subProjectDataObj.imgCount
}

function pullUProjectGalleryDesktop(e, windowOffset) {
  newOffsetAmount = (((e.target.offsetTop * -1)-50) - windowOffset)
  let newOffsetString = 'translateY(' + newOffsetAmount + 'px)'
  document.querySelector('#projectTextNames').style.transform = newOffsetString

  $('#projectTextNames').animate({
  }, 2000, function() {
    $(projectSection).css('pointer-events', 'all')
    $(projectSection).css('opacity', 1)
  })
}

function pullUpProjectGalleryMobile(e) {
  $(mainWrapperElem).animate({
    'top': 0
  }, 3000, 'easeOutQuad');
  // $('#mainContentSection').animate({'top':0}, 3000, 'easeOutQuad');
  $(projectSection).css('pointer-events', 'all')
  $(projectSection).css('height', '100%')
  $(mainWrapperElem).css('display', 'flex')
  $(mainWrapperElem).css('height', '100%')
  $(projectNav).css('display', 'flex')
}

function pullUpProjectGallery(e) {
  let windowOffset;
  if (window.screen.height >= 1080) {
    windowOffset = -50
  }
  if (window.screen.height < 1080) {
    windowOffset = -80
      $('#sectionContainer').css('transform', 'translateY(-2%)');
  }

  $(window).scrollTop($('#navbar').offset().top);
  $(projectSection).animate({
    'opacity': 1
  });

  if (w > mobileWidth) {
    pullUProjectGalleryDesktop(e, windowOffset)
  } else {
    pullUpProjectGalleryMobile(e)
  }
}

function elevateProjectnNavZIndex(e) {
  $('.projectNameContainer').each(function() {
    $(this).css('zIndex', 0)
  })
  $(e.target).css('zIndex', 30)
}

function returnCorrespondingProjectDataObj(e) {
  let projectDataObjToFind = {}

  let clickedName = e.target.innerHTML
  activeProjectNavText = e.target;
  projectDataObjToFind = parentObjCol.filter(obj => {
    return obj.id === clickedName
  })[0]

  return projectDataObjToFind
}

// function showBottomImage(hidden, visible) {
//   $(hidden).css('zIndex', 1)
//   $(visible).css('zIndex', 0)
//   // $(visible).css('display', 'none')
//   $(hidden).css('display', 'flex')
//   $(visible).width('0')
//   $(hidden).animate({
//     'width': '100%',
//     height: '100%'
//   }, function() {
//     $(visible).width('0')
//     // $(visible).height('0')
//   })
// }
//
// function showTopImage(hidden, visible) {
//   $(hidden).css({zIndex: 0})
//   $(visible).css({zIndex: 1})
//   // $(hidden).css('display', 'none')
//   $(visible).css('display', 'flex')
//   $(visible).css('color', 'rgb(0, 0, 0)')
//   $(visible).animate({
//     width: '100%',
//     height: '100%'
//   }, function() {
//     $(hidden).width('0')
//     $(hidden).height('0')
//   })
// }

function showBottomDescription(hidden, visible) {
  $(hidden).css({
    zIndex: 1
  })
  $(hidden).css('display', 'flex')
  if ($(hidden).hasClass('hiddenDescriptionDiv')) {
    $(hidden).toggleClass('hiddenDescriptionDiv')
  }
  if ($(visible).hasClass('hiddenDescriptionDiv') == false){
    $(visible).toggleClass('hiddenDescriptionDiv')
  }

  // $(visible).toggleClass('hiddenDescriptionDiv')
  // if (w < mobileWidth) {
  $(hidden).height('100%')
  $(visible).height(0)
  // }
}

function showTopDescription(hidden, visible) {
  $(visible).toggleClass('hiddenDescriptionDiv')
  $(hidden).toggleClass('hiddenDescriptionDiv')
  $(hidden).css({
    zIndex: 0
  })
  $(visible).css('display', 'flex')
  // if (w < mobileWidth) {
  $(visible).height('100%')
  $(hidden).height(0)
  // }
}

function blurItem(ele, startRadius, endRadius) {
  var setBlur = function(ele, radius) {
      $(ele).css({
        "-webkit-filter": "blur(" + radius + "px)",
        '-moz-filter': "blur(" + radius + "px)",
        "filter": "blur(" + radius + "px)",
      });
    },

    // Generic function to tween blur radius
    tweenBlur = function(ele, startRadius, endRadius) {
      $({
        blurRadius: startRadius
      }).animate({
        blurRadius: endRadius
      }, {
        duration: 500,
        easing: 'swing', // or "linear"
        // use jQuery UI or Easing plugin for more options
        step: function() {
          setBlur(ele, this.blurRadius);
        },
        callback: function() {
          // Final callback to set the target blur radius
          // jQuery might not reach the end value
          setBlur(ele, endRadius);
        }
      });
    };
  tweenBlur(ele, startRadius, endRadius)
}

function filterBlurNonSelected(selectedProject, shouldBlur) {

  if (shouldBlur == true) {
    let parentId = selectedProject.id
    $('.projectNameContainer').each(function(index, obj) {

      if (obj.id !== parentId) {
        if (activeBrowser == 'Firefox') {
          $(obj).css('-webkit-text-stroke', '1px rgb(193, 193, 193)')
          $(obj).css('opacity', 0)
        } else {
          $(obj).css('pointer-events', 'none')
          $(obj).addClass('projectNameContainer-blur')
        }

      }
    })
  } else {

    $('.projectNameContainer').each(function(index, obj) {
      if (activeBrowser == 'Firefox') {
        $(obj).css('-webkit-text-stroke', 'rgb(0,0,0)')
      } else {
        $(obj).removeClass('projectNameContainer-blur')
        $(obj).css('pointer-events', 'all')
      }
    })
  }
}

function handleProjNavClick(e) {
  // console.log('should do click thing');
  galleryActive = true;
  $(newCloseButton).animate({
    opacity: 1
  })
  document.querySelector('#mobileProjectNameDisplay').innerHTML = e.target.innerHTML
  newCloseButton.addEventListener('click', closeProject)
  navButton.removeEventListener('mouseup', showHamburgerNavSection)
  $('#innerNavButtonCircle').animate({
    height: 0,
    width: 0
  }, 500, 'easeOutCirc', function() {
    $(newCloseButton).addClass('activeCloseButton')
  })
  $(projectSection).css('pointer-events', 'all')

  curActiveSectionWidth = 0;
  totalHeight = 0;
  numPicsToLoad = 0;
  completedImgLoads = 0;
  let curTotalSectionsWrapperWidth = $(mainWrapperElem).width()
  $(sectionContainer).scrollLeft(1000)

  setInterval(function() {
  mainWrapperElem.style.opacity = 1;
  }, 2000)
  clearInterval()

  let parentContainer = document.querySelector('#projectTextNames');
  let clickedProjNav = e.target;
  $(clickedProjNav).css('zIndex', 100)
  let curProjectObj = returnCorrespondingProjectDataObj(e)
  curSubProjects = curProjectObj.group
  let parentId = clickedProjNav.parentNode.id

  if (w > mobileWidth) {
    filterBlurNonSelected(clickedProjNav, true)
  }
  pullUpProjectGallery(e)
  elevateProjectnNavZIndex(e)

  for (var i = 0; i < projHTMLObjSections.length; i++) {
    let curHTMLSect = projHTMLObjSections[i]
    if (i<curSubProjects.length) {
      $(curHTMLSect.section).css('width', 'fit-content')
      let curSubProj = curSubProjects[i]
      setDescriptionContent(curHTMLSect.descriptionObj, curSubProj)
      let imgArrInfo = [curSubProj.Picture_Link_1_Small, curSubProj.Picture_Link_2_Small, curSubProj.Picture_Link_3_Small]
      imgArrInfo.map((src, i)=>{
        let curImgObj = curHTMLSect.imgArr[i]
        if (curSubProj.Video_Link !== 'empty') {
          curHTMLSect.videoObj.videoDiv.style.display = "block"
          curHTMLSect.videoObj.videoiFrame.src = curSubProj.Video_Link
        } else {
        curHTMLSect.videoObj.videoDiv.style.display = "none"
        }
        if (src === 'empty') {
          $(curImgObj.dispImage.parentNode.parentNode).css('width', 0)
        } else {
          curImgObj.dispImage.src = src;
          curImgObj.dispImage.style.opacity = 1;
          $(curImgObj.dispImage.parentNode.parentNode).css('width', 'fit-content')
          $('#sectionContainer').css('opacity', 1)
        }
      })

    } else {
      $(curHTMLSect.section).css('width', 0)
    }


  }
}


function enableLightBoxes(activeBool) {
  if (activeBool == true) {
    $('.lightBoxLink').each((index, obj) => {
      $(obj).css('pointer-events', 'all')
    })
  } else {
    $('.lightBoxLink').each((index, obj) => {
      $(obj).css('pointer-events', 'none')
    })
  }
}

//DOM ANIMATION

function revealProjectSection() {
  console.log('should reveal project section!');
  let test = document.getElementsByClassName('projectNameContainer');
  let delay = 0;
  $('.projectNameContainer').each(function() {
    $(this).delay(delay).animate({
      opacity: 1
    }, 1000, 'easeOutQuad');
    delay += 200;
  });

  $(activePageSection).css('-webkit-text-fill-color', 'black')
  $('#navContainer').addClass('emptyNavContainer')
  $(projectNav).css('display', 'flex')

  // if (landingArea.getAttribute('isVisible') === 'true') {
  //   $(projectSection).animate({opacity:1})
  //   landingArea.setAttribute('isVisible', 'false')
  // }
  $('#activePageSection').prop('onclick', closeProject)
}

//UTILS
function createClassIdAppend(parentElem, htmlType, className, idName) {

  let testPar = parentElem
  let elementToAdd = document.createElement(htmlType);
  elementToAdd.setAttribute('class', className);
  elementToAdd.setAttribute('id', idName);
  if (testPar == null) {
    return;
  }
  testPar.appendChild(elementToAdd);
  return elementToAdd;
}

function initializePlugins() {
  lightbox.option({
    // 'resizeDuration': 100,
    'download': false,
    'share': false,
    'showImageNumberLabel': false,
    'disableScrolling': true,
    'positionFromTop': 25
  });

}

function remove_duplicates(arr) {
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (var key in obj) {
    ret_arr.push(key);
  }
  return ret_arr;
}

function findParentObjById(property, needle, haystack) {
  let needle2 = haystack.filter(obj => {
    return obj[property] === needle2;
  })[0];
}

function setElemAttribute(elem, attr, content) {
  elem[attr] = content
}

function setElemStyleAttribute(elem, styleAttr, value) {
  elem.style[styleAttr] = value;
}

function checkBrowser() {
  let browserValue = ''
  let c = navigator.userAgent.search("Chrome");
  let f = navigator.userAgent.search("Firefox");
  let m8 = navigator.userAgent.search("MSIE 8.0");
  let m9 = navigator.userAgent.search("MSIE 9.0");
  if (c > -1) {
    browserValue = "Chrome";
  } else if (f > -1) {
    browserValue = "Firefox";
  } else if (m9 > -1) {
    browserValue = "MSIE 9.0";
  } else if (m8 > -1) {
    browserValue = "MSIE 8.0";
  }
  return browserValue;
}
