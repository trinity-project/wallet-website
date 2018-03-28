export default{
  fetch:function(key){
    return JSON.parse(window.localStorage.getItem(
      key) || '[]')
  },
  save:function(key,items){
    window.localStorage.setItem(key,JSON.stringify(items))
  }
}
