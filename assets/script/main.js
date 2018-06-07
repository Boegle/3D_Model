import {model} from './module/modeling.js'

const app = {
    init : function () {
        model.init()
        model.createCube()
    }
}

app.init()