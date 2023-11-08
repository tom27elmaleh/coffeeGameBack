function checkBody(body) {
  let count = 0;
  for (elem in body) {
    if (body[elem] == "" || body[elem] == undefined) {
      count++;
    }
  }
  if (count > 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = { checkBody };
