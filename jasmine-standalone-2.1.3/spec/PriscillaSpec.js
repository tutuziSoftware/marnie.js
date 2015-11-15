describe('Priscilla', function(){
    it('型チェック', function(){
        expect(typeof marnie.Priscilla).toBe("function");
    });

    describe('ニューラルネットワーク', function(){
        var p = marnie.Priscilla();

        it('入力値設定', function(){
            expect(typeof p.addInput).toBe("function");
            p.addInput(2);
        });

        it('中間層設定', function(){
            expect(typeof p.addInvisible).toBe("function");
            p.addInvisible(2);
        });

        it('出力層設定', function(){
            expect(typeof p.addOutput).toBe("function");
            p.addOutput(2);
        });

        it('演算', function(){
            p.setInput(0, 1);
            p.setInput(1, 2);
            p.start();
        });
    });
});