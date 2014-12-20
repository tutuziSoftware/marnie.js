describe('MegaStructure', function(){
    it('関数からの生成', function(){
        var model = marnie.MegaStructure(0);
        expect(model.data).toBe(0);

        model.data = 10;
        expect(model.data).toBe(0);
    });

    it('コンストラクタからの生成', function(){
        var model = new marnie.MegaStructure("qwerty");
        expect(model.data).toBe("qwerty");

        model.data = "azerty";
        expect(model.data).toBe("qwerty");
    });

    it('起動時に関数を指定', function(){
        var model = new marnie.MegaStructure(function(){
            return "create";
        });
        expect(model.data).toBe("create");
    });

    it('起動時にオブジェクトを指定', function(){
        var model = new marnie.MegaStructure({
            hoge:{
                hufa:{}
            }
        });

        expect(model.data).toEqual({
            hoge:{
                hufa:{}
            }
        });

        model.data.hoge.hufa = 20;
        expect(model.data.hoge.hufa).toEqual({});
    });

    describe('nextLayer()', function(){
        it('ごろごろごろごろ', function(){
            var model = marnie.MegaStructure(0);

            model.nextLayer(function(data, layer){
                expect(data).toBe(0);

                layer.layer1 = true;
            }).nextLayer(function(data, layer){
                expect(data).toBe(0);
                expect(layer.layer1).toEqual(true);

                layer.layer1 = false;
            }).nextLayer(function(data, layer){
                expect(layer.layer1).toBeFalsy();
                expect(Object.getPrototypeOf(Object.getPrototypeOf(layer)).layer1).toBeTruthy();
            });
        });
    });
});