// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const SubgameManager = require('SubgameManager');
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var tvStatus = cc.find("tvStatus", this.node).getComponent(cc.Label);

        const name = 'HelloWorld';
        if (SubgameManager.isSubgameDownLoad(name)) {
            SubgameManager.needUpdateSubgame(name, (success) => {
                if (success) {
                    tvStatus.string = name +"需要更新";
                } else {
                    tvStatus.string = name +"不需要更新";
                }
            });
        } else {
            tvStatus.string = name +"未下载";
        }

        cc.find("btnUpdate", this.node).on('click', function(event){
            if (SubgameManager.isSubgameDownLoad(name)) {
                SubgameManager.needUpdateSubgame(name, (success) => {
                    if (success) {
                        SubgameManager.downloadSubgame(name, (progress) => {
                            if (isNaN(progress)) {
                                progress = 0;
                            }
                            tvStatus.string = "资源下载中   " + parseInt(progress * 100) + "%";
                        }, function(success) {
                            if (success) {
                                tvStatus.string = "下载完成，启动游戏";
                                SubgameManager.enterSubgame(name);
                            } else {
                                tvStatus.string = "下载失败";
                            }
                        });
                    } else {
                        SubgameManager.enterSubgame(name);
                    }
                });
            } else {
                SubgameManager.downloadSubgame(name, (progress) => {
                    if (isNaN(progress)) {
                        progress = 0;
                    }
                    tvStatus.string = "资源下载中   " + parseInt(progress * 100) + "%";
                }, function(success) {
                    if (success) {
                        tvStatus.string = "下载完成，启动游戏";
                        SubgameManager.enterSubgame(name);
                    } else {
                        tvStatus.string = "下载失败";
                    }
                });
            }
        });

    },

    // update (dt) {},
});
