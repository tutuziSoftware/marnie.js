describe('Viewみたいなやつ', function(){
    var data = {};
    var view = marnie.Hypoleucos(data);

    it('とりあえずデータを表示できるように', function(){
        expect(document.getElementById('view-test').innerText).toBe('');

        data['view-test'] = 'aaa';

        view.reload();

        expect(document.getElementById('view-test').innerText).toBe('aaa');
    });

    it('reloadなくても値を変更したいよね！', function(done){
        data['view-test'] = 'bbb';

        setTimeout(function(){
            if(document.getElementById('view-test').innerText == 'bbb'){
                expect(document.getElementById('view-test').innerText).toBe('bbb');
                done();
            }
        }, 0);
    });

    it('クラス名から値を変更したいよね！', function(done){
        expect(document.getElementsByClassName('view-test-class')[0].innerText).toBe('');

        data['view-test-class'] = 'ccc';

        setTimeout(function(){
            expect(document.getElementsByClassName('view-test-class')[0].innerText).toBe('ccc');
            done();
        }, 0);
    });

    it('クラス名が複数ある場合の変更');
});