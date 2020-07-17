function removeProperty(obj, prop) {
  if (obj !== undefined){

  if (obj.prop !== undefined){
    delete obj.prob
    return true
  } else {
    return false
  }
  }
  else {
    return false
  }
}
