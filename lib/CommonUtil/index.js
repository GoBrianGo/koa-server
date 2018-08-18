const path = require('path')
const fs = require('fs')
const md5 = require('blueimp-md5')
const moment = require('moment')

module.exports = {
    //递归创建目录 异步方法  
    mkdirs(dirname) {
        if (!fs.existsSync(dirname)) {
            this.mkdirs(path.dirname(dirname))
            fs.mkdirSync(dirname)
        }
    },
    //writefile promise
    writeFile(fileUrl, fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileUrl + fileName, data, (err) => {
                err && console.log(err)
                resolve(!err)
            });
        });
    },
    //获取服务器时间

    getCurrentTime() {
        return +new Date()
    },
    getDateTimestamp(date) {
        return +new Date(date)
    },
    getFormatDate(date, pattern) {
        return moment(date).format(pattern)
    },
    //获取唯一的redis key
    getUnionRedisKey(...params) {
        return params.join('')
    },
    toMd5(data) {
        return md5(data).toUpperCase()
    },
    toJSON(str) {
        try {
            return JSON.parse(str)
        } catch (e) {
            return {}
        }
    },
    toString(json) {
        try {
            return JSON.stringify(json)
        } catch (e) {
            return ''
        }
    },
    isNullObj(obj) {
        var obj = typeof obj === 'string' ? JSON.parse(obj) : obj
        try {
            return Object.keys(obj).length
        } catch (e) {
            console.log(`判断是否为空对象出错：${e}`)
            return 0
        }
    },
    // 把通过hget／hgetall获取到的数据转换成json格式
    getHashData(arr) {
        const result = {}
        for (let i = 0; i < arr.length; i = i + 2) {
            result[arr[i]] = arr[i + 1]
        }
        return result
    },
    // 判断是否为全是英文
    isEnglishWord(text) {
        return /^([A-Za-z]+\s?)*[A-Za-z]$/.test(text)
    },
    // 判断是否为中文
    isChineseWord(text) {
        return /^[\u4e00-\u9fa5]+$/g.test(text)
    },
    // 获取排名分值（时间越早越大）
    getRankScoreByDate(score) {
        return score + (9999999999999 - (+new Date())) / Math.pow(10, 13)
    },
    // 判断当前时间是否在某个时间段内
    betweenTime(start, end) {
        var now = new Date()

        if (new Date(start) < now && now < new Date(end)) {
            return true
        }
        return false
    },
    // 从数据库获取的时间会比真实时间多8小时，这里把这八小时减回
    getRealTime(time) {
        var date = new Date(time)
        date.setHours(date.getHours() - 8);
        return date
    },

    //每周礼包生成当前天所在的周字符串--每周礼包
    getCurrentWeek(currentTime) {
        if (!currentTime) {
            const date = new Date()
            currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
        var currentDate = new Date(currentTime)
        var timesStamp = currentDate.getTime();
        var currenDay = currentDate.getDay();
        var dates = [];
        for (var i = 0; i < 7; i++) {
            if (i > 0 && i < 6) continue;
            dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\-/g, ''));
        }
        return dates.join('-')
    },

    //生成当天时间--每天礼包
    getCurrentDay() {
        const date = new Date()
        const dateString = date.getFullYear() + '' + (date.getMonth() + 1) + date.getDate()
        return dateString
    }
}