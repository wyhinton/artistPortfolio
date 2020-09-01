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

export function generateSection(parent, index) {
  let section = createClassIdAppend(parent, 'section', 'section', 'section_' + index)
  let sectionElementContainer = createClassIdAppend(section, 'div', 'sectionElementContainer', 'sectionElementContainer_' + index)
  let descriptionPaddingContainer = createClassIdAppend(sectionElementContainer, 'div', 'descriptionPaddingContainer', 'descriptionPaddingContainer_'+index)

  let descriptionObj = generateDescriptionObj(descriptionPaddingContainer, index)
  // let descriptionObjHidden = generateDescriptionObj(descriptionPaddingContainer, index)
  let imgDiv = createClassIdAppend(sectionElementContainer, 'div', 'img_div', 'img_div' + index)

  let imageContainerPadding1 = createClassIdAppend(imgDiv, 'div', 'imageContainerPadding', 'imageContainerPadding1_'+index)
  let imageContainerPadding2 = createClassIdAppend(imgDiv, 'div', 'imageContainerPadding', 'imageContainerPadding2_'+index)
  let imageContainerPadding3 = createClassIdAppend(imgDiv, 'div', 'imageContainerPadding', 'imageContainerPadding3_'+index)


  let imgObj1 = generateImageObj(imageContainerPadding1, index, 'Picture_Link_1')
  let imgObj2 = generateImageObj(imageContainerPadding2, index, 'Picture_Link_2')
  let imgObj3 = generateImageObj(imageContainerPadding3, index, 'Picture_Link_3')
  let imgObjArr = [imgObj1, imgObj2, imgObj3]
  // let imgObj1Hidden = generateImageObj(imageContainerPadding1, index, 'Picture_Link_1_Hidden')
  // let imgObj2Hidden = generateImageObj(imageContainerPadding2, index, 'Picture_Link_2_Hidden')
  // let imgObj3Hidden = generateImageObj(imageContainerPadding3, index, 'Picture_Link_3_Hidden')

  section.setAttribute('data-js', 'section')
  // $(descriptionObjHidden.descriptionDiv).toggleClass('hiddenDescriptionDiv')
  // $(imgObj1Hidden.singleImageContainer).width(0)
  // $(imgObj2Hidden.singleImageContainer).width(0)
  // $(imgObj3Hidden.singleImageContainer).width(0)


  let projHTMLObj = {
    'index': index,
    'sectionElementContainer': sectionElementContainer,
    'section': section,
    'imgDiv': imgDiv,
    'imgObj1': imgObj1,
    'imgObj2': imgObj2,
    'imgObj3': imgObj3,
    'imgArr': imgObjArr, 
    // 'imgObj1Hidden': imgObj1Hidden,
    // 'imgObj2Hidden': imgObj2Hidden,
    // // 'imgObj3Hidden': imgObj3Hidden,
    'descriptionObj': descriptionObj,
    // 'descriptionObjHidden': descriptionObjHidden,
    'visible': true
  }

  return projHTMLObj;
}

function generateDescriptionObj(parentElem, index) {
  let descriptionDiv = createClassIdAppend(parentElem, 'div', 'descriptionDiv', 'descriptionDiv_' + index)
  let sectionTitle = createClassIdAppend(descriptionDiv, 'H2', 'project__title', 'title_' + index)
  let projInfo = createClassIdAppend(descriptionDiv, 'P', 'projInfo','projInfo_'+index)
  let descriptionParagraph = createClassIdAppend(descriptionDiv, 'P', 'descriptionParagraph', 'descriptionParagraph_' + index)

  let descriptionObj = {
    'descriptionDiv': descriptionDiv,
    'descriptionParagraph': descriptionParagraph,
    'sectionTitle': sectionTitle,
    'projInfo': projInfo
  }

  return descriptionObj;
}

function generateImageObj(parentElem, index, propName) {
  let imagesContainer = createClassIdAppend(parentElem, 'div', 'singleImageContainer', 'singleImageContainer_' + index)
  let lightBoxLink = createClassIdAppend(imagesContainer, 'a', 'lightBoxLink', 'lightBoxLink_' + index)
  let dispImage = createClassIdAppend(lightBoxLink, 'img', 'heroImage', 'lightBoxImage_' + index)

  dispImage.setAttribute('data-lightbox', "data/FishKill_2.jpg")
  dispImage.setAttribute('data-title', 'myCaption')
  dispImage.setAttribute('alt', 'Ayla Gizlice Art')
  // dispImage.addEventListener("load", onProjectImageLoad);

  lightBoxLink.setAttribute('data-lightbox', 'roadtrip')
  lightBoxLink.setAttribute('href', 'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

  let imgObj = {
    'singleImageContainer': imagesContainer,
    'lightBoxLink': lightBoxLink,
    'dispImage': dispImage,
  }

  return imgObj;

}

export function generateProjectStructure(projName, index, projData) {
  let projectBar = document.getElementById('projectTextNames');
  let projectNameContainer = createClassIdAppend(projectBar, 'span', 'projectNameContainer', 'projectNameContainer_'+index)
  let projectNavText = createClassIdAppend(projectNameContainer, 'P', 'projectNameText', 'projectTextHolder')
  $(projectNavText).toggleClass('projectNameHoverClass')
  projectNavText.innerHTML = projName

  let projectObj = {
    'projName': projName,
    'projectNavText': projectNavText,
    'projData': projData
  }

  return projectObj;
}
