var size = {
    huge: "Huge",
    medium: "Medium",
    small: "Small"
};

var result = {
    Huge: { count: 0},
    Medium: {count: 0},
    Small: {count: 0}
};

function CubeBox (volume, size) {
    this.volume = volume;
    this.size = size;
}

CubeBox.prototype.getSmallerCubeBox = function (callback) {
    var smallerSize = this.getSmallerSize();
    var smallerVolume = this.volume / 4;

    if (typeof callback == "function") callback(this);

    if (smallerSize != null && smallerVolume > 1) {
        var smallerCubeBox = new CubeBox(smallerVolume, smallerSize);
        smallerCubeBox.getSmallerCubeBox(callback);  
    } 
}

CubeBox.prototype.getSmallerSize = function () {
    switch (this.size) {
        case size.huge: {
            return size.medium;
        }

        case size.medium: {
            return size.small
        }

        default: {
            return null;
        }
    }
}

function generateHugeCubeList () {
    var hugeCubeList = [];
    var n = Math.floor(Math.random() * 20) + 10;
    for (var i = 0; i < n; i++) {
        var edge = Math.floor(Math.random() * 300) + 1;
        hugeCubeList.push(new CubeBox(edge, size.huge));
    }

    return hugeCubeList;
}

function calculateResult (cubeBox) {
    var current = result[cubeBox.size].count;
    result[cubeBox.size].count = current + 1;
}

function countSmallerBox (list, index) {
    if (index < list.length) {
        var cubeBox = list[index];
        cubeBox.getSmallerCubeBox(calculateResult);
        countSmallerBox(list, index + 1);
    } else {
        console.log("huge cube: ", result.Huge.count);
        console.log("medium cube: ", result.Medium.count);
        console.log("small cube: ", result.Small.count);
    }
}

function main () {
    var hugeCubeList = generateHugeCubeList();
    countSmallerBox(hugeCubeList, 0);
}

main();