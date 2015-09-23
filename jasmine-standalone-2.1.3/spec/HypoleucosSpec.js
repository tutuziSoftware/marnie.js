describe('Viewみたいなやつ', function(){
    var data = {};
    var view = marnie.Hypoleucos(data);

    it('とりあえずデータを表示できるように', function(){
        expect(document.getElementById('view-test').innerText).toBe('');

        data['view-test'] = 'aaa';

        view.reload();

        expect(document.getElementById('view-test').innerText).toBe('aaa');
    });

    it('reloadなくても値を変更したいよね！', function(){
        data['view-test'] = 'bbb';

        expect(document.getElementById('view-test').innerText).toBe('bbb');
    });
});