"use strict";

var CarItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.name = obj.name;
        this.date = obj.date;
        this.time=obj.time;
        this.phone = obj.phone;
        this.remark=obj.remark;
    } else {
        this.key = "";
        this.name = "";
        this.date = "";
        this.time="";
        this.phone = "";
        this.remark="";
    }
};


CarItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var Car = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new CarItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Car.prototype = {
    init: function () {
    },
    save: function (key, name, phone,time, date,remark) {
        //var from = Blockchain.transaction.from;
        var carItem = this.repo.get(key);
        if (carItem) {
            carItem.key = JSON.parse(carItem).key;
            carItem.name = JSON.parse(carItem).name + '|-' + name;
            carItem.phone = JSON.parse(carItem).phone + '|-' + phone;
            carItem.date = JSON.parse(carItem).date + '|-' + date;
            carItem.time = JSON.parse(carItem).time + '|-' + time;
            carItem.remark = JSON.parse(carItem).remark + '|-' + remark;
            this.repo.put(key, carItem);

        } else {
            carItem = new CarItem();
            carItem.key = key;
            carItem.name = name;
            carItem.phone = phone;
            carItem.date = date;
            carItem.time = time;
            carItem.remark=remark;
            this.repo.put(key, carItem);
        }
    },
    get: function (key) {
        key = key.trim();
        if (key === "") {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = Car;