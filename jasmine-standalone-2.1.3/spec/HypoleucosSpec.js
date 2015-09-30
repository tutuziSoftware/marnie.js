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
            var views = document.getElementsByClassName('view-test-class');

            for(var i = 0 ; i != views.length ; i++){
                expect(views[i].innerText).toBe('ccc');
            }

            done();
        }, 0);
    });

    it('repeatの実装', function(done){
        expect(document.getElementsByClassName('repeat').length).toBe(1);

        data['repeat'] = [3, 2, 1, 'GO!'];

        setTimeout(function(){
            expect(document.getElementsByClassName('repeat').length).toBe(4);
            done();
        }, 0);
    });

    it('オブジェクトの表示', function(done){
        expect(document.getElementsByClassName('view-object.a')[0].innerText).toBe('');
        expect(document.getElementsByClassName('view-object.b')[0].innerText).toBe('');

        data['view-object'] = {
            a:5,
            b:10
        };

        setTimeout(function(){
            expect(document.getElementsByClassName('view-object.a')[0].innerText).toBe(5);
            expect(document.getElementsByClassName('view-object.b')[0].innerText).toBe(10);
            done();
        }, 0);
    });
});