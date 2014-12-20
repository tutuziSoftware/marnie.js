describe('Taboo', function(){
    it('100行(default値)より大きい行数の関数は規制しよう', function(){
        expect(marnie.Taboo.prototype.LINE).toBe(100);

        marnie.Taboo(function(){
            expect(true).toBeTruthy();
        });

        var code = '';
        for(var i = 0 ; i != marnie.Taboo.prototype.LINE; i++){
            code += '\n';
        }
        var f = new Function(code + 'expect(true).toBeFalsy();');
        console.log(f);

        marnie.Taboo(f);
    });
});