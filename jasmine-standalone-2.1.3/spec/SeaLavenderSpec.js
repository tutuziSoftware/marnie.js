describe('SeaLavender', function(){
    var sea;

    beforeEach(function() {
        sea = marnie.SeaLavender();
    });

    it('型チェック', function(){
        expect(typeof sea).toBe("function");
    });

    it('イベントの発生', function(done){
        sea.addEvent("test", {
            /**
             * イベント発生時に行う処理。
             * @param context 一つのまとまりが共有するオブジェクト。ある種のグローバル変数
             * @param listener 実行単位
             */
            execute:function(context, listener){
                //今回は単純実行
                listener(context);
            }
        });

        sea.addEventListener("test", function(){
            expect(true).toBeTruthy();
        });

        sea.addEventListener("test", function(){
            expect(true).toBeTruthy();
            done();
        });

        sea.start();
    });

    it('非同期処理が入り込む場合(addEventListener編)', function(specDone){
        sea.addEvent("test", {
            execute:function(context, listener, done){
                listener(context, done);
            }
        });

        sea.addEventListener("test", function(context, done){
            expect(context.timeout).toBeFalsy();
            setTimeout(function(){
                context.timeout = true;
                done();
            }, 0);
        });

        sea.addEventListener("test", function(context){
            expect(context.timeout).toBeTruthy();
            specDone();
        });

        sea.start();
    });

    it('カウントアップの実装例', function(done){
        sea.addEvent("init", {
            threshold:1,
            execute:function(context, listener){
                listener(context);
            }
        });

        sea.addEvent("countUp", {
            execute:function(context, listener){
                listener(context);
            }
        });

        sea.addEvent("end", {
            execute:function(context, listener){
                if(listener(context)){
                    expect(context.count).toBe(3);
                    done();
                }else{
                    this.restart();
                }
            }
        });

        var initCount = 0;

        sea.addEventListener("init", function(context){
            context.count = 0;

            initCount++;

            //一回しか実行されない
            expect(initCount).toBe(1);
        });

        sea.addEventListener("countUp", function(context){
            context.count++;
        });

        sea.addEventListener("end", function(context){
            return context.count >= 3;
        });

        sea.start();
    });

    it('addEvent定義前にaddEventListenerが作られたら？　何もしない', function(){
        sea.addEventListener("test", function(){
            expect(false).toBeTruthy();
        });

        sea.start();
        expect(true).toBeTruthy();
    });
});