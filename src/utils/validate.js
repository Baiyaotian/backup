/*是否合法IP地址*/
export function validateIP(rule, value,callback) {
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  }
}

export function isMB(textval) {
  const urlregex =/^([\d]?MB?)$/;
  return urlregex.test(textval);
}
export function intToip(str){
  var arr = new Array();
  arr[0] = (str >>> 24) >>> 0;
  arr[1] = ((str << 8) >>> 24) >>> 0;
  arr[2] = (str << 16) >>> 24;
  arr[3] = (str << 24) >>> 24;
  return String(arr[0]) + "." + String(arr[1]) + "." + String(arr[2]) + "." + String(arr[3]);
}
export function ipToint(ip){
  if(!ip || ip.length==0){return;}
  var ip = ip.split(".");
  ip = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
  ip = ip >>> 0;
  return ip;
}
function add0(m){return m<10?'0'+m:m }
export function formatDate (shijianchuo) {
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate()+1;
  var h = time.getHours()+1;
  var mm = time.getMinutes()+1;
  var s = time.getSeconds()+1;
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
