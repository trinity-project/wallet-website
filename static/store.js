
export default{
  fetch:function(key){
    const KEY1 = key.toString();
    return JSON.parse(window.localStorage.getItem(
      KEY1) || '[]')
  },
  save:function(key,items){
    const KEY1 = key.toString();
    window.localStorage.setItem(KEY1,JSON.stringify(items))
  }
}
