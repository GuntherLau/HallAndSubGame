// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    printInfo(){
        console.log("helloworld123123");
        console.log("幸运老虎机playInfo："+ JSON.stringify(model));
        console.log("幸运老虎机vv："+ JSON.stringify(cc.vv));
    },

    exit(){
        // if(cc && cc.vv) {
        //     console.log("send msg BannerTopBtnBackClick");
        //     cc.vv.gameEvent.emit("BannerTopBtnBackClick");
        // }

        console.log("from hellowrold back to lobby");
        cc.director.loadScene("Lobby");
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self = this;
        cc.find("btnLoad", this.node).on('click', function(event){
            cc.vv.loaderPrefab("tigerTest", function (prefab) {
                var instance = cc.instantiate(prefab);
                self.node.addChild(instance);
            });
        });

        cc.find("label", this.node).on(cc.Node.EventType.TOUCH_START, function(event){
            console.log("label click!!!");
        });
    },

    // update (dt) {},
});
