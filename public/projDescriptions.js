import {setElemAttribute } from './utils.js'

export function setDescriptionContent(htmlObjdescriptionObj, subProjectDataObj) {
  setElemAttribute(htmlObjdescriptionObj.sectionTitle, 'innerHTML', subProjectDataObj.project_name)
  setElemAttribute(htmlObjdescriptionObj.descriptionParagraph, 'innerHTML', subProjectDataObj.project_description)
  generateDescriptString(htmlObjdescriptionObj.projInfo, subProjectDataObj)
}

export function generateDescriptString(infoParagraph, subProjectDataObj) {
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
