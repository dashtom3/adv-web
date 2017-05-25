export default{
  baseUrl: 'http://123.56.220.72:8080/cyg/api/',
  qiniuUrl: 'http://up-z2.qiniu.com/',
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      duration: '1000',
      type: 'error',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  postHttpDataWithToken: function (data) {
    var temp = this.postHttpData(data)
    temp.append('token', this.getToken())
    return temp
  },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  getToken: function () {
    var date = localStorage.getItem('advertokentime')
    if (new Date().getTime() - date > 3600000) {
      return null
    }
    return localStorage.getItem('advertoken')
  },
  setToken: function (token) {
    localStorage.setItem('advertoken', token)
    localStorage.setItem('advertokentime', new Date().getTime())
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('adveruser'))
  },
  setUser: function (caruser) {
    localStorage.setItem('adveruser', JSON.stringify(caruser))
  },
  logout: function () {
    localStorage.setItem('adveruser', null)
    localStorage.setItem('advertokentime', null)
    localStorage.setItem('advertoken', null)
  }
}
