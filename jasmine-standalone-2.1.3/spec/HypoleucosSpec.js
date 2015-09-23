describe('Viewみたいなやつ', function(){
    it('とりあえずデータを表示できるように', function(){
        var data = {};
        var view = marnie.Hypoleucos(data);

        expect(document.getElementById('view-test').innerText).toBe('');

        data['view-test'] = 'aaa';

        view.reload();

        expect(document.getElementById('view-test').innerText).toBe('aaa');
    });
});