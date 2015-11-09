describe('Priscilla', function(){
    it('型チェック', function(){
        expect(typeof marnie.Priscilla).toBe("function");
    });

    describe('ニューラルネットワーク', function(){
        var p = new marnie.Priscilla;

        it('入力値設定', function(){
            p.addInput({});
            p.addInput({});
        });

        it('中間層設定', function(){
            p.addInvisible({});
            p.addInvisible({});
        });

        it('出力層設定', function(){
            p.addOutput({});
            p.addOutput({});
        });

        it('演算', function(){

        });
    });
});