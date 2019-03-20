import axios from 'axios'
export default {
  // baseUrl: 'http://116.62.228.3:8080/Advertisement/api/',
  baseUrl: 'http://116.62.228.3:8080/Advertisement_proc/api/',
  qiNiuUrl: 'http://up-z0.qiniu.com/',
  qiniuShUrl: 'http://oqhy88nu6.bkt.clouddn.com/',
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url) {
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
        if (url) {
          obj.$router.push(url)
        }
      }
    })
  },
  postHttpData (data) {
    var formData = new FormData()
    for (let i in data) {
      if (data[i] != null) {
        formData.append(i, data[i])
      }
    }
    return formData
  },
  getHttpData (data) {
    var formData = ''
    for (let i in data) {
      if (data[i] != null) {
        formData = formData + '&' + i + '=' + data[i]
      }
    }
    return formData
  },
  setToken (token) {
    localStorage.setItem('adverToken', token)
  },
  removeMsg () {
    localStorage.removeItem('adverToken')
    localStorage.removeItem('adverUser')
  },
  setWebsocket(data){
    console.log(JSON.stringify(data))
    localStorage.setItem('adverWeb', data)
  },
  getWebsocket(data){
    return localStorage.getItem('adverWeb')
  },
  getToken () {
    return localStorage.getItem('adverToken')
  },
  setUser (data) {
    localStorage.setItem('adverUser', JSON.stringify(data))
  },
  getUser () {
    return JSON.parse(localStorage.getItem('adverUser'))
  },
  axiosPostReq (url, data) {
    axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, this.postHttpData(data))
  },
  axiosPostReqWithoutToken (url, data) {
    axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, data)
  },
  axiosGetReq (url, data) {
    axios.defaults.headers['token'] = this.getToken()
    return axios.get(this.baseUrl + url + this.getHttpData(data))
  },
  getQiNiuToken () {
    return axios.get(this.baseUrl + 'qiniu/getQiNiuToken')
  },
  timeFilter (d) {
    if (d !== null && d != '' && d != undefined) {
      // d = new Date(d)
      var month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1)
      var day = d.getDate() > 10 ? d.getDate() : '0' + d.getDate()
      return `${d.getFullYear()}-` + month + '-' + day
    }
  }
}
