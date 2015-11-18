describe('Priscilla', function(){
    it('型チェック', function(){
        expect(typeof marnie.Priscilla).toBe("function");
    });

    describe('ユニットの表現', function(){
        var unit;

        it('生成', function(){
            unit = new marnie.Priscilla.Unit({
                w : [1],
                h : 1
            });

            expect(typeof unit).toBe("object");
        });

        it('結合荷重の確認', () => {
            expect(unit.w.length).toBe(1);
            expect(unit.w[0]).toBe(1);
        });

        it('閾値の確認', () => {
            expect(unit.h).toBe(1);
        });

        it('シグモイド関数を通過', () => {
            expect(unit.f([1])).toBe(0.5);
        });
    });
});