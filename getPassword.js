/**
 * @function getPassword
 * @param {number} passwordLength - 암호 길이
 * @returns {string} 암호
 */
function getPassword(passwordLength){
  try {
    // 사용할 문자 타입들 정의
    var types = {};
    types.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    types.lowercase = 'abcdefghijklmnopqrstuvwxyz';
    types.digit = '0123456789';
    types.special = '!@#$%^&*()~-_+=[]{};:,./<>?';
  
    // 사용하는 타입 갯수보다 더 짧은 암호를 만들려고 하면 에러
    if (Number(passwordLength) < Object.keys(types).length) throw new Error('Too short password length to create');
    
    // 사용가능한 전체 문자열 세트 생성
    var useableCharacters = (function(src){
      var result = [];
      Object.keys(src).forEach(function(k){
        result.push(src[k]);
      });
      return result.join('');
    })(types);
  
    // 전체 문자열 세트에서 랜덤으로 하나의 문자 선택
    function getAChar(chars) {
      var pointer = Math.floor(Math.random() * chars.length);
      return chars[pointer];
    };
  
    // 함수 실행문이 알려준 암호 길이만큼 암호 생성
    var result = (function(length){
      var result = [];
      for (var i = 0; i < length; i ++) {
        result.push(getAChar(useableCharacters));
      };
      return result.join('');
    })(passwordLength);
  
    // 생성된 암호가 각 타입별로 한개씩은 사용했는지 검증
    function validate(value) {
      var flag = true;
      Object.keys(types).forEach(function(k){
        if (!flag) return;
      
        var regex = (k === 'special')
          ? new RegExp('[' + types[k].split('').map(function(e){return '\\' + e}).join('') + ']')
          : new RegExp('[' + types[k] + ']');
      
        if(!regex.test(value)) flag = false;
      });
      return flag;
    };
  
    // 검증을 통과했으면 리턴, 못했으면 재귀
    return validate(result)
    ? result
    : getPassword(passwordLength);
  } catch (err) {
    return console.error('[Failed to create password]', err);
  }
};

var myPassword = getPassword(12);
console.log(myPassword);