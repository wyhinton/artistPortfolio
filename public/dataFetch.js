function generateObjectFromSpreadData(url) {
  // const response = await fetch('')
  let myCellContentArr = []
  let finalProjObs = []
  let starts = []
  let ranges = []
  let testProjArray = []

  return $.getJSON(url).then(function(data) {

    let cells = data.feed.entry;
    let numRows = parseInt(data.feed.gs$rowCount.$t)
    let numCols = parseInt(data.feed.gs$colCount.$t)
    let totalNumCels = numRows * numCols;

    for (var i = 0; i < numRows; i++) {
      let range = numCols * i;
      starts.push(range)
    }

    for (var i = 0; i < starts.length; i++) {
      let curStart = starts[i]
      let curRange = []
      curRange[0] = curStart
      curRange[1] = curStart + numCols
      ranges.push(curRange)
    }

    for (var i = 0; i < ranges.length; i++) {
      let curRange = ranges[i]
      let projArray = cells.slice(curRange[0], curRange[1])
      let contentArray = []
      for (var j = 0; j < projArray.length; j++) {
        let curCell = projArray[j]
        let curContent = curCell.content.$t;
        contentArray.push(curContent)
      }
      myCellContentArr.push(contentArray)
    }

    for (var i = 0; i < cells.length; i++) {
      let curCell = cells[i]
    }

    let headerCells = cells.filter(obj => {
      return obj.gs$cell.row === "1"
    })

    let headerNames = headerCells.map(a => a.content.$t)
    let testObj = {}
    for (var i = 1; i < myCellContentArr.length; i++) {
      let curContentArray = myCellContentArr[i]
      let contentObjHolder = {}
      for (var j = 0; j < headerNames.length; j++) {
        let curPropToAdd = headerNames[j]
        contentObjHolder[curPropToAdd] = curContentArray[j]

      }
      finalProjObs.push(contentObjHolder)
    }

    return finalProjObs
  })
}
