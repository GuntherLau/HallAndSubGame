cc.Class({
    extends: cc.Component,

    properties: {
    },



    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        // cc.find("btnPrint", this.node).on('click', function(event){
        //     console.log("btnPrint clicked");
        // });
        var self = this;
        cc.loader.loadRes("myprefab", cc.Prefab, function(error, prefab) {
            if (error) {
                cc.error("loader Prefab error " + error + ": " + name);
                return;
            }
            var instance = cc.instantiate(prefab);

            self.node.addChild(instance);
        });
    },

    // called every frame
    update: function (dt) {

    },

    onDestroy(){
        console.log("hellowrold onDestroy");
    }
});
