import _ from 'lodash'
// import lodash from 'lodash'

export function paginate (items,pageNumber,PageSize){
    ///
    const startIndex=(pageNumber-1)*PageSize
    // _.slice(items,startIndex)
    // _.take(items,PageSize)
   return  _(items).slice(startIndex).take(PageSize).value()
}

