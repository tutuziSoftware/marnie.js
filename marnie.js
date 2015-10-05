(function(marnie, modules){
    modules.forEach(function(module){
        module(marnie);
    });
})((function(){
    //init
    if('marnie' in this){
        var marnie = this['marnie'];
    }else{
        var marnie = {};
        this['marnie'] = marnie;
    }

    return marnie;
})(), [
    function(marnie){
        marnie.comics = {
            isObject:function(comic){
                return comic && typeof comic === 'object';
            },
            isObjectLike:function(comic){
                return marnie.comics.isObject(comic) || marnie.comics.isFunction(comic);
            },
            isFunction:function(comic){
                return comic && typeof comic === 'function';
            },
            isNumber:function(comic){
                return typeof comic === 'number' && isNaN(comic) == false;
            },
            //乱暴なやり方だ
            isArray:Array.isArray
        };
    },
    function(marnie){
        /**
         * とある範囲を指定します。
         * このクラスはイミュータブルです。
         * @param first
         * @param last
         * @param forEachCallback
         * @returns {marnie.Range}
         * @constructor
         */
        marnie.Range = function(first, last, forEachCallback){
            if(typeof first !== 'number' || typeof last !== 'number'){
                console.log('数値を指定してください');
                return;
            }
            if(this.constructor != marnie.Range){
                return new marnie.Range(first, last, forEachCallback);
            }

            if(first < last){
                this.FIRST = first;
                this.LAST = last;
            }else{
                var swap = first;
                this.FIRST = last;
                this.LAST = swap;
            }

            Object.freeze(this);

            if(typeof forEachCallback === 'function') this.forEach(forEachCallback);
        };

        //デフォルト値
        marnie.Range.prototype.FIRST = 0;
        marnie.Range.prototype.LAST = 0;

        /**
         * 範囲内の値を返します。
         * @param callback
         */
        marnie.Range.prototype.forEach = function(callback){
            if(typeof callback !== 'function'){
                console.log('関数を指定してください');
                return;
            }

            var index = 0;

            for(var count = this.FIRST ; count <= this.LAST ; count++, index++){
                callback(count, index);
            }
        };

        /**
         * 範囲内である場合、trueを返します。
         * @param check
         * @returns {boolean}
         */
        marnie.Range.prototype.on = function(check){
            return this.FIRST <= check && check <= this.LAST;
        }

        /**
         * 範囲外である場合、trueを返します。
         * @param check
         * @returns {boolean}
         */
        marnie.Range.prototype.out = function(check){
            return check < this.FIRST || this.LAST < check;
        }

        /**
         * 範囲内か範囲外を判定し、コールバックを実行します。
         * @param check
         */
        marnie.Range.prototype.route = function(check){
            //routeはcheckの値毎にインスタンスを生成する必要がある。
            //thisと関数を紐付けるとメモリリークになりそうなので可能な限り値を
            //オブジェクト内に収めるようにした。
            //
            //第二引数に{on:func, out:func}とする手もあるが、これだと複数の関数が同時に実行出来ない。
            //また、on()out()が分かれている為、onだけ実行したいという場合にも一応対応出来る。
            return {
                _CHECK:check,
                FIRST:this.FIRST,
                LAST:this.LAST,
                on:function(callback){
                    check = null;
                    if(marnie.Range.prototype.on.call(this, this._CHECK)){
                        callback();
                    }
                    return this;
                },
                out:function(callback){
                    check = null;
                    if(marnie.Range.prototype.out.call(this, this._CHECK)){
                        callback();
                    }
                    return this;
                }
            };
        };
    },
    function(marnie){
        marnie.SeaLavender = function(){
            var sea = function(){};
            sea._events = {};
            sea._listeners = [];
            var seaContext = Object.create(null);

            var _UNLIMITED = {};

            sea.addEvent = function(eventName, _event){
                var event = {};
                event.threshold = "threshold" in _event ? _event.threshold : _UNLIMITED;
                event.execute = "execute" in _event ? _event.execute : function(){};
                event.seaExecuteCountDown = event.threshold;

                if(eventName in sea._events == false){
                    sea._events[eventName] = event;
                }
            };

            sea.addEventListener = function(eventName, listener){
                if(eventName in sea._events == false){
                    console.log('error: not event');
                    return;
                }

                sea._listeners.push({
                    eventName:eventName,
                    listener:listener
                });
            };

            /**
             * イベントを順次実行します。
             */
            sea.start = function(){
                _start(seaContext, 0);
            };

            /**
             * イベントを再度実行します。
             */
            sea.restart = function(){
                _start(seaContext, 0);
            };

            /**
             * イベントキューの指定された番号からイベントを開始します。
             * @param context   アプリケーションコンテキスト。
             *                  SeaLavenderユーザが自由に使えるObjectです。
             *                  システムは、このObjectに対して操作を行う事を禁止します。
             * @param index イベントキューの番号
             * @private
             */
            function _start(context, index){
                for(var i = index ; i < sea._listeners.length; i++){
                    var listener = sea._listeners[i];
                    var event = sea._events[listener.eventName];

                    if(event.threshold == _UNLIMITED){
                        if(listener.listener.length <= 1){
                            event.execute.call(sea, context, listener.listener);
                        }else if(listener.listener.length == 2){
                            event.execute.call(sea, context, listener.listener, done);
                            index = i + 1;
                            break;
                        }
                    }else if(sea._events[listener.eventName].seaExecuteCountDown){
                        sea._events[listener.eventName].seaExecuteCountDown--;

                        if(listener.listener.length <= 1){
                            event.execute.call(sea, context, listener.listener);
                        }else if(listener.listener.length == 2){
                            event.execute.call(sea, context, listener.listener, done);
                            index = i + 1;
                            break;
                        }
                    }
                };

                function done(){
                    _start(context, index);
                }
            }

            return sea;
        };
    },
    function(marnie){
        /**
         * 指定行数以上の関数を指定した場合、処理を行わないようにします。
         * 処理を行わない場合、このクラスはログにその旨を出力します。
         * @param f
         * @returns {Taboo}
         * @constructor
         */
        marnie.Taboo = function(f){
            if(typeof f !== 'function'){
                console.log('関数を指定してください');
                return;
            }
            if(this.constructor !== marnie.Taboo){
                return new marnie.Taboo(f);
            }

            if(this.isExecute(f)){
                f();
            }else{
                console.log('関数が' + this.LINE + '行を超えています。処理の分割を検討してください');
            }
        };

        marnie.Taboo.prototype.LINE = 100;

        marnie.Taboo.prototype.isExecute = function(f){
            var code = f.toString();
            var line = code.split('\n').length;

            return line <= this.LINE;
        };
    },
    function(marnie){
        marnie.Compiler = function(){};
        marnie.Compiler.prototype.execute = function(code){
            var result = code.match(/"([^"]*)"/);
            if(result) return result[1];

            result = code.match(/([0-9]*)/);
            if(result) return +result[1];
        };
    },
    function(marnie){
        marnie.Hypoleucos = function(data){
            //memo dataは順次変更されるので、シャローコピーは行わない

            Object.observe(data, function(changes){
                changes.forEach(function(change){
                    _reload(data, change.name);
                });
            });

            var hypo = {};

            hypo.reload = function(){
                Object.keys(data).forEach(function(key){
                    _reload(data, key);
                });
            };

            var _reload = function(data, key){
                var methodNames = [
                    //getElementById
                    {
                        element:document.getElementById(key),
                        is:function(){
                            return this.element && 'innerText' in this.element;
                        },
                        reload:function(){
                            this.element.innerText = data[key];
                        }
                    },
                    //getElementsByClassName
                    {
                        element:document.getElementsByClassName(key),
                        is:function(){
                            return this.element && marnie.comics.isNumber(this.element.length) && this.element.length >= 1;
                        },
                        reload:function(){
                            var length = this.element.length;

                            for(var i = 0 ; i != length ; i++){
                                if(Array.isArray(data[key])){
                                    data[key].forEach(function(d){
                                        var clone = this.element[i].cloneNode(true);
                                        this.element[i].parentNode.insertBefore(clone, this.element[i]);
                                    }, this);

                                    this.element[i].parentNode.removeChild(this.element[i]);
                                }else{
                                    this.element[i].innerText = data[key];
                                }
                            }
                        }
                    },
                    //オブジェクトで更新する時
                    {
                        element:document.querySelectorAll('[class^='+key+']'),
                        is:function(){
                            return this.element && 'length' in this.element;
                        },
                        reload:function(){
                            var views = this.element;
                            var length = this.element.length;

                            for(var i = 0 ; i != length ; i++){
                                if(marnie.comics.isObject(data[key])){
                                    var objectKeys = views[i].className.split('.');

                                    var text = data;
                                    for(var j = 0 ; j != objectKeys.length ; j++){
                                        var objectKey = objectKeys[j];

                                        if(objectKey in text){
                                            text = text[objectKey];
                                        }else{
                                            break;
                                        }
                                    }

                                    if(j == objectKeys.length) views[i].innerText = text;
                                }else if(marnie.comics.isArray(data[key])){
                                    this.element[i].innerText = data[key];
                                }
                            }
                        }
                    }
                ];

                for(var i = 0 ; i != methodNames.length ; i++){
                    var methodName = methodNames[i];

                    if(methodName.is()){
                        methodName.reload();
                        break;
                    }
                }
            };

            return hypo;
        };
    }
]);