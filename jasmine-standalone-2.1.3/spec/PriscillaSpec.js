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

        it('入力', function(){
            p.setInput(0, 1);
            p.setInput(1, 2);
            p.start();

            var output = p.output();

            expect(Array.isArray(output)).toBeTruthy();
            expect(output[0].value).toBe(0.8807970779778823);
            expect(output[1].value).toBe(0.8807970779778823);
        });

        it('教師あり学習', function(){
            p.learning(1);
        });
    });
});