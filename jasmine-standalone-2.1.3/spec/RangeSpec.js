describe('Range', function(){
    it('関数実行', function(){
        var i = 1;
        marnie.Range(1, 10, function(count, index){
            expect(count).toBe(i);
            expect(index).toBe(i - 1);
            i++;
        });
    });

    it('new', function(){
        var i = 1;
        new marnie.Range(1, 10, function(count, index){
            expect(count).toBe(i);
            expect(index).toBe(i - 1);
            i++;
        });
    });

    it('marnie.Range().forEach()', function(){
        var i = 1;
        marnie.Range(1, 5).forEach(function(count){
            expect(count).toBe(i);
            i++;
        });
    });

    it('new marnie.Range().forEach()', function(){
        var i = 1;
        new marnie.Range(1, 5).forEach(function(count){
            expect(count).toBe(i);
            i++;
        });
    });

    it('new Range()', function(){
        var Range = marnie.Range;

        var i = 1;
        Range(1, 5, function(count){
            expect(count).toBe(i);
            i++;
        });
    });

    it('on()', function(){
        var range = marnie.Range(1, 3);

        expect(range.on(0)).toBeFalsy();
        expect(range.on(1)).toBeTruthy();
        expect(range.on(3)).toBeTruthy();
        expect(range.on(4)).toBeFalsy();
    });

    it('out()', function(){
        var range = marnie.Range(1, 3);

        expect(range.out(0)).toBeTruthy();
        expect(range.out(1)).toBeFalsy();
        expect(range.out(3)).toBeFalsy();
        expect(range.out(4)).toBeTruthy();
    });

    describe('route()', function(){
        it('out of route', function(){
            var range = marnie.Range(-1, 8);

            range.route(-2)
                .on(function(){
                    expect(false).toBeTruthy();
                })
                .out(function(){
                    expect(true).toBeTruthy();
                });
            range.route(9)
                .on(function(){
                    expect(false).toBeTruthy();
                })
                .out(function(){
                    expect(true).toBeTruthy();
                });
        });

        it('on of route', function(){
            var range = marnie.Range(-1, 8);

            range.route(-1)
                .on(function(){
                    expect(true).toBeTruthy();
                })
                .out(function(){
                    expect(false).toBeTruthy();
                });
            range.route(8)
                .on(function(){
                    expect(true).toBeTruthy();
                })
                .out(function(){
                    expect(false).toBeTruthy();
                });
        });
    });
});